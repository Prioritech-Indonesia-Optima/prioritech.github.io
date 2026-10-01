"use client"

import { useEffect, useRef } from "react"
import { AssemblyScene } from "./AssemblyScene"
import { SCENE_CONFIGS } from "./sceneConfigs"

export function PageScene({ pageId, onProgress }: { pageId: string; onProgress?: (p: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const config = SCENE_CONFIGS[pageId] ?? SCENE_CONFIGS.home
    const scene = new AssemblyScene(canvas, config)
    if (onProgress) scene.setOnProgress(onProgress)

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      scene.setScroll(total > 0 ? window.scrollY / total : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      scene.dispose()
    }
  }, [pageId, onProgress])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  )
}
