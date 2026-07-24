"use client"

/**
 * The persistent engine stage — ONE fixed WebGL canvas for the whole site,
 * mounted once in the root layout (single context: no context-exhaustion
 * crashes; error boundary + context-loss recovery for everything else).
 *
 * Home: a scroll cinematic driven by engineStore.phase —
 *   assembled dark hero → cross-fade to paper blueprint while the engine
 *   explodes → five focus windows (one per division/part, callout lines
 *   PROJECTED FROM THE 3D PARTS EVERY FRAME so they track the animation
 *   exactly) → reassembly → ignition glow for the CTA.
 *
 * Subpages get purposeful presets: divisions = exploded blueprint (silver
 * lines on dark), tech = half-open cutaway, projects = assembled with thrust
 * glow, contact = ignition pulse, about = calm assembled emblem.
 */

import { Component, useEffect, useMemo, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { motion } from "framer-motion"
import { RocketEngineModel, createEngineHandle, PART_RADIUS, EXPLODE_GAP, type EngineHandle } from "./RocketEngineModel"
import { engineStore, DIVISION_PARTS } from "@/lib/engine-store"
import { useMotionBudget } from "@/lib/motion"

const EXPLODE_STRETCH = 0.66
/** canonical yaw the assembly settles to while the blueprint callouts are live */
const BLUEPRINT_YAW = 0.55
const DARK_LINE = new THREE.Color("#8f8d89")
const PAPER_LINE = new THREE.Color("#2f2d2c")
const DARK_FILL = new THREE.Color("#161515")
const PAPER_FILL = new THREE.Color("#dcdad5")

const ramp = (v: number, a: number, b: number) => THREE.MathUtils.clamp((v - a) / (b - a), 0, 1)

interface Targets {
  explode: number
  lineMix: number
  paper: number
  x: number
  y: number
  scale: number
  spin: number
  glow: number
  focus: number
  callouts: boolean
  /** 0..1 liftoff — engine accelerates off the top of the screen */
  launch: number
}

/** Per-route presets — every subpage docks the engine bottom-left as a small
    "working" emblem (spinning, glow breathing) in a page-specific state, well
    clear of content. */
function routeTargets(path: string, vw: number, vh: number, t: number): Targets | null {
  const dock = { x: -vw / 2 + 1.25, y: -vh / 2 + 1.3, scale: 0.3, callouts: false, focus: -1, launch: 0, paper: 0 }
  if (path.startsWith("/divisions")) {
    // its literal subject: the exploded blueprint, silver lines on dark
    return { ...dock, explode: 0.8, lineMix: 1, spin: 0.05, glow: 0 }
  }
  if (path.startsWith("/tech")) {
    // half-open cutaway — internals are the topic
    return { ...dock, explode: 0.4, lineMix: 1, spin: 0.07, glow: 0 }
  }
  if (path.startsWith("/projects")) {
    // assembled, running, thrust pulse — projects are what ships
    return { ...dock, explode: 0, lineMix: 0, spin: 0.16, glow: 0.5 + Math.sin(t * 2.2) * 0.15 }
  }
  if (path.startsWith("/contact")) {
    // ready to launch
    return { ...dock, explode: 0, lineMix: 0, spin: 0.12, glow: 0.4 + Math.sin(t * 1.6) * 0.22 }
  }
  if (path.startsWith("/about")) {
    return { ...dock, explode: 0, lineMix: 0, spin: 0.12, glow: 0.12 }
  }
  return null // home → cinematic
}

/** Home cinematic choreography from track progress p. */
function cinematicTargets(p: number, vw: number, vh: number): Targets {
  const ex = ramp(p, 0.14, 0.26) * (1 - ramp(p, 0.8, 0.9))
  const mix = ramp(p, 0.15, 0.27) * (1 - ramp(p, 0.78, 0.88))
  const inFocus = p > 0.26 && p < 0.82
  const focus = inFocus ? Math.min(4, Math.floor((p - 0.26) / 0.112)) : -1
  const ignition = ramp(p, 0.84, 0.93)
  const launch = ramp(p, 0.93, 1)
  return {
    explode: ex,
    lineMix: mix,
    paper: mix,
    x: vw * (0.22 - 0.09 * mix) * (1 - Math.max(ignition, launch)),
    y: vh * 0.04 * ignition + vh * 1.7 * launch * launch,
    scale: 0.84 - 0.2 * mix - 0.1 * ignition,
    spin: 0.1 + ignition * 0.4,
    glow: 0.08 + ignition * 1 + launch * 0.6,
    focus,
    callouts: mix > 0.6,
    launch,
  }
}

function Rig({ handle }: { handle: EngineHandle }): JSX.Element {
  const { viewport, camera, size } = useThree()
  const pathname = usePathname()
  const pathRef = useRef(pathname)
  pathRef.current = pathname

  const group = useRef<THREE.Group>(null)
  const cur = useRef({ explode: 0, lineMix: 0, paper: 0, x: 0, y: 0, scale: 0.84, glow: 0, shiftY: 0, launch: 0 })
  const yaw = useRef(0)
  const v3 = useMemo(() => new THREE.Vector3(), [])
  const vRight = useMemo(() => new THREE.Vector3(), [])
  const lastScene = useRef("")

  useFrame((state, dt) => {
    const g = group.current
    if (!g || !handle.spin) return
    const t = state.clock.elapsedTime
    const p = engineStore.phase.get()
    const target =
      routeTargets(pathRef.current, viewport.width, viewport.height, t) ??
      cinematicTargets(p, viewport.width, viewport.height)

    const c = cur.current
    const d = (k: keyof typeof c, to: number, lambda = 3.2) => {
      c[k] = THREE.MathUtils.damp(c[k], to, lambda, dt)
    }
    d("explode", target.explode)
    d("lineMix", target.lineMix, 3.6)
    d("paper", target.paper, 3.6)
    d("x", target.x, 3)
    d("y", target.y, target.launch > 0 ? 5 : 3)
    d("scale", target.scale, 3)
    d("glow", target.glow, 4)
    d("launch", target.launch, 5)
    const focusShift = target.focus >= 0 ? -handle.baseY[target.focus] * (1 + EXPLODE_STRETCH) * 0.3 : 0
    d("shiftY", focusShift, 2.6)

    // ignition shake — dies off as the engine lifts away
    const ignitionNow = Math.max(0, c.glow - 0.4) * (1 - c.launch)
    const shakeX = Math.sin(t * 47) * 0.05 * ignitionNow
    const shakeY = Math.cos(t * 53) * 0.035 * ignitionNow

    // placement
    g.position.set(c.x + shakeX, c.y + c.shiftY * c.scale + shakeY, 0)
    g.scale.setScalar(c.scale)

    // yaw: spin freely in shaded scenes; settle to a fixed angle while the
    // blueprint callouts are live (anchors must project to stable positions)
    if (c.lineMix > 0.5) {
      const twoPi = Math.PI * 2
      yaw.current = ((yaw.current + Math.PI) % twoPi + twoPi) % twoPi - Math.PI
      yaw.current = THREE.MathUtils.damp(yaw.current, BLUEPRINT_YAW, 3, dt)
    } else {
      yaw.current += dt * target.spin
    }
    handle.spin.rotation.y = yaw.current

    // layered exhaust plume — white core, orange body, faint sheath, each
    // flickering out of phase; grows into a full column through launch
    const thrust = Math.max(0, c.glow - 0.55) * 0.6 + c.launch
    if (thrust > 0.01) {
      const base = [0.9, 0.5, 0.25]
      handle.plumeMats.forEach((m, k) => {
        const flicker = 0.78 + 0.22 * Math.sin(t * (30 + k * 9.3) + k * 2.1)
        m.opacity = Math.min(1, thrust) * base[k] * flicker
      })
      handle.plumes.forEach((p, k) => {
        if (!p) return
        p.visible = true
        const wobble = 1 + 0.05 * Math.sin(t * (24 + k * 7))
        p.scale.set(wobble, (0.35 + thrust * 0.75) * (1 + k * 0.06), wobble)
      })
    } else {
      handle.plumes.forEach((p) => { if (p) p.visible = false })
    }

    // CAD explode staging: the casing halves swing aside FIRST, then the five
    // internals separate as discrete components (stretch + fixed gaps)
    const shellEx = ramp(c.explode, 0, 0.3)
    const partEx = ramp(c.explode, 0.22, 1)
    handle.parts.forEach((part, i) => {
      if (part) part.position.y = handle.baseY[i] * (1 + partEx * EXPLODE_STRETCH) + partEx * EXPLODE_GAP[i]
    })
    // casing halves travel along their OUTWARD normals (the un-rotated half
    // bulges toward +x; the PI-rotated one toward -x) — they pull away from
    // the machine, never through it, and park at the frame edges
    if (handle.shellL) handle.shellL.position.set(3.5 * shellEx, 0.32 + 0.1 * shellEx, 0.4 * shellEx)
    if (handle.shellR) handle.shellR.position.set(-3.5 * shellEx, 0.32 + 0.1 * shellEx, -0.4 * shellEx)

    // HARD representation switch at lineMix 0.5 — no translucent double-render
    // mush; the pop is hidden inside a "blueprint flash" of the paper layer
    const lineOn = c.lineMix > 0.5
    handle.shadedMats.forEach((m) => {
      m.opacity = 1
      m.visible = !lineOn
    })
    if (handle.fillMat) {
      handle.fillMat.opacity = 1
      handle.fillMat.visible = lineOn
      handle.fillMat.color.lerpColors(DARK_FILL, PAPER_FILL, c.paper)
    }
    if (handle.lineMat) {
      handle.lineMat.opacity = 1
      handle.lineMat.visible = lineOn
      handle.lineMat.color.lerpColors(DARK_LINE, PAPER_LINE, c.paper)
      handle.lineMat.resolution.set(size.width, size.height)
    }
    if (handle.lineGoldMat) {
      handle.lineGoldMat.opacity = 1
      handle.lineGoldMat.visible = lineOn
      handle.lineGoldMat.resolution.set(size.width, size.height)
    }
    if (handle.hullMat) {
      handle.hullMat.opacity = 1
      handle.hullMat.visible = lineOn
      handle.hullMat.color.lerpColors(DARK_LINE, PAPER_LINE, c.paper)
    }
    if (handle.glowMat) handle.glowMat.emissiveIntensity = c.glow * 2.4
    if (handle.glowLight) handle.glowLight.intensity = c.glow * 3

    // page background blend + the flash that masks the representation switch
    const isHome = !routeTargets(pathRef.current, 1, 1, 0)
    const flash = isHome ? Math.pow(Math.max(0, 1 - Math.abs(c.lineMix - 0.5) * 5), 1.6) : 0
    engineStore.blend.set(Math.max(c.paper, flash * 0.9))
    const scene = c.paper > 0.5 ? "paper" : "dark"
    if (scene !== lastScene.current) {
      lastScene.current = scene
      document.body.dataset.scene = scene
    }

    // FRAME-TRACKED callouts: project each part's center, then offset to the
    // part's screen-space edge along the camera's right axis — the line tip
    // touches the silhouette at any rotation, explosion state, or viewport
    vRight.set(1, 0, 0).applyQuaternion(camera.quaternion)
    handle.anchors.forEach((a, i) => {
      const s = engineStore.anchors[i]
      if (!a) return
      const sign = DIVISION_PARTS[i].side === "right" ? 1 : -1
      a.getWorldPosition(v3)
      v3.addScaledVector(vRight, (PART_RADIUS[i] + 0.02) * c.scale * sign)
      v3.project(camera)
      s.x = THREE.MathUtils.clamp((v3.x * 0.5 + 0.5) * 100, 3, 97)
      s.y = THREE.MathUtils.clamp((-v3.y * 0.5 + 0.5) * 100, 4, 96)
      s.visible = target.callouts ? c.lineMix : 0
      // during a focus window the focused callout owns the frame; the rest
      // fall to a whisper so no stray lines cross the content card
      s.emphasis = target.focus === i ? 1 : target.focus === -1 ? 0.75 : 0.12
    })
    engineStore.notify()
  })

  return (
    <group ref={group} rotation={[0.1, 0.32, -0.52]}>
      <RocketEngineModel handle={handle} />
    </group>
  )
}

/** Callout overlay — DOM lines/labels driven imperatively from the projected anchors. */
function CalloutOverlay(): JSX.Element {
  const lineRefs = useRef<(SVGLineElement | null)[]>([])
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    return engineStore.subscribe(() => {
      engineStore.anchors.forEach((a, i) => {
        const line = lineRefs.current[i]
        const label = labelRefs.current[i]
        if (!line || !label) return
        const side = DIVISION_PARTS[i].side
        const labelX = side === "right" ? 82 : 18
        const y = Math.min(90, Math.max(8, a.y))
        line.setAttribute("x1", String(labelX))
        line.setAttribute("y1", String(y))
        line.setAttribute("x2", String(a.x))
        line.setAttribute("y2", String(a.y))
        const o = a.visible * (0.25 + 0.75 * a.emphasis)
        line.style.opacity = String(o * 0.8)
        label.style.opacity = String(o)
        label.style.top = `${y}%`
        label.dataset.focus = a.emphasis > 0.9 ? "1" : "0"
      })
    })
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {DIVISION_PARTS.map((_, i) => (
          <line
            key={i}
            ref={(el) => { lineRefs.current[i] = el }}
            stroke="var(--callout-ink, #2f2d2c)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            style={{ opacity: 0 }}
          />
        ))}
      </svg>
      {DIVISION_PARTS.map((c, i) => (
        <div
          key={c.index}
          ref={(el) => { labelRefs.current[i] = el }}
          className={`absolute -translate-y-1/2 font-mono ${
            c.side === "right" ? "right-[3%] text-right" : "left-[3%] text-left"
          }`}
          style={{ opacity: 0, top: "50%" }}
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--callout-ink,#2f2d2c)]">
            <span className="callout-index text-[#8a6a10]">{c.index}</span> — {c.part}
          </div>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[var(--callout-ink,#2f2d2c)] opacity-60">
            {c.name}
          </div>
        </div>
      ))}
    </div>
  )
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError(): { failed: boolean } {
    engineStore.webglFailed = true
    return { failed: true }
  }
  render(): ReactNode {
    return this.state.failed ? null : this.props.children
  }
}

export default function EngineStage(): JSX.Element | null {
  const budget = useMotionBudget()
  const handle = useMemo(createEngineHandle, [])

  if (budget === "off") return null

  return (
    <>
      {/* paper backdrop — BELOW page content (content sits at z-10) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] bg-paper"
        style={{ opacity: engineStore.blend }}
        aria-hidden="true"
      />
      {/* the machine + callouts — ABOVE content, below navbar/scrubber */}
      <div className="pointer-events-none fixed inset-0 z-30">
        <WebGLBoundary>
        <Canvas
          dpr={budget === "full" ? [1, 1.75] : 1}
          camera={{ position: [0, 0, 11], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault(), false)
          }}
          className="!absolute !inset-0"
        >
          <ambientLight intensity={0.16} />
          <directionalLight position={[-4.5, 3.5, -3]} color="#ffb47a" intensity={2.2} />
          <directionalLight position={[-2, -2, -4]} color="#ff9a5c" intensity={0.7} />
          <directionalLight position={[3, -1, 4]} color="#9aa7b8" intensity={0.35} />
          <Rig handle={handle} />
          </Canvas>
        </WebGLBoundary>
        <CalloutOverlay />
      </div>
    </>
  )
}
