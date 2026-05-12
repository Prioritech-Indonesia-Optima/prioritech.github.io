"use client"

import { useMemo, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, Sparkline, AnimatedNumber } from "./shared/primitives"

/**
 * Market Forecast Engine — historical + forecast band visualization.
 */
export function MarketForecastDemo() {
  // Stable seeded series so layout doesn't jitter; live tick updates last point
  const base = useMemo(() => {
    const N = 32, FN = 8
    const arr: number[] = []
    let p = 150
    for (let i = 0; i < N; i++) {
      p += (Math.sin(i * 0.7) + Math.cos(i * 0.3)) * 2 + (i % 5 === 0 ? -3 : 1.2)
      arr.push(+p.toFixed(2))
    }
    const forecast = Array.from({ length: FN }, (_, i) => +(arr[N - 1] + Math.sin(i * 0.9) * 3 + i * 0.8).toFixed(2))
    const upper = forecast.map((v) => v + 4 + Math.sin(v * 0.1) * 1.2)
    const lower = forecast.map((v) => v - 4 - Math.cos(v * 0.1) * 1.2)
    return { hist: arr, forecast, upper, lower }
  }, [])

  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1800)
    return () => clearInterval(id)
  }, [])

  const allY = [...base.hist, ...base.upper, ...base.lower]
  const yMin = Math.min(...allY) - 3
  const yMax = Math.max(...allY) + 3
  const total = base.hist.length + base.forecast.length
  const W = 100
  const H = 50
  const x = (i: number) => (i / (total - 1)) * W
  const y = (v: number) => H - ((v - yMin) / (yMax - yMin)) * H
  const histPath = base.hist.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ")
  const fcStart = base.hist.length - 1
  const fcPath = base.forecast.map((v, i) => `${i === 0 ? "M" : "L"} ${x(fcStart + i + 1)} ${y(v)}`).join(" ")
  const bandPath = `M ${x(fcStart + 1)} ${y(base.upper[0])} ${base.upper.map((v, i) => `L ${x(fcStart + 1 + i)} ${y(v)}`).join(" ")} L ${x(fcStart + base.forecast.length)} ${y(base.lower[base.lower.length - 1])} ${base.lower.slice().reverse().map((v, i) => `L ${x(fcStart + base.forecast.length - i)} ${y(v)}`).join(" ")} Z`

  const last = base.hist[base.hist.length - 1]
  const next = base.forecast[0]
  const delta = ((next - last) / last) * 100

  return (
    <DemoShell
      title="Market Forecast Engine"
      subtitle="ML pipeline · volatility + momentum, with confidence band"
      status="live"
      kpis={[
        { label: "Spot", value: `$${last.toFixed(2)}` },
        { label: "Forecast +8d", value: `$${next.toFixed(2)}`, trend: delta >= 0 ? "up" : "down", hint: `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%` },
        { label: "Sharpe", value: "2.14", trend: "up" },
        { label: "ROI vs base", value: "+38%", trend: "up" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Price · 32d history + 8d forecast" className="lg:col-span-3">
          <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(218,165,32,0.3)" />
                  <stop offset="100%" stopColor="rgba(218,165,32,0)" />
                </linearGradient>
              </defs>

              {/* Grid */}
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={i} x1={0} x2={W} y1={(H / 4) * i} y2={(H / 4) * i}
                  stroke="rgba(217,217,217,0.06)" strokeWidth={0.15} />
              ))}

              {/* Divider */}
              <line x1={x(fcStart)} y1={0} x2={x(fcStart)} y2={H}
                stroke="rgba(218,165,32,0.25)" strokeDasharray="0.6 0.8" strokeWidth={0.2} />
              <text x={x(fcStart) + 0.6} y={2.4} fontSize={2} fill="rgba(218,165,32,0.7)" fontFamily="monospace">forecast →</text>

              {/* Confidence band */}
              <motion.path d={bandPath} fill="rgba(218,165,32,0.12)" stroke="none"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} />

              {/* Historical line */}
              <motion.path d={`${histPath} L ${x(fcStart)} ${H} L 0 ${H} Z`} fill="url(#histGrad)"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} />
              <motion.path d={histPath} stroke="#daa520" strokeWidth={0.5} fill="none"
                strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />

              {/* Forecast line dashed */}
              <motion.path d={`M ${x(fcStart)} ${y(last)} ${fcPath.slice(1)}`}
                stroke="#daa520" strokeWidth={0.5} strokeDasharray="0.8 0.5" fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 1.2 }} />

              {/* Now marker pulse */}
              <motion.circle cx={x(fcStart)} cy={y(last)} r={0.9} fill="#daa520"
                key={`pulse-${pulse}`}
                animate={{ r: [0.9, 2.2, 0.9], opacity: [1, 0.3, 1] }} transition={{ duration: 1.4 }} />
            </svg>
          </div>
        </Panel>

        <div className="lg:col-span-2 space-y-4">
          <Panel title="Confidence intervals">
            <div className="space-y-2">
              <Bar pct={86} label="68% band" value={`$${(next - 2).toFixed(2)} — $${(next + 2).toFixed(2)}`} tone="success" />
              <Bar pct={62} label="95% band" value={`$${(next - 4).toFixed(2)} — $${(next + 4).toFixed(2)}`} tone="warn" />
              <Bar pct={32} label="Volatility (σ)" value="0.14" tone="warn" />
            </div>
          </Panel>
          <Panel title="Recent trades · model">
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { t: "12:42", side: "LONG", sym: "AAPL", pnl: "+1.42%" },
                { t: "12:38", side: "LONG", sym: "MSFT", pnl: "+0.74%" },
                { t: "12:33", side: "SHORT", sym: "TSLA", pnl: "−0.21%" },
                { t: "12:28", side: "LONG", sym: "NVDA", pnl: "+2.15%" },
              ].map((tr, i) => (
                <div key={i} className="flex items-center justify-between text-secondary/80">
                  <span>{tr.t} <span className="text-secondary/40 mx-1">·</span>
                    <span className={tr.side === "LONG" ? "text-emerald-300" : "text-rose-300"}>{tr.side}</span>
                    <span className="text-accent mx-1">{tr.sym}</span>
                  </span>
                  <span className={tr.pnl.startsWith("+") ? "text-emerald-300" : "text-rose-300"}>{tr.pnl}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}
