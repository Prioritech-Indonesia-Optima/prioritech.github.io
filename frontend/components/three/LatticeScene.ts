import * as THREE from "three"
import type { SceneConfig } from "./sceneConfigs"

type ThemeSpec = {
  fog: number
  fogDensity: number
  line: number
  lineOpacity: number
  particle: number
  particleOpacity: number
}

const THEMES: { dark: ThemeSpec; light: ThemeSpec } = {
  dark: { fog: 0x0a0a0a, fogDensity: 0.014, line: 0xffc94a, lineOpacity: 0.5, particle: 0xffd97a, particleOpacity: 0.5 },
  light: { fog: 0xf5f1e8, fogDensity: 0.016, line: 0x121212, lineOpacity: 0.16, particle: 0x121212, particleOpacity: 0.2 },
}

const IDLE_DELAY = 4
const IDLE_FADE = 1.5
const RIPPLE_MAX = 8
const RIPPLE_LIFE = 4

type Ripple = { x: number; z: number; t0: number }

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

export class LatticeScene {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private terrain: THREE.Mesh
  private terrainMaterial: THREE.MeshBasicMaterial
  private particles: THREE.Points
  private particleMaterial: THREE.PointsMaterial
  private config: SceneConfig
  private half: number
  private isDark: boolean
  private theme: ThemeSpec

  private clock = new THREE.Clock()
  private time = 0
  private scrollProgress = 0
  private targetScroll = 0
  private raf = 0
  private disposed = false
  private running = false
  private reduceMotion: boolean
  private smallScreen: boolean
  private particleAngle = 0
  private onProgress?: (p: number) => void

  private pointer = { x: 0, z: 0, strength: 0, target: 0 }
  private ripples: Ripple[] = []
  private lastInput = 0
  private idle = 0

  private scratchPos = new THREE.Vector3()
  private scratchTarget = new THREE.Vector3()
  private scratchDir = new THREE.Vector3()
  private observer: MutationObserver

  constructor(canvas: HTMLCanvasElement, config: SceneConfig) {
    this.config = config
    this.half = config.gridSize / 2
    this.smallScreen = window.innerWidth < 768
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 0)

    this.isDark = !document.documentElement.classList.contains("light")
    this.theme = this.isDark ? THEMES.dark : THEMES.light

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(this.theme.fog, this.theme.fogDensity)

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
    this.camera.position.set(...config.chapters[0].cameraPos)
    this.camera.lookAt(...config.chapters[0].cameraTarget)

    this.terrainMaterial = new THREE.MeshBasicMaterial({
      color: this.theme.line,
      wireframe: true,
      transparent: true,
      opacity: this.theme.lineOpacity,
    })
    const res = this.smallScreen ? Math.round(config.gridRes * 0.6) : config.gridRes
    const geo = new THREE.PlaneGeometry(config.gridSize, config.gridSize, res, res)
    geo.rotateX(-Math.PI / 2)
    this.terrain = new THREE.Mesh(geo, this.terrainMaterial)
    this.scene.add(this.terrain)

    const particleCount = this.smallScreen ? Math.round(config.particles * 0.5) : config.particles
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * config.gridSize * 0.65
      positions[i * 3 + 1] = Math.random() * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * config.gridSize * 0.65
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    this.particleMaterial = new THREE.PointsMaterial({
      color: this.theme.particle,
      size: 0.05,
      transparent: true,
      opacity: this.theme.particleOpacity,
      sizeAttenuation: true,
    })
    this.particles = new THREE.Points(particleGeo, this.particleMaterial)
    this.scene.add(this.particles)

    this.observer = new MutationObserver(() => this.syncTheme())
    this.observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    window.addEventListener("resize", this.onResize)
    window.addEventListener("pointermove", this.onPointerMove, { passive: true })
    window.addEventListener("pointerdown", this.onPointerDown, { passive: true })
    window.addEventListener("pointerup", this.onPointerUp, { passive: true })
    document.addEventListener("visibilitychange", this.onVisibility)

    if (this.reduceMotion) {
      this.renderStatic()
    } else {
      this.start()
    }
  }

  setScroll(p: number): void {
    this.targetScroll = Math.max(0, Math.min(1, p))
    this.lastInput = this.time
    if (this.reduceMotion) this.renderStatic()
  }

  setOnProgress(cb: (p: number) => void): void {
    this.onProgress = cb
  }

  private syncTheme(): void {
    const dark = !document.documentElement.classList.contains("light")
    if (dark === this.isDark) return
    this.isDark = dark
    this.theme = dark ? THEMES.dark : THEMES.light
    ;(this.scene.fog as THREE.FogExp2).color.setHex(this.theme.fog)
    ;(this.scene.fog as THREE.FogExp2).density = this.theme.fogDensity
    this.terrainMaterial.color.setHex(this.theme.line)
    this.particleMaterial.color.setHex(this.theme.particle)
    if (this.reduceMotion || !this.running) this.renderStatic()
  }

  private start(): void {
    if (this.running || this.disposed || this.reduceMotion) return
    this.running = true
    this.clock.start()
    this.raf = requestAnimationFrame(this.animate)
  }

  private stop(): void {
    if (!this.running) return
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  private onVisibility = (): void => {
    if (document.hidden) this.stop()
    else this.start()
  }

  private onResize = (): void => {
    const w = window.innerWidth
    const h = window.innerHeight
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    if (this.reduceMotion) this.renderStatic()
  }

  private toWorld(clientX: number, clientY: number): { x: number; z: number } | null {
    const ndcX = (clientX / window.innerWidth) * 2 - 1
    const ndcY = -(clientY / window.innerHeight) * 2 + 1
    this.scratchDir.set(ndcX, ndcY, 0.5).unproject(this.camera).sub(this.camera.position)
    if (Math.abs(this.scratchDir.y) < 1e-4) return null
    const t = -this.camera.position.y / this.scratchDir.y
    if (t <= 0) return null
    const x = this.camera.position.x + this.scratchDir.x * t
    const z = this.camera.position.z + this.scratchDir.z * t
    const clamped = (v: number) => Math.max(-this.half, Math.min(this.half, v))
    return { x: clamped(x), z: clamped(z) }
  }

  private onPointerMove = (e: PointerEvent): void => {
    const hit = this.toWorld(e.clientX, e.clientY)
    if (!hit) return
    this.pointer.x = hit.x
    this.pointer.z = hit.z
    this.pointer.target = 1
    this.lastInput = this.time
  }

  private onPointerDown = (e: PointerEvent): void => {
    const hit = this.toWorld(e.clientX, e.clientY)
    if (!hit) return
    this.ripples.push({ x: hit.x, z: hit.z, t0: this.time })
    if (this.ripples.length > RIPPLE_MAX) this.ripples.shift()
    this.lastInput = this.time
    if (this.reduceMotion) this.renderStatic()
  }

  private onPointerUp = (e: PointerEvent): void => {
    if (e.pointerType === "touch") this.pointer.target = 0
  }

  private getChapter(p: number): { chapter: SceneConfig["chapters"][number]; local: number; next: SceneConfig["chapters"][number] } {
    const ch = this.config.chapters
    for (let i = 0; i < ch.length; i++) {
      if (p >= ch[i].start && p < ch[i].end) {
        return {
          chapter: ch[i],
          local: (p - ch[i].start) / (ch[i].end - ch[i].start),
          next: ch[Math.min(i + 1, ch.length - 1)],
        }
      }
    }
    const last = ch[ch.length - 1]
    return { chapter: last, local: 1, next: last }
  }

  private updateCamera(): void {
    const { chapter, local, next } = this.getChapter(this.scrollProgress)
    const t = smoothstep(0, 1, local)
    this.scratchPos.set(
      lerp(chapter.cameraPos[0], next.cameraPos[0], t),
      lerp(chapter.cameraPos[1], next.cameraPos[1], t),
      lerp(chapter.cameraPos[2], next.cameraPos[2], t)
    )
    this.scratchTarget.set(
      lerp(chapter.cameraTarget[0], next.cameraTarget[0], t),
      lerp(chapter.cameraTarget[1], next.cameraTarget[1], t),
      lerp(chapter.cameraTarget[2], next.cameraTarget[2], t)
    )

    const time = this.time
    const s = this.pointer.strength
    this.scratchPos.x += (this.pointer.x / this.half) * 0.7 * s
    this.scratchPos.y += 0.25 * s
    this.scratchPos.x += Math.sin(time * 0.13) * 1.6 * this.idle
    this.scratchPos.y += Math.sin(time * 0.09) * 0.7 * this.idle
    this.scratchPos.z += Math.cos(time * 0.11) * 1.1 * this.idle
    this.scratchTarget.x += Math.cos(time * 0.1) * 1.2 * this.idle

    this.camera.position.copy(this.scratchPos)
    this.camera.lookAt(this.scratchTarget)
  }

  private updateTerrain(): void {
    const { chapter, local, next } = this.getChapter(this.scrollProgress)
    const geo = this.terrain.geometry as THREE.PlaneGeometry
    const pos = geo.attributes.position as THREE.BufferAttribute
    const count = pos.count
    const time = this.time
    const mode = chapter.terrainMode
    const nextMode = next.terrainMode
    const blend = smoothstep(0.6, 1.0, local)

    const bulgeAmp = (this.smallScreen ? 1.2 : 2.2) * this.pointer.strength
    const px = this.pointer.x
    const pz = this.pointer.z
    const idleAmp = 0.5 * this.idle

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      let y = computeHeight(x, z, mode, time)
      if (blend > 0 && nextMode !== mode) {
        y = lerp(y, computeHeight(x, z, nextMode, time), blend)
      }

      if (bulgeAmp > 0.01) {
        const dx = x - px
        const dz = z - pz
        const d2 = dx * dx + dz * dz
        if (d2 < 900) y += bulgeAmp * Math.exp(-d2 / 16)
      }

      if (idleAmp > 0.01) {
        y += Math.sin(x * 0.18 + time * 0.5) * Math.cos(z * 0.14 - time * 0.4) * idleAmp
      }

      for (let r = 0; r < this.ripples.length; r++) {
        const rp = this.ripples[r]
        const age = time - rp.t0
        const decay = Math.exp(-age * 1.2)
        if (decay < 0.02) continue
        const dx = x - rp.x
        const dz = z - rp.z
        const d = Math.sqrt(dx * dx + dz * dz)
        y += Math.sin(d * 1.1 - age * 7) * decay * Math.exp(-d * 0.08) * 1.8
      }

      pos.setY(i, y)
    }
    pos.needsUpdate = true

    const wave = Math.sin(this.scrollProgress * Math.PI)
    this.terrainMaterial.opacity = this.theme.lineOpacity + (this.isDark ? 0.2 : 0.05) * wave
  }

  private pruneRipples(): void {
    if (!this.ripples.length) return
    const time = this.time
    this.ripples = this.ripples.filter((r) => time - r.t0 < RIPPLE_LIFE)
  }

  private updateParticles(dt: number): void {
    const pos = this.particles.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i)
      y -= 0.002 + this.idle * 0.004
      if (y < 0) y = 12
      pos.setY(i, y)
    }
    pos.needsUpdate = true
    this.particleAngle += dt * (0.004 + this.idle * 0.03)
    this.particles.rotation.y = this.particleAngle
  }

  private renderStatic(): void {
    this.scrollProgress = this.targetScroll
    this.pointer.strength = 0
    this.idle = 0
    this.updateCamera()
    this.updateTerrain()
    this.renderer.render(this.scene, this.camera)
    if (this.onProgress) this.onProgress(this.scrollProgress)
  }

  private animate = (): void => {
    if (this.disposed) return
    if (!this.running) return
    this.raf = requestAnimationFrame(this.animate)

    const dt = Math.min(this.clock.getDelta(), 0.05)
    this.time += dt

    this.scrollProgress = lerp(this.scrollProgress, this.targetScroll, 0.06)
    this.pointer.strength = lerp(this.pointer.strength, this.pointer.target, 0.08)
    const idleTarget = this.time - this.lastInput > IDLE_DELAY ? 1 : 0
    this.idle = lerp(this.idle, idleTarget, dt / IDLE_FADE)

    this.pruneRipples()
    this.updateCamera()
    this.updateTerrain()
    this.updateParticles(dt)

    if (this.onProgress) this.onProgress(this.scrollProgress)
    this.renderer.render(this.scene, this.camera)
  }

  dispose(): void {
    this.disposed = true
    this.stop()
    window.removeEventListener("resize", this.onResize)
    window.removeEventListener("pointermove", this.onPointerMove)
    window.removeEventListener("pointerdown", this.onPointerDown)
    window.removeEventListener("pointerup", this.onPointerUp)
    document.removeEventListener("visibilitychange", this.onVisibility)
    this.observer.disconnect()
    this.terrain.geometry.dispose()
    this.terrainMaterial.dispose()
    this.particles.geometry.dispose()
    this.particleMaterial.dispose()
    this.renderer.dispose()
  }
}
