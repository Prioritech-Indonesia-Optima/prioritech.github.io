import * as THREE from "three"
import { LineMaterial } from "three/addons/lines/LineMaterial.js"
import { LineSegments2 } from "three/addons/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js"
import type { Seg } from "./assemblies"
import { pushCircle, pushLine, segmentsGeometry } from "./assemblies"

export type JetPart = {
  obj: THREE.Object3D
  base: THREE.Vector3
  dz: number
  spool: number
  seq: number
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
  combustorAnchors: Float32Array
  nozzleZ: number
}

function toThick(segs: Seg[], mat: LineMaterial): LineSegments2 {
  const src = segmentsGeometry(segs)
  const lg = new LineSegmentsGeometry()
  lg.setPositions(src.getAttribute("position").array as Float32Array)
  src.dispose()
  return new LineSegments2(lg, mat)
}

function duct(out: Seg[], stations: [number, number][], rings = 48, longs = 10): void {
  for (const [z, r] of stations) pushCircle(out, r, z, rings)
  for (let k = 0; k < longs; k++) {
    const a = (k / longs) * Math.PI * 2
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

const TS = [0, 0.14, 0.34, 0.56, 0.78, 1.0]

function section(out: Seg[], r: number, a: number, beta: number, chord: number, zBase: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  for (const t of TS) pts.push(bladePoint(r, a, beta, chord, t, true, zBase))
  for (let i = TS.length - 2; i >= 1; i--) pts.push(bladePoint(r, a, beta, chord, TS[i], false, zBase))
  for (let i = 0; i < pts.length - 1; i++) {
    pushLine(out, ...pts[i], ...pts[i + 1])
  }
  return pts
}

function bladeRing(out: Seg[], rHub: number, rTip: number, count: number, z: number, skew: number): void {
  pushCircle(out, rHub, z - 0.16, 24)
  pushCircle(out, rTip, z + 0.16, Math.max(36, count * 2))
  const rMid = (rHub + rTip) / 2
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const hub = section(out, rHub + 0.02, a, skew + 0.55, (rTip - rHub) * 0.6, z - 0.16)
    const mid = section(out, rMid, a, skew + 0.28, (rTip - rHub) * 0.8, z)
    const tip = section(out, rTip, a, skew, (rTip - rHub) * 1.0, z + 0.16)
    for (const j of [0, 2, 5, 7]) {
      pushLine(out, ...hub[j], ...mid[j])
      pushLine(out, ...mid[j], ...tip[j])
    }
  }
}

function shaftLines(out: Seg[], r: number, z0: number, z1: number, count = 4): void {
  for (let k = 0; k < count; k++) {
    const a = (k / count) * Math.PI * 2 + Math.PI / count
    pushLine(out, Math.cos(a) * r, Math.sin(a) * r, z0, Math.cos(a) * r, Math.sin(a) * r, z1)
  }
  pushCircle(out, r, z0, 16)
  pushCircle(out, r, z1, 16)
}

const STATIC_LABELS: { text: string; anchor: [number, number, number]; target: [number, number, number] }[] = [
  { text: "FAN · Ø2.80 m", anchor: [3.8, 4.8, 1.0], target: [1.2, 2.8, 1.0] },
  { text: "NACELLE · BYPASS 11:1", anchor: [5.8, 5.6, 2.2], target: [1.6, 3.45, 1.8] },
  { text: "BOOSTER · 3 STG", anchor: [5.4, -3.6, 0.4], target: [0, -1.55, 0.0] },
  { text: "HPC · 10.1:1", anchor: [5.0, -2.6, -0.8], target: [0, -1.7, -0.8] },
  { text: "ANNULAR COMBUSTOR", anchor: [5.6, 4.2, -2.3], target: [0, 2.2, -2.3] },
  { text: "HPT 2S · LPT 4S", anchor: [5.4, 3.0, -4.2], target: [0, 2.35, -4.2] },
  { text: "CORE NOZZLE", anchor: [4.8, -4.2, -6.0], target: [0, -0.7, -6.6] },
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

export function buildJetEngine(mat: LineMaterial, labelColor: string): JetEngine {
  const root = new THREE.Group()
  const parts: JetPart[] = []

  const addPart = (build: (out: Seg[]) => void, dz: number, spool: number, seq: number): void => {
    const segs: Seg[] = []
    build(segs)
    const obj = toThick(segs, mat)
    root.add(obj)
    parts.push({ obj, base: new THREE.Vector3(), dz, spool, seq: seq * 0.8 })
  }

  addPart((o) => {
    duct(o, [[2.6, 3.0], [2.2, 3.45], [0.8, 3.45], [-0.4, 3.25]], 56, 12)
    pushCircle(o, 2.9, 2.75, 56)
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2
      pushLine(o,
        Math.cos(a) * 3.0, Math.sin(a) * 3.0, 2.6,
        Math.cos(a) * 2.9, Math.sin(a) * 2.9, 2.75)
    }
  }, 7.5, 0, 0.0)

  addPart((o) => {
    for (const x of [-0.35, 0.35]) {
      pushLine(o, x, 3.45, 0.4, x, 4.9, -1.6)
      pushLine(o, x, 3.45, -0.2, x, 4.9, -2.2)
      pushLine(o, x, 4.9, -1.6, x, 4.9, -2.2)
      pushLine(o, x, 3.45, 0.4, x, 3.45, -0.2)
    }
    pushLine(o, -0.35, 4.3, -1.1, 0.35, 4.3, -1.1)
    pushLine(o, -0.35, 3.85, 0.0, 0.35, 3.85, 0.0)
  }, 9.0, 0, 0.12)

  addPart((o) => {
    cone(o, 1.95, 0.05, 0.95, 0.6)
    pushCircle(o, 0.62, 0.95, 20)
  }, 5.0, 1, 0.3)

  addPart((o) => {
    bladeRing(o, 0.62, 3.05, 18, 1.0, 0.3)
  }, 4.6, 1, 0.42)

  addPart((o) => {
    shaftLines(o, 0.26, 1.2, -5.2)
    pushCircle(o, 0.26, -2.0, 16)
  }, 3.4, 1, 0.92)

  addPart((o) => {
    for (const z of [0.2, -0.3]) bladeRing(o, 0.9, 1.6, 16, z, 0.2)
  }, 3.0, 1, 0.52)

  addPart((o) => {
    for (let i = 0; i < 4; i++) {
      bladeRing(o, 0.75 + i * 0.09, 1.35 + i * 0.17, 16, 0.2 - i * 0.6, 0.16)
    }
  }, 2.0, -1, 0.62)

  addPart((o) => {
    shaftLines(o, 0.5, 0.6, -3.4)
  }, 1.0, -1, 0.96)

  addPart((o) => {
    duct(o, [[-1.8, 2.05], [-2.0, 2.2], [-2.6, 2.2], [-2.8, 2.0]], 40, 8)
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2
      pushLine(o,
        Math.cos(a) * 2.2, Math.sin(a) * 2.2, -1.8,
        Math.cos(a) * 2.5, Math.sin(a) * 2.5, -1.8)
    }
  }, 0, 0, 0.72)

  addPart((o) => {
    for (const z of [-3.15, -3.45]) bladeRing(o, 1.1, 1.9, 18, z, -0.18)
  }, -2.2, -1, 0.8)

  addPart((o) => {
    for (const z of [-4.0, -4.5, -5.0]) bladeRing(o, 1.15, 2.35, 20, z, -0.22)
  }, -4.2, 1, 0.88)

  addPart((o) => {
    duct(o, [[-0.6, 3.15], [-1.6, 2.9], [-3.4, 2.85], [-5.4, 2.65], [-6.2, 2.2]], 48, 10)
  }, 6.0, 0, 0.22)

  const nozzleZ = -7.5
  addPart((o) => {
    cone(o, -5.9, 0.8, nozzleZ, 0.06)
    pushCircle(o, 0.82, -5.9, 24)
  }, -6.0, 0, 1.0)

  const labels: EngineLabel[] = []
  const leaderSegs: Seg[] = []
  for (const l of STATIC_LABELS) {
    const label = makeLabelSprite()
    label.sprite.position.set(...l.anchor)
    label.setText(l.text, labelColor)
    root.add(label.sprite)
    labels.push(label)
    pushLine(leaderSegs, ...l.anchor, ...l.target)
    pushLine(leaderSegs, l.target[0] - 0.12, l.target[1], l.target[2], l.target[0] + 0.12, l.target[1], l.target[2])
    pushLine(leaderSegs, l.target[0], l.target[1] - 0.12, l.target[2], l.target[0], l.target[1] + 0.12, l.target[2])
  }
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
  root.add(new THREE.LineSegments(segmentsGeometry(leaderSegs), leaderMaterial))

  const combustorAnchors = new Float32Array(8 * 3)
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2
    combustorAnchors[k * 3] = Math.cos(a) * 2.25
    combustorAnchors[k * 3 + 1] = Math.sin(a) * 2.25
    combustorAnchors[k * 3 + 2] = -2.3
  }

  return { root, parts, labels, leaderMaterial, combustorAnchors, nozzleZ }
}
