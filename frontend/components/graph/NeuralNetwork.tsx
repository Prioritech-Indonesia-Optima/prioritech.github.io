"use client"

/**
 * 3D neural network graph — instanced spheres for nodes, line segments for edges.
 *
 * Reads node/edge data from graph-store. Registers handles into `handle` for
 * the parent rig's useFrame to animate. The component only builds the scene
 * graph; ALL animation happens in the parent rig.
 */

import { useMemo } from "react"
import * as THREE from "three"
import { GRAPH_NODES, GRAPH_EDGES, CLUSTER_CONFIG, type GraphNode } from "@/lib/graph-store"

export interface GraphHandle {
  /** The root group for camera transforms */
  group: THREE.Group | null
  /** Per-node Object3D anchors for projection */
  nodeAnchors: Map<string, THREE.Object3D>
  /** Instanced mesh for concept nodes */
  conceptMesh: THREE.InstancedMesh | null
  /** Instanced mesh for hub nodes */
  hubMesh: THREE.InstancedMesh | null
  /** Instanced mesh for bridge nodes */
  bridgeMesh: THREE.InstancedMesh | null
  /** Line segments for edges */
  edgeLines: THREE.LineSegments | null
  /** Particle field for ambient depth */
  particles: THREE.Points | null
  /** Node position lookup */
  nodePositions: Map<string, THREE.Vector3>
}

export function createGraphHandle(): GraphHandle {
  return {
    group: null,
    nodeAnchors: new Map(),
    conceptMesh: null,
    hubMesh: null,
    bridgeMesh: null,
    edgeLines: null,
    particles: null,
    nodePositions: new Map(),
  }
}

/** Dummy matrix for instanced mesh initialization */
const DUMMY_MATRIX = new THREE.Matrix4()

export function NeuralNetwork({ handle }: { handle: GraphHandle }): JSX.Element {
  const clusterColors = useMemo(
    () => CLUSTER_CONFIG.map((c) => new THREE.Color(c.color)),
    [],
  )

  // Separate nodes by type
  const { hubs, concepts, bridges } = useMemo(() => {
    const hubs: GraphNode[] = []
    const concepts: GraphNode[] = []
    const bridges: GraphNode[] = []
    for (const n of GRAPH_NODES) {
      if (n.hub) hubs.push(n)
      else if (n.id.startsWith("bridge-")) bridges.push(n)
      else concepts.push(n)
    }
    return { hubs, concepts, bridges }
  }, [])

  // Node positions lookup
  handle.nodePositions = useMemo(() => {
    const map = new Map<string, THREE.Vector3>()
    for (const n of GRAPH_NODES) {
      map.set(n.id, new THREE.Vector3(n.x, n.y, n.z))
    }
    return map
  }, [])

  // Concept nodes: instanced spheres, small radius
  const conceptMesh = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.08, 8, 6)
    const mat = new THREE.MeshStandardMaterial({
      color: "#d9d9d9",
      emissive: "#d9d9d9",
      emissiveIntensity: 0.15,
      metalness: 0.3,
      roughness: 0.6,
      transparent: true,
      opacity: 0.85,
    })
    const mesh = new THREE.InstancedMesh(geo, mat, concepts.length)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const dummy = new THREE.Object3D()
    concepts.forEach((node, i) => {
      dummy.position.set(node.x, node.y, node.z)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, clusterColors[node.cluster])
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // Register anchors for each concept node
    concepts.forEach((node, i) => {
      const anchor = new THREE.Object3D()
      anchor.position.set(node.x, node.y, node.z)
      handle.nodeAnchors.set(node.id, anchor)
    })

    handle.conceptMesh = mesh
    return mesh
  }, [concepts, clusterColors, handle])

  // Hub nodes: larger instanced spheres
  const hubMesh = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.2, 16, 12)
    const mat = new THREE.MeshStandardMaterial({
      color: "#daa520",
      emissive: "#daa520",
      emissiveIntensity: 0.4,
      metalness: 0.5,
      roughness: 0.4,
      transparent: true,
      opacity: 0.95,
    })
    const mesh = new THREE.InstancedMesh(geo, mat, hubs.length)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const dummy = new THREE.Object3D()
    hubs.forEach((node, i) => {
      dummy.position.set(node.x, node.y, node.z)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, clusterColors[node.cluster])
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    hubs.forEach((node) => {
      const anchor = new THREE.Object3D()
      anchor.position.set(node.x, node.y, node.z)
      handle.nodeAnchors.set(node.id, anchor)
    })

    handle.hubMesh = mesh
    return mesh
  }, [hubs, clusterColors, handle])

  // Bridge nodes: medium instanced spheres
  const bridgeMesh = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.12, 10, 8)
    const mat = new THREE.MeshStandardMaterial({
      color: "#a0a0a0",
      emissive: "#a0a0a0",
      emissiveIntensity: 0.2,
      metalness: 0.4,
      roughness: 0.5,
      transparent: true,
      opacity: 0.7,
    })
    const mesh = new THREE.InstancedMesh(geo, mat, bridges.length)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const dummy = new THREE.Object3D()
    bridges.forEach((node, i) => {
      dummy.position.set(node.x, node.y, node.z)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, clusterColors[node.cluster])
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    bridges.forEach((node) => {
      const anchor = new THREE.Object3D()
      anchor.position.set(node.x, node.y, node.z)
      handle.nodeAnchors.set(node.id, anchor)
    })

    handle.bridgeMesh = mesh
    return mesh
  }, [bridges, clusterColors, handle])

  // Edge lines: BufferGeometry line segments
  const edgeLines = useMemo(() => {
    const positions: number[] = []
    for (const edge of GRAPH_EDGES) {
      const src = handle.nodePositions.get(edge.source)
      const tgt = handle.nodePositions.get(edge.target)
      if (!src || !tgt) continue
      positions.push(src.x, src.y, src.z, tgt.x, tgt.y, tgt.z)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))

    const mat = new THREE.LineBasicMaterial({
      color: "#4a4949",
      transparent: true,
      opacity: 0.2,
    })
    const lines = new THREE.LineSegments(geo, mat)
    handle.edgeLines = lines
    return lines
  }, [handle.nodePositions])

  // Ambient particle field
  const particles = useMemo(() => {
    const count = 300
    const positions: number[] = []
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
      )
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: "#daa520",
      size: 0.03,
      transparent: true,
      opacity: 0.15,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const pts = new THREE.Points(geo, mat)
    handle.particles = pts
    return pts
  }, [handle])

  return (
    <>
      <primitive object={conceptMesh} />
      <primitive object={hubMesh} />
      <primitive object={bridgeMesh} />
      <primitive object={edgeLines} />
      <primitive object={particles} />
    </>
  )
}
