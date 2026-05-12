"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Sparkline, PulseDot, AnimatedNumber } from "@/components/projects/demos/shared/primitives"
import { easing } from "@/lib/motion"

/**
 * HeroControlPanel — captivating right-side of the hero.
 * Four live panes: terminal stream, KPI + sparkline, radial gauge, network pulse.
 * Lightweight: no recharts, ~5KB of motion, all primitives.
 */
export function HeroControlPanel() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [])

  // Live KPI value
  const kpiValue = 84 + Math.sin(tick * 0.3) * 6
  const kpiSeries = useMemo(
    () => Array.from({ length: 18 }, (_, i) => 80 + Math.sin((i + tick) * 0.4) * 8 + Math.cos((i + tick) * 0.2) * 4),
    [tick]
  )

  // Radial gauge value
  const gauge = 0.62 + Math.sin(tick * 0.2) * 0.18
  const R = 38, C = Math.PI * 2 * R

  // Terminal lines cycle
  const lines = [
    { p: "$", t: "viper scan acme.example", c: "text-accent" },
    { p: "✓", t: "23 hosts · 4 cloud assets", c: "text-emerald-300" },
    { p: "›", t: "chain CVE-2024-2155", c: "text-sky-300" },
    { p: "!", t: "CVSS 9.1 verified safe", c: "text-amber-300" },
    { p: "$", t: "forecast.run BTC --5m", c: "text-accent" },
    { p: "✓", t: "edge +1.9σ · long", c: "text-emerald-300" },
    { p: "›", t: "deploy edge-vision/yolo8n", c: "text-sky-300" },
    { p: "✓", t: "24fps · 38ms · int8", c: "text-emerald-300" },
  ]
  const shown = lines.slice(0, ((tick % 9) + 1))

  // Network nodes for the mini graph
  const nodes = [
    { x: 20, y: 22 }, { x: 50, y: 18 }, { x: 80, y: 26 },
    { x: 30, y: 54 }, { x: 65, y: 58 }, { x: 85, y: 70 },
    { x: 15, y: 78 }, { x: 50, y: 80 },
  ]
  const edges: [number, number][] = [
    [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 6], [6, 7], [7, 4],
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easing.outExpo, delay: 0.3 }}
      className="relative w-full"
    >
      {/* Outer chrome */}
      <div className="relative rounded-2xl overflow-hidden border border-accent/25 bg-gradient-to-br from-main/95 via-main to-main/90 backdrop-blur-md shadow-2xl shadow-accent/10">
        {/* Header bar */}
        <div className="relative flex items-center justify-between px-4 py-2.5 border-b border-accent/15 bg-main/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] text-secondary/50 font-mono ml-2 tracking-wider">prioritech://control-room</span>
          </div>
          <div className="flex items-center gap-2">
            <PulseDot color="bg-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-mono">LIVE</span>
          </div>
        </div>

        {/* 4-pane grid */}
        <div className="grid grid-cols-2 gap-px bg-accent/10">
          {/* Terminal pane */}
          <Pane label="VIPER · pentest stream">
            <div className="font-mono text-[10px] leading-relaxed h-[120px] overflow-hidden">
              {shown.map((l, i) => (
                <motion.div
                  key={`${tick}-${i}`}
                  initial={{ opacity: 0, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-1.5"
                >
                  <span className={`${l.c} flex-shrink-0`}>{l.p}</span>
                  <span className="text-secondary/85 truncate">{l.t}</span>
                </motion.div>
              ))}
              <span className="inline-block w-1.5 h-2 bg-accent ml-0.5 animate-pulse" />
            </div>
          </Pane>

          {/* KPI + sparkline */}
          <Pane label="Market forecast · spot">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-accent tabular-nums leading-none">
                <AnimatedNumber value={Math.round(kpiValue * 100) / 100} decimals={2} prefix="$" />
              </span>
              <span className="text-[10px] text-emerald-300">+1.9σ</span>
            </div>
            <div className="text-accent">
              <Sparkline points={kpiSeries} height={50} width={150} className="w-full h-12" stroke="#daa520" />
            </div>
          </Pane>

          {/* Radial gauge */}
          <Pane label="Breakout prob · 5m">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 100 100" className="w-14 h-14 flex-shrink-0">
                <circle cx={50} cy={50} r={R} fill="none" stroke="rgba(217,217,217,0.08)" strokeWidth={8} />
                <motion.circle
                  cx={50} cy={50} r={R}
                  fill="none"
                  stroke={gauge > 0.7 ? "#10b981" : "#daa520"}
                  strokeWidth={8}
                  strokeLinecap="round"
                  style={{ rotate: -90, transformOrigin: "50% 50%" }}
                  animate={{ strokeDasharray: `${gauge * C} ${C}` }}
                  transition={{ type: "spring", stiffness: 110, damping: 18 }}
                />
              </svg>
              <div>
                <div className="text-xl font-bold text-accent tabular-nums leading-none">
                  <AnimatedNumber value={Math.round(gauge * 100)} suffix="%" />
                </div>
                <div className="text-[10px] text-secondary/50 mt-1">signal · long</div>
              </div>
            </div>
          </Pane>

          {/* Network */}
          <Pane label="Threat graph · live">
            <div className="relative w-full h-[100px]">
              <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {edges.map(([a, b], i) => {
                  const A = nodes[a], B = nodes[b]
                  return (
                    <g key={i}>
                      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                        stroke="rgba(218,165,32,0.25)" strokeWidth={0.4} />
                      <motion.circle
                        key={`p-${i}-${tick}`}
                        r={0.8}
                        fill="#daa520"
                        initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                        animate={{ cx: B.x, cy: B.y, opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, delay: i * 0.12, ease: "easeInOut" }}
                      />
                    </g>
                  )
                })}
                {nodes.map((n, i) => (
                  <g key={i}>
                    <circle cx={n.x} cy={n.y} r={i === 4 ? 2 : 1.4}
                      fill={i === 4 ? "#daa520" : "rgba(217,217,217,0.7)"}
                      style={{ filter: i === 4 ? "drop-shadow(0 0 4px rgba(218,165,32,0.6))" : undefined }}
                    />
                    {i === 4 && (
                      <motion.circle cx={n.x} cy={n.y} r={2}
                        fill="none" stroke="#daa520" strokeWidth={0.3}
                        animate={{ r: [2, 6], opacity: [0.6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </Pane>
        </div>

        {/* Footer strip */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-accent/15 bg-main/40 text-[10px] font-mono text-secondary/50">
          <span>uptime 99.97%</span>
          <span>5 divisions · 20 systems</span>
          <span>jakarta-1</span>
        </div>
      </div>

      {/* Decorative aurora behind */}
      <div className="pointer-events-none absolute -inset-8 -z-10 bg-gradient-to-br from-accent/20 via-transparent to-accent/5 rounded-3xl blur-3xl" />
    </motion.div>
  )
}

function Pane({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-main/60 backdrop-blur-sm p-3 sm:p-4 min-h-[160px]">
      <div className="text-[9px] uppercase tracking-widest text-secondary/45 mb-2 font-mono">
        {label}
      </div>
      {children}
    </div>
  )
}
