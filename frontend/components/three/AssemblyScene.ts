import * as THREE from "three"
import { LineMaterial } from "three/addons/lines/LineMaterial.js"
import type { SceneConfig } from "./sceneConfigs"
import { buildLattice, glowTexture } from "./assemblies"
import { buildJetEngine, STATIC_LABEL_TEXTS, type JetEngine } from "./jetEngine"
import { FlowField } from "./flowField"

type ThemeSpec = {
  fog: number
  fogDensity: number
  structure: number
  structureOpacity: number
  wireOpacity: number
  label: string
  nodeDim: [number, number, number]
  nodeLit: [number, number, number]
  nodeOpacity: number
  pulse: number
  pulseOpacity: number
}

const THEMES: { dark: ThemeSpec; light: ThemeSpec } = {
  dark: {
    fog: 0x0a0a0a,
    fogDensity: 0.02,
    structure: 0xe8e8e8,
    structureOpacity: 0.42,
    wireOpacity: 0.13,
    label: "#daa520",
    nodeDim: [0.3, 0.24, 0.1],
    nodeLit: [1.0, 0.78, 0.3],
    nodeOpacity: 0.72,
    pulse: 0xffd97a,
    pulseOpacity: 0.9,
  },
  light: {
    fog: 0xfaf6ee,
    fogDensity: 0.022,
    structure: 0x211d16,
    structureOpacity: 0.3,
    wireOpacity: 0.09,
    label: "#a16207",
    nodeDim: [0.55, 0.48, 0.36],
    nodeLit: [0.63, 0.38, 0.03],
    nodeOpacity: 0.5,
    pulse: 0xa16207,
    pulseOpacity: 0.6,
  },
}

const RIPPLE_MAX = 5
const RIPPLE_LIFE = 6
const RIPPLE_SPEED = 5
const RIPPLE_SHELL = 2.2
const PULSE_SPEED = 2.4
const EXPLODE_SPAN = 0.25

type Ripple = { x: number; y: number; z: number; t0: number }
type Pulse = { a: number; b: number; t: number; dur: number }

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

export class AssemblyScene {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private config: SceneConfig
  private isDark: boolean
  private theme: ThemeSpec

  private structureMaterial!: LineMaterial
  private wireMaterial!: THREE.LineBasicMaterial
  private nodeMaterial!: THREE.PointsMaterial
  private pulseMaterial!: THREE.PointsMaterial
  private glow: THREE.Texture

  private engine!: JetEngine
  private explode = 0
  private explodeTarget = 0
  private run = 0
  private runTarget = 0
  private labelClock = 0

  private flow!: FlowField
  private anchorShift: number[] = []
  private quality = 0
  private perfTime = 0
  private perfFrames = 0
  private frame = 0
  private lastRender = 0
  private focusRing!: THREE.LineLoop
  private focusMaterial!: THREE.LineBasicMaterial
  private focusPos = new THREE.Vector3(0, 0, -2)
  private focusTarget = new THREE.Vector3(0, 0, -2)
  private focusStrength = 0

  private nodePos!: Float32Array
  private nodeCount = 0
  private edges!: Uint16Array
  private pulses: Pulse[] = []
  private pulseGeo!: THREE.BufferGeometry
  private nodeGeo!: THREE.BufferGeometry

  private timer = new THREE.Timer()
  private time = 0
  private bounds?: { start: number; end: number }[]
  private scrollProgress = 0
  private targetScroll = 0
  private raf = 0
  private disposed = false
  private running = false
  private reduceMotion: boolean
  private smallScreen: boolean
  private onProgress?: (p: number) => void

  private pointer = { x: 0, y: 0, strength: 0, target: 0 }
  private ripples: Ripple[] = []

  private scratchPos = new THREE.Vector3()
  private scratchTarget = new THREE.Vector3()
  private scratchDir = new THREE.Vector3()
  private observer: MutationObserver

  constructor(canvas: HTMLCanvasElement, config: SceneConfig) {
    this.config = config
    this.smallScreen = window.innerWidth < 768
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // MSAA is wasted on hi-dpi screens, where the pixel ratio already hides jaggies.
      antialias: window.devicePixelRatio < 1.5,
      alpha: true,
      powerPreference: "default",
    })
    this.renderer.setPixelRatio(this.smallScreen ? 1 : Math.min(window.devicePixelRatio, 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 0)

    this.isDark = !document.documentElement.classList.contains("light")
    this.theme = this.isDark ? THEMES.dark : THEMES.light
    this.glow = glowTexture()

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(this.theme.fog, this.theme.fogDensity)

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 140)
    this.camera.position.set(...config.chapters[0].cameraPos)
    this.camera.lookAt(...config.chapters[0].cameraTarget)

    this.structureMaterial = new LineMaterial({
      color: this.theme.structure,
      transparent: true,
      opacity: this.theme.structureOpacity,
      linewidth: this.smallScreen ? 1.4 : 1.9,
      fog: true,
    })
    this.structureMaterial.resolution.set(window.innerWidth, window.innerHeight)

    this.engine = buildJetEngine(this.structureMaterial, this.theme.label, this.smallScreen)
    this.scene.add(this.engine.root)
    this.anchorShift = this.engine.anchors.map(() => 0)
    this.buildFlows()
    this.flow.setAnchors(this.engine.anchors.map((x) => x.z))
    this.syncDim()

    this.wireMaterial = new THREE.LineBasicMaterial({
      color: this.theme.structure,
      transparent: true,
      opacity: this.theme.wireOpacity,
      fog: true,
    })
    this.buildLattice(config)
    this.buildPulses(config)

    this.observer = new MutationObserver(() => this.syncTheme())
    this.observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    window.addEventListener("resize", this.onResize)
    window.addEventListener("pointermove", this.onPointerMove, { passive: true })
    window.addEventListener("pointerdown", this.onPointerDown, { passive: true })
    window.addEventListener("pointerup", this.onPointerUp, { passive: true })
    document.addEventListener("visibilitychange", this.onVisibility)

    if (this.reduceMotion) {
      this.renderStatic()
    } else {
      this.start()
    }
  }

  setScroll(p: number): void {
    this.targetScroll = Math.max(0, Math.min(1, p))
    if (this.reduceMotion) this.renderStatic()
  }

  setOnProgress(cb: (p: number) => void): void {
    this.onProgress = cb
  }

  setChapterBounds(starts: number[]): void {
    const ch = this.config.chapters
    if (starts.length !== ch.length) return
    this.bounds = ch.map((_, i) => ({
      start: starts[i],
      end: i + 1 < ch.length ? starts[i + 1] : 1,
    }))
  }

  private buildFlows(): void {
    this.flow = new FlowField(this.glow, this.smallScreen, this.isDark)
    this.flow.setViewport(window.innerHeight, this.renderer.getPixelRatio())
    this.scene.add(this.flow.group)

    const ringSegs: number[] = []
    const ringN = 64
    for (let i = 0; i < ringN; i++) {
      const a0 = (i / ringN) * Math.PI * 2
      const a1 = ((i + 1) / ringN) * Math.PI * 2
      ringSegs.push(Math.cos(a0), Math.sin(a0), 0, Math.cos(a1), Math.sin(a1), 0)
    }
    const ringGeo = new THREE.BufferGeometry()
    ringGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(ringSegs), 3))
    this.focusMaterial = new THREE.LineBasicMaterial({
      color: this.theme.pulse,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    })
    this.focusRing = new THREE.LineLoop(ringGeo, this.focusMaterial)
    this.focusRing.renderOrder = 6
    this.scene.add(this.focusRing)
  }

  private buildLattice(config: SceneConfig): void {
    const spec = config.lattice
    const count = this.smallScreen ? Math.round(spec.nodes * 0.5) : spec.nodes
    const lattice = buildLattice(spec.center, spec.box, count, spec.linkDist)
    this.nodePos = lattice.nodes
    this.nodeCount = count
    this.edges = lattice.edges

    const edgeGeo = new THREE.BufferGeometry()
    const edgePos = new Float32Array(this.edges.length * 3)
    for (let i = 0; i < this.edges.length; i++) {
      const n = this.edges[i]
      edgePos[i * 3] = this.nodePos[n * 3]
      edgePos[i * 3 + 1] = this.nodePos[n * 3 + 1]
      edgePos[i * 3 + 2] = this.nodePos[n * 3 + 2]
    }
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePos, 3))
    this.scene.add(new THREE.LineSegments(edgeGeo, this.wireMaterial))

    this.nodeGeo = new THREE.BufferGeometry()
    this.nodeGeo.setAttribute("position", new THREE.BufferAttribute(this.nodePos, 3))
    this.nodeGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3))
    this.nodeMaterial = new THREE.PointsMaterial({
      size: 0.32,
      map: this.glow,
      transparent: true,
      opacity: this.theme.nodeOpacity,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    this.scene.add(new THREE.Points(this.nodeGeo, this.nodeMaterial))
  }

  private buildPulses(config: SceneConfig): void {
    const count = this.smallScreen ? Math.round(config.lattice.pulses * 0.5) : config.lattice.pulses
    const edgeCount = this.edges.length / 2
    for (let i = 0; i < count && edgeCount > 0; i++) {
      const e = Math.floor(Math.random() * edgeCount)
      const dur = (0.6 + Math.random() * 0.8) * (this.edgeLength(e) / PULSE_SPEED)
      this.pulses.push({ a: this.edges[e * 2], b: this.edges[e * 2 + 1], t: Math.random() * dur, dur })
    }
    this.pulseGeo = new THREE.BufferGeometry()
    this.pulseGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(this.pulses.length * 3), 3))
    this.pulseGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(this.pulses.length * 3), 3))
    this.pulseMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: this.glow,
      color: this.theme.pulse,
      transparent: true,
      opacity: this.theme.pulseOpacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    this.scene.add(new THREE.Points(this.pulseGeo, this.pulseMaterial))
  }

  private edgeLength(e: number): number {
    const a = this.edges[e * 2]
    const b = this.edges[e * 2 + 1]
    const dx = this.nodePos[a * 3] - this.nodePos[b * 3]
    const dy = this.nodePos[a * 3 + 1] - this.nodePos[b * 3 + 1]
    const dz = this.nodePos[a * 3 + 2] - this.nodePos[b * 3 + 2]
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  private syncTheme(): void {
    const dark = !document.documentElement.classList.contains("light")
    if (dark === this.isDark) return
    this.isDark = dark
    this.theme = dark ? THEMES.dark : THEMES.light
    ;(this.scene.fog as THREE.FogExp2).color.setHex(this.theme.fog)
    ;(this.scene.fog as THREE.FogExp2).density = this.theme.fogDensity
    this.structureMaterial.color.setHex(this.theme.structure)
    this.structureMaterial.opacity = this.theme.structureOpacity
    this.wireMaterial.color.setHex(this.theme.structure)
    this.wireMaterial.opacity = this.theme.wireOpacity
    this.nodeMaterial.opacity = this.theme.nodeOpacity
    this.pulseMaterial.color.setHex(this.theme.pulse)
    this.pulseMaterial.opacity = this.theme.pulseOpacity
    this.focusMaterial.color.setHex(this.theme.pulse)
    this.flow.setTheme(dark)
    this.syncDim()
    this.engine.leaderMaterial.color.set(this.theme.label)
    this.renderLabelTexts()
    if (this.reduceMotion || !this.running) {
      this.updateNodes()
      this.renderer.render(this.scene, this.camera)
    }
  }

  private renderLabelTexts(): void {
    const color = this.theme.label
    this.engine.labels.forEach((label, i) => {
      if (label.live) return
      label.setText(STATIC_LABEL_TEXTS[i], color)
    })
    this.labelClock = 1
    this.updateLiveText(0)
  }

  private updateLiveText(dt: number): void {
    this.labelClock += dt
    if (this.labelClock < 0.35) return
    this.labelClock = 0
    const r = this.run
    const color = this.theme.label
    const n1 = Math.round(2900 * (0.18 + 0.82 * r))
    const n2 = Math.round(10300 * (0.35 + 0.65 * r))
    const egt = Math.round(180 + 430 * r + (r > 0.05 ? Math.sin(this.time * 7) * 5 : 0))
    const thr = Math.round(110 * Math.pow(r, 1.6))
    const live = this.engine.labels.filter((l) => l.live)
    live[0]?.setText(`N1 ${n1} RPM`, color)
    live[1]?.setText(`N2 ${n2} RPM`, color)
    live[2]?.setText(`EGT ${egt} C`, color)
    live[3]?.setText(`THR ${thr} kN`, color)
  }

  private start(): void {
    if (this.running || this.disposed || this.reduceMotion) return
    this.running = true
    this.raf = requestAnimationFrame(this.animate)
  }

  private stop(): void {
    if (!this.running) return
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  private onVisibility = (): void => {
    if (document.hidden) this.stop()
    else this.start()
  }

  private onResize = (): void => {
    const w = window.innerWidth
    const h = window.innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.structureMaterial.resolution.set(w, h)
    this.flow.setViewport(h, this.renderer.getPixelRatio())
    this.syncDim()
    if (this.reduceMotion) this.renderStatic()
  }

  private toWorld(clientX: number, clientY: number): { x: number; y: number; z: number } | null {
    const ndcX = (clientX / window.innerWidth) * 2 - 1
    const ndcY = -(clientY / window.innerHeight) * 2 + 1
    this.scratchDir.set(ndcX, ndcY, 0.5).unproject(this.camera).sub(this.camera.position)
    if (Math.abs(this.scratchDir.z) < 1e-4) return null
    const planeZ = this.scratchTarget.z
    const t = (planeZ - this.camera.position.z) / this.scratchDir.z
    if (t <= 0) return null
    return {
      x: this.camera.position.x + this.scratchDir.x * t,
      y: this.camera.position.y + this.scratchDir.y * t,
      z: planeZ,
    }
  }

  private onPointerMove = (e: PointerEvent): void => {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    this.pointer.target = 1
  }

  private onPointerDown = (e: PointerEvent): void => {
    const hit = this.toWorld(e.clientX, e.clientY)
    if (!hit) return
    this.ripples.push({ ...hit, t0: this.time })
    if (this.ripples.length > RIPPLE_MAX) this.ripples.shift()
    if (this.reduceMotion) {
      this.updateNodes()
      this.renderer.render(this.scene, this.camera)
    }
  }

  private onPointerUp = (e: PointerEvent): void => {
    if (e.pointerType === "touch") this.pointer.target = 0
  }

  private getChapter(p: number): { chapter: SceneConfig["chapters"][number]; local: number; next: SceneConfig["chapters"][number] } {
    const ch = this.config.chapters
    for (let i = 0; i < ch.length; i++) {
      const start = this.bounds?.[i]?.start ?? ch[i].start
      const end = this.bounds?.[i]?.end ?? ch[i].end
      if (p >= start && p < end) {
        return {
          chapter: ch[i],
          local: (p - start) / (end - start),
          next: ch[Math.min(i + 1, ch.length - 1)],
        }
      }
    }
    const last = ch[ch.length - 1]
    return { chapter: last, local: 1, next: last }
  }

  private updateCamera(): void {
    const { chapter, local, next } = this.getChapter(this.scrollProgress)
    const t = smoothstep(0, 1, local)
    this.scratchPos.set(
      lerp(chapter.cameraPos[0], next.cameraPos[0], t),
      lerp(chapter.cameraPos[1], next.cameraPos[1], t),
      lerp(chapter.cameraPos[2], next.cameraPos[2], t)
    )
    this.scratchTarget.set(
      lerp(chapter.cameraTarget[0], next.cameraTarget[0], t),
      lerp(chapter.cameraTarget[1], next.cameraTarget[1], t),
      lerp(chapter.cameraTarget[2], next.cameraTarget[2], t)
    )

    const s = this.pointer.strength
    this.scratchPos.x += this.pointer.x * 0.7 * s
    this.scratchPos.y += this.pointer.y * 0.45 * s

    this.camera.position.copy(this.scratchPos)
    this.camera.lookAt(this.scratchTarget)

    this.explodeTarget = lerp(chapter.explode, next.explode, t)
    this.runTarget = lerp(chapter.run, next.run, t)
    const focus = chapter.focus ?? next.focus
    if (focus) {
      this.focusTarget.set(
        lerp(chapter.focus ? chapter.focus[0] : next.focus![0], next.focus ? next.focus[0] : chapter.focus![0], t),
        lerp(chapter.focus ? chapter.focus[1] : next.focus![1], next.focus ? next.focus[1] : chapter.focus![1], t),
        lerp(chapter.focus ? chapter.focus[2] : next.focus![2], next.focus ? next.focus[2] : chapter.focus![2], t)
      )
    }
  }

  private updateFocus(dt: number): void {
    const wanted = this.getChapter(this.scrollProgress).chapter.focus ? 1 : 0
    this.focusStrength = lerp(this.focusStrength, wanted, 0.04)
    this.focusPos.lerp(this.focusTarget, 0.04)
    this.focusRing.position.copy(this.focusPos)
    const pulse = 3.1 + 0.35 * Math.sin(this.time * 1.6)
    this.focusRing.scale.setScalar(pulse)
    this.focusMaterial.opacity = this.focusStrength * (0.28 + 0.14 * Math.sin(this.time * 2.4))
  }

  private updateParts(dt: number): void {
    this.explode = lerp(this.explode, this.explodeTarget, 0.045)
    this.run = lerp(this.run, this.runTarget, 0.05)
    const lp = (0.12 + this.run * 1.5) * dt
    const hp = -(0.2 + this.run * 2.4) * dt
    // Gullwing cowl doors swing open first, then the modules slide apart.
    const open = smoothstep(0, 0.2, this.explode)
    for (const p of this.engine.parts) {
      const local = clamp01((this.explode - p.seq * (1 - EXPLODE_SPAN)) / EXPLODE_SPAN)
      const eased = local * local * (3 - 2 * local)
      p.shift = p.dz * eased
      if (p.hinge) {
        const phi = p.hinge.angle * open
        const c = Math.cos(phi)
        const s = Math.sin(phi)
        const { x, y } = p.hinge
        p.obj.rotation.z = phi
        p.obj.position.set(x - (c * x - s * y), y - (s * x + c * y), p.base.z)
        continue
      }
      p.obj.position.set(p.base.x, p.base.y, p.base.z + p.shift)
      if (p.spool > 0) p.obj.rotation.z += lp
      else if (p.spool < 0) p.obj.rotation.z += hp
    }
    const anchors = this.engine.anchors
    for (let i = 0; i < anchors.length; i++) this.anchorShift[i] = this.engine.parts[anchors[i].part].shift
  }

  // Steps quality down (never back up, so it can't oscillate) when the
  // average frame time over ~1.5 s says this device can't keep up.
  private governQuality(rawDt: number): void {
    if (rawDt > 0.5) return
    this.perfTime += rawDt
    if (++this.perfFrames < 90) return
    const avg = this.perfTime / this.perfFrames
    this.perfTime = 0
    this.perfFrames = 0
    const budget = this.smallScreen ? 1 / 26 : 1 / 40
    if (avg < budget || this.quality >= 3) return
    this.quality++
    if (this.quality === 1) {
      this.renderer.setPixelRatio(1)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.flow.setViewport(window.innerHeight, 1)
    } else if (this.quality === 2) {
      this.flow.setDensity(0.5, true)
    } else {
      this.flow.setDensity(0.3, false)
    }
  }

  private syncDim(): void {
    const dim = this.engine.dimMaterial
    dim.color.setHex(this.theme.structure)
    dim.opacity = this.theme.structureOpacity * 0.7
  }

  private updateLabels(): void {
    const opacity = clamp01(1 - this.explode * 1.6) * 0.95
    for (const label of this.engine.labels) {
      ;(label.sprite.material as THREE.SpriteMaterial).opacity = opacity
    }
    this.engine.leaderMaterial.opacity = opacity * 0.55
  }

  private updateNodes(): void {
    const col = this.nodeGeo.attributes.color as THREE.BufferAttribute
    const { nodeDim, nodeLit } = this.theme
    const time = this.time
    for (let i = 0; i < this.nodeCount; i++) {
      const x = this.nodePos[i * 3]
      const y = this.nodePos[i * 3 + 1]
      const z = this.nodePos[i * 3 + 2]
      const wave = 0.5 + 0.5 * Math.sin(z * 0.14 - time * 0.35 + x * 0.04)
      let intensity = 0.25 + wave * wave * 0.55
      for (let r = 0; r < this.ripples.length; r++) {
        const rp = this.ripples[r]
        const age = time - rp.t0
        if (age > RIPPLE_LIFE) continue
        const dx = x - rp.x
        const dy = y - rp.y
        const dz = z - rp.z
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const shell = d - age * RIPPLE_SPEED
        intensity += Math.exp(-(shell * shell) / (RIPPLE_SHELL * RIPPLE_SHELL)) * Math.exp(-age * 0.55) * 1.6
      }
      intensity = clamp01(intensity)
      col.setXYZ(
        i,
        lerp(nodeDim[0], nodeLit[0], intensity),
        lerp(nodeDim[1], nodeLit[1], intensity),
        lerp(nodeDim[2], nodeLit[2], intensity)
      )
    }
    col.needsUpdate = true
  }

  private updatePulses(dt: number): void {
    const pos = this.pulseGeo.attributes.position as THREE.BufferAttribute
    const col = this.pulseGeo.attributes.color as THREE.BufferAttribute
    for (let i = 0; i < this.pulses.length; i++) {
      const p = this.pulses[i]
      p.t += dt
      if (p.t >= p.dur) {
        const edgeCount = this.edges.length / 2
        const e = Math.floor(Math.random() * edgeCount)
        p.a = this.edges[e * 2]
        p.b = this.edges[e * 2 + 1]
        p.dur = (0.6 + Math.random() * 0.8) * (this.edgeLength(e) / PULSE_SPEED)
        p.t = 0
      }
      const f = clamp01(p.t / p.dur)
      const a = p.a
      const b = p.b
      pos.setXYZ(
        i,
        lerp(this.nodePos[a * 3], this.nodePos[b * 3], f),
        lerp(this.nodePos[a * 3 + 1], this.nodePos[b * 3 + 1], f),
        lerp(this.nodePos[a * 3 + 2], this.nodePos[b * 3 + 2], f)
      )
      const glow = Math.sin(f * Math.PI)
      col.setXYZ(i, glow, glow, glow)
    }
    pos.needsUpdate = true
    col.needsUpdate = true
  }

  private pruneRipples(): void {
    if (!this.ripples.length) return
    const time = this.time
    this.ripples = this.ripples.filter((r) => time - r.t0 < RIPPLE_LIFE)
  }

  private renderStatic(): void {
    this.scrollProgress = this.targetScroll
    this.pointer.strength = 0
    this.updateCamera()
    this.explode = this.explodeTarget
    this.run = this.runTarget
    this.updateParts(0)
    this.flow.update(0, this.run, this.explode, this.time, this.anchorShift)
    this.updateFocus(0)
    this.updateLabels()
    this.updateNodes()
    this.updatePulses(0)
    this.renderer.render(this.scene, this.camera)
    if (this.onProgress) this.onProgress(this.scrollProgress)
  }

  private animate = (timestamp: number): void => {
    if (this.disposed) return
    if (!this.running) return
    this.raf = requestAnimationFrame(this.animate)

    // Phones render at 30 fps: half the GPU work for motion this slow.
    if (this.smallScreen && timestamp - this.lastRender < 30) return
    this.lastRender = timestamp

    this.timer.update(timestamp)
    const rawDt = this.timer.getDelta()
    const dt = Math.min(rawDt, 0.05)
    this.time += dt
    this.governQuality(rawDt)
    this.frame++

    this.scrollProgress = lerp(this.scrollProgress, this.targetScroll, 0.035)
    this.pointer.strength = lerp(this.pointer.strength, this.pointer.target, 0.03)

    this.updateParts(dt)
    this.flow.update(0, this.run, this.explode, this.time, this.anchorShift)
    this.updateFocus(dt)
    this.updateLabels()
    this.updateLiveText(dt)

    this.pruneRipples()
    this.updateCamera()
    // The background lattice glows slowly; 30 Hz updates are indistinguishable.
    if ((this.frame & 1) === 0) this.updateNodes()
    this.updatePulses(dt)

    if (this.onProgress) this.onProgress(this.scrollProgress)
    this.renderer.render(this.scene, this.camera)
  }

  dispose(): void {
    this.disposed = true
    this.stop()
    window.removeEventListener("resize", this.onResize)
    window.removeEventListener("pointermove", this.onPointerMove)
    window.removeEventListener("pointerdown", this.onPointerDown)
    window.removeEventListener("pointerup", this.onPointerUp)
    document.removeEventListener("visibilitychange", this.onVisibility)
    this.observer.disconnect()
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Sprite) return
      const withGeo = obj as THREE.Object3D & { geometry?: THREE.BufferGeometry }
      if (withGeo.geometry) withGeo.geometry.dispose()
    })
    for (const label of this.engine.labels) {
      ;(label.sprite.material as THREE.SpriteMaterial).map?.dispose()
      label.sprite.material.dispose()
    }
    this.structureMaterial.dispose()
    this.engine.dimMaterial.dispose()
    this.wireMaterial.dispose()
    this.nodeMaterial.dispose()
    this.pulseMaterial.dispose()
    this.flow.dispose()
    this.focusMaterial.dispose()
    this.engine.leaderMaterial.dispose()
    this.glow.dispose()
    this.renderer.dispose()
  }
}
