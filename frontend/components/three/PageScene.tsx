"use client"

import { useEffect, useRef } from "react"
import { AssemblyScene } from "./AssemblyScene"
import { SCENE_CONFIGS } from "./sceneConfigs"
import { measureSceneStepStarts } from "./sceneSteps"

export function PageScene({ pageId, onProgress }: { pageId: string; onProgress?: (p: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const config = SCENE_CONFIGS[pageId] ?? SCENE_CONFIGS.home
    const scene = new AssemblyScene(canvas, config)
    if (onProgress) scene.setOnProgress(onProgress)

    const syncBounds = () => {
      const starts = measureSceneStepStarts()
      if (starts.length === config.chapters.length) scene.setChapterBounds(starts)
    }

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      scene.setScroll(total > 0 ? window.scrollY / total : 0)
    }
    onScroll()
    syncBounds()
    window.addEventListener("scroll", onScroll, { passive: true })

    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(syncBounds)
    }
    window.addEventListener("resize", onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(document.documentElement)
    document.fonts?.ready.then(syncBounds).catch(() => {})
    const settle = setTimeout(syncBounds, 800)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(resizeRaf)
      clearTimeout(settle)
      ro.disconnect()
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
