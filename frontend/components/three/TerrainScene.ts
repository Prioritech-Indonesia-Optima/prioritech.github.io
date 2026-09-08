import * as THREE from "three"

type Chapter = {
  start: number
  end: number
  cameraPos: THREE.Vector3
  cameraTarget: THREE.Vector3
  terrainMode: number
}

const CHAPTERS: Chapter[] = [
  { start: 0.0, end: 0.2, cameraPos: new THREE.Vector3(0, 8, 22), cameraTarget: new THREE.Vector3(0, 0, 0), terrainMode: 0 },
  { start: 0.2, end: 0.4, cameraPos: new THREE.Vector3(-4, 5, 16), cameraTarget: new THREE.Vector3(0, 1, 0), terrainMode: 1 },
  { start: 0.4, end: 0.6, cameraPos: new THREE.Vector3(5, 3, 12), cameraTarget: new THREE.Vector3(2, 0, -2), terrainMode: 2 },
  { start: 0.6, end: 0.8, cameraPos: new THREE.Vector3(-3, 6, 14), cameraTarget: new THREE.Vector3(-1, 0, -4), terrainMode: 3 },
  { start: 0.8, end: 1.0, cameraPos: new THREE.Vector3(0, 12, 26), cameraTarget: new THREE.Vector3(0, 0, 0), terrainMode: 4 },
]

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function noise2D(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (n - Math.floor(n)) * 2 - 1
}

function fbm(x: number, y: number, octaves: number): number {
  let value = 0
  let amplitude = 1
  let frequency = 1
  let max = 0
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise2D(x * frequency, y * frequency)
    max += amplitude
    amplitude *= 0.5
    frequency *= 2
  }
  return value / max
}

function computeHeight(x: number, z: number, mode: number, time: number): number {
  if (mode === 0) {
    return fbm(x * 0.08 + time * 0.008, z * 0.08, 3) * 1.5
  }
  if (mode === 1) {
    const peaks = [
      { px: -6, pz: -4, h: 4 },
      { px: 0, pz: -6, h: 5 },
      { px: 6, pz: -3, h: 4.5 },
      { px: -4, pz: 3, h: 3.5 },
      { px: 4, pz: 4, h: 4 },
    ]
    let y = 0
    for (const pk of peaks) {
      const d = Math.sqrt((x - pk.px) ** 2 + (z - pk.pz) ** 2)
      y += pk.h * Math.exp(-d * d * 0.04)
    }
    y += fbm(x * 0.08, z * 0.08, 3) * 0.3
    return y
  }
  if (mode === 2) {
    return Math.abs(Math.sin(x * 0.4)) * Math.abs(Math.sin(z * 0.4)) * 2.5 + fbm(x * 0.12 + time * 0.006, z * 0.12, 3) * 0.4
  }
  if (mode === 3) {
    return Math.sin(x * 0.2 + time * 0.03) * Math.cos(z * 0.15 + time * 0.02) * 2.5 + fbm(x * 0.08 + time * 0.012, z * 0.08, 3) * 0.8
  }
  const d = Math.sqrt(x * x + z * z)
  return fbm(x * 0.08, z * 0.08, 3) * 1.0 + Math.sin(d * 0.2 - time * 0.1) * 0.5 * Math.exp(-d * 0.04)
}

export class TerrainScene {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private terrain: THREE.Mesh
  private terrainMaterial: THREE.MeshBasicMaterial
  private particles: THREE.Points
  private particleMaterial: THREE.PointsMaterial
  private clock: THREE.Clock
  private scrollProgress: number = 0
  private targetScroll: number = 0
  private raf: number = 0
  private disposed: boolean = false
  private isLight: boolean = false
  private onProgress?: (p: number) => void

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 0)

    const isLight = document.documentElement.classList.contains("light")
    this.isLight = isLight
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(isLight ? 0xef9a0e : 0x0a0a0a, isLight ? 0.016 : 0.014)

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
    this.camera.position.copy(CHAPTERS[0].cameraPos)
    this.camera.lookAt(CHAPTERS[0].cameraTarget)

    this.terrainMaterial = new THREE.MeshBasicMaterial({
      color: isLight ? 0x141210 : 0xffc94a,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.12 : 0.55,
    })

    const geo = new THREE.PlaneGeometry(64, 64, 110, 110)
    geo.rotateX(-Math.PI / 2)
    this.terrain = new THREE.Mesh(geo, this.terrainMaterial)
    this.scene.add(this.terrain)

    const particleCount = 600
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = Math.random() * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    this.particleMaterial = new THREE.PointsMaterial({
      color: isLight ? 0x141210 : 0xffd97a,
      size: 0.05,
      transparent: true,
      opacity: isLight ? 0.18 : 0.5,
      sizeAttenuation: true,
    })
    this.particles = new THREE.Points(particleGeo, this.particleMaterial)
    this.scene.add(this.particles)

    this.clock = new THREE.Clock()
    window.addEventListener("resize", this.onResize)
    this.animate()
  }

  setScroll(p: number): void {
    this.targetScroll = Math.max(0, Math.min(1, p))
  }

  setOnProgress(cb: (p: number) => void): void {
    this.onProgress = cb
  }

  private onResize = (): void => {
    const w = window.innerWidth
    const h = window.innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  private getChapterProgress(p: number): { chapter: Chapter; local: number; next: Chapter } {
    for (let i = 0; i < CHAPTERS.length; i++) {
      const ch = CHAPTERS[i]
      if (p >= ch.start && p < ch.end) {
        const local = (p - ch.start) / (ch.end - ch.start)
        const next = CHAPTERS[Math.min(i + 1, CHAPTERS.length - 1)]
        return { chapter: ch, local, next }
      }
    }
    const last = CHAPTERS[CHAPTERS.length - 1]
    return { chapter: last, local: 1, next: last }
  }

  private updateCamera(p: number): void {
    const { chapter, local, next } = this.getChapterProgress(p)
    const t = smoothstep(0, 1, local)
    const pos = new THREE.Vector3().lerpVectors(chapter.cameraPos, next.cameraPos, t)
    const target = new THREE.Vector3().lerpVectors(chapter.cameraTarget, next.cameraTarget, t)
    this.camera.position.copy(pos)
    this.camera.lookAt(target)
  }

  private updateTerrain(time: number, p: number): void {
    const { chapter, local, next } = this.getChapterProgress(p)
    const geo = this.terrain.geometry as THREE.PlaneGeometry
    const pos = geo.attributes.position as THREE.BufferAttribute
    const count = pos.count
    const mode = chapter.terrainMode
    const nextMode = next.terrainMode
    const blend = smoothstep(0.6, 1.0, local)

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      let y = computeHeight(x, z, mode, time)
      if (blend > 0 && nextMode !== mode) {
        const yNext = computeHeight(x, z, nextMode, time)
        y = lerp(y, yNext, blend)
      }
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()

    const baseOpacity = this.isLight
      ? 0.08 + Math.sin(p * Math.PI) * 0.05
      : 0.5 + Math.sin(p * Math.PI) * 0.2
    this.terrainMaterial.opacity = baseOpacity
  }

  private updateParticles(time: number): void {
    const pos = this.particles.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i)
      y -= 0.002
      if (y < 0) y = 12
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    this.particles.rotation.y = time * 0.004
  }

  private animate = (): void => {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.animate)

    const time = this.clock.getElapsedTime()
    this.scrollProgress = lerp(this.scrollProgress, this.targetScroll, 0.06)

    this.updateCamera(this.scrollProgress)
    this.updateTerrain(time, this.scrollProgress)
    this.updateParticles(time)

    if (this.onProgress) {
      this.onProgress(this.scrollProgress)
    }

    this.renderer.render(this.scene, this.camera)
  }

  dispose(): void {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    window.removeEventListener("resize", this.onResize)
    this.terrain.geometry.dispose()
    this.terrainMaterial.dispose()
    this.particles.geometry.dispose()
    this.particleMaterial.dispose()
    this.renderer.dispose()
  }
}
