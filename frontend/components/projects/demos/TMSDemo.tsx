"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, PulseDot, AnimatedNumber } from "./shared/primitives"

/**
 * TMS — Transportation Management. Live fleet map, route optimization.
 */
export function TMSDemo() {
  // Vehicles moving along a route polyline
  const trucks = [
    { id: "TRK-12", driver: "Yuda",  route: "JKT → BDG",  status: "moving",  tone: "success" as const },
    { id: "TRK-18", driver: "Ari",   route: "SBY → MLG",   status: "loading", tone: "warn"    as const },
    { id: "TRK-22", driver: "Dewi", route: "JKT → SBY",    status: "moving",  tone: "success" as const },
    { id: "TRK-09", driver: "Bagas", route: "BDG → CGK",    status: "delayed", tone: "danger"  as const },
  ]
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <DemoShell
      title="Transportation Management"
      subtitle="Fleet live · route optimization · proof-of-delivery"
      status="live"
      kpis={[
        { label: "Active fleet",  value: "12 / 14" },
        { label: "On-time",       value: "94%",     trend: "up" },
        { label: "Avg km / drop", value: "8.4km",   trend: "down" },
        { label: "Fuel saved",     value: "−18%",   trend: "down" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Live map · Java region"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-emerald-400" /><span className="text-[10px] uppercase tracking-wider text-emerald-300">tracking</span></div>}
          className="lg:col-span-3">
          <div className="relative w-full overflow-hidden rounded bg-card/40 border border-accent/15" style={{ aspectRatio: "16 / 9" }}>
            <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              {/* island silhouette */}
              <path
                d="M 10 60 Q 30 50, 50 55 T 90 50 Q 120 48, 150 60 L 150 80 L 10 80 Z"
                fill="rgba(218,165,32,0.08)"
                stroke="rgba(218,165,32,0.25)"
                strokeWidth={0.3}
              />
              {/* city markers */}
              {[
                { x: 30, y: 62, name: "Jakarta" },
                { x: 56, y: 64, name: "Bandung" },
                { x: 96, y: 60, name: "Semarang" },
                { x: 132, y: 64, name: "Surabaya" },
              ].map((c) => (
                <g key={c.name}>
                  <circle cx={c.x} cy={c.y} r={1.5} fill="#daa520" />
                  <text x={c.x} y={c.y - 3} fontSize={3} fill="rgba(217,217,217,0.8)" fontFamily="monospace" textAnchor="middle">{c.name}</text>
                </g>
              ))}
              {/* route lines */}
              <path d="M 30 62 Q 42 56, 56 64" fill="none" stroke="rgba(218,165,32,0.5)" strokeWidth={0.4} strokeDasharray="1 0.8" />
              <path d="M 56 64 Q 78 56, 96 60" fill="none" stroke="rgba(218,165,32,0.4)" strokeWidth={0.4} strokeDasharray="1 0.8" />
              <path d="M 96 60 Q 114 56, 132 64" fill="none" stroke="rgba(218,165,32,0.4)" strokeWidth={0.4} strokeDasharray="1 0.8" />

              {/* moving truck icons */}
              {[
                { x0: 30, y0: 62, x1: 56, y1: 64, color: "#10b981", id: "t1" },
                { x0: 56, y0: 64, x1: 96, y1: 60, color: "#daa520", id: "t2" },
                { x0: 96, y0: 60, x1: 132, y1: 64, color: "#f59e0b", id: "t3" },
              ].map((t) => (
                <motion.g key={t.id + pulse}>
                  <motion.circle
                    r={1.6}
                    fill={t.color}
                    initial={{ cx: t.x0, cy: t.y0, opacity: 0 }}
                    animate={{ cx: t.x1, cy: t.y1, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, ease: "linear" }}
                    style={{ filter: `drop-shadow(0 0 4px ${t.color})` }}
                  />
                </motion.g>
              ))}
            </svg>
          </div>
        </Panel>

        <Panel title="Active fleet" className="lg:col-span-2">
          <div className="space-y-2 max-h-[280px] overflow-y-auto scrollbar-hide">
            {trucks.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded border border-accent/15 bg-card/50 p-2.5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-accent font-mono">{t.id}</span>
                  <StatusPill label={t.status} tone={t.tone} />
                </div>
                <div className="text-[11px] text-foreground/70 font-mono">{t.route} · {t.driver}</div>
              </motion.div>
            ))}
          </div>
        </Panel>

        <Panel title="Today's metrics" className="lg:col-span-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Stops planned", v: 184, suf: "" },
              { l: "Stops completed", v: 142, suf: "" },
              { l: "Km driven",  v: 2840, suf: "km" },
              { l: "On-time %",   v: 94,   suf: "%" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded border border-accent/15 bg-card/50 p-3">
                <div className="text-[10px] uppercase tracking-wider text-foreground/55">{s.l}</div>
                <div className="text-xl font-bold text-accent tabular-nums mt-1">
                  <AnimatedNumber value={s.v} suffix={s.suf} />
                </div>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
