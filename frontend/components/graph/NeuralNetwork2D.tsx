"use client"

/**
 * 2D canvas fallback for mobile (<768px) — no WebGL, no Three.js.
 * Same node data from graph-store, rendered as circles + lines on a 2D canvas.
 * Force-directed layout computed once at mount (no per-frame physics).
 * Scroll-reactive: reads graphStore.phase, pans/zooms the 2D viewport.
 */

import { useEffect, useRef } from "react"
import { useMotionValueEvent } from "framer-motion"
import { GRAPH_NODES, GRAPH_EDGES, CLUSTER_CONFIG } from "@/lib/graph-store"
import { graphStore } from "@/lib/graph-store"

/** Simple force-directed layout — runs once at mount */
function computeLayout(nodes: typeof GRAPH_NODES, edges: typeof GRAPH_EDGES): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()

  // Initialize: place nodes near their cluster centers (projected to 2D)
  for (const node of nodes) {
    positions.set(node.id, {
      x: node.x * 30 + 200, // Scale to canvas coordinates
      y: node.y * 30 + 150,
    })
  }

  // Simple relaxation: a few iterations of attraction/repulsion
  const nodeArray = nodes.map((n) => n.id)
  for (let iter = 0; iter < 30; iter++) {
    const forces = new Map<string, { fx: number; fy: number }>()
    for (const id of nodeArray) {
      forces.set(id, { fx: 0, fy: 0 })
    }

    // Repulsion between all pairs
    for (let i = 0; i < nodeArray.length; i++) {
      for (let j = i + 1; j < nodeArray.length; j++) {
        const a = positions.get(nodeArray[i])!
        const b = positions.get(nodeArray[j])!
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const repForce = 800 / (dist * dist)
        const fx = (dx / dist) * repForce
        const fy = (dy / dist) * repForce
        const fa = forces.get(nodeArray[i])!
        const fb = forces.get(nodeArray[j])!
        fa.fx -= fx; fa.fy -= fy
        fb.fx += fx; fb.fy += fy
      }
    }

    // Attraction along edges
    for (const edge of edges) {
      const a = positions.get(edge.source)
      const b = positions.get(edge.target)
      if (!a || !b) continue
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.sqrt(dx * dx + dy * dy) || 1
      const attForce = (dist - 60) * 0.02
      const fx = (dx / dist) * attForce
      const fy = (dy / dist) * attForce
      const fa = forces.get(edge.source)!
      const fb = forces.get(edge.target)!
      fa.fx += fx; fa.fy += fy
      fb.fx -= fx; fb.fy -= fy
    }

    // Apply forces with damping
    for (const id of nodeArray) {
      const pos = positions.get(id)!
      const force = forces.get(id)!
      pos.x += force.fx * 0.3
      pos.y += force.fy * 0.3
    }
  }

  return positions
}

export function NeuralNetwork2D(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layoutRef = useRef<Map<string, { x: number; y: number }>>(new Map())
  const phaseRef = useRef(0)
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)

  // Compute layout once at mount
  useEffect(() => {
    layoutRef.current = computeLayout(GRAPH_NODES, GRAPH_EDGES)
  }, [])

  // Track phase for scroll-reactive pan/zoom
  useMotionValueEvent(graphStore.phase, "change", (v) => {
    phaseRef.current = v
  })

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const clusterColors = CLUSTER_CONFIG.map((c) => c.color)
    const mobileNodes = GRAPH_NODES.filter(
      (n) => n.hub || Math.random() > 0.5, // ~40 nodes on mobile
    )
    const mobileNodeIds = new Set(mobileNodes.map((n) => n.id))
    const mobileEdges = GRAPH_EDGES.filter(
      (e) => mobileNodeIds.has(e.source) && mobileNodeIds.has(e.target),
    )

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const render = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      const layout = layoutRef.current
      const phase = phaseRef.current
      timeRef.current += 0.016

      // Clear
      ctx.clearRect(0, 0, w, h)

      // Scroll-reactive zoom and pan
      const zoom = 0.8 + Math.sin(phase * Math.PI) * 0.3
      const panX = Math.sin(phase * Math.PI * 2) * 40
      const panY = Math.cos(phase * Math.PI * 1.5) * 20
      const rotation = phase * 0.3 + timeRef.current * 0.1

      ctx.save()
      ctx.translate(w / 2 + panX, h / 2 + panY)
      ctx.scale(zoom, zoom)
      ctx.rotate(rotation)
      ctx.translate(-(w / 2 - 50), -(h / 2 - 50))

      // Draw edges
      ctx.lineWidth = 0.5
      for (const edge of mobileEdges) {
        const a = layout.get(edge.source)
        const b = layout.get(edge.target)
        if (!a || !b) continue
        ctx.strokeStyle = "rgba(74, 73, 73, 0.3)"
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // Draw nodes
      for (const node of mobileNodes) {
        const pos = layout.get(node.id)
        if (!pos) continue
        const isHub = node.hub
        const radius = isHub ? 5 : 2
        const color = clusterColors[node.cluster]

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = isHub ? 0.9 : 0.6
        ctx.fill()
        ctx.globalAlpha = 1

        // Hub label
        if (isHub) {
          ctx.fillStyle = "rgba(217, 217, 217, 0.5)"
          ctx.font = "9px monospace"
          ctx.textAlign = "center"
          ctx.fillText(node.label, pos.x, pos.y + radius + 10)
        }
      }

      ctx.restore()
      animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  )
}
