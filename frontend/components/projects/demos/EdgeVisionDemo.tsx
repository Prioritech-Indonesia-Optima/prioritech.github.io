"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, AnimatedTerminal, TermLine, PulseDot } from "./shared/primitives"

/**
 * Edge-Vision Analytics — simulated camera feed with bounding-box detections.
 */
export function EdgeVisionDemo() {
  type Box = { id: number; x: number; y: number; w: number; h: number; cls: string; conf: number }
  const palette: Record<string, string> = {
    person: "#daa520",
    forklift: "#10b981",
    box: "#3b82f6",
    pallet: "#f59e0b",
  }

  const frames: Box[][] = [
    [
      { id: 1, x: 8,  y: 25, w: 14, h: 38, cls: "person",   conf: 0.94 },
      { id: 2, x: 42, y: 30, w: 28, h: 42, cls: "forklift", conf: 0.91 },
      { id: 3, x: 76, y: 45, w: 18, h: 22, cls: "pallet",   conf: 0.88 },
    ],
    [
      { id: 1, x: 12, y: 26, w: 14, h: 38, cls: "person",   conf: 0.95 },
      { id: 2, x: 46, y: 30, w: 28, h: 42, cls: "forklift", conf: 0.92 },
      { id: 3, x: 74, y: 45, w: 18, h: 22, cls: "pallet",   conf: 0.87 },
      { id: 4, x: 22, y: 60, w: 10, h: 14, cls: "box",      conf: 0.82 },
    ],
    [
      { id: 1, x: 16, y: 27, w: 14, h: 38, cls: "person",   conf: 0.96 },
      { id: 2, x: 50, y: 31, w: 28, h: 42, cls: "forklift", conf: 0.93 },
      { id: 3, x: 72, y: 45, w: 18, h: 22, cls: "pallet",   conf: 0.85 },
      { id: 4, x: 26, y: 60, w: 10, h: 14, cls: "box",      conf: 0.84 },
    ],
    [
      { id: 1, x: 20, y: 28, w: 14, h: 38, cls: "person",   conf: 0.97 },
      { id: 2, x: 54, y: 31, w: 28, h: 42, cls: "forklift", conf: 0.94 },
      { id: 4, x: 30, y: 60, w: 10, h: 14, cls: "box",      conf: 0.86 },
    ],
  ]

  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % frames.length), 700)
    return () => clearInterval(id)
  }, [])

  const boxes = frames[frame]

  const term: TermLine[] = [
    { kind: "cmd", text: "edgevision --model yolov8n --src /dev/video0 --device cpu0" },
    { kind: "info", text: "Loaded weights · 6.2MB · int8 quantized" },
    { kind: "ok", text: "Inference 38ms · 24 FPS · 4 classes" },
    { kind: "warn", text: "Worker proximity to forklift · 1.2m · alerting" },
    { kind: "info", text: "Published metrics to mqtt://factory-1/safety" },
    { kind: "ok", text: "All telemetry persisted to edge.duckdb" },
  ]

  return (
    <DemoShell
      title="Edge-Vision Analytics"
      subtitle="On-device CV · object + safety detection at the edge"
      status="live"
      kpis={[
        { label: "FPS", value: "24", trend: "up" },
        { label: "Inference", value: "38ms", trend: "down" },
        { label: "Model", value: "YOLOv8n", hint: "int8" },
        { label: "Power", value: "8W", hint: "edge SoC" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Camera · Bay 03"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-rose-400" /><span className="text-[10px] uppercase tracking-wider text-rose-300">REC</span></div>}
          className="lg:col-span-3">
          <div className="relative w-full overflow-hidden rounded bg-black" style={{ aspectRatio: "16 / 9" }}>
            {/* fake camera grain + warehouse silhouette */}
            <div className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 60%, #0e0e0e 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 30px, rgba(255,255,255,0) 30px 60px)",
              }}
            />
            {/* HUD reticle */}
            <div className="absolute top-2 left-2 text-[10px] font-mono text-emerald-300/80">
              ● REC  · 1080p · {(38 + Math.sin(frame) * 4).toFixed(0)}ms
            </div>
            <div className="absolute top-2 right-2 text-[10px] font-mono text-foreground/60">
              CAM-03 · 14:02:{18 + frame}
            </div>

            <svg viewBox="0 0 100 56.25" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <AnimatePresence>
                {boxes.map((b) => (
                  <g key={b.id}>
                    <motion.rect
                      x={b.x} y={b.y * 0.56} width={b.w} height={b.h * 0.56}
                      rx={0.5}
                      fill="transparent"
                      stroke={palette[b.cls]}
                      strokeWidth={0.3}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                    <rect x={b.x} y={b.y * 0.56 - 2.4} width={b.cls.length * 1.5 + 6} height={2.2}
                      fill={palette[b.cls]} opacity={0.85} />
                    <text x={b.x + 0.5} y={b.y * 0.56 - 0.8} fontSize={1.6} fontFamily="monospace" fill="#111">
                      {b.cls} {b.conf.toFixed(2)}
                    </text>
                  </g>
                ))}
              </AnimatePresence>
            </svg>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(palette).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5 text-[10px] text-foreground/70 font-mono">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: v }} />
                {k}
              </div>
            ))}
          </div>
        </Panel>

        <div className="lg:col-span-2 space-y-4">
          <AnimatedTerminal lines={term} height={220} />
          <Panel title="Safety metrics">
            <Bar pct={88} label="Detection accuracy" value="0.91"  tone="accent" />
            <div className="h-2" />
            <Bar pct={32} label="Proximity alerts"    value="3 / hr" tone="warn" />
            <div className="h-2" />
            <Bar pct={12} label="False positives"      value="1.2%"  tone="success" />
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}
