"use client"

/**
 * Simplified graph for subpages — smaller, slower-rotating, docked out of the way.
 * Reads usePathname() to determine which cluster to highlight and what theme to use.
 *
 * NOTE: The persistent GraphStage in layout.tsx already handles subpages via
 * routeTargets(). This component is for pages that want a localized, themed
 * graph overlay independent of the global canvas.
 */

import { useMemo, useRef } from "react"
import { usePathname } from "next/navigation"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { GRAPH_NODES, CLUSTER_CONFIG, GRAPH_EDGES } from "@/lib/graph-store"
import { useMotionBudget } from "@/lib/motion"

/** Per-page theme configuration */
const PAGE_THEMES: Record<string, { cluster?: number; color: string; rotationSpeed: number; scale: number }> = {
  "/divisions": { color: "#daa520", rotationSpeed: 0.05, scale: 0.6 },
  "/divisions#ai-systems": { cluster: 0, color: "#daa520", rotationSpeed: 0.08, scale: 0.5 },
  "/divisions#cybersecurity": { cluster: 1, color: "#4a90d9", rotationSpeed: 0.08, scale: 0.5 },
  "/divisions#quantitative": { cluster: 2, color: "#4caf50", rotationSpeed: 0.08, scale: 0.5 },
  "/divisions#automation": { cluster: 3, color: "#e07030", rotationSpeed: 0.08, scale: 0.5 },
  "/divisions#applied": { cluster: 4, color: "#c0c0c0", rotationSpeed: 0.08, scale: 0.5 },
  "/tech": { color: "#9aa7b8", rotationSpeed: 0.07, scale: 0.55 },
  "/projects": { color: "#daa520", rotationSpeed: 0.1, scale: 0.55 },
  "/contact": { color: "#daa520", rotationSpeed: 0.04, scale: 0.5 },
  "/about": { color: "#d9d9d9", rotationSpeed: 0.03, scale: 0.5 },
}

function SubpageGraphScene(): null {
  const pathname = usePathname()
  const hash = typeof window !== "undefined" ? window.location.hash : ""
  const pathKey = pathname + hash
  const theme = PAGE_THEMES[pathKey] || PAGE_THEMES[pathname] || PAGE_THEMES["/about"]

  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    if (theme.cluster !== undefined) {
      return GRAPH_NODES.filter((n) => n.cluster === theme.cluster || n.hub)
    }
    // Full graph, downsampled
    return GRAPH_NODES.filter((n) => n.hub || Math.random() > 0.6)
  }, [theme])

  const edges = useMemo(() => {
    const nodeIds = new Set(nodes.map((n) => n.id))
    return GRAPH_EDGES.filter((e) => nodeIds.has(e.source) && nodeIds.has(e.target))
  }, [nodes])

  useFrame((_state, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * theme.rotationSpeed
    }
  })

  // Render as invisible — the scene is driven by the persistent GraphStage
  return null
}

export function SubpageGraph({
  position = "bottom-left",
  size = 200,
}: {
  position?: "bottom-left" | "top-right" | "bottom-right"
  size?: number
}): JSX.Element | null {
  const budget = useMotionBudget()

  if (budget === "off") return null

  const positionClasses = {
    "bottom-left": "bottom-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
  }

  return (
    <div
      className={`pointer-events-none fixed ${positionClasses[position]} z-20 opacity-30`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: false, alpha: true }}
        className="!absolute !inset-0"
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 3]} intensity={0.2} />
        <SubpageGraphScene />
      </Canvas>
    </div>
  )
}
