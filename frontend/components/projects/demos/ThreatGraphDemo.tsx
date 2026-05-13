"use client"

import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, PulseDot } from "./shared/primitives"

/**
 * Threat Graph Correlator — live network of correlated anomalies.
 */
export function ThreatGraphDemo() {
  const nodes = [
    { id: "auth",   x: 18, y: 22, label: "auth-srv",   tone: "ok" },
    { id: "api",    x: 50, y: 18, label: "api-edge",   tone: "warn" },
    { id: "db",     x: 82, y: 28, label: "db-cluster", tone: "ok" },
    { id: "worker", x: 30, y: 56, label: "worker",     tone: "warn" },
    { id: "crit",   x: 60, y: 54, label: "anomaly ✦",  tone: "alert" },
    { id: "cache",  x: 86, y: 68, label: "cache-eu",   tone: "ok" },
    { id: "log",    x: 14, y: 82, label: "log-ingest", tone: "ok" },
    { id: "ml",     x: 50, y: 84, label: "ml-detect",  tone: "ok" },
  ] as { id: string; x: number; y: number; label: string; tone: "ok" | "warn" | "alert" }[]

  const edges: [string, string][] = [
    ["auth", "api"], ["api", "db"], ["api", "worker"], ["worker", "crit"],
    ["crit", "cache"], ["worker", "log"], ["log", "ml"], ["ml", "crit"],
    ["api", "crit"], ["auth", "worker"],
  ]

  const toneFill = { ok: "#10b981", warn: "#f59e0b", alert: "#daa520" }
  const toneGlow = { ok: "rgba(16,185,129,0.4)", warn: "rgba(245,158,11,0.4)", alert: "rgba(218,165,32,0.6)" }
  const lookup = Object.fromEntries(nodes.map((n) => [n.id, n]))

  const events: { time: string; text: string; tone: "warn" | "alert" | "ok" }[] = [
    { time: "13:42:18", text: "Lateral movement · worker → cache-eu", tone: "warn" },
    { time: "13:42:21", text: "Repeated 401s · auth → api-edge",      tone: "warn" },
    { time: "13:42:24", text: "Anomaly correlated · weight 0.91",     tone: "alert" },
    { time: "13:42:27", text: "Auto-isolated worker fleet",            tone: "ok" },
  ]

  return (
    <DemoShell
      title="Threat Graph Correlator"
      subtitle="Graph intelligence · cross-system anomalies → actionable signal"
      status="alert"
      kpis={[
        { label: "Events / min", value: "12.4k" },
        { label: "Edges live", value: "418k" },
        { label: "Anomalies", value: "3", trend: "up", hint: "last 5m" },
        { label: "MTTR", value: "−61%", trend: "down" },
      ]}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Panel
          title="Live correlation graph"
          right={
            <div className="flex items-center gap-2">
              <PulseDot color="bg-accent" />
              <span className="text-[10px] uppercase tracking-wider text-accent">streaming</span>
            </div>
          }
          className="md:col-span-1 lg:col-span-3"
        >
          <div className="relative w-full" style={{ aspectRatio: "5 / 3" }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              {edges.map(([a, b], i) => {
                const A = lookup[a], B = lookup[b]
                const active = a === "crit" || b === "crit"
                return (
                  <g key={i}>
                    <line x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                      stroke={active ? "rgba(218,165,32,0.5)" : "rgba(217,217,217,0.15)"}
                      strokeWidth={active ? 0.5 : 0.25}
                      strokeDasharray={active ? "0.8 0.6" : undefined} />
                    {active && (
                      <motion.circle
                        key={`p-${i}`}
                        r={0.7}
                        fill="#daa520"
                        animate={{ cx: [A.x, B.x], cy: [A.y, B.y], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 0.6,
                          delay: i * 0.28,
                        }}
                      />
                    )}
                  </g>
                )
              })}
              {nodes.map((n) => (
                <g key={n.id}>
                  <motion.circle
                    cx={n.x} cy={n.y}
                    r={n.tone === "alert" ? 2.4 : 1.7}
                    fill={toneFill[n.tone]}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ filter: `drop-shadow(0 0 6px ${toneGlow[n.tone]})` }}
                  />
                  {n.tone === "alert" && (
                    <motion.circle cx={n.x} cy={n.y} r={2.4}
                      fill="none" stroke={toneFill[n.tone]} strokeWidth={0.3}
                      animate={{ r: [2.4, 6], opacity: [0.6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }} />
                  )}
                  <text x={n.x} y={n.y - 3.2} textAnchor="middle" fontSize={2.4}
                    fill={n.tone === "alert" ? "#daa520" : "rgba(217,217,217,0.8)"} fontFamily="monospace">
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Panel>

        <div className="md:col-span-1 lg:col-span-2 space-y-4">
          <Panel title="Correlated events">
            <ul className="space-y-2">
              {events.map((e, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="text-xs"
                >
                  <span className="text-secondary/40 font-mono mr-2">{e.time}</span>
                  <span className={
                    e.tone === "alert" ? "text-accent"
                    : e.tone === "warn" ? "text-amber-300"
                    : "text-emerald-300"
                  }>
                    {e.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Panel>
          <Panel title="Anomaly score">
            <Bar pct={91} label="Correlation weight" value="0.91" tone="warn" />
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <StatusPill label="T1021 lateral" tone="warn" />
              <StatusPill label="T1071 C2" tone="warn" />
              <StatusPill label="auto-isolated" tone="success" />
            </div>
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}
