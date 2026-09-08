"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, AnimatedNumber, LineChart, PulseDot } from "./shared/primitives"

/**
 * POS — Point of Sale. Live sales feed, product mix, terminals.
 */
export function POSDemo() {
  const sample = [
    { sku: "Espresso · Single", price: 28000 },
    { sku: "Latte · Oat",        price: 42000 },
    { sku: "Croissant",          price: 32000 },
    { sku: "Iced Matcha",        price: 48000 },
    { sku: "Sandwich · Tuna",    price: 56000 },
    { sku: "Cold Brew",          price: 38000 },
    { sku: "Affogato",           price: 54000 },
  ]
  const [feed, setFeed] = useState<{ id: number; sku: string; price: number; t: string; term: string }[]>([])
  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n++
      const item = sample[Math.floor(Math.random() * sample.length)]
      setFeed((prev) =>
        [{
          id: n,
          sku: item.sku,
          price: item.price,
          t: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          term: `T-0${(n % 4) + 1}`,
        }, ...prev].slice(0, 6)
      )
    }, 1300)
    return () => clearInterval(id)
  }, [])

  const hourly = [12, 18, 24, 32, 42, 38, 48, 56, 62, 68, 72, 84, 78, 92]

  return (
    <DemoShell
      title="POS"
      subtitle="Point of sale · live transactions, product mix, reconciliation"
      status="live"
      kpis={[
        { label: "Sales today",  value: "$8.42k",  trend: "up" },
        { label: "Tx / hour",    value: "92",       trend: "up" },
        { label: "Avg basket",    value: "$8.20",    trend: "up" },
        { label: "Terminals",    value: "4 / 4" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Live transaction feed"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-emerald-400" /><span className="text-[10px] uppercase tracking-wider text-emerald-300">streaming</span></div>}
          className="lg:col-span-3">
          <div className="space-y-2 min-h-[260px]">
            <AnimatePresence initial={false}>
              {feed.map((f) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, x: -10, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between rounded border border-accent/15 bg-card/50 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <StatusPill label={f.term} tone="muted" />
                    <span className="text-sm text-foreground">{f.sku}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-accent font-bold tabular-nums">Rp {f.price.toLocaleString("id-ID")}</div>
                    <div className="text-[10px] text-foreground/40 font-mono">{f.t}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Panel>

        <Panel title="Hourly sales · today" className="lg:col-span-2">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="text-3xl font-bold text-accent tabular-nums">
              $<AnimatedNumber value={8.42} decimals={2} />k
            </div>
            <span className="text-xs text-emerald-300">+22% DoD</span>
          </div>
          <LineChart
            series={hourly}
            xLabels={["07", "09", "11", "13", "15", "17", "20"]}
            yFormat={(v) => String(Math.round(v))}
            stroke="#daa520"
            height={140}
          />
          <div className="mt-3 space-y-2">
            <Bar pct={84} label="Peak utilization" value="11:00–12:00" tone="accent" />
            <Bar pct={72} label="Card / cashless" value="72%" tone="success" />
          </div>
        </Panel>

        <Panel title="Top SKUs · today" className="lg:col-span-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { sku: "Latte · Oat", units: 84, rev: 3528 },
              { sku: "Croissant",    units: 62, rev: 1984 },
              { sku: "Cold Brew",    units: 48, rev: 1824 },
              { sku: "Sandwich · Tuna", units: 32, rev: 1792 },
            ].map((p, i) => (
              <motion.div key={p.sku}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded border border-accent/15 bg-card/50 p-3">
                <div className="text-[10px] uppercase tracking-wider text-foreground/55">{p.sku}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl text-accent font-bold tabular-nums">
                    <AnimatedNumber value={p.units} />
                  </span>
                  <span className="text-[10px] text-foreground/55">units</span>
                </div>
                <div className="text-xs text-emerald-300 tabular-nums">Rp {(p.rev * 1000).toLocaleString("id-ID")}</div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
