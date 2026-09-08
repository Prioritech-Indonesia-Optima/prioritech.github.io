"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

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

type CameraKeyframe = { pos: [number, number, number]; target: [number, number, number] }

type PageConfig = {
  cameraPath: CameraKeyframe[]
  terrainFreq: number
  terrainAmp: number
  animSpeed: number
}

const PAGE_CONFIGS: Record<string, PageConfig> = {
  about: {
    cameraPath: [
      { pos: [0, 6, 22], target: [0, 0, 0] },
      { pos: [-3, 4, 18], target: [0, 1, -2] },
      { pos: [2, 5, 20], target: [-1, 0, -3] },
    ],
    terrainFreq: 0.08,
    terrainAmp: 1.0,
    animSpeed: 0.005,
  },
  divisions: {
    cameraPath: [
      { pos: [0, 7, 20], target: [0, 0, 0] },
      { pos: [4, 5, 16], target: [2, 1, -2] },
      { pos: [-4, 6, 18], target: [-2, 0, -3] },
      { pos: [0, 8, 22], target: [0, 0, -4] },
    ],
    terrainFreq: 0.1,
    terrainAmp: 1.8,
    animSpeed: 0.007,
  },
  projects: {
    cameraPath: [
      { pos: [0, 5, 20], target: [0, 0, 0] },
      { pos: [-5, 4, 16], target: [0, 0, -3] },
      { pos: [5, 6, 18], target: [0, 1, -2] },
    ],
    terrainFreq: 0.12,
    terrainAmp: 1.4,
    animSpeed: 0.008,
  },
  tech: {
    cameraPath: [
      { pos: [0, 10, 24], target: [0, 0, 0] },
      { pos: [0, 6, 18], target: [0, 0, -4] },
      { pos: [0, 8, 22], target: [0, 0, -2] },
    ],
    terrainFreq: 0.06,
    terrainAmp: 0.8,
    animSpeed: 0.004,
  },
  contact: {
    cameraPath: [
      { pos: [0, 7, 22], target: [0, 0, 0] },
      { pos: [0, 5, 18], target: [0, 0, -2] },
      { pos: [0, 9, 24], target: [0, 0, -3] },
    ],
    terrainFreq: 0.09,
    terrainAmp: 1.2,
    animSpeed: 0.006,
  },
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export function SubPageScene({ pageId }: { pageId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const config = PAGE_CONFIGS[pageId] || PAGE_CONFIGS.about

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    const getIsLight = () => document.documentElement.classList.contains("light")
    const isLight = getIsLight()
    const lineColor = isLight ? 0x17140f : 0xffc94a

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(isLight ? 0xef9a0e : 0x0a0a0a, 0.016)

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(...config.cameraPath[0].pos)
    camera.lookAt(...config.cameraPath[0].target)

    const mat = new THREE.MeshBasicMaterial({ color: lineColor, wireframe: true, transparent: true, opacity: 0.1 })
    const geo = new THREE.PlaneGeometry(40, 40, 70, 70)
    geo.rotateX(-Math.PI / 2)
    const terrain = new THREE.Mesh(geo, mat)
    scene.add(terrain)

    const particleCount = 250
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = Math.random() * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({ color: isLight ? 0x17140f : 0xffd97a, size: 0.03, transparent: true, opacity: isLight ? 0.18 : 0.35, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    const clock = new THREE.Clock()
    let raf = 0
    let disposed = false
    let scrollProgress = 0
    let targetScroll = 0

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      targetScroll = total > 0 ? window.scrollY / total : 0
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", onResize)

    const animate = () => {
      if (disposed) return
      raf = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      scrollProgress = lerp(scrollProgress, targetScroll, 0.04)

      const path = config.cameraPath
      const segmentCount = path.length - 1
      const segIdx = Math.min(Math.floor(scrollProgress * segmentCount), segmentCount - 1)
      const segT = smoothstep(0, 1, scrollProgress * segmentCount - segIdx)
      const from = path[segIdx]
      const to = path[segIdx + 1]

      camera.position.set(
        lerp(from.pos[0], to.pos[0], segT),
        lerp(from.pos[1], to.pos[1], segT),
        lerp(from.pos[2], to.pos[2], segT)
      )
      camera.lookAt(
        lerp(from.target[0], to.target[0], segT),
        lerp(from.target[1], to.target[1], segT),
        lerp(from.target[2], to.target[2], segT)
      )

      const pos = geo.attributes.position as THREE.BufferAttribute
      const freq = config.terrainFreq
      const amp = config.terrainAmp
      const speed = config.animSpeed
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const z = pos.getZ(i)
        pos.setY(i, fbm(x * freq + time * speed, z * freq, 3) * amp)
      }
      pos.needsUpdate = true

      particles.rotation.y = time * 0.005

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      geo.dispose()
      mat.dispose()
      pGeo.dispose()
      pMat.dispose()
      renderer.dispose()
    }
  }, [pageId])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  )
}
