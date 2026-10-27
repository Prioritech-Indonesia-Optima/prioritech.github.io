import * as THREE from "three"
import { LineMaterial } from "three/addons/lines/LineMaterial.js"
import { LineSegments2 } from "three/addons/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js"
import type { Seg } from "./assemblies"
import { pushArc, pushCircle, pushLine, segmentsGeometry } from "./assemblies"
import { PLUG_TIP_Z } from "./flowpath"

export type JetPart = {
  obj: THREE.Object3D
  base: THREE.Vector3
  dz: number
  spool: number
  seq: number
  shift: number
  interior: boolean
  hinge?: { x: number; y: number; angle: number }
}

export type EngineLabel = {
  sprite: THREE.Sprite
  setText: (text: string, color: string) => void
  live: boolean
}

export type JetEngine = {
  root: THREE.Group
  parts: JetPart[]
  labels: EngineLabel[]
  leaderMaterial: THREE.LineBasicMaterial
  interiorLeaderMaterial: THREE.LineBasicMaterial
  dimMaterial: THREE.LineBasicMaterial
  interiorMaterial: LineMaterial
  interiorDimMaterial: THREE.LineBasicMaterial
  anchors: { z: number; part: number }[]
}

function toThick(segs: Seg[], mat: LineMaterial): LineSegments2 {
  const src = segmentsGeometry(segs)
  const lg = new LineSegmentsGeometry()
  lg.setPositions(src.getAttribute("position").array as Float32Array)
  src.dispose()
  return new LineSegments2(lg, mat)
}

function duct(out: Seg[], stations: [number, number][], rings = 48, longs = 10, a0 = 0, a1 = Math.PI * 2): void {
  const full = a1 - a0 >= Math.PI * 2 - 1e-6
  for (const [z, r] of stations) {
    if (full) pushCircle(out, r, z, rings)
    else pushArc(out, r, z, a0, a1, Math.max(8, Math.round(rings * (a1 - a0) / (Math.PI * 2))))
  }
  const lines = longs === 0 ? 0 : full ? longs : longs + 1
  for (let k = 0; k < lines; k++) {
    const a = a0 + ((a1 - a0) * k) / longs
    for (let i = 1; i < stations.length; i++) {
      pushLine(
        out,
        Math.cos(a) * stations[i - 1][1], Math.sin(a) * stations[i - 1][1], stations[i - 1][0],
        Math.cos(a) * stations[i][1], Math.sin(a) * stations[i][1], stations[i][0]
      )
    }
  }
}

function cone(out: Seg[], z0: number, r0: number, z1: number, r1: number, rings = 20, longs = 8): void {
  const n = 4
  for (let i = 0; i <= n; i++) {
    const t = i / n
    pushCircle(out, r0 + (r1 - r0) * t, z0 + (z1 - z0) * t, rings)
  }
  for (let k = 0; k < longs; k++) {
    const a = (k / longs) * Math.PI * 2
    pushLine(out, Math.cos(a) * r0, Math.sin(a) * r0, z0, Math.cos(a) * r1, Math.sin(a) * r1, z1)
  }
}

function bladePoint(r: number, a: number, beta: number, chord: number, t: number, upper: boolean, zBase: number): [number, number, number] {
  const u = (t - 0.5) * chord
  const camber = 0.1 * chord * Math.sin(Math.PI * t)
  const half = 0.05 * chord * Math.pow(Math.sin(Math.PI * t), 0.65)
  const v = camber + (upper ? half : -half)
  const cb = Math.cos(beta)
  const sb = Math.sin(beta)
  const tangential = u * cb - v * sb
  return [
    r * Math.cos(a) - tangential * Math.sin(a),
    r * Math.sin(a) + tangential * Math.cos(a),
    zBase + u * sb + v * cb,
  ]
}

const TS_FAN = [0, 0.14, 0.34, 0.56, 0.78, 1.0]
const TS_SIMPLE = [0, 0.5, 1.0]

type Pt = [number, number, number]

function outline(r: number, a: number, beta: number, chord: number, zBase: number, ts: number[]): Pt[] {
  const pts: Pt[] = []
  for (const t of ts) pts.push(bladePoint(r, a, beta, chord, t, true, zBase))
  for (let i = ts.length - 2; i >= 1; i--) pts.push(bladePoint(r, a, beta, chord, ts[i], false, zBase))
  return pts
}

type RowSpec = {
  rHub: number
  rTip: number
  count: number
  z: number
  chord: [number, number]
  beta: [number, number]
  sweep?: number
  ts?: number[]
  sections?: number
  detailed?: boolean
  hubRing?: boolean
  tipRing?: boolean
}

// One row of blades (rotor) or vanes (stator, use a negative beta). Chord and
// stagger vary from hub to tip; sweep drags the tip aft like a wide-chord fan.
function bladeRow(out: Seg[], spec: RowSpec): void {
  if (!spec.detailed) {
    // Flat quad per blade: 4 segments instead of ~11. At this size the
    // airfoil camber is invisible anyway.
    for (let i = 0; i < spec.count; i++) {
      const a = (i / spec.count) * Math.PI * 2
      const at = (r: number, chord: number, beta: number, t: number): Pt => bladePoint(r, a, beta, chord, t, true, spec.z)
      const h0 = at(spec.rHub, spec.chord[0], spec.beta[0], 0)
      const h1 = at(spec.rHub, spec.chord[0], spec.beta[0], 1)
      const t0 = at(spec.rTip, spec.chord[1], spec.beta[1], 0)
      const t1 = at(spec.rTip, spec.chord[1], spec.beta[1], 1)
      pushLine(out, ...h0, ...h1)
      pushLine(out, ...h1, ...t1)
      pushLine(out, ...t1, ...t0)
      pushLine(out, ...t0, ...h0)
    }
    if (spec.hubRing) pushCircle(out, spec.rHub, spec.z, 28)
    if (spec.tipRing) pushCircle(out, spec.rTip, spec.z, 36)
    return
  }
  const ts = spec.ts ?? TS_SIMPLE
  const nSec = spec.sections ?? 2
  const n = ts.length
  const span = [0, Math.floor((n - 1) / 2), n - 1, n + Math.floor((n - 2) / 2)]
  for (let i = 0; i < spec.count; i++) {
    const a = (i / spec.count) * Math.PI * 2
    const secs: Pt[][] = []
    for (let k = 0; k < nSec; k++) {
      const f = k / (nSec - 1)
      const r = spec.rHub + (spec.rTip - spec.rHub) * f
      const chord = spec.chord[0] + (spec.chord[1] - spec.chord[0]) * f
      const beta = spec.beta[0] + (spec.beta[1] - spec.beta[0]) * f
      const pts = outline(r, a, beta, chord, spec.z - (spec.sweep ?? 0) * f * f, ts)
      for (let j = 0; j < pts.length; j++) pushLine(out, ...pts[j], ...pts[(j + 1) % pts.length])
      secs.push(pts)
    }
    for (let k = 0; k < nSec - 1; k++) {
      for (const j of span) pushLine(out, ...secs[k][j], ...secs[k + 1][j])
    }
  }
  if (spec.hubRing) pushCircle(out, spec.rHub, spec.z, 28)
  if (spec.tipRing) pushCircle(out, spec.rTip, spec.z, 36)
}

function shaftLines(out: Seg[], r: number, z0: number, z1: number, count = 6): void {
  for (let k = 0; k < count; k++) {
    const a = (k / count) * Math.PI * 2 + Math.PI / count
    pushLine(out, Math.cos(a) * r, Math.sin(a) * r, z0, Math.cos(a) * r, Math.sin(a) * r, z1)
  }
  const rings = Math.max(2, Math.round(Math.abs(z1 - z0) / 0.9))
  for (let i = 0; i <= rings; i++) pushCircle(out, r, z0 + ((z1 - z0) * i) / rings, 20)
}

// Rotor disc seen edge-on: bore ring, rim ring and spokes.
function disc(out: Seg[], z: number, rBore: number, rRim: number, spokes = 8): void {
  pushCircle(out, rBore, z, 20)
  pushCircle(out, rRim, z, 28)
  for (let k = 0; k < spokes; k++) {
    const a = (k / spokes) * Math.PI * 2
    pushLine(out, Math.cos(a) * rBore, Math.sin(a) * rBore, z, Math.cos(a) * rRim, Math.sin(a) * rRim, z)
  }
}

// Ring of short radial ticks: bleed ports, dilution holes, bolts.
function ticks(out: Seg[], z: number, r0: number, r1: number, count: number, offset = 0): void {
  for (let k = 0; k < count; k++) {
    const a = ((k + offset) / count) * Math.PI * 2
    pushLine(out, Math.cos(a) * r0, Math.sin(a) * r0, z, Math.cos(a) * r1, Math.sin(a) * r1, z)
  }
}

function box(out: Seg[], x0: number, x1: number, y0: number, y1: number, z0: number, z1: number): void {
  const c: Pt[] = [
    [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
    [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
  ]
  for (const [i, j] of [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]) {
    pushLine(out, ...c[i], ...c[j])
  }
}

const STATIC_LABELS: { text: string; anchor: [number, number, number]; target: [number, number, number] }[] = [
  { text: "FAN · WIDE-CHORD", anchor: [3.8, 4.8, 1.0], target: [1.2, 2.8, 1.0] },
  { text: "NACELLE · BYPASS 11:1", anchor: [5.8, 5.6, 2.2], target: [1.6, 3.45, 1.8] },
  { text: "BOOSTER · 3 STG", anchor: [5.4, -3.6, 0.4], target: [0, -1.45, 0.0] },
  { text: "HPC · 8 STG · 10:1", anchor: [5.0, -2.6, -0.8], target: [0, -1.44, -1.15] },
  { text: "ANNULAR COMBUSTOR", anchor: [5.6, 4.2, -2.3], target: [0, 2.15, -2.6] },
  { text: "HPT 2S · LPT 5S", anchor: [5.4, 3.0, -4.2], target: [0, 2.1, -4.3] },
  { text: "CORE NOZZLE", anchor: [4.8, -4.2, -6.0], target: [0, -1.4, -6.2] },
]

export const STATIC_LABEL_TEXTS = STATIC_LABELS.map((l) => l.text)

const LIVE_LABELS: { id: string; anchor: [number, number, number] }[] = [
  { id: "n1", anchor: [6.2, -4.8, 0.8] },
  { id: "n2", anchor: [6.4, -5.4, -1.4] },
  { id: "egt", anchor: [6.0, 5.0, -4.6] },
  { id: "thr", anchor: [6.2, -4.6, -5.6] },
]

function makeLabelSprite(): EngineLabel {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext("2d")!
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  const material = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, fog: false })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(2.9, 0.72, 1)
  const setText = (text: string, color: string): void => {
    ctx.clearRect(0, 0, 512, 128)
    ctx.fillStyle = color
    ctx.font = "500 44px 'Geist Mono', ui-monospace, monospace"
    ctx.textBaseline = "middle"
    ctx.fillRect(6, 54, 16, 16)
    ctx.fillText(text, 36, 66)
    tex.needsUpdate = true
  }
  return { sprite, setText, live: false }
}

export function buildJetEngine(mat: LineMaterial, labelColor: string, small = false): JetEngine {
  const root = new THREE.Group()
  const parts: JetPart[] = []
  const lod = small ? 0.4 : 0.65
  const n = (count: number): number => Math.max(8, Math.round(count * lod))

  // Static structure (casings, stators, shafts) draws thinner and dimmer so
  // the rotating hardware and the airflow carry the eye.
  const dimMaterial = new THREE.LineBasicMaterial({
    color: mat.color.getHex(),
    transparent: true,
    opacity: mat.opacity * 0.7,
    fog: true,
  })

  // Interior parts get their own materials so clean mode can fade them
  // without touching the nacelle, spinner and fan.
  const interiorMaterial = new LineMaterial({
    color: mat.color.getHex(),
    transparent: true,
    opacity: mat.opacity,
    linewidth: mat.linewidth,
    fog: true,
  })
  interiorMaterial.resolution.copy(mat.resolution)
  const interiorDimMaterial = dimMaterial.clone()
  let interior = false

  const addPart = (
    build: (out: Seg[]) => void,
    dz: number,
    spool: number,
    seq: number,
    dim = false,
    hinge?: JetPart["hinge"]
  ): number => {
    const segs: Seg[] = []
    build(segs)
    const obj = dim
      ? new THREE.LineSegments(segmentsGeometry(segs), interior ? interiorDimMaterial : dimMaterial)
      : toThick(segs, interior ? interiorMaterial : mat)
    root.add(obj)
    parts.push({ obj, base: new THREE.Vector3(), dz, spool, seq: seq * 0.8, shift: 0, interior, hinge })
    return parts.length - 1
  }

  const HALF_L: [number, number] = [Math.PI / 2 + 0.1, (3 * Math.PI) / 2]
  const HALF_R: [number, number] = [-Math.PI / 2, Math.PI / 2 - 0.1]
  const HINGE_Y = 3.4
  const OPEN = 1.45

  // Inlet: fixed lip ring + strut spokes (slides forward with the fan module)
  const inlet = addPart((o) => {
    duct(o, [[2.6, 3.0], [2.2, 3.45], [1.7, 3.45]], 56, 12)
    pushCircle(o, 2.9, 2.75, 56)
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2
      pushLine(o,
        Math.cos(a) * 3.0, Math.sin(a) * 3.0, 2.6,
        Math.cos(a) * 2.9, Math.sin(a) * 2.9, 2.75)
    }
  }, 7.5, 0, 0.0)

  // Fan cowl doors: two halves hinged on the pylon that swing up and out
  // like gullwings, exposing the fan case. Left swings -, right swings +.
  for (const side of [-1, 1]) {
    const [a0, a1] = side < 0 ? HALF_L : HALF_R
    addPart((o) => {
      duct(o, [[1.7, 3.45], [0.8, 3.45], [-0.4, 3.25]], 56, 8, a0, a1)
      duct(o, [[1.7, 3.06], [-0.4, 3.06]], 40, 0, a0, a1)
      for (const z of [1.45, 0.55]) pushArc(o, 3.12, z, a0, a1, 28)
    }, 0, 0, 0, true, { x: side * 0.4, y: HINGE_Y, angle: side * OPEN })
  }

  // Pylon / engine mount (fixed to the wing, never moves)
  addPart((o) => {
    for (const x of [-0.35, 0.35]) {
      pushLine(o, x, 3.45, 0.4, x, 4.9, -1.6)
      pushLine(o, x, 3.45, -0.2, x, 4.9, -2.2)
      pushLine(o, x, 4.9, -1.6, x, 4.9, -2.2)
      pushLine(o, x, 3.45, 0.4, x, 3.45, -0.2)
    }
    pushLine(o, -0.35, 4.3, -1.1, 0.35, 4.3, -1.1)
    pushLine(o, -0.35, 3.85, 0.0, 0.35, 3.85, 0.0)
    pushLine(o, 0, 3.45, 0.1, 0, 4.9, -1.9)
  }, 0, 0, 0.0, true)

  // Aft C-duct / thrust-reverser halves, also hinged at the pylon
  for (const side of [-1, 1]) {
    const [a0, a1] = side < 0 ? HALF_L : HALF_R
    addPart((o) => {
      duct(o, [[-0.4, 3.2], [-1.6, 3.08], [-3.4, 3.0], [-5.4, 2.95], [-6.2, 2.45]], 48, 8, a0, a1)
      pushArc(o, 2.38, -6.2, a0, a1, 24)
    }, 0, 0, 0, true, { x: side * 0.4, y: HINGE_Y, angle: side * OPEN })
  }

  // Everything from here back (except spinner and fan) is hidden by clean mode.
  interior = true

  // Fan outlet guide vanes across the bypass duct
  addPart((o) => {
    bladeRow(o, {
      rHub: 1.7, rTip: 3.05, count: n(22), z: 0.12,
      chord: [0.55, 0.6], beta: [-1.3, -1.3],
    })
  }, 5.5, 0, 0.24, true)

  interior = false

  // Spinner: ogive nose cone with spiral stripes
  addPart((o) => {
    const prof = (t: number): [number, number] => [1.3 + 0.8 * t, 0.62 * Math.sqrt(Math.max(0, 1 - t * t))]
    for (const t of [0, 0.5, 0.8]) {
      const [z, r] = prof(t)
      pushCircle(o, r, z, 24)
    }
    for (let sp = 0; sp < 3; sp++) {
      for (let i = 0; i < 40; i++) {
        const a0 = sp * ((Math.PI * 2) / 3) + (i / 40) * 5.5
        const a1 = sp * ((Math.PI * 2) / 3) + ((i + 1) / 40) * 5.5
        const [z0, r0] = prof(i / 40)
        const [z1, r1] = prof((i + 1) / 40)
        pushLine(o, Math.cos(a0) * r0, Math.sin(a0) * r0, z0, Math.cos(a1) * r1, Math.sin(a1) * r1, z1)
      }
    }
  }, 5.0, 1, 0.3)

  // Fan: wide-chord swept blades, twisted hub to tip
  const fan = addPart((o) => {
    bladeRow(o, {
      rHub: 0.62, rTip: 3.0, count: n(22), z: 1.0,
      chord: [1.0, 1.3], beta: [1.0, 0.42], sweep: 0.3, ts: TS_FAN, sections: 3, hubRing: true, detailed: true,
    })
  }, 4.6, 1, 0.38)

  interior = true

  // Core cowl: splitter lip, inner wall of the bypass duct, gearbox underneath
  addPart((o) => {
    duct(o, [[0.55, 1.64], [-0.1, 1.62], [-1.65, 1.67], [-2.2, 2.37], [-3.1, 2.37], [-3.9, 2.12], [-4.6, 2.22], [-5.4, 2.37]], 44, 8)
    pushCircle(o, 1.7, 0.58, 44)
    box(o, -0.45, 0.45, -1.66, -2.0, 0.1, -0.7)
  }, 1.0, 0, 0.5, true)

  // Booster: casing + stator vanes (3 stages)
  addPart((o) => {
    duct(o, [[0.55, 1.58], [-0.1, 1.46], [-0.7, 1.44]], 36, 0)
    for (const [z, rh, rt] of [[0.2, 0.7, 1.5], [-0.2, 0.74, 1.46], [-0.6, 0.78, 1.44]]) {
      bladeRow(o, { rHub: rh, rTip: rt, count: n(16), z, chord: [0.22, 0.22], beta: [-1.1, -1.1] })
    }
  }, 3.6, 0, 0.46, true)

  // Booster rotor blades (LP spool)
  const booster = addPart((o) => {
    for (const [z, rh, rt] of [[0.4, 0.66, 1.52], [0.0, 0.7, 1.48], [-0.4, 0.76, 1.44]]) {
      bladeRow(o, {
        rHub: rh, rTip: rt, count: n(20), z,
        chord: [0.28, 0.3], beta: [0.95, 0.6], hubRing: true,
      })
    }
  }, 3.2, 1, 0.52)

  // HPC: casing + stator vanes + bleed ports
  addPart((o) => {
    for (let i = 0; i < 8; i++) {
      bladeRow(o, {
        rHub: 0.82 + i * 0.054, rTip: 1.44 + i * 0.006, count: n(12 + i), z: -0.69 - i * 0.12,
        chord: [0.13, 0.13], beta: [-1.1, -1.1],
      })
    }
    duct(o, [[-0.7, 1.44], [-1.6, 1.48]], 36, 0)
    ticks(o, -1.0, 1.48, 1.64, 4)
    ticks(o, -1.4, 1.48, 1.64, 4, 0.5)
  }, 2.6, 0, 0.58, true)

  // HPC rotor blades (HP spool): shrink as the annulus converges
  const hpc = addPart((o) => {
    for (let i = 0; i < 8; i++) {
      bladeRow(o, {
        rHub: 0.82 + i * 0.054, rTip: 1.42 + i * 0.006, count: n(11 + i), z: -0.75 - i * 0.12,
        chord: [0.15, 0.15], beta: [1.0, 0.75], hubRing: i % 2 === 0,
      })
    }
  }, 2.0, -1, 0.64)

  // Diffuser, annular combustor (casings, liners, dome), fuel nozzles
  const combustor = addPart((o) => {
    duct(o, [[-1.75, 1.6], [-2.2, 2.2], [-3.1, 2.2], [-3.3, 1.95]], 44, 8)
    duct(o, [[-1.75, 1.22], [-2.2, 1.15], [-3.1, 1.12], [-3.3, 1.1]], 40, 0)
    duct(o, [[-2.05, 2.0], [-2.7, 2.0], [-3.2, 1.8]], 44, 12)
    duct(o, [[-2.05, 1.35], [-2.7, 1.3], [-3.2, 1.25]], 40, 0)
    pushCircle(o, 1.68, -2.05, 40)
    ticks(o, -2.7, 1.96, 2.04, n(20))
    pushCircle(o, 2.5, -1.9, 56)
    const nozzles = n(14)
    for (let k = 0; k < nozzles; k++) {
      const a = (k / nozzles) * Math.PI * 2
      const c = Math.cos(a)
      const s = Math.sin(a)
      pushLine(o, c * 2.5, s * 2.5, -1.9, c * 2.02, s * 2.02, -1.9)
      pushLine(o, c * 2.02, s * 2.02, -1.9, c * 1.68, s * 1.68, -2.05)
    }
  }, 0, 0, 0.72, true)

  // HPT nozzle guide vanes
  addPart((o) => {
    for (const [z, rh, rt] of [[-3.32, 1.1, 1.9], [-3.68, 1.12, 1.93]]) {
      bladeRow(o, { rHub: rh, rTip: rt, count: n(18), z, chord: [0.2, 0.2], beta: [-1.0, -1.0] })
    }
  }, -1.2, 0, 0.76, true)

  // HPT: two rotor stages on discs (HP spool)
  const hpt = addPart((o) => {
    for (const [z, rh, rt] of [[-3.5, 1.1, 1.92], [-3.86, 1.14, 1.95]]) {
      bladeRow(o, {
        rHub: rh, rTip: rt, count: n(20), z,
        chord: [0.22, 0.2], beta: [0.9, 0.65], hubRing: true, tipRing: true,
      })
    }
  }, -2.2, -1, 0.82)

  // LPT casing + stator vanes (5 stages)
  addPart((o) => {
    duct(o, [[-3.95, 1.98], [-5.45, 2.32]], 44, 8)
    for (let i = 0; i < 5; i++) {
      bladeRow(o, {
        rHub: 1.15 - i * 0.02, rTip: 2.0 + i * 0.07, count: n(20 + i * 3), z: -4.0 - i * 0.3,
        chord: [0.2, 0.22], beta: [-1.0, -1.0],
      })
    }
  }, -3.4, 0, 0.86, true)

  // LPT rotors on the LP spool: blades lengthen as the annulus expands
  const lpt = addPart((o) => {
    for (let i = 0; i < 5; i++) {
      bladeRow(o, {
        rHub: 1.15 - i * 0.02, rTip: 2.0 + i * 0.07, count: n(18 + i * 2), z: -4.15 - i * 0.3,
        chord: [0.24, 0.3], beta: [0.85, 0.55], hubRing: true,
      })
    }
  }, -4.2, 1, 0.9)

  // LP shaft: runs the full length, fan hub to LPT
  addPart((o) => {
    shaftLines(o, 0.26, 1.2, -5.4, 4)
  }, 3.4, 1, 0.94, true)

  // HP shaft: hollow, concentric around the LP shaft, plus bearing sumps
  addPart((o) => {
    shaftLines(o, 0.5, -0.6, -3.9, 6)
    for (const z of [-0.6, -3.9]) pushCircle(o, 0.56, z, 20)
  }, 1.0, -1, 0.96, true)

  // Turbine rear frame: struts, hub and outer ring
  addPart((o) => {
    pushCircle(o, 0.95, -5.65, 28)
    pushCircle(o, 2.4, -5.65, 48)
    ticks(o, -5.65, 0.95, 2.4, 8)
  }, -5.0, 0, 0.98, true)

  // Core nozzle: converging cowl with noise-reducing chevrons
  const nozzle = addPart((o) => {
    duct(o, [[-5.4, 2.37], [-5.9, 1.8], [-6.4, 1.32]], 44, 8)
    const chev = n(12)
    for (let k = 0; k < chev; k++) {
      const a0 = (k / chev) * Math.PI * 2
      const a1 = ((k + 0.5) / chev) * Math.PI * 2
      const a2 = ((k + 1) / chev) * Math.PI * 2
      const p = (a: number, r: number, z: number): Pt => [Math.cos(a) * r, Math.sin(a) * r, z]
      pushLine(o, ...p(a0, 1.32, -6.4), ...p(a1, 1.24, -6.62))
      pushLine(o, ...p(a1, 1.24, -6.62), ...p(a2, 1.32, -6.4))
    }
  }, -5.6, 0, 0.99)

  // Tail cone / center plug
  const plug = addPart((o) => {
    cone(o, -5.6, 1.0, PLUG_TIP_Z, 0.02, 10, 8)
  }, -6.0, 0, 1.0)

  // Where the airflow's stretch points attach: the flow path follows the
  // module that sits at each station when the engine pulls apart.
  const anchors = [
    { z: 3.0, part: inlet },
    { z: 1.0, part: fan },
    { z: 0.0, part: booster },
    { z: -1.2, part: hpc },
    { z: -2.6, part: combustor },
    { z: -3.7, part: hpt },
    { z: -4.8, part: lpt },
    { z: -6.2, part: nozzle },
    { z: -7.5, part: plug },
  ]

  const labels: EngineLabel[] = []
  const leaderSegs: Seg[] = []
  const interiorLeaderSegs: Seg[] = []
  STATIC_LABELS.forEach((l, idx) => {
    const target = idx < 2 ? leaderSegs : interiorLeaderSegs
    const label = makeLabelSprite()
    label.sprite.position.set(...l.anchor)
    label.setText(l.text, labelColor)
    root.add(label.sprite)
    labels.push(label)
    pushLine(target, ...l.anchor, ...l.target)
    pushLine(target, l.target[0] - 0.12, l.target[1], l.target[2], l.target[0] + 0.12, l.target[1], l.target[2])
    pushLine(target, l.target[0], l.target[1] - 0.12, l.target[2], l.target[0], l.target[1] + 0.12, l.target[2])
  })
  for (const l of LIVE_LABELS) {
    const label = makeLabelSprite()
    label.sprite.position.set(...l.anchor)
    label.setText("—— —— ——", labelColor)
    label.live = true
    root.add(label.sprite)
    labels.push(label)
  }

  const leaderMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color(labelColor),
    transparent: true,
    opacity: 0.5,
    fog: false,
  })
  const interiorLeaderMaterial = leaderMaterial.clone()
  root.add(new THREE.LineSegments(segmentsGeometry(leaderSegs), leaderMaterial))
  root.add(new THREE.LineSegments(segmentsGeometry(interiorLeaderSegs), interiorLeaderMaterial))

  return { root, parts, labels, leaderMaterial, interiorLeaderMaterial, dimMaterial, interiorMaterial, interiorDimMaterial, anchors }
}
