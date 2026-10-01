import * as THREE from "three"

export type Seg = [number, number, number, number, number, number]

export function pushLine(out: Seg[], x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): void {
  out.push([x0, y0, z0, x1, y1, z1])
}

export function pushCircle(out: Seg[], r: number, z: number, segs: number, cx = 0, cy = 0): void {
  for (let i = 0; i < segs; i++) {
    const a0 = (i / segs) * Math.PI * 2
    const a1 = ((i + 1) / segs) * Math.PI * 2
    pushLine(
      out,
      cx + Math.cos(a0) * r, cy + Math.sin(a0) * r, z,
      cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, z
    )
  }
}

export function pushArc(out: Seg[], r: number, z: number, a0: number, a1: number, segs: number, cx = 0, cy = 0): void {
  for (let i = 0; i < segs; i++) {
    const t0 = a0 + ((a1 - a0) * i) / segs
    const t1 = a0 + ((a1 - a0) * (i + 1)) / segs
    pushLine(
      out,
      cx + Math.cos(t0) * r, cy + Math.sin(t0) * r, z,
      cx + Math.cos(t1) * r, cy + Math.sin(t1) * r, z
    )
  }
}

export function segmentsGeometry(segs: Seg[]): THREE.BufferGeometry {
  const arr = new Float32Array(segs.length * 6)
  for (let i = 0; i < segs.length; i++) arr.set(segs[i], i * 6)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(arr, 3))
  return geo
}

export type Lattice = {
  nodes: Float32Array
  edges: Uint16Array
}

export function buildLattice(
  center: [number, number, number],
  box: [number, number, number],
  count: number,
  linkDist: number
): Lattice {
  const nodes = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    nodes[i * 3] = center[0] + (Math.random() - 0.5) * box[0]
    nodes[i * 3 + 1] = center[1] + (Math.random() - 0.5) * box[1]
    nodes[i * 3 + 2] = center[2] + (Math.random() - 0.5) * box[2]
  }
  const pairs: number[] = []
  const maxDist2 = linkDist * linkDist
  const maxPerNode = 3
  const degree = new Uint8Array(count)
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      if (degree[i] >= maxPerNode) break
      if (degree[j] >= maxPerNode) continue
      const dx = nodes[i * 3] - nodes[j * 3]
      const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1]
      const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < maxDist2) {
        pairs.push(i, j)
        degree[i]++
        degree[j]++
      }
    }
  }
  return { nodes, edges: new Uint16Array(pairs) }
}

export function glowTexture(): THREE.Texture {
  const size = 64
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.25, "rgba(255,255,255,0.55)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
