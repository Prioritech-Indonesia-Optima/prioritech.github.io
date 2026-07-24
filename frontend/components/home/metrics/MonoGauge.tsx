"use client"

import { useEffect, useRef } from "react"
import { animate, animeEase } from "@/lib/anime"
import { useInView } from "@/lib/animations"
import { useMotionBudget } from "@/lib/motion"

/**
 * A blueprint arc gauge (270° sweep). The gold arc draws to `value`% once in
 * view; the numeric readout counts up alongside it. Static under reduced motion.
 */
export function MonoGauge({
  value,
  label,
  size = 132,
}: {
  value: number
  label: string
  size?: number
}): JSX.Element {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -40px 0px" })
  const budget = useMotionBudget()
  const arc = useRef<SVGCircleElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const done = useRef(false)

  const stroke = 6
  const r = (size - stroke) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r
  const sweep = 0.75 // 270°
  const track = circ * sweep

  useEffect(() => {
    const el = arc.current
    if (!el) return
    const setArc = (pct: number) => {
      el.style.strokeDasharray = `${track * (pct / 100)} ${circ}`
    }
    if (budget === "off") {
      setArc(value)
      if (num.current) num.current.textContent = String(Math.round(value))
      return
    }
    setArc(0)
    if (!inView || done.current) return
    done.current = true
    const proxy = { v: 0 }
    animate(proxy, {
      v: value,
      duration: 1400,
      ease: animeEase.outExpo,
      onUpdate: () => {
        setArc(proxy.v)
        if (num.current) num.current.textContent = String(Math.round(proxy.v))
      },
    })
  }, [inView, budget, value, track, circ])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-[135deg]">
          <circle
            cx={c} cy={c} r={r}
            fill="none" stroke="var(--line-strong)" strokeWidth={stroke}
            strokeDasharray={`${track} ${circ}`} strokeLinecap="butt"
          />
          <circle
            ref={arc}
            cx={c} cy={c} r={r}
            fill="none" stroke="#daa520" strokeWidth={stroke}
            strokeDasharray={`0 ${circ}`} strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold tabular-nums text-secondary">
            <span ref={num}>{budget === "off" ? Math.round(value) : 0}</span>
            <span className="text-accent">%</span>
          </span>
        </div>
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary/50">{label}</div>
    </div>
  )
}
