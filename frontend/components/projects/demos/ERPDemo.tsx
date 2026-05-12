"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, AnimatedNumber, Sparkline } from "./shared/primitives"

/**
 * ERP Suite — unified financial + operational + HR cockpit.
 */
export function ERPDemo() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500)
    return () => clearInterval(id)
  }, [])

  const revenueSeries = Array.from({ length: 16 }, (_, i) =>
    180 + i * 8 + Math.sin(i * 0.6) * 14
  )
  const cashSeries = Array.from({ length: 16 }, (_, i) =>
    420 + Math.sin(i * 0.4) * 24 + i * 2
  )

  const modules = [
    { name: "Finance",  load: 72, status: "live"   as const },
    { name: "Sales",    load: 84, status: "live"   as const },
    { name: "Inventory", load: 91, status: "live"  as const },
    { name: "HR / Payroll", load: 38, status: "idle" as const },
    { name: "Purchasing", load: 56, status: "live" as const },
    { name: "Manufacturing", load: 78, status: "live" as const },
  ]

  return (
    <DemoShell
      title="ERP Suite"
      subtitle="Unified finance, sales, inventory, HR — one ledger of truth"
      status="live"
      kpis={[
        { label: "Revenue MTD", value: "$2.84M", trend: "up", hint: "+12%" },
        { label: "Open AR", value: "$418k", trend: "down" },
        { label: "Cash position", value: "$5.12M", trend: "up" },
        { label: "Active modules", value: "6 / 6" },
      ]}
    >
      <div className="grid lg:grid-cols-6 gap-4">
        {/* Revenue card */}
        <Panel title="Revenue · last 16 weeks" className="lg:col-span-3">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="text-3xl font-bold text-accent tabular-nums">
              $<AnimatedNumber value={2.84} decimals={2} />M
            </div>
            <span className="text-xs text-emerald-300">+12.4% YoY</span>
          </div>
          <div className="text-accent w-full">
            <Sparkline points={revenueSeries} height={64} width={300} className="w-full h-16" stroke="#daa520" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
            <div><div className="text-secondary/55">Orders</div><div className="text-secondary tabular-nums font-semibold">1,284</div></div>
            <div><div className="text-secondary/55">AOV</div><div className="text-secondary tabular-nums font-semibold">$2,210</div></div>
            <div><div className="text-secondary/55">Margin</div><div className="text-secondary tabular-nums font-semibold">34.8%</div></div>
          </div>
        </Panel>

        <Panel title="Cash · liquidity" className="lg:col-span-3">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="text-3xl font-bold text-emerald-300 tabular-nums">
              $<AnimatedNumber value={5.12} decimals={2} />M
            </div>
            <span className="text-xs text-emerald-300">runway 14mo</span>
          </div>
          <div className="text-emerald-300 w-full">
            <Sparkline points={cashSeries} height={64} width={300} className="w-full h-16" stroke="#10b981" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
            <div><div className="text-secondary/55">AR</div><div className="text-amber-300 tabular-nums font-semibold">$418k</div></div>
            <div><div className="text-secondary/55">AP</div><div className="text-rose-300 tabular-nums font-semibold">$284k</div></div>
            <div><div className="text-secondary/55">Net</div><div className="text-accent tabular-nums font-semibold">$134k</div></div>
          </div>
        </Panel>

        {/* Modules */}
        <Panel title="Modules · load profile" className="lg:col-span-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {modules.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded border border-accent/15 bg-main/50 p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary">{m.name}</span>
                  <StatusPill label={m.status} tone={m.status === "live" ? "success" : "muted"} />
                </div>
                <Bar pct={m.load} value={`${m.load}%`} tone={m.load > 85 ? "warn" : "accent"} />
              </motion.div>
            ))}
          </div>
        </Panel>

        {/* Activity feed */}
        <Panel title="Live activity" className="lg:col-span-2">
          <div className="space-y-2 text-xs font-mono">
            {[
              { t: "now",      m: "INV", text: "Stock low · SKU-44218", tone: "warn" },
              { t: "−1m",      m: "AR",  text: "Payment $42k cleared", tone: "success" },
              { t: "−4m",      m: "MFG", text: "WO-2841 completed",     tone: "success" },
              { t: "−6m",      m: "HR",  text: "Payroll cycle queued",  tone: "info" },
              { t: "−12m",     m: "POS", text: "Daily reconcile · OK",  tone: "success" },
            ].map((e, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2"
              >
                <span className="text-secondary/40 w-12 flex-shrink-0">{e.t}</span>
                <StatusPill label={e.m} tone="muted" />
                <span className={
                  e.tone === "success" ? "text-emerald-300"
                  : e.tone === "warn" ? "text-amber-300"
                  : "text-sky-300"
                }>{e.text}</span>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
