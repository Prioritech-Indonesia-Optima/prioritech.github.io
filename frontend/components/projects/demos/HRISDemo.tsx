"use client"

import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, AnimatedNumber, Sparkline } from "./shared/primitives"

/**
 * HRIS — workforce analytics, attendance, payroll, retention.
 */
export function HRISDemo() {
  const headcount = [184, 188, 192, 195, 198, 204, 208, 212, 218, 224, 228, 234]
  const departments = [
    { name: "Engineering", count: 84, pct: 100 },
    { name: "Operations",  count: 56, pct: 67 },
    { name: "Sales",       count: 42, pct: 50 },
    { name: "Finance & HR", count: 28, pct: 33 },
    { name: "Marketing",    count: 24, pct: 29 },
  ]
  const upcoming = [
    { name: "Adi Pradana",  date: "Sep 14", type: "Birthday", tone: "info" as const },
    { name: "Lina Sari",    date: "Sep 16", type: "5yr anniv", tone: "success" as const },
    { name: "Rio Wibowo",    date: "Sep 18", type: "Promotion", tone: "success" as const },
    { name: "PT Open Doors", date: "Sep 20", type: "New hire", tone: "accent" as const },
  ]

  return (
    <DemoShell
      title="HRIS / HCM"
      subtitle="Workforce intelligence · attendance, payroll, retention"
      status="live"
      kpis={[
        { label: "Headcount", value: "234", trend: "up", hint: "+6 MoM" },
        { label: "Attendance", value: "97.4%", trend: "up" },
        { label: "Retention",  value: "94%",   trend: "up", hint: "12mo" },
        { label: "Open roles", value: "12",    trend: "up" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Headcount · 12mo growth" className="lg:col-span-3">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="text-3xl font-bold text-accent tabular-nums">
              <AnimatedNumber value={234} />
            </div>
            <span className="text-xs text-emerald-300">+27% YoY</span>
          </div>
          <div className="text-accent w-full">
            <Sparkline points={headcount} height={64} width={320} className="w-full h-16" stroke="#daa520" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
            <div><div className="text-secondary/55">Voluntary attrition</div><div className="text-secondary tabular-nums font-semibold">5.2%</div></div>
            <div><div className="text-secondary/55">Avg tenure</div><div className="text-secondary tabular-nums font-semibold">3.4y</div></div>
            <div><div className="text-secondary/55">eNPS</div><div className="text-emerald-300 tabular-nums font-semibold">+62</div></div>
          </div>
        </Panel>

        <Panel title="By department" className="lg:col-span-2">
          <div className="space-y-3">
            {departments.map((d, i) => (
              <motion.div key={d.name}
                initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-secondary/80">{d.name}</span>
                  <span className="text-xs text-accent font-semibold tabular-nums">{d.count}</span>
                </div>
                <Bar pct={d.pct} tone={i === 0 ? "accent" : "accent"} />
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Payroll · current cycle" className="lg:col-span-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Gross", v: "$1.42M", tone: "accent" },
              { l: "Tax withheld", v: "$284k", tone: "muted" },
              { l: "Net",   v: "$1.13M", tone: "success" },
              { l: "Bonuses",  v: "$92k",  tone: "accent" },
            ].map((p, i) => (
              <motion.div key={p.l}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded border border-accent/15 bg-main/50 p-3">
                <div className="text-[10px] uppercase tracking-wider text-secondary/55">{p.l}</div>
                <div className={`text-xl font-bold tabular-nums mt-1 ${p.tone === "success" ? "text-emerald-300" : p.tone === "accent" ? "text-accent" : "text-secondary/70"}`}>
                  {p.v}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <StatusPill label="next payroll · Sep 25" tone="info" />
            <StatusPill label="approved" tone="success" />
          </div>
        </Panel>

        <Panel title="Upcoming · people" className="lg:col-span-2">
          <ul className="space-y-2 text-xs">
            {upcoming.map((u, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-2 rounded border border-accent/10 bg-main/40"
              >
                <div>
                  <div className="text-secondary">{u.name}</div>
                  <div className="text-[10px] text-secondary/50 font-mono">{u.date}</div>
                </div>
                <StatusPill label={u.type} tone={u.tone} />
              </motion.li>
            ))}
          </ul>
        </Panel>
      </div>
    </DemoShell>
  )
}
