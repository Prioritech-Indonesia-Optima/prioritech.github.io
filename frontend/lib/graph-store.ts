"use client"

/**
 * Global state for the persistent 3D neural network graph.
 *
 * The graph canvas lives once in the root layout; the home page's cinematic
 * track writes `phase` (0..1) as you scroll, the 3D rig reads it every frame
 * and writes back the screen-space `nodeAnchors` (projected node positions)
 * that drive DOM overlays. Everything is mutable + subscription-based —
 * zero React re-renders per frame.
 */

import { motionValue } from "framer-motion"

export interface NodeAnchorState {
  /** projected screen position, % of viewport */
  x: number
  y: number
  /** 0..1 — overlay opacity */
  visible: number
  /** 0..1 — focused-node emphasis */
  emphasis: number
}

export interface GraphNode {
  id: string
  label: string
  cluster: number
  x: number
  y: number
  z: number
  /** IDs of directly connected nodes */
  connections: string[]
  /** true for division hub nodes (larger render) */
  hub?: boolean
}

export interface ClusterConfig {
  name: string
  color: string
  center: [number, number, number]
}

/** Division-to-cluster mapping */
export const DIVISION_CLUSTERS = [
  { index: "001", cluster: 0, name: "AI Systems & Orchestration", spec: "agents · retrieval · pipelines", href: "/divisions#ai-systems" },
  { index: "002", cluster: 1, name: "Cybersecurity Intelligence", spec: "detection · pentesting · SOC", href: "/divisions#cybersecurity" },
  { index: "003", cluster: 2, name: "Quantitative Engineering", spec: "models · forecasting · execution", href: "/divisions#quantitative" },
  { index: "004", cluster: 3, name: "Automation & Robotics", spec: "PLC · robotics · edge vision", href: "/divisions#automation" },
  { index: "005", cluster: 4, name: "Applied Product Engineering", spec: "ERP · WMS · SCM · CRM", href: "/divisions#applied" },
]

/** Per-cluster styling */
export const CLUSTER_CONFIG: ClusterConfig[] = [
  { name: "AI Systems", color: "#daa520", center: [3.5, 2.5, 0] },
  { name: "Cybersecurity", color: "#4a90d9", center: [-3.5, 2.5, 0] },
  { name: "Quantitative", color: "#4caf50", center: [0, -2.5, 2.5] },
  { name: "Automation", color: "#e07030", center: [3.5, -2.5, 0] },
  { name: "Product Engineering", color: "#c0c0c0", center: [-3.5, -2.5, 0] },
]

// ---------------------------------------------------------------------------
// Node definitions: 5 hubs + ~50 concept nodes + ~15 cross-cluster bridges
// ---------------------------------------------------------------------------

const HUBS: GraphNode[] = [
  { id: "hub-ai", label: "AI Systems", cluster: 0, x: 3.5, y: 2.5, z: 0, connections: [], hub: true },
  { id: "hub-cyber", label: "Cybersecurity", cluster: 1, x: -3.5, y: 2.5, z: 0, connections: [], hub: true },
  { id: "hub-quant", label: "Quantitative", cluster: 2, x: 0, y: -2.5, z: 2.5, connections: [], hub: true },
  { id: "hub-auto", label: "Automation", cluster: 3, x: 3.5, y: -2.5, z: 0, connections: [], hub: true },
  { id: "hub-product", label: "Product Engineering", cluster: 4, x: -3.5, y: -2.5, z: 0, connections: [], hub: true },
]

/** Distribute concept nodes in a ring around each cluster center */
function conceptNodes(cluster: number, labels: string[], count: number): GraphNode[] {
  const cfg = CLUSTER_CONFIG[cluster]
  const radius = 1.6 + Math.random() * 0.4
  const zSpread = 1.2
  return labels.map((label, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
    const r = radius * (0.7 + Math.random() * 0.6)
    return {
      id: `n-${cluster}-${i}`,
      label,
      cluster,
      x: cfg.center[0] + Math.cos(angle) * r,
      y: cfg.center[1] + Math.sin(angle) * r,
      z: cfg.center[2] + (Math.random() - 0.5) * zSpread,
      connections: [`hub-${["ai", "cyber", "quant", "auto", "product"][cluster]}`],
    }
  })
}

const CONCEPTS: GraphNode[] = [
  ...conceptNodes(0, [
    "LLM Pipelines", "Retrieval-Augmented Generation", "Agent Orchestration",
    "Vector Search", "Embedding Models", "Inference Serving", "Model Routing",
    "Prompt Engineering", "Fine-tuning", "Knowledge Graphs",
  ], 10),
  ...conceptNodes(1, [
    "Threat Detection", "Penetration Testing", "SOC Operations",
    "Incident Response", "Network Analysis", "Malware Analysis", "Zero Trust",
    "SIEM Integration", "Attack Surface Mapping", "Compliance Automation",
  ], 10),
  ...conceptNodes(2, [
    "Market Modeling", "Time Series Forecasting", "Risk Analytics",
    "Portfolio Optimization", "Execution Algorithms", "Backtesting Frameworks",
    "Signal Processing", "Statistical Arbitrage", "Monte Carlo Simulation", "Feature Engineering",
  ], 10),
  ...conceptNodes(3, [
    "PLC Programming", "Industrial Vision", "Robotic Process Automation",
    "Edge Computing", "Sensor Fusion", "Motion Control", "Digital Twins",
    "Predictive Maintenance", "SCADA Systems", "Computer Vision",
  ], 10),
  ...conceptNodes(4, [
    "ERP Systems", "Warehouse Management", "Supply Chain",
    "CRM Platforms", "Marketplace Platforms", "Payment Systems", "Data Warehousing",
    "API Gateways", "Microservices", "Cloud Infrastructure",
  ], 10),
]

/** Cross-cluster bridge nodes */
const BRIDGES: GraphNode[] = [
  { id: "bridge-ai-cyber-0", label: "Anomaly Detection", cluster: 0, x: 0, y: 2.5, z: 0.5, connections: ["hub-ai", "hub-cyber"] },
  { id: "bridge-ai-cyber-1", label: "Behavioral Analysis", cluster: 1, x: 0, y: 2.8, z: -0.5, connections: ["hub-ai", "hub-cyber"] },
  { id: "bridge-ai-quant-0", label: "Predictive Modeling", cluster: 0, x: 1.8, y: 0, z: 1.2, connections: ["hub-ai", "hub-quant"] },
  { id: "bridge-ai-quant-1", label: "NLP for Finance", cluster: 2, x: 1.5, y: 0, z: 1.5, connections: ["hub-ai", "hub-quant"] },
  { id: "bridge-ai-auto-0", label: "Computer Vision", cluster: 0, x: 3.5, y: 0, z: 0, connections: ["hub-ai", "hub-auto"] },
  { id: "bridge-ai-auto-1", label: "Intelligent Control", cluster: 3, x: 3.5, y: 0, z: 0.5, connections: ["hub-ai", "hub-auto"] },
  { id: "bridge-ai-product-0", label: "Recommendation Engines", cluster: 0, x: 0, y: 2.5, z: -0.5, connections: ["hub-ai", "hub-product"] },
  { id: "bridge-ai-product-1", label: "Smart Workflows", cluster: 4, x: 0, y: 2.2, z: -0.2, connections: ["hub-ai", "hub-product"] },
  { id: "bridge-cyber-product-0", label: "Security Integration", cluster: 1, x: -3.5, y: 0, z: 0, connections: ["hub-cyber", "hub-product"] },
  { id: "bridge-cyber-product-1", label: "Access Management", cluster: 4, x: -3.5, y: 0.2, z: 0.3, connections: ["hub-cyber", "hub-product"] },
  { id: "bridge-quant-product-0", label: "Financial Modules", cluster: 2, x: -1.5, y: -2.5, z: 1.2, connections: ["hub-quant", "hub-product"] },
  { id: "bridge-quant-product-1", label: "Treasury Systems", cluster: 4, x: -1.8, y: -2.5, z: 1.5, connections: ["hub-quant", "hub-product"] },
  { id: "bridge-auto-product-0", label: "IoT Integration", cluster: 3, x: 0, y: -2.5, z: 0, connections: ["hub-auto", "hub-product"] },
  { id: "bridge-auto-product-1", label: "Real-time Data", cluster: 4, x: 0, y: -2.5, z: -0.5, connections: ["hub-auto", "hub-product"] },
  { id: "bridge-cyber-auto-0", label: "OT Security", cluster: 1, x: 0, y: -0.5, z: 0, connections: ["hub-cyber", "hub-auto"] },
]

/** All nodes flattened */
export const GRAPH_NODES: GraphNode[] = [...HUBS, ...CONCEPTS, ...BRIDGES]

/** Build adjacency: for each edge, register it in both nodes' connections */
for (const node of GRAPH_NODES) {
  for (const connId of node.connections) {
    const target = GRAPH_NODES.find((n) => n.id === connId)
    if (target && !target.connections.includes(node.id)) {
      target.connections.push(node.id)
    }
  }
}

/** Derive edge list (deduplicated) */
export const GRAPH_EDGES: { source: string; target: string }[] = (() => {
  const seen = new Set<string>()
  const edges: { source: string; target: string }[] = []
  for (const node of GRAPH_NODES) {
    for (const connId of node.connections) {
      const key = [node.id, connId].sort().join("-")
      if (!seen.has(key)) {
        seen.add(key)
        edges.push({ source: node.id, target: connId })
      }
    }
  }
  return edges
})()

type Listener = () => void

export const graphStore = {
  /** 0..1 scroll progress through the home cinematic track */
  phase: motionValue(0),
  /** camera zoom level (1 = default) */
  zoom: motionValue(1),
  /** camera pan offset [x, y] */
  pan: [motionValue(0), motionValue(0)],
  /** currently hovered node id, or null */
  hoveredNode: motionValue<string | null>(null),
  /** true when WebGL context failed */
  webglFailed: false,
  listeners: new Set<Listener>(),
  subscribe(l: Listener): () => void {
    this.listeners.add(l)
    return () => this.listeners.delete(l)
  },
  notify(): void {
    this.listeners.forEach((l) => l())
  },
}
