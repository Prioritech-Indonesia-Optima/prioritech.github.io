"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, PulseDot, AnimatedNumber } from "./shared/primitives"

/**
 * MES — Manufacturing Execution System. OEE, work orders, line status.
 */
export function MESDemo() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [])

  const lines = [
    { id: "L1", name: "Assembly · Line 1", oee: 0.92, status: "running", tone: "success" as const },
    { id: "L2", name: "Assembly · Line 2", oee: 0.84, status: "running", tone: "success" as const },
    { id: "L3", name: "Packaging",           oee: 0.68, status: "ramp-up", tone: "accent" as const },
    { id: "L4", name: "QA · Inspection",     oee: 0.41, status: "alarm",  tone: "danger" as const },
  ]

  const wos = [
    { id: "WO-2841", sku: "SKU-44218", qty: 1200, prog: 92, eta: "12m" },
    { id: "WO-2842", sku: "SKU-44219", qty: 800,  prog: 64, eta: "38m" },
    { id: "WO-2843", sku: "SKU-44220", qty: 2400, prog: 28, eta: "2h 14m" },
  ]

  return (
    <DemoShell
      title="MES"
      subtitle="Manufacturing execution · live OEE, work orders, line orchestration"
      status="alert"
      kpis={[
        { label: "OEE plant",  value: "71.2%", trend: "up" },
        { label: "Throughput", value: "1,840/h" },
        { label: "Scrap rate", value: "1.8%",  trend: "down" },
        { label: "Active WOs", value: "12" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Line status" className="lg:col-span-3"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-rose-400" /><span className="text-[10px] uppercase tracking-wider text-rose-300">L4 alarm</span></div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lines.map((l, i) => (
              <motion.div key={l.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className={`rounded border ${l.tone === "danger" ? "border-rose-500/40 bg-rose-500/5" : "border-accent/15 bg-card/50"} p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground font-semibold">{l.name}</span>
                  <StatusPill label={l.status} tone={l.tone} />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-accent tabular-nums">
                    <AnimatedNumber value={Math.round(l.oee * 100)} suffix="%" />
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-foreground/55">OEE</span>
                </div>
                <Bar pct={l.oee * 100} tone={l.tone} />
                <div className="mt-2 flex justify-between text-[10px] text-foreground/55 font-mono">
                  <span>A: {Math.round(l.oee * 100 + 4)}%</span>
                  <span>P: {Math.round(l.oee * 100 - 2)}%</span>
                  <span>Q: {Math.round(l.oee * 100 + 6)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Active work orders" className="lg:col-span-2">
          <div className="space-y-2">
            {wos.map((w, i) => (
              <motion.div key={w.id}
                initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="rounded border border-accent/15 bg-card/50 p-3">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-accent font-mono">{w.id}</span>
                  <span className="text-[11px] text-foreground/55 font-mono">ETA {w.eta}</span>
                </div>
                <div className="text-[11px] text-foreground/70 font-mono mb-2">{w.sku} · {w.qty} ea</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Bar pct={w.prog} tone={w.prog > 70 ? "success" : "accent"} />
                  </div>
                  <span className="text-xs text-foreground tabular-nums w-9 text-right">{w.prog}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Alarms · last 4h" className="lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            {[
              { t: "14:02", text: "QA reject rate above threshold · L4", tone: "danger" },
              { t: "13:48", text: "Coolant pressure low · L2", tone: "warn" },
              { t: "12:14", text: "Tool change scheduled · L1", tone: "info" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded border border-accent/10 bg-card/40">
                <span className="text-foreground/40 font-mono flex-shrink-0">{a.t}</span>
                <span className={
                  a.tone === "danger" ? "text-rose-300"
                  : a.tone === "warn" ? "text-amber-300"
                  : "text-sky-300"
                }>{a.text}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
