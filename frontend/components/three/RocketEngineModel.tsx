"use client"

/**
 * The Prioritech rocket engine — parametric, five assemblies mapped 1:1 to the
 * divisions (the propulsion narrative: intelligence flows in, gets
 * pressure-hardened, precisely metered, converted to work, ships as thrust):
 *
 *   001 FEED MANIFOLD       → AI Systems & Orchestration
 *   002 TURBOPUMP           → Cybersecurity Intelligence
 *   003 INJECTOR PLATE      → Quantitative Engineering
 *   004 COMBUSTION CHAMBER  → Automation & Robotics
 *   005 NOZZLE              → Applied Product Engineering
 *
 * Every item is rendered THREE ways simultaneously — shaded metal, paper fill
 * (hidden-line removal), and edge lines — and the rig cross-fades their
 * opacities per frame, so dark-metal ↔ blueprint transitions are continuous.
 * The component only builds the scene graph and registers refs into `handle`;
 * ALL animation happens in the parent rig's useFrame.
 */

import { useMemo } from "react"
import * as THREE from "three"
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js"
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js"
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js"
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js"

export interface EngineHandle {
  spin: THREE.Group | null
  parts: (THREE.Group | null)[]
  anchors: (THREE.Object3D | null)[]
  baseY: number[]
  shadedMats: THREE.MeshStandardMaterial[]
  fillMat: THREE.MeshBasicMaterial | null
  /** screen-space fat lines — real CAD line weight */
  lineMat: LineMaterial | null
  lineGoldMat: LineMaterial | null
  /** inverted-hull silhouette for bold component contours */
  hullMat: THREE.MeshBasicMaterial | null
  glowMat: THREE.MeshStandardMaterial | null
  glowLight: THREE.PointLight | null
  /** outer casing halves — swing aside first, CAD-style */
  shellL: THREE.Group | null
  shellR: THREE.Group | null
  /** layered exhaust plume: [core, body, sheath] */
  plumeMats: THREE.MeshBasicMaterial[]
  plumes: (THREE.Mesh | null)[]
}

export function createEngineHandle(): EngineHandle {
  return {
    spin: null,
    parts: [null, null, null, null, null],
    anchors: [null, null, null, null, null],
    baseY: BASE_Y,
    shadedMats: [],
    fillMat: null,
    lineMat: null,
    lineGoldMat: null,
    hullMat: null,
    glowMat: null,
    glowLight: null,
    shellL: null,
    shellR: null,
    plumeMats: [],
    plumes: [null, null, null],
  }
}

/** assembled part centers — F-1 proportions: slim powerhead, dominant bell */
const BASE_Y = [1.16, 0.68, 0.34, 0.02, -0.83]
/** extra per-part separation when exploded, so parts never interpenetrate */
export const EXPLODE_GAP = [0.72, 0.36, 0.06, -0.26, -0.85]
/** outer radii per part — the rig offsets the projected anchor to the part's
    screen-space edge with these, so leader lines touch at any rotation */
export const PART_RADIUS = [0.58, 0.52, 0.52, 0.48, 1.48]

type MatKey = "body" | "dark" | "gold" | "inner"

interface Item {
  geometry: THREE.BufferGeometry
  mat: MatKey
  /** skip the blueprint edge lines (smooth pipes/tubes read better as silhouettes) */
  noLine?: boolean
  /** skip the paper occlusion fill (interior/detail-only meshes) */
  noFill?: boolean
}

// --- geometry helpers -------------------------------------------------------

function cyl(rTop: number, rBottom: number, h: number, seg = 40): THREE.BufferGeometry {
  return new THREE.CylinderGeometry(rTop, rBottom, h, seg)
}

function flatTorus(r: number, tube: number, seg = 56): THREE.BufferGeometry {
  const g = new THREE.TorusGeometry(r, tube, 10, seg)
  g.rotateX(Math.PI / 2)
  return g
}

function ringOf(unit: THREE.BufferGeometry, count: number, radius: number, pitch = 0): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = []
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const g = unit.clone()
    const m = new THREE.Matrix4()
      .makeRotationY(a)
      .multiply(new THREE.Matrix4().makeTranslation(radius, 0, 0))
      .multiply(new THREE.Matrix4().makeRotationX(pitch))
    g.applyMatrix4(m)
    parts.push(g)
  }
  const merged = mergeGeometries(parts)!
  parts.forEach((p) => p.dispose())
  unit.dispose()
  return merged
}

function translated(g: THREE.BufferGeometry, x: number, y: number, z: number): THREE.BufferGeometry {
  g.translate(x, y, z)
  return g
}

/** F-1-style bell profile: throat r0.3 flaring wide to a dominant exit r1.45. */
const BELL_LEN = 1.7
function bellRadius(t: number): number {
  return 0.3 + (1.45 - 0.3) * Math.pow(t, 1.5)
}
function bellY(t: number): number {
  return 0.55 - BELL_LEN * t
}

/** One meridian cooling tube following the bell surface (rotated into a ring of 36). */
function bellTube(): THREE.BufferGeometry {
  const pts = [0.1, 0.2, 0.3, 0.4, 0.5].map(
    (t) => new THREE.Vector3(bellRadius(t) + 0.015, bellY(t), 0),
  )
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, 0.013, 6)
}

function buildParts(): Item[][] {
  // Every part is fully self-contained — NO geometry spans an explosion joint,
  // so nothing ever appears disconnected while the assembly comes apart.

  // 001 FEED MANIFOLD — dome with integral pipe stubs, valve blocks, flange
  const manifold: Item[] = [
    { geometry: cyl(0.42, 0.54, 0.24), mat: "body" },
    { geometry: translated(new THREE.SphereGeometry(0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), 0, 0.12, 0), mat: "body" },
    // pipe stubs rising from the dome — both ends terminate inside this part
    { geometry: ringOf(translated(cyl(0.05, 0.05, 0.26, 10), 0, 0.4, 0), 4, 0.18), mat: "dark" },
    { geometry: ringOf(new THREE.BoxGeometry(0.14, 0.12, 0.14), 3, 0.44), mat: "dark" },
    { geometry: translated(flatTorus(0.56, 0.04), 0, -0.12, 0), mat: "body" },
  ]

  // 002 TURBOPUMP — ribbed housing, twin side ducts, exposed turbine wheel
  const turbopump: Item[] = [
    { geometry: cyl(0.48, 0.48, 0.46), mat: "body" },
    { geometry: translated(flatTorus(0.49, 0.02), 0, 0.12, 0), mat: "dark" },
    { geometry: translated(flatTorus(0.49, 0.02), 0, 0, 0), mat: "dark" },
    { geometry: translated(flatTorus(0.49, 0.02), 0, -0.12, 0), mat: "dark" },
    { geometry: ringOf((() => { const g = cyl(0.12, 0.12, 0.4, 20); g.rotateZ(Math.PI / 2); return translated(g, 0.44, 0.04, 0) })(), 2, 0), mat: "dark" },
    { geometry: translated(cyl(0.44, 0.44, 0.09, 40), 0, -0.28, 0), mat: "body" },
    { geometry: translated(ringOf(new THREE.BoxGeometry(0.26, 0.035, 0.09), 14, 0.3, 0.55), 0, -0.28, 0), mat: "dark" },
  ]

  // 003 INJECTOR PLATE — thick disc, bolt circle, grooves, showerhead
  const injector: Item[] = [
    { geometry: cyl(0.52, 0.52, 0.16), mat: "body" },
    { geometry: ringOf(translated(cyl(0.04, 0.04, 0.07, 10), 0, 0.09, 0), 12, 0.42), mat: "dark" },
    { geometry: translated(flatTorus(0.36, 0.013), 0, 0.08, 0), mat: "dark" },
    { geometry: translated(flatTorus(0.24, 0.013), 0, 0.08, 0), mat: "dark" },
    { geometry: ringOf(translated(cyl(0.02, 0.02, 0.05, 8), 0, -0.09, 0), 16, 0.24), mat: "dark" },
  ]

  // 004 COMBUSTION CHAMBER — barrel, band ribs, mounting brackets
  const chamber: Item[] = [
    { geometry: cyl(0.42, 0.46, 0.6), mat: "body" },
    { geometry: translated(flatTorus(0.44, 0.024), 0, 0.17, 0), mat: "dark" },
    { geometry: translated(flatTorus(0.45, 0.024), 0, -0.15, 0), mat: "dark" },
    { geometry: ringOf(new THREE.BoxGeometry(0.045, 0.3, 0.09), 4, 0.44), mat: "dark" },
  ]

  // 005 NOZZLE — the dominant F-1 bell: vertical cooling tubes above, dense
  // horizontal wrap bands on the skirt, distribution manifold ring, blue
  // interior, gold throat. No cross-part piping.
  const bellPoints: THREE.Vector2[] = []
  for (let i = 0; i <= 28; i++) {
    const t = i / 28
    bellPoints.push(new THREE.Vector2(bellRadius(1 - t), bellY(1 - t)))
  }
  const bellGeom = new THREE.LatheGeometry(bellPoints, 48)
  const nozzle: Item[] = [
    { geometry: bellGeom, mat: "body" },
    { geometry: bellGeom.clone(), mat: "inner", noLine: true, noFill: true },
    // vertical cooling tubes (upper bell)
    { geometry: ringOf(bellTube(), 36, 0), mat: "dark", noLine: true, noFill: true },
    // dense horizontal wrap bands (lower skirt) — the F-1 signature
    ...[0.48, 0.55, 0.62, 0.69, 0.76, 0.83, 0.9, 0.965].map((t) => ({
      geometry: translated(flatTorus(bellRadius(t) + 0.02, 0.024), 0, bellY(t), 0),
      mat: "dark" as MatKey,
    })),
    // distribution manifold ring at the throat
    { geometry: translated(flatTorus(bellRadius(0.07) + 0.06, 0.05), 0, bellY(0.07), 0), mat: "dark" },
    // exit lip + gold throat
    { geometry: translated(flatTorus(1.46, 0.05), 0, bellY(1), 0), mat: "body" },
    { geometry: translated(flatTorus(0.33, 0.035), 0, 0.52, 0), mat: "gold" },
  ]

  return [manifold, turbopump, injector, chamber, nozzle]
}

/** One half of the outer casing cowl — the CAD-exploded shell. */
function buildShellHalf(): Item[] {
  const rim = (y: number, tube = 0.045) => {
    const g = new THREE.TorusGeometry(0.63, tube, 10, 28, Math.PI)
    g.rotateX(Math.PI / 2)
    g.translate(0, y, 0)
    return g
  }
  return [
    { geometry: new THREE.CylinderGeometry(0.62, 0.62, 1.9, 28, 1, true, 0, Math.PI), mat: "body" },
    { geometry: rim(0.93), mat: "body" },
    { geometry: rim(-0.93), mat: "body" },
    { geometry: rim(0.2, 0.028), mat: "dark" },
    { geometry: rim(-0.4, 0.028), mat: "dark" },
  ]
}

const PAPER = "#dcdad5"

export function RocketEngineModel({ handle }: { handle: EngineHandle }): JSX.Element {
  const parts = useMemo(buildParts, [])
  const glowDisc = useMemo(() => cyl(0.3, 0.3, 0.06, 32), [])
  // layered plume cones — apex at the bell exit, widening downward
  const plumeCones = useMemo(
    () =>
      [
        { r: 0.34, len: 1.9 },
        { r: 0.62, len: 3.0 },
        { r: 0.9, len: 3.9 },
      ].map(({ r, len }) => {
        const g = new THREE.ConeGeometry(r, len, 26, 1, true)
        g.translate(0, bellY(1) - len / 2, 0)
        return g
      }),
    [],
  )

  const mats = useMemo(() => {
    const mk = (color: string, extra: Partial<THREE.MeshStandardMaterialParameters> = {}) => {
      const m = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.85,
        roughness: 0.48,
        transparent: true,
        side: THREE.DoubleSide,
        ...extra,
      })
      handle.shadedMats.push(m)
      return m
    }
    const shaded: Record<MatKey, THREE.MeshStandardMaterial> = {
      body: mk("#232121"),
      dark: mk("#161414", { roughness: 0.55 }),
      gold: mk("#daa520", { metalness: 0.65, roughness: 0.3, emissive: "#daa520", emissiveIntensity: 0.3 }),
      // blue-tinted bell interior (the F-1 photo signature)
      inner: mk("#1d2733", { roughness: 0.4, metalness: 0.7, side: THREE.BackSide }),
    }
    const fill = new THREE.MeshBasicMaterial({
      color: PAPER,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 2,
      polygonOffsetUnits: 2,
    })
    // screen-space fat lines — uniform CAD line weight at any zoom
    const line = new LineMaterial({ color: 0x2f2d2c, linewidth: 1.8, transparent: true, opacity: 0 })
    const lineGold = new LineMaterial({ color: 0x8a6a10, linewidth: 1.8, transparent: true, opacity: 0 })
    // inverted-hull silhouette — bold outer contour per component
    const hull = new THREE.MeshBasicMaterial({
      color: "#2f2d2c",
      side: THREE.BackSide,
      transparent: true,
      opacity: 0,
    })
    const glow = new THREE.MeshStandardMaterial({
      color: "#1a0f02",
      emissive: "#ffb347",
      emissiveIntensity: 0.0,
      transparent: true,
      side: THREE.DoubleSide,
    })
    const plumeLayer = (color: string) => {
      const m = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      handle.plumeMats.push(m)
      return m
    }
    const plumes = [plumeLayer("#fff3d6"), plumeLayer("#ffb347"), plumeLayer("#ff7a3c")]
    handle.fillMat = fill
    handle.lineMat = line
    handle.lineGoldMat = lineGold
    handle.hullMat = hull
    handle.glowMat = glow
    return { shaded, fill, line, lineGold, hull, glow, plumes }
  }, [handle])

  const shellItems = useMemo(buildShellHalf, [])

  // fat-line edge objects (LineSegments2) for parts + shell
  const fatEdges = useMemo(() => {
    const build = (items: Item[]) =>
      items.map((it) => {
        if (it.noLine) return null
        const eg = new THREE.EdgesGeometry(it.geometry, 15)
        const lsg = new LineSegmentsGeometry().fromEdgesGeometry(eg)
        eg.dispose()
        return new LineSegments2(lsg, it.mat === "gold" ? mats.lineGold : mats.line)
      })
    // shell edges built twice — an Object3D can only parent once, and the
    // casing renders as two independent half-shell groups
    return { parts: parts.map(build), shell: build(shellItems), shell2: build(shellItems) }
  }, [parts, shellItems, mats])

  const renderItems = (items: Item[], edgeObjs: (LineSegments2 | null)[]) =>
    items.map((it, j) => (
      <group key={j}>
        <mesh geometry={it.geometry} material={mats.shaded[it.mat]} />
        {!it.noFill && <mesh geometry={it.geometry} material={mats.fill} />}
        {it.mat === "body" && !it.noFill && (
          <mesh geometry={it.geometry} material={mats.hull} scale={1.028} />
        )}
        {edgeObjs[j] && <primitive object={edgeObjs[j]!} />}
      </group>
    ))

  return (
    <group ref={(el) => { handle.spin = el }}>
      {parts.map((items, i) => (
        <group key={i} ref={(el) => { handle.parts[i] = el }} position={[0, BASE_Y[i], 0]}>
          {/* frame-tracked callout anchor — part center; rig offsets to the screen-space edge */}
          <object3D ref={(el) => { handle.anchors[i] = el }} />
          {renderItems(items, fatEdges.parts[i])}
          {/* nozzle: throat glow, layered exhaust plume, ignition light */}
          {i === 4 && (
            <>
              <mesh geometry={glowDisc} position={[0, 0.5, 0]} material={mats.glow} />
              {plumeCones.map((g, k) => (
                <mesh key={k} ref={(el) => { handle.plumes[k] = el }} geometry={g} material={mats.plumes[k]} />
              ))}
              <pointLight
                ref={(el) => { handle.glowLight = el }}
                position={[0, -0.4, 0]}
                color="#ffb347"
                intensity={0}
                distance={8}
              />
            </>
          )}
        </group>
      ))}
      {/* outer casing — two half-shells that swing aside first, CAD-style */}
      <group ref={(el) => { handle.shellL = el }} position={[0, 0.32, 0]}>
        {renderItems(shellItems, fatEdges.shell)}
      </group>
      <group ref={(el) => { handle.shellR = el }} position={[0, 0.32, 0]} rotation={[0, Math.PI, 0]}>
        {renderItems(shellItems, fatEdges.shell2)}
      </group>
    </group>
  )
}
