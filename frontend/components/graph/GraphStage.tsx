"use client"

/**
 * The persistent graph stage — ONE fixed WebGL canvas for the whole site,
 * mounted once in the root layout.
 *
 * Home: a scroll cinematic driven by graphStore.phase —
 *   wide graph hero → zoom transition → company profile → five cluster focus
 *   windows → pull-back → CTA hold with gentle rotation.
 *
 * Subpages get purposeful presets: simplified themed variants docked out of
 * the way of content.
 */

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { motion } from "framer-motion"
import { NeuralNetwork, createGraphHandle, type GraphHandle } from "./NeuralNetwork"
import { NeuralNetwork2D } from "./NeuralNetwork2D"
import { graphStore, GRAPH_NODES, CLUSTER_CONFIG, GRAPH_EDGES, DIVISION_CLUSTERS, type NodeAnchorState } from "@/lib/graph-store"
import { useMotionBudget } from "@/lib/motion"

/** SSR-safe media query hook for desktop detection */
function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isDesktop
}

const ramp = (v: number, a: number, b: number) => THREE.MathUtils.clamp((v - a) / (b - a), 0, 1)

interface CameraTargets {
  x: number
  y: number
  z: number
  lookX: number
  lookY: number
  lookZ: number
  rotationSpeed: number
}

/** Per-route presets for subpages */
function routeTargets(path: string, _t: number): CameraTargets | null {
  if (path.startsWith("/divisions")) {
    return { x: 0, y: 0, z: 14, lookX: 0, lookY: 0, lookZ: 0, rotationSpeed: 0.05 }
  }
  if (path.startsWith("/tech")) {
    return { x: 0, y: 0, z: 10, lookX: 0, lookY: 0, lookZ: 0, rotationSpeed: 0.08 }
  }
  if (path.startsWith("/projects")) {
    return { x: 0, y: 0, z: 12, lookX: 0, lookY: 0, lookZ: 0, rotationSpeed: 0.12 }
  }
  if (path.startsWith("/contact")) {
    return { x: 0, y: 0, z: 11, lookX: 0, lookY: 0, lookZ: 0, rotationSpeed: 0.06 }
  }
  if (path.startsWith("/about")) {
    return { x: 0, y: 0, z: 13, lookX: 0, lookY: 0, lookZ: 0, rotationSpeed: 0.04 }
  }
  return null // home → cinematic
}

/** Home cinematic camera choreography from track progress p */
function cinematicTargets(p: number): CameraTargets {
  // Section 0-10%: Hero — wide graph view
  // Section 10-20%: Zoom transition
  // Section 20-30%: Company Profile — neutral overview
  // Section 30-80%: Five division clusters
  // Section 80-90%: Pull-back
  // Section 90-100%: CTA hold

  const zoomIn = ramp(p, 0.1, 0.2)
  const profile = ramp(p, 0.2, 0.3) * (1 - ramp(p, 0.28, 0.35))
  const pullBack = ramp(p, 0.8, 0.9)

  // Determine which cluster we're focusing on (30-80%)
  const clusterPhase = ramp(p, 0.3, 0.82)
  const clusterIndex = clusterPhase >= 0 ? Math.min(4, Math.floor(clusterPhase * 5)) : -1
  const isInCluster = p > 0.3 && p < 0.82

  let targetX = 0
  let targetY = 0
  let targetZ = 8 - zoomIn * 2 + (isInCluster ? -2 : 0) + pullBack * 3
  let lookX = 0
  let lookY = 0
  let lookZ = 0

  if (isInCluster && clusterIndex >= 0) {
    const cfg = CLUSTER_CONFIG[clusterIndex]
    targetX = cfg.center[0] * 0.6
    targetY = cfg.center[1] * 0.6
    targetZ = 6
    lookX = cfg.center[0]
    lookY = cfg.center[1]
    lookZ = cfg.center[2]
  } else if (profile > 0) {
    // Neutral overview for company profile
    targetX = 0
    targetY = 0
    targetZ = 9
  }

  return {
    x: targetX,
    y: targetY,
    z: Math.max(5, targetZ),
    lookX,
    lookY,
    lookZ,
    rotationSpeed: 0.02 + (1 - zoomIn) * 0.03 + (p > 0.9 ? 0.05 : 0),
  }
}

/** Build node anchor state array from handle anchors */
function updateAnchors(
  handle: GraphHandle,
  anchors: NodeAnchorState[],
  camera: THREE.Camera,
  v3: THREE.Vector3,
  vRight: THREE.Vector3,
  focusIndex: number,
  calloutsActive: boolean,
): void {
  anchors.forEach((a, i) => {
    if (i >= DIVISION_CLUSTERS.length) return
    const cluster = DIVISION_CLUSTERS[i].cluster
    const hubId = `hub-${["ai", "cyber", "quant", "auto", "product"][cluster]}`
    const anchor = handle.nodeAnchors.get(hubId)
    if (!anchor) return

    vRight.set(1, 0, 0).applyQuaternion(camera.quaternion)
    anchor.getWorldPosition(v3)
    v3.addScaledVector(vRight, 0.25)
    v3.project(camera)
    a.x = THREE.MathUtils.clamp((v3.x * 0.5 + 0.5) * 100, 3, 97)
    a.y = THREE.MathUtils.clamp((-v3.y * 0.5 + 0.5) * 100, 4, 96)
    a.visible = calloutsActive ? 1 : 0
    a.emphasis = focusIndex === i ? 1 : focusIndex === -1 ? 0.75 : 0.12
  })
}

function Rig({ handle }: { handle: GraphHandle }): JSX.Element {
  const { viewport, camera, size } = useThree()
  const pathname = usePathname()
  const pathRef = useRef(pathname)
  pathRef.current = pathname

  const group = useRef<THREE.Group>(null)
  const cur = useRef({
    x: 0, y: 0, z: 8,
    lookX: 0, lookY: 0, lookZ: 0,
  })
  const yaw = useRef(0)
  const v3 = useMemo(() => new THREE.Vector3(), [])
  const vRight = useMemo(() => new THREE.Vector3(), [])
  const anchors = useRef<NodeAnchorState[]>(
    Array.from({ length: 5 }, () => ({ x: 50, y: 50, visible: 0, emphasis: 0 })),
  )

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = graphStore.phase.get()

    const target =
      routeTargets(pathRef.current, t) ??
      cinematicTargets(p)

    const c = cur.current
    const d = (k: keyof typeof c, to: number, lambda = 3.2) => {
      c[k] = THREE.MathUtils.damp(c[k], to, lambda, dt)
    }
    d("x", target.x, 3)
    d("y", target.y, 3)
    d("z", target.z, 3)
    d("lookX", target.lookX, 2.8)
    d("lookY", target.lookY, 2.8)
    d("lookZ", target.lookZ, 2.8)

    // Camera placement
    camera.position.set(c.x, c.y, c.z)
    camera.lookAt(c.lookX, c.lookY, c.lookZ)

    // Gentle rotation
    const isHome = !routeTargets(pathRef.current, 0)
    if (isHome) {
      const clusterPhase = ramp(p, 0.3, 0.82)
      const isInCluster = p > 0.3 && p < 0.82
      if (!isInCluster) {
        yaw.current += dt * target.rotationSpeed
      } else {
        // Lock rotation during cluster focus for stable callout projection
        yaw.current = THREE.MathUtils.damp(yaw.current, 0, 3, dt)
      }
    } else {
      yaw.current += dt * target.rotationSpeed
    }
    g.rotation.y = yaw.current

    // Update node anchor projections for DOM overlays
    const focusIndex = p > 0.3 && p < 0.82
      ? Math.min(4, Math.floor(ramp(p, 0.3, 0.82) * 5))
      : -1
    const calloutsActive = p > 0.3 && p < 0.82
    updateAnchors(handle, anchors.current, camera, v3, vRight, focusIndex, calloutsActive)

    // Pulse hub nodes on hover
    const hoveredId = graphStore.hoveredNode.get()
    if (hoveredId && handle.hubMesh) {
      // Could add per-instance pulse here
    }

    graphStore.notify()
  })

  return <group ref={group} />
}

/** Callout overlay — DOM labels driven imperatively from projected anchors */
function CalloutOverlay(): JSX.Element {
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    return graphStore.subscribe(() => {
      // We need to expose anchors from graphStore for this to work
      // For now, keep it simple — labels are handled in Cinematic
    })
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {DIVISION_CLUSTERS.map((c, i) => (
        <div
          key={c.index}
          ref={(el) => { labelRefs.current[i] = el }}
          className={`absolute -translate-y-1/2 font-mono ${
            i < 3 ? "right-[3%] text-right" : "left-[3%] text-left"
          }`}
          style={{ opacity: 0, top: "50%" }}
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--callout-ink,#d9d9d9)]">
            <span className="callout-index text-[#8a6a10]">{c.index}</span> — {c.name}
          </div>
        </div>
      ))}
    </div>
  )
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError(): { failed: boolean } {
    graphStore.webglFailed = true
    return { failed: true }
  }
  render(): ReactNode {
    return this.state.failed ? null : this.props.children
  }
}

export default function GraphStage(): JSX.Element | null {
  const budget = useMotionBudget()
  const isDesktop = useIsDesktop()
  const handle = useMemo(createGraphHandle, [])

  if (budget === "off") return null

  // Mobile: use 2D canvas fallback (no WebGL)
  if (!isDesktop) {
    return (
      <div className="pointer-events-none fixed inset-0 z-30">
        <NeuralNetwork2D />
      </div>
    )
  }

  // Desktop: full 3D WebGL canvas
  return (
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
          <ambientLight intensity={0.25} />
          <directionalLight position={[-4.5, 3.5, -3]} color="#ffffff" intensity={1.5} />
          <directionalLight position={[3, -1, 4]} color="#9aa7b8" intensity={0.6} />
          <pointLight position={[0, 0, 5]} color="#daa520" intensity={0.3} distance={12} />
          <Rig handle={handle} />
          <NeuralNetwork handle={handle} />
        </Canvas>
      </WebGLBoundary>
      <CalloutOverlay />
    </div>
  )
}
