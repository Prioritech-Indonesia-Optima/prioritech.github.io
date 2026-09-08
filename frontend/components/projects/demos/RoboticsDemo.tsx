"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { AnimatedTerminal, Panel, PulseDot, TermLine, Sparkline } from "./shared/primitives"

/**
 * Robotic R&D Series — drone telemetry + AI CCTV + ROS status.
 */
export function RoboticsDemo() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 500)
    return () => clearInterval(id)
  }, [])

  // Drone telemetry: altitude oscillates, battery decreases
  const alt = +(45 + Math.sin(tick * 0.3) * 3).toFixed(1)
  const battery = Math.max(20, 92 - tick * 0.1)
  const heading = (tick * 6) % 360

  const altSeries = Array.from({ length: 24 }, (_, i) => 45 + Math.sin((tick - 24 + i) * 0.3) * 3)

  const term: TermLine[] = [
    { kind: "cmd", text: "ros2 launch fleet_ctrl swarm.launch.py n=4" },
    { kind: "ok", text: "/drone_0 · armed · waypoint 3/12" },
    { kind: "ok", text: "/drone_1 · armed · perimeter sweep" },
    { kind: "info", text: "/cctv_03 · detection person count: 2" },
    { kind: "warn", text: "/drone_2 · GPS HDOP 1.8 · degraded" },
    { kind: "ok", text: "/drone_3 · battery 78% · ETA 12m" },
    { kind: "info", text: "ROS topics: 312 · QoS reliable · LAN 312Mbps" },
  ]

  return (
    <DemoShell
      title="Robotic R&D Series"
      subtitle="Drones, AI CCTV, mobile robots — autonomy + reliability under one stack"
      status="live"
      kpis={[
        { label: "Active units", value: "4 / 4" },
        { label: "Battery avg",  value: `${battery.toFixed(0)}%`, trend: "down" },
        { label: "Telemetry",    value: "120Hz" },
        { label: "Range",        value: "8.2km" },
      ]}
    >
      <div className="grid lg:grid-cols-6 gap-4">
        <Panel title="Drone-01 · HUD"
          className="lg:col-span-3"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-emerald-400" /><span className="text-[10px] uppercase tracking-wider text-emerald-300">ARMED</span></div>}>
          <div className="relative w-full overflow-hidden rounded bg-black" style={{ aspectRatio: "16 / 9" }}>
            {/* sky-to-ground gradient */}
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, #1a2233 0%, #3a3a3a 70%, #2a2a2a 100%)" }} />
            <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              {/* horizon */}
              <line x1={0} y1={45 + Math.sin(tick * 0.2) * 3} x2={160} y2={45 - Math.sin(tick * 0.2) * 3}
                stroke="rgba(218,165,32,0.5)" strokeWidth={0.4} />
              {/* compass */}
              <g transform="translate(80, 14)">
                <circle r={10} fill="none" stroke="rgba(218,165,32,0.4)" strokeWidth={0.3} />
                <text textAnchor="middle" y={2.4} fontSize={3.5} fontFamily="monospace" fill="#daa520">
                  {heading.toFixed(0).padStart(3, "0")}°
                </text>
                <text textAnchor="middle" y={-6} fontSize={2} fill="rgba(218,165,32,0.6)">N</text>
              </g>
              {/* reticle */}
              <g stroke="#daa520" strokeWidth={0.3}>
                <line x1={70} y1={45} x2={78} y2={45} />
                <line x1={82} y1={45} x2={90} y2={45} />
                <line x1={80} y1={37} x2={80} y2={43} />
                <line x1={80} y1={47} x2={80} y2={53} />
              </g>
              {/* corners */}
              <text x={3} y={10} fontSize={3} fill="#10b981" fontFamily="monospace">ALT  {alt.toFixed(1)}m</text>
              <text x={3} y={84} fontSize={3} fill="#10b981" fontFamily="monospace">SPD  12.4m/s</text>
              <text x={130} y={10} fontSize={3} fill="#10b981" fontFamily="monospace" textAnchor="start">BAT {battery.toFixed(0)}%</text>
              <text x={130} y={84} fontSize={3} fill="#10b981" fontFamily="monospace" textAnchor="start">WP 3/12</text>
            </svg>
          </div>
          <div className="mt-3">
            <div className="text-[10px] uppercase tracking-wider text-foreground/55 mb-1">Altitude · last 24s</div>
            <div className="text-accent w-full">
              <Sparkline points={altSeries} height={48} width={320} className="w-full h-12" stroke="#daa520" />
            </div>
          </div>
        </Panel>

        <Panel title="CCTV-03 · gate" className="lg:col-span-3">
          <div className="relative w-full overflow-hidden rounded bg-black" style={{ aspectRatio: "16 / 9" }}>
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)" }} />
            {/* moving people */}
            <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <motion.rect x={(tick * 0.6) % 130 + 10} y={48} width={8} height={20}
                fill="transparent" stroke="#daa520" strokeWidth={0.3} animate={{ x: ((tick * 0.6) % 130) + 10 }} />
              <text x={(tick * 0.6) % 130 + 11} y={47} fontSize={2.2} fill="#daa520" fontFamily="monospace">person 0.96</text>
              <motion.rect x={140 - ((tick * 0.4) % 130)} y={42} width={8} height={20}
                fill="transparent" stroke="#10b981" strokeWidth={0.3} />
              <text x={140 - ((tick * 0.4) % 130) + 1} y={41} fontSize={2.2} fill="#10b981" fontFamily="monospace">person 0.91</text>
              <text x={3} y={10} fontSize={3} fill="#10b981" fontFamily="monospace">CCTV-03 · GATE-E</text>
              <text x={3} y={84} fontSize={3} fill="#daa520" fontFamily="monospace">PERSONS: 2 · BAGS: 1</text>
            </svg>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Bar pct={92} label="Detector" value="0.92" tone="success" />
            <Bar pct={78} label="Tracker" value="0.78" tone="accent" />
            <Bar pct={44} label="Re-ID" value="0.44" tone="warn" />
          </div>
        </Panel>

        <div className="lg:col-span-6">
          <AnimatedTerminal lines={term} height={180} />
        </div>
      </div>
    </DemoShell>
  )
}
