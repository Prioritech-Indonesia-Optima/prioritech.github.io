"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "@/lib/animations"
import { useMotionBudget } from "@/lib/motion"

const WINDOW = 44
const VB_W = 300
const VB_H = 120

function seed(): number[] {
  return Array.from({ length: WINDOW }, (_, i) => 62 + Math.sin(i * 0.4) * 12 + Math.cos(i * 0.17) * 6)
}

/**
 * Streaming synthetic telemetry — a single gold line on a hairline field, drawn
 * as plain SVG (no chart lib, so nothing leaks onto the home critical path).
 * The ring buffer advances only while in view and motion budget allows.
 * Single series → no legend; axis labels stay in mono ink.
 */
export function LiveTelemetry(): JSX.Element {
  const [ref, inView] = useInView({ rootMargin: "0px 0px -40px 0px" })
  const budget = useMotionBudget()
  const [data, setData] = useState<number[]>(seed)
  const counter = useRef(0)

  useEffect(() => {
    if (!inView || budget === "off") return
    const id = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1]
        const next = Math.max(28, Math.min(96, last + (Math.random() - 0.5) * 16))
        return [...prev.slice(1), next]
      })
      counter.current++
    }, 1100)
    return () => clearInterval(id)
  }, [inView, budget])

  const max = 110
  const stepX = VB_W / (WINDOW - 1)
  const toY = (v: number) => VB_H - (v / max) * VB_H
  const pts = data.map((v, i) => `${(i * stepX).toFixed(1)},${toY(v).toFixed(1)}`).join(" ")
  const area = `0,${VB_H} ${pts} ${VB_W},${VB_H}`
  const lastY = toY(data[data.length - 1])

  return (
    <div ref={ref} className="relative h-full w-full">
      {/* y-axis labels */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between py-1 font-mono text-[9px] tabular-nums text-secondary/40">
        <span>110</span>
        <span>55</span>
        <span>0</span>
      </div>

      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="h-full w-full pl-7">
        {/* hairline grid */}
        {[0, 0.5, 1].map((f) => (
          <line
            key={f}
            x1={0} x2={VB_W} y1={VB_H * f} y2={VB_H * f}
            stroke="var(--line)" strokeWidth={0.5} vectorEffect="non-scaling-stroke"
          />
        ))}
        <polygon points={area} fill="url(#telemetry-fill)" />
        <polyline
          points={pts}
          fill="none"
          stroke="#daa520"
          strokeWidth={1.75}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={VB_W} cy={lastY} r={2.5} fill="#daa520" vectorEffect="non-scaling-stroke" />
        <defs>
          <linearGradient id="telemetry-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(218,165,32,0.22)" />
            <stop offset="100%" stopColor="rgba(218,165,32,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
