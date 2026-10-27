import * as THREE from "three"
import { FLOW_BYPASS, FLOW_CORE, NOZZLE_Z } from "./flowpath"

const STA = FLOW_CORE.length
const IDLE_FLOW = 0.38

type Palette = { cool: number[]; comp: number[]; hot: number[]; exh: number[] }

// Display-space colors (the shader does no colorspace conversion).
const PALETTES: { dark: Palette; light: Palette } = {
  dark: {
    cool: [0.62, 0.78, 1.0],
    comp: [0.92, 0.96, 1.0],
    hot: [1.0, 0.55, 0.18],
    exh: [1.0, 0.82, 0.5],
  },
  light: {
    cool: [0.16, 0.38, 0.72],
    comp: [0.2, 0.3, 0.55],
    hot: [0.78, 0.3, 0.02],
    exh: [0.63, 0.38, 0.03],
  },
}

const VERT = /* glsl */ `
#define STA ${STA}
uniform vec4 uCore[STA];
uniform vec4 uByp[STA];
uniform float uClock;
uniform float uTime;
uniform float uFlow;
uniform float uTail;
uniform float uSize;
uniform float uPx;
uniform float uClean;
uniform vec3 uCool;
uniform vec3 uComp;
uniform vec3 uHot;
uniform vec3 uExh;

attribute vec4 aSeed;   // x phase, y radial fraction, z angle, w speed jitter
attribute float aLane;  // 0 core, 1 bypass
attribute float aEnd;   // 0 head, 1 tail (line streaks)

varying vec3 vColor;
varying float vAlpha;

// smoothstep that is well-defined for either edge order (GLSL leaves
// edge0 >= edge1 undefined, and some mobile GPUs do return garbage).
float sd(float a, float b, float x) {
  float t = clamp((x - a) / (b - a), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

vec3 sampleTab(float p, float lane) {
  bool core = lane < 0.5;
  vec4 a = core ? uCore[0] : uByp[0];
  for (int i = 0; i < STA - 1; i++) {
    vec4 b = core ? uCore[i + 1] : uByp[i + 1];
    if (p <= b.x) {
      float t = clamp((p - a.x) / max(b.x - a.x, 1e-4), 0.0, 1.0);
      return mix(a.yzw, b.yzw, t);
    }
    a = b;
  }
  return a.yzw;
}

void main() {
#ifdef GUIDE
  float p = aSeed.x;
#else
  float p = fract(aSeed.x + uClock * (0.75 + 0.5 * aSeed.w));
  p = max(p - uTail * aEnd, 0.0);
#endif
  vec3 s = sampleTab(p, aLane);
  float z = s.x;
  float r = mix(s.y, s.z, aSeed.y);
  r += 0.05 * sin(uTime * 2.0 + aSeed.z * 7.0 + z * 1.3);

  // Swirl: fan-induced rotation, combustor whirl, de-swirled by the
  // turbines / outlet guide vanes so the jet leaves straight.
  float tw;
  if (aLane < 0.5) {
    tw = 0.9 * sd(3.0, 0.5, z)
       + 2.4 * sd(-1.7, -3.0, z)
       - 2.2 * sd(-3.6, -5.6, z);
  } else {
    tw = 0.6 * sd(3.0, 0.5, z) - 0.6 * sd(0.4, -0.6, z);
  }
  float ang = aSeed.z + tw;
  vec3 pos = vec3(cos(ang) * r, sin(ang) * r, z);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
#ifdef POINTS
  gl_PointSize = clamp(uSize * uPx / -mv.z, 1.0, 48.0);
#endif

  vec3 col;
  float bright = 1.0;
  if (aLane < 0.5) {
    col = mix(uCool, uComp, sd(3.0, 0.2, z));
    col = mix(col, uHot, sd(-1.7, -2.4, z));
    col = mix(col, uExh, sd(-3.4, -6.4, z));
    bright = 1.0 + 0.5 * sd(-1.7, -2.4, z) * (1.0 - sd(-3.0, -3.6, z));
  } else {
    col = mix(uCool, uComp, 0.6 * sd(3.0, 0.2, z));
    col = mix(col, uExh, 0.5 * sd(-6.0, -9.0, z));
    bright = 0.7;
  }
  vColor = col;

  float life = sd(0.0, 0.06, p) * (1.0 - sd(0.8, 1.0, p));
  float flick = 0.85 + 0.15 * sin(uTime * 9.0 + aSeed.z * 40.0);
#ifdef GUIDE
  vAlpha = uFlow * 0.16 * life;
#else
  vAlpha = uFlow * life * flick * bright * (1.0 - aEnd);
#endif
  // Clean mode: fade the flow that is inside the engine (behind the fan,
  // ahead of the nozzle) so the front view shows only the intake stream.
  float inner = sd(1.2, 0.4, z) * sd(-6.6, -5.6, z);
  vAlpha *= 1.0 - uClean * inner;
}
`

const FRAG = /* glsl */ `
uniform sampler2D uMap;
varying vec3 vColor;
varying float vAlpha;
void main() {
#ifdef POINTS
  float a = texture2D(uMap, gl_PointCoord).a * vAlpha;
#else
  float a = vAlpha;
#endif
  if (a < 0.004) discard;
  gl_FragColor = vec4(vColor, a);
}
`

function tableUniform(rows: number[][]): THREE.Vector4[] {
  return rows.map((r) => new THREE.Vector4(r[0], r[1], r[2], r[3]))
}

export class FlowField {
  readonly group = new THREE.Group()
  private uniforms: Record<string, THREE.IUniform>
  private materials: THREE.ShaderMaterial[] = []
  private geometries: THREE.BufferGeometry[] = []
  private core: THREE.Vector4[]
  private byp: THREE.Vector4[]
  private clock = 0
  private baseCore = FLOW_CORE.map((r) => r[1])
  private baseByp = FLOW_BYPASS.map((r) => r[1])
  private anchorZ: number[] = []
  private pointsGeo!: THREE.BufferGeometry
  private linesGeo!: THREE.BufferGeometry
  private guides!: THREE.Object3D
  private total = 0

  constructor(glow: THREE.Texture, small: boolean, dark: boolean) {
    this.core = tableUniform(FLOW_CORE)
    this.byp = tableUniform(FLOW_BYPASS)
    this.uniforms = {
      uCore: { value: this.core },
      uByp: { value: this.byp },
      uClock: { value: 0 },
      uTime: { value: 0 },
      uFlow: { value: IDLE_FLOW },
      uTail: { value: 0.02 },
      uSize: { value: 0.3 },
      uPx: { value: 400 },
      uClean: { value: 0 },
      uMap: { value: glow },
      uCool: { value: new THREE.Vector3() },
      uComp: { value: new THREE.Vector3() },
      uHot: { value: new THREE.Vector3() },
      uExh: { value: new THREE.Vector3() },
    }

    const count = small ? 1000 : 2800
    const guides = small ? 6 : 12
    this.addParticles(count)
    this.addGuides(guides)
    this.setTheme(dark)
  }

  private makeMaterial(defines: Record<string, string>): THREE.ShaderMaterial {
    const m = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      defines,
      transparent: true,
      depthWrite: false,
      fog: false,
    })
    this.materials.push(m)
    return m
  }

  private add(obj: THREE.Object3D, geo: THREE.BufferGeometry): void {
    obj.frustumCulled = false
    obj.renderOrder = 5
    this.geometries.push(geo)
    this.group.add(obj)
  }

  private addParticles(n: number): void {
    const seed = new Float32Array(n * 4)
    const lane = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      seed[i * 4] = Math.random()
      seed[i * 4 + 1] = Math.random()
      seed[i * 4 + 2] = Math.random() * Math.PI * 2
      seed[i * 4 + 3] = Math.random()
      lane[i] = Math.random() < 0.62 ? 1 : 0
    }

    // Heads: soft glow sprites.
    const pg = new THREE.BufferGeometry()
    pg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3))
    pg.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4))
    pg.setAttribute("aLane", new THREE.BufferAttribute(lane, 1))
    pg.setAttribute("aEnd", new THREE.BufferAttribute(new Float32Array(n), 1))
    this.pointsGeo = pg
    this.total = n
    this.add(new THREE.Points(pg, this.makeMaterial({ POINTS: "" })), pg)

    // Tails: two vertices per particle, the second trailing along the path
    // and fading to nothing, so flow reads as streaks, not dots.
    const lg = new THREE.BufferGeometry()
    const seed2 = new Float32Array(n * 8)
    const lane2 = new Float32Array(n * 2)
    const end2 = new Float32Array(n * 2)
    for (let i = 0; i < n; i++) {
      for (let k = 0; k < 2; k++) {
        seed2.set(seed.subarray(i * 4, i * 4 + 4), (i * 2 + k) * 4)
        lane2[i * 2 + k] = lane[i]
        end2[i * 2 + k] = k
      }
    }
    lg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 6), 3))
    lg.setAttribute("aSeed", new THREE.BufferAttribute(seed2, 4))
    lg.setAttribute("aLane", new THREE.BufferAttribute(lane2, 1))
    lg.setAttribute("aEnd", new THREE.BufferAttribute(end2, 1))
    this.linesGeo = lg
    this.add(new THREE.LineSegments(lg, this.makeMaterial({})), lg)
  }

  // Faint static streamlines along the same paths: the flow stays legible
  // even in a frozen frame (reduced motion) or between particles.
  private addGuides(n: number): void {
    const steps = 80
    const verts = n * steps * 2
    const seed = new Float32Array(verts * 4)
    const lane = new Float32Array(verts)
    let v = 0
    for (let g = 0; g < n; g++) {
      const l = g % 2
      const f = ((g * 0.618034) % 1)
      const a = g * 2.399963
      for (let i = 0; i < steps; i++) {
        for (const p of [i / steps, (i + 1) / steps]) {
          seed[v * 4] = p
          seed[v * 4 + 1] = f
          seed[v * 4 + 2] = a
          lane[v] = l
          v++
        }
      }
    }
    const gg = new THREE.BufferGeometry()
    gg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(verts * 3), 3))
    gg.setAttribute("aSeed", new THREE.BufferAttribute(seed, 4))
    gg.setAttribute("aLane", new THREE.BufferAttribute(lane, 1))
    gg.setAttribute("aEnd", new THREE.BufferAttribute(new Float32Array(verts), 1))
    this.guides = new THREE.LineSegments(gg, this.makeMaterial({ GUIDE: "" }))
    this.add(this.guides, gg)
  }

  setTheme(dark: boolean): void {
    const pal = dark ? PALETTES.dark : PALETTES.light
    const u = this.uniforms
    ;(u.uCool.value as THREE.Vector3).fromArray(pal.cool)
    ;(u.uComp.value as THREE.Vector3).fromArray(pal.comp)
    ;(u.uHot.value as THREE.Vector3).fromArray(pal.hot)
    ;(u.uExh.value as THREE.Vector3).fromArray(pal.exh)
    // Additive glows vanish on paper; normal blending with darker inks reads.
    for (const m of this.materials) {
      m.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending
      m.needsUpdate = true
    }
  }

  // Quality governor hook: draw only a fraction of the particles (the seeds
  // are random, so any prefix is an even sample) and optionally drop guides.
  setDensity(fraction: number, guides: boolean): void {
    const k = Math.max(1, Math.floor(this.total * fraction))
    this.pointsGeo.setDrawRange(0, k)
    this.linesGeo.setDrawRange(0, k * 2)
    this.guides.visible = guides
  }

  setClean(c: number): void {
    this.uniforms.uClean.value = c
  }

  setAnchors(z: number[]): void {
    this.anchorZ = z
  }

  // Axial displacement of the module sitting at z, interpolated between
  // anchors so the flow stretches through the gaps instead of fading out.
  private offsetAt(z: number, shifts: number[]): number {
    const az = this.anchorZ
    if (!az.length) return 0
    if (z >= az[0]) return shifts[0]
    for (let i = 1; i < az.length; i++) {
      if (z >= az[i]) {
        const t = (z - az[i]) / (az[i - 1] - az[i])
        return shifts[i] + (shifts[i - 1] - shifts[i]) * t
      }
    }
    return shifts[az.length - 1]
  }

  setViewport(height: number, pixelRatio: number): void {
    this.uniforms.uPx.value = height * 0.5 * pixelRatio
  }

  update(dt: number, run: number, explode: number, time: number, shifts: number[]): void {
    const flow = Math.max(run, IDLE_FLOW) * (1 - 0.35 * Math.min(1, explode))
    this.clock += dt * (0.07 + 0.1 * run)
    const u = this.uniforms
    u.uClock.value = this.clock
    u.uTime.value = time
    u.uFlow.value = flow
    const endZ = NOZZLE_Z - (3 + 7 * run)
    for (let i = 0; i < STA; i++) {
      const zc = i === STA - 1 ? endZ : this.baseCore[i]
      const zb = i === STA - 1 ? endZ : this.baseByp[i]
      this.core[i].y = zc + this.offsetAt(zc, shifts)
      this.byp[i].y = zb + this.offsetAt(zb, shifts)
    }
  }

  dispose(): void {
    for (const g of this.geometries) g.dispose()
    for (const m of this.materials) m.dispose()
  }
}
