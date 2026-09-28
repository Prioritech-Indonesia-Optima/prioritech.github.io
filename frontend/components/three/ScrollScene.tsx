"use client"

import { useEffect, useRef, useState } from "react"

type Section = {
  id: string
  label: string
  range: [number, number]
}

export const SECTIONS: Section[] = [
  { id: "hero", label: "01", range: [0.0, 0.2] },
  { id: "divisions", label: "02", range: [0.2, 0.4] },
  { id: "engineering", label: "03", range: [0.4, 0.6] },
  { id: "process", label: "04", range: [0.6, 0.8] },
  { id: "contact", label: "05", range: [0.8, 1.0] },
]

export function useScrollProgress(): [React.RefObject<HTMLDivElement>, number, number] {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    let raf: number
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = containerRef.current
        if (!el) return
        const total = el.scrollHeight - window.innerHeight
        const p = total > 0 ? window.scrollY / total : 0
        setProgress(p)
        const idx = SECTIONS.findIndex((s) => p >= s.range[0] && p < s.range[1])
        setActiveSection(idx === -1 ? SECTIONS.length - 1 : idx)
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
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
