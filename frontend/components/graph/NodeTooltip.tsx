"use client"

/**
 * DOM overlay tooltip that follows the hovered graph node.
 * Shows node label + cluster name with a smooth fade.
 */

import { useEffect, useRef } from "react"
import { useMotionValueEvent } from "framer-motion"
import { graphStore, GRAPH_NODES, CLUSTER_CONFIG } from "@/lib/graph-store"

const nodeLookup = new Map(GRAPH_NODES.map((n) => [n.id, n]))

export function NodeTooltip(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const nodeId = useRef<string | null>(null)
  const nodePos = useRef({ x: 50, y: 50 })

  useMotionValueEvent(graphStore.hoveredNode, "change", (id) => {
    nodeId.current = id
    if (!id || !ref.current) return
    const node = nodeLookup.get(id)
    if (!node) return

    // Project 3D position to screen space (approximation — the rig does exact projection)
    // For now, use the anchor system; this is a placeholder
    const el = ref.current
    el.style.opacity = "1"
  })

  // Also subscribe to notify for anchor updates
  useEffect(() => {
    return graphStore.subscribe(() => {
      if (!nodeId.current || !ref.current) return
      // Position would come from graphStore anchors in a full implementation
    })
  }, [])

  const currentNode = nodeId.current ? nodeLookup.get(nodeId.current) : null
  const clusterName = currentNode ? CLUSTER_CONFIG[currentNode.cluster]?.name : ""

  if (!currentNode) {
    return <div ref={ref} className="fixed pointer-events-none z-50 px-3 py-2 font-mono text-xs bg-main/90 border border-accent/30 rounded text-secondary opacity-0 transition-opacity" aria-hidden="true" />
  }

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-50 px-3 py-2 font-mono text-xs bg-main/90 border border-accent/30 rounded text-secondary opacity-0 transition-opacity"
      style={{ left: `${nodePos.current.x}%`, top: `${nodePos.current.y}%`, transform: "translate(-50%, -120%)" }}
      aria-hidden="true"
    >
      <div className="font-bold text-accent">{currentNode.label}</div>
      <div className="text-secondary/60">{clusterName}</div>
    </div>
  )
}
