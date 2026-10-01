"use client"

import { useEffect, useRef, useState } from "react"

type Section = {
  id: string
  label: string
}

export const SECTIONS: Section[] = [
  { id: "hero", label: "01" },
  { id: "divisions", label: "02" },
  { id: "engineering", label: "03" },
  { id: "process", label: "04" },
  { id: "contact", label: "05" },
]

function measureSectionStarts(): number[] {
  const total = document.documentElement.scrollHeight - window.innerHeight
  if (total <= 0) return SECTIONS.map(() => 0)
  const scrollY = window.scrollY
  return SECTIONS.map((s) => {
    const el = document.getElementById(s.id)
    if (!el) return 0
    return Math.max(0, Math.min(1, (el.getBoundingClientRect().top + scrollY) / total))
  })
}

export function useScrollProgress(): [React.RefObject<HTMLDivElement>, number, number] {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const startsRef = useRef<number[]>(SECTIONS.map((_, i) => i / SECTIONS.length))

  useEffect(() => {
    let raf: number
    const sync = () => {
      startsRef.current = measureSectionStarts()
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = containerRef.current
        if (!el) return
        const total = el.scrollHeight - window.innerHeight
        const p = total > 0 ? window.scrollY / total : 0
        setProgress(p)
        const starts = startsRef.current
        let idx = 0
        for (let i = 0; i < starts.length; i++) {
          if (p >= starts[i] - 0.001) idx = i
        }
        setActiveSection(idx)
      })
    }
    sync()
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(sync)
    }
    window.addEventListener("resize", onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(document.documentElement)
    document.fonts?.ready.then(sync).catch(() => {})
    const settle = setTimeout(sync, 800)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(resizeRaf)
      clearTimeout(settle)
      ro.disconnect()
    }
  }, [])

  return [containerRef, progress, activeSection]
}

export function SectionIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <nav
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center justify-end gap-2"
          aria-label={s.id}
          aria-current={i === activeIndex ? "true" : undefined}
        >
          <span
            className={`text-[9px] font-mono tracking-wider transition-all duration-300 ${
              i === activeIndex
                ? "text-accent opacity-100"
                : "text-muted-foreground opacity-0 group-hover:opacity-100"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`block transition-all duration-300 ${
              i === activeIndex
                ? "w-6 h-px bg-accent"
                : "w-3 h-px bg-foreground/30 group-hover:bg-foreground/60"
            }`}
          />
        </a>
      ))}
    </nav>
  )
}

export function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-px z-50 bg-foreground/10">
      <div
        className="h-full bg-accent transition-[width] duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
