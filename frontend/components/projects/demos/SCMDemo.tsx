"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, PulseDot } from "./shared/primitives"

/**
 * Supply Chain Management — supplier → warehouse → distribution → retail.
 */
export function SCMDemo() {
  const stages = [
    { id: "supplier", label: "Suppliers",    icon: "▣", x: 10 },
    { id: "factory",  label: "Manufacturing", icon: "⚙", x: 30 },
    { id: "warehouse", label: "Warehouse",   icon: "▥", x: 50 },
    { id: "distrib",  label: "Distribution", icon: "✈", x: 70 },
    { id: "retail",   label: "Retail",        icon: "★", x: 90 },
  ]
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1100)
    return () => clearInterval(id)
  }, [])

  const orders = [
    { id: "PO-44218", from: "Shenzhen·A", to: "JKT-MAIN", eta: "2d",  status: "in_transit", tone: "info" as const },
    { id: "PO-44219", from: "Surabaya",    to: "JKT-MAIN", eta: "0.5d", status: "loading",    tone: "warn" as const },
    { id: "PO-44216", from: "Bangkok",     to: "BDG-EAST", eta: "5d",  status: "delayed",     tone: "danger" as const },
    { id: "PO-44214", from: "Singapore",   to: "JKT-WEST", eta: "✓",   status: "delivered",   tone: "success" as const },
  ]

  return (
    <DemoShell
      title="Supply Chain Management"
      subtitle="End-to-end flow · supplier → factory → warehouse → distribution → retail"
      status="live"
      kpis={[
        { label: "Active POs", value: "284" },
        { label: "On-time %",  value: "96.2%", trend: "up" },
        { label: "Avg lead",    value: "8.4d",  trend: "down" },
        { label: "At risk",     value: "3",     trend: "up" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Flow visualization" className="lg:col-span-5">
          <div className="relative w-full" style={{ aspectRatio: "10 / 3" }}>
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              {/* connection lines */}
              {stages.slice(0, -1).map((s, i) => (
                <g key={i}>
                  <line x1={s.x} y1={15} x2={stages[i + 1].x} y2={15}
                    stroke="rgba(218,165,32,0.25)" strokeWidth={0.4} />
                  {/* flowing particles */}
                  {Array.from({ length: 3 }).map((_, j) => (
                    <motion.circle
                      key={`${i}-${j}-${pulse}`}
                      r={0.6}
                      fill="#daa520"
                      initial={{ cx: s.x, cy: 15, opacity: 0 }}
                      animate={{ cx: stages[i + 1].x, cy: 15, opacity: [0, 1, 0] }}
                      transition={{ duration: 1.8, delay: j * 0.4, ease: "linear" }}
                    />
                  ))}
                </g>
              ))}
              {/* nodes */}
              {stages.map((s, i) => (
                <g key={s.id}>
                  <circle cx={s.x} cy={15} r={4} fill="rgba(45,44,44,0.95)" stroke="rgba(218,165,32,0.5)" strokeWidth={0.4} />
                  <text x={s.x} y={16.5} textAnchor="middle" fontSize={3.4} fill="#daa520" fontFamily="monospace">{s.icon}</text>
                  <text x={s.x} y={24.5} textAnchor="middle" fontSize={2.4} fill="rgba(217,217,217,0.85)" fontFamily="monospace">{s.label}</text>
                </g>
              ))}
            </svg>
          </div>
        </Panel>

        <Panel title="Active purchase orders" className="lg:col-span-3">
          <div className="space-y-2">
            {orders.map((o, i) => (
              <motion.div key={o.id}
                initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between gap-3 p-2.5 rounded border border-accent/15 bg-main/50">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-accent text-sm font-mono">{o.id}</span>
                    <StatusPill label={o.status} tone={o.tone} />
                  </div>
                  <div className="text-[11px] text-secondary/55 font-mono mt-0.5">{o.from} → {o.to}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-secondary/55">ETA</div>
                  <div className={`text-sm font-semibold tabular-nums ${o.tone === "danger" ? "text-rose-300" : o.tone === "success" ? "text-emerald-300" : "text-secondary"}`}>
                    {o.eta}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Risk dashboard" className="lg:col-span-2">
          <Bar pct={92} label="On-time delivery" value="92%" tone="success" />
          <div className="h-2" />
          <Bar pct={28} label="At-risk shipments" value="3 / 284" tone="warn" />
          <div className="h-2" />
          <Bar pct={64} label="Supplier diversification" value="0.64" tone="accent" />
          <div className="h-2" />
          <Bar pct={48} label="Inventory days" value="22d" tone="accent" />
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusPill label="port congestion" tone="warn" />
            <StatusPill label="weather alert" tone="warn" />
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
