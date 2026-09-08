"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, PulseDot, AnimatedNumber } from "./shared/primitives"

/**
 * Warehouse Management System — bay grid + pick paths + inventory metrics.
 */
export function WMSDemo() {
  // 6×4 zone grid; some bays high-fill, some low
  const grid = Array.from({ length: 24 }, (_, i) => {
    const row = Math.floor(i / 6)
    const col = i % 6
    const base = (row * 17 + col * 11 + 31) % 100
    return { id: i, row, col, fill: base, sku: `${String.fromCharCode(65 + row)}${col + 1}` }
  })
  const path = [0, 1, 7, 13, 14, 20, 21] // pick sequence

  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (path.length + 4)), 700)
    return () => clearInterval(id)
  }, [path.length])

  const cur = step < path.length ? path[step] : -1

  return (
    <DemoShell
      title="Warehouse Management"
      subtitle="Bay-level inventory · pick paths · forklift orchestration"
      status="live"
      kpis={[
        { label: "SKUs tracked", value: "12.4k" },
        { label: "Fill rate",    value: "82%",  trend: "up" },
        { label: "Pick / hour",  value: "184",  trend: "up" },
        { label: "Active picks", value: "7",    hint: "live" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Floor map · zone A"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-accent" /><span className="text-[10px] uppercase tracking-wider text-accent">picking</span></div>}
          className="lg:col-span-3">
          <div className="relative grid grid-cols-6 gap-1.5 p-2 bg-card/40 rounded border border-accent/10">
            {grid.map((b) => {
              const inPath = path.includes(b.id)
              const isCurrent = cur === b.id
              const pathOrder = path.indexOf(b.id) + 1
              const fillTone = b.fill > 80 ? "bg-emerald-500/30 border-emerald-500/40" : b.fill > 50 ? "bg-accent/20 border-accent/40" : b.fill > 20 ? "bg-amber-500/20 border-amber-500/30" : "bg-rose-500/10 border-rose-500/20"
              return (
                <motion.div
                  key={b.id}
                  className={`relative aspect-square rounded border ${fillTone} flex items-center justify-center text-[9px] font-mono`}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-foreground/85">{b.sku}</span>
                  {inPath && (
                    <span className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full bg-accent text-background text-[8px] flex items-center justify-center font-bold">
                      {pathOrder}
                    </span>
                  )}
                  {isCurrent && (
                    <motion.span
                      className="absolute inset-0 rounded border-2 border-accent pointer-events-none"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
          <div className="mt-3 flex gap-3 text-[10px] text-foreground/70 font-mono">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500/50 rounded-sm" />high</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-accent/40 rounded-sm" />med</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500/40 rounded-sm" />low</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-rose-500/30 rounded-sm" />critical</span>
          </div>
        </Panel>

        <div className="lg:col-span-2 space-y-4">
          <Panel title="Pick list · order #28419">
            <ol className="space-y-1.5 text-xs font-mono">
              {path.map((id, i) => {
                const b = grid[id]
                const done = i < step
                const active = i === step
                return (
                  <li key={id} className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                      done ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : active ? "bg-accent/20 border-accent text-accent animate-pulse"
                      : "border-foreground/20 text-foreground/40"
                    }`}>{done ? "✓" : i + 1}</span>
                    <span className={done ? "text-foreground/50 line-through" : active ? "text-accent" : "text-foreground/80"}>
                      bay {b.sku} · 4 ea
                    </span>
                  </li>
                )
              })}
            </ol>
          </Panel>
          <Panel title="Throughput">
            <Bar pct={86} label="Today" value="184 / hr" tone="success" />
            <div className="h-2" />
            <Bar pct={68} label="Week avg" value="158 / hr" tone="accent" />
            <div className="h-2" />
            <Bar pct={42} label="Returns processed" value="38" tone="warn" />
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}
