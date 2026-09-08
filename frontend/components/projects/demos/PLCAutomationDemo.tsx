"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, PulseDot, LineChart } from "./shared/primitives"

/**
 * PLC Automation Suite — industrial control dashboard.
 */
export function PLCAutomationDemo() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [])

  const sensors = [
    { name: "Pressure A", unit: "bar",  base: 4.2, range: 0.1, max: 6, tone: "ok" },
    { name: "Pressure B", unit: "bar",  base: 4.4, range: 0.15, max: 6, tone: "ok" },
    { name: "Temp #1",    unit: "°C",   base: 68,  range: 1.5, max: 90, tone: "warn" },
    { name: "Temp #2",    unit: "°C",   base: 72,  range: 1.8, max: 90, tone: "ok" },
    { name: "Flow rate",  unit: "L/min", base: 122, range: 4,  max: 180, tone: "ok" },
    { name: "Vibration",  unit: "mm/s", base: 0.8, range: 0.06, max: 4.5, tone: "ok" },
  ] as const

  // Cycle time trend (seconds) — recent 20 cycles, deterministic
  const cycleTrend = Array.from({ length: 20 }, (_, i) =>
    +(24.3 + Math.sin(i * 0.5) * 0.25 + Math.cos(i * 0.2) * 0.12).toFixed(2)
  )

  return (
    <DemoShell
      title="PLC Automation Suite"
      subtitle="Industrial control · sensors, alarms, deterministic timing"
      status="live"
      kpis={[
        { label: "Cycle", value: "24.3s", trend: "flat", hint: "tol ±0.2s" },
        { label: "Uptime", value: "99.97%" },
        { label: "Alarms",  value: "1",     trend: "up", hint: "pre-alarm" },
        { label: "Energy",  value: "−14%", trend: "down" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Live telemetry" className="lg:col-span-3"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-emerald-400" /><span className="text-[10px] uppercase tracking-wider text-emerald-300">100ms scan</span></div>}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {sensors.map((s) => {
              const value = +(s.base + Math.sin(tick * 0.5 + s.name.length) * s.range).toFixed(2)
              const pct = Math.min(100, Math.round((value / s.max) * 100))
              const tone = s.tone === "warn" || pct > 85 ? "warn" : pct > 70 ? "accent" : "success"
              return (
                <div key={s.name} className="rounded border border-accent/15 bg-card/50 p-3">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-foreground/55">{s.name}</span>
                    <span className="text-[10px] text-foreground/40">{s.unit}</span>
                  </div>
                  <motion.div
                    key={`${s.name}-${tick}`}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-accent tabular-nums mb-2"
                  >
                    {value}
                  </motion.div>
                  <Bar pct={pct} tone={tone} />
                </div>
              )
            })}
          </div>
        </Panel>

        <div className="lg:col-span-2 space-y-4">
          <Panel title="Closed control loop" right={<span className="text-[10px] uppercase tracking-wider text-foreground/40">100ms scan</span>}>
            <ControlLoopDiagram />
          </Panel>
          <Panel title="Cycle time · last 20 cycles">
            <LineChart
              series={cycleTrend}
              xLabels={["−20", "−15", "−10", "−5", "now"]}
              yMin={23.9}
              yMax={24.7}
              yFormat={(v) => `${v.toFixed(1)}s`}
              stroke="#daa520"
              height={120}
            />
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-foreground/45">
              <span>target 24.3s · tol ±0.2s</span>
              <span className="text-emerald-300">in band</span>
            </div>
          </Panel>
          <Panel title="I/O state">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { k: "V-12 valve", v: "OPEN", tone: "success" },
                { k: "M-04 motor", v: "RUN", tone: "success" },
                { k: "Conveyor C2", v: "FWD", tone: "success" },
                { k: "Heater H-1", v: "OFF", tone: "muted" },
                { k: "Pump P-7", v: "RUN", tone: "success" },
                { k: "Estop circuit", v: "OK", tone: "success" },
              ].map((io, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded border border-accent/10 bg-card/40">
                  <span className="text-foreground/70">{io.k}</span>
                  <StatusPill label={io.v} tone={io.tone as "success" | "muted"} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}

/**
 * Educational closed-loop control diagram: sensor → controller → actuator →
 * process → back to sensor. Shows the feedback cycle a PLC executes each scan.
 */
function ControlLoopDiagram() {
  const nodes = [
    { x: 22, y: 22, label: "SENSOR", sub: "measure" },
    { x: 78, y: 22, label: "CONTROLLER", sub: "PLC · PID" },
    { x: 78, y: 78, label: "ACTUATOR", sub: "valve / motor" },
    { x: 22, y: 78, label: "PROCESS", sub: "plant" },
  ]
  // connectors: [x1,y1,x2,y2]
  const edges: [number, number, number, number][] = [
    [34, 22, 66, 22], // sensor -> controller
    [78, 34, 78, 66], // controller -> actuator
    [66, 78, 34, 78], // actuator -> process
    [22, 66, 22, 34], // process -> sensor
  ]
  return (
    <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {edges.map(([x1, y1, x2, y2], i) => {
          const dx = x2 - x1
          const dy = y2 - y1
          const len = Math.hypot(dx, dy) || 1
          const ux = dx / len
          const uy = dy / len
          // arrowhead at end
          const ah = 3
          const p1x = x2 - ux * ah - uy * ah * 0.6
          const p1y = y2 - uy * ah + ux * ah * 0.6
          const p2x = x2 - ux * ah + uy * ah * 0.6
          const p2y = y2 - uy * ah - ux * ah * 0.6
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(218,165,32,0.35)" strokeWidth={0.6} />
              <polygon points={`${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`} fill="rgba(218,165,32,0.7)" />
              <motion.circle
                r={1}
                fill="#daa520"
                initial={{ cx: x1, cy: y1, opacity: 0 }}
                animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
              />
            </g>
          )
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <rect
              x={n.x - 13}
              y={n.y - 8}
              width={26}
              height={16}
              rx={2}
              fill="rgba(218,165,32,0.1)"
              stroke="rgba(218,165,32,0.4)"
              strokeWidth={0.5}
            />
            <text x={n.x} y={n.y - 0.5} textAnchor="middle" fontSize={2.6} fill="#daa520" fontFamily="monospace" fontWeight="bold">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 4.5} textAnchor="middle" fontSize={2.2} fill="rgba(232,232,232,0.6)" fontFamily="monospace">
              {n.sub}
            </text>
          </g>
        ))}
        {/* center label */}
        <text x={50} y={50} textAnchor="middle" fontSize={2.4} fill="rgba(232,232,232,0.35)" fontFamily="monospace">
          feedback loop
        </text>
      </svg>
    </div>
  )
}
