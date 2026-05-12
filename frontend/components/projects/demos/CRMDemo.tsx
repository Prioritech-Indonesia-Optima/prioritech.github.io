"use client"

import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, AnimatedNumber, Sparkline } from "./shared/primitives"

/**
 * CRM — sales pipeline kanban with deal flow.
 */
export function CRMDemo() {
  const stages = [
    { name: "Lead",       count: 42, value: "$284k", color: "text-secondary/70",   bar: 100 },
    { name: "Qualified",  count: 24, value: "$612k", color: "text-sky-300",         bar: 72 },
    { name: "Proposal",   count: 12, value: "$1.42M", color: "text-accent",         bar: 48 },
    { name: "Negotiation", count: 6, value: "$1.84M", color: "text-amber-300",     bar: 28 },
    { name: "Won",         count: 8, value: "$2.12M", color: "text-emerald-300",   bar: 18 },
  ]

  const deals = [
    { co: "Astra Logistics",  amt: 218000, stage: "Negotiation", owner: "RW", prob: 0.78 },
    { co: "Mandiri Tower",     amt: 142000, stage: "Proposal",   owner: "SD", prob: 0.62 },
    { co: "GoTo Group",       amt: 384000, stage: "Negotiation", owner: "AP", prob: 0.71 },
    { co: "BCA Digital",       amt: 88000,  stage: "Qualified",   owner: "RW", prob: 0.45 },
  ]

  const conversion = [12, 18, 14, 22, 28, 24, 32, 36, 30, 38, 42, 48]

  return (
    <DemoShell
      title="CRM"
      subtitle="Sales pipeline · deal flow · revenue intelligence"
      status="live"
      kpis={[
        { label: "Pipeline value", value: "$6.4M", trend: "up" },
        { label: "Active deals", value: "92",     trend: "up" },
        { label: "Win rate",      value: "34%",    trend: "up" },
        { label: "Avg cycle",     value: "28d",    trend: "down" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Pipeline · stage funnel" className="lg:col-span-3">
          <div className="space-y-3">
            {stages.map((s, i) => (
              <motion.div key={s.name}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm text-secondary">{s.name}</span>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-xs ${s.color}`}>{s.count} deals</span>
                    <span className="text-accent font-semibold tabular-nums">{s.value}</span>
                  </div>
                </div>
                <Bar pct={s.bar} tone={i >= 3 ? "success" : i === 2 ? "accent" : "accent"} />
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Conversion trend · 12mo" className="lg:col-span-2">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="text-3xl font-bold text-accent tabular-nums">
              <AnimatedNumber value={34} suffix="%" />
            </div>
            <span className="text-xs text-emerald-300">+6pp vs 6mo</span>
          </div>
          <div className="text-accent w-full">
            <Sparkline points={conversion} height={60} width={200} className="w-full h-16" stroke="#daa520" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div><div className="text-secondary/55">Avg deal</div><div className="text-secondary font-semibold tabular-nums">$69.2k</div></div>
            <div><div className="text-secondary/55">Quota</div><div className="text-emerald-300 font-semibold">112%</div></div>
          </div>
        </Panel>

        <Panel title="Hot deals · this week" className="lg:col-span-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {deals.map((d, i) => (
              <motion.div key={d.co}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded border border-accent/15 bg-main/50 p-3">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm text-secondary font-semibold truncate">{d.co}</span>
                  <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 text-accent text-[10px] flex items-center justify-center font-mono">{d.owner}</span>
                </div>
                <div className="text-accent text-lg font-bold tabular-nums">$<AnimatedNumber value={d.amt / 1000} />k</div>
                <div className="flex items-center justify-between mt-1.5">
                  <StatusPill label={d.stage} tone="info" />
                  <span className="text-xs text-secondary/60 tabular-nums">{Math.round(d.prob * 100)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
