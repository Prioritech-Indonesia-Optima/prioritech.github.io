"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { DemoShell, Bar } from "./shared/DemoShell"
import { Panel, LineChart, AnimatedNumber, PulseDot } from "./shared/primitives"

/**
 * Breakout Probability — radial gauge + real-time signal indicator.
 */
export function BreakoutProbabilityDemo() {
  const [prob, setProb] = useState(0.62)
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setProb((p) => {
        const drift = (Math.random() - 0.5) * 0.08
        return Math.max(0.1, Math.min(0.95, p + drift))
      })
      setPulse((x) => x + 1)
    }, 1300)
    return () => clearInterval(id)
  }, [])

  // Radial gauge
  const R = 40, C = Math.PI * 2 * R
  const angle = prob * 270 - 135 // -135deg to +135deg
  const stroke = prob > 0.75 ? "#10b981" : prob > 0.5 ? "#daa520" : "#f59e0b"

  // Tape (recent prices)
  const tape = useMemo(() => Array.from({ length: 28 }, (_, i) => 100 + Math.sin(i * 0.5) * 8 + Math.cos(i * 0.2) * 4 + i * 0.4), [])

  const signals = [
    { ts: "now",      sym: "BTC", side: "LONG",  edge: "+2.1σ" },
    { ts: "−12s",     sym: "ETH", side: "LONG",  edge: "+1.4σ" },
    { ts: "−38s",     sym: "SOL", side: "SHORT", edge: "−1.7σ" },
    { ts: "−1m02s",   sym: "BTC", side: "LONG",  edge: "+0.9σ" },
  ]

  return (
    <DemoShell
      title="Breakout Probability Model"
      subtitle="Real-time signal recognition · momentum + volatility regime"
      status="live"
      accentTextClass="text-accent"
      kpis={[
        { label: "Live signals", value: "412" },
        { label: "Hit rate",     value: "74%",  trend: "up" },
        { label: "Edge",         value: "+1.9σ", trend: "up" },
        { label: "Latency",      value: "8ms",  trend: "down" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Probability of breakout · BTC/USD"
          right={<PulseDot color="bg-emerald-400" />}
          className="lg:col-span-2">
          <div className="flex flex-col items-center py-2">
            <svg viewBox="0 0 100 100" className="w-44 h-44">
              <circle cx={50} cy={50} r={R} fill="none" stroke="rgba(217,217,217,0.08)" strokeWidth={6} />
              <motion.circle
                cx={50} cy={50} r={R}
                fill="none" stroke={stroke} strokeWidth={6} strokeLinecap="round"
                style={{ rotate: -90, transformOrigin: "50% 50%" }}
                animate={{ strokeDasharray: `${prob * C} ${C}` }}
                transition={{ type: "spring", stiffness: 110, damping: 18 }}
                key={`gauge-${pulse}`}
              />
              {/* Needle */}
              <motion.line
                x1={50} y1={50} x2={50} y2={14}
                stroke="#daa520" strokeWidth={1.5} strokeLinecap="round"
                animate={{ rotate: angle }} transition={{ type: "spring", stiffness: 80, damping: 14 }}
                style={{ transformOrigin: "50% 50%" }}
              />
              <circle cx={50} cy={50} r={2.5} fill="#daa520" />
            </svg>
            <div className="text-center mt-2">
              <div className="text-3xl font-bold text-accent tabular-nums">
                <AnimatedNumber value={Math.round(prob * 100)} suffix="%" />
              </div>
              <div className="text-[10px] uppercase tracking-wider text-foreground/55">probability · 5m window</div>
            </div>
          </div>
        </Panel>

        <Panel title="Price tape · 28 ticks" className="lg:col-span-3">
          <LineChart
            series={tape}
            xLabels={["−28t", "−21t", "−14t", "−7t", "now"]}
            yFormat={(v) => v.toFixed(0)}
            stroke="#daa520"
            height={150}
          />
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Bar pct={Math.round(prob * 100)} label="Momentum" value={`${(prob * 2).toFixed(2)}σ`} tone="accent" />
            <Bar pct={68} label="Volatility regime" value="HIGH" tone="warn" />
            <Bar pct={42} label="Order-book pressure" value="+0.18" tone="success" />
          </div>
        </Panel>

        <Panel title="Recent signals" className="lg:col-span-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {signals.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded border border-accent/15 bg-card/50 p-2.5"
              >
                <div className="text-[10px] text-foreground/40 font-mono">{s.ts}</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-accent font-semibold">{s.sym}</span>
                  <span className={`text-xs ${s.side === "LONG" ? "text-emerald-300" : "text-rose-300"}`}>
                    {s.side}
                  </span>
                </div>
                <div className="text-[11px] text-foreground/70 mt-0.5">edge {s.edge}</div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
