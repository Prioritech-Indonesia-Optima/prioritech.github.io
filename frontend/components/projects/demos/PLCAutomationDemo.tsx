"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { AnimatedTerminal, Panel, PulseDot, TermLine } from "./shared/primitives"

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

  const term: TermLine[] = [
    { kind: "cmd", text: "scada attach plc-floor-1 --realtime" },
    { kind: "info", text: "Connected · Modbus TCP @ 192.168.2.40 · scan 100ms" },
    { kind: "ok", text: "Loop tuning · PID(2.1, 0.4, 0.05) within band" },
    { kind: "warn", text: "Temp #1 trending +0.4°C/min · pre-alarm" },
    { kind: "info", text: "Activating cooling stage 2 · valve V-12 OPEN" },
    { kind: "ok", text: "Recovered · Temp #1 stabilized 67.4°C" },
    { kind: "info", text: "Cycle 18342 complete · 24.3s · within tolerance" },
  ]

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
                <div key={s.name} className="rounded border border-accent/15 bg-main/50 p-3">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-secondary/55">{s.name}</span>
                    <span className="text-[10px] text-secondary/40">{s.unit}</span>
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
          <AnimatedTerminal lines={term} height={240} />
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
                <div key={i} className="flex items-center justify-between p-2 rounded border border-accent/10 bg-main/40">
                  <span className="text-secondary/70">{io.k}</span>
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
