"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { Panel, PulseDot } from "./shared/primitives"
import { easing, duration } from "@/lib/motion"

/**
 * Context-Aware Data Engine — vector retrieval with feedback loop visualization
 */
export function ContextAwareDemo() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200)
    return () => clearInterval(id)
  }, [])

  const cloud = [
    { x: 20, y: 35 }, { x: 28, y: 48 }, { x: 35, y: 25 }, { x: 42, y: 60 },
    { x: 48, y: 38 }, { x: 55, y: 70 }, { x: 60, y: 45 }, { x: 68, y: 30 },
    { x: 72, y: 58 }, { x: 78, y: 42 }, { x: 85, y: 50 }, { x: 90, y: 35 },
    { x: 15, y: 65 }, { x: 25, y: 80 }, { x: 65, y: 80 }, { x: 80, y: 75 },
  ]
  const query = { x: 50, y: 50 }
  const k = 5
  const topK = cloud
    .map((p, i) => ({ i, d: Math.hypot(p.x - query.x, p.y - query.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
    .map((d) => d.i)

  const docs = [
    { src: "policy_v3.pdf", score: 0.92, snippet: "…retention period extends 7 years for contractual records…" },
    { src: "ops_2025q3.md", score: 0.88, snippet: "…quarterly review introduced rolling backfill on cold data…" },
    { src: "schema_doc.sql", score: 0.84, snippet: "…orders.region indexed; partition by created_at month…" },
  ]

  return (
    <DemoShell
      title="Context-Aware Data Engine"
      subtitle="Adaptive retrieval with feedback loop — embeddings + reranker + audit"
      status="live"
      kpis={[
        { label: "Recall@5", value: "0.94", trend: "up" },
        { label: "Vectors", value: "2.1M", hint: "shards × 4" },
        { label: "Reranker", value: "92ms", trend: "down" },
        { label: "Feedback", value: "+18%", trend: "up", hint: "quality" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel
          title="Vector space · embedding cloud"
          right={<PulseDot color="bg-accent" />}
          className="lg:col-span-3"
        >
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 12.5} x2={i * 12.5} y1={0} y2={100}
                  stroke="rgba(218,165,32,0.06)" strokeWidth={0.2} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h${i}`} y1={i * 16.7} y2={i * 16.7} x1={0} x2={100}
                  stroke="rgba(218,165,32,0.06)" strokeWidth={0.2} />
              ))}
              <motion.circle
                cx={query.x} cy={query.y} r={1}
                fill="none" stroke="rgba(218,165,32,0.5)" strokeWidth={0.4}
                key={`ring-${tick}`}
                initial={{ r: 1, opacity: 0.8 }}
                animate={{ r: 35, opacity: 0 }}
                transition={{ duration: 1.6, ease: easing.outQuart }}
              />
              {cloud.map((p, i) => {
                const inTop = topK.includes(i)
                return (
                  <g key={i}>
                    {inTop && (
                      <line x1={query.x} y1={query.y} x2={p.x} y2={p.y}
                        stroke="rgba(218,165,32,0.4)" strokeWidth={0.3} strokeDasharray="0.6 0.8" />
                    )}
                    <motion.circle cx={p.x} cy={p.y} r={inTop ? 1.3 : 0.9}
                      fill={inTop ? "#daa520" : "rgba(217,217,217,0.35)"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04, duration: duration.fast }} />
                  </g>
                )
              })}
              <circle cx={query.x} cy={query.y} r={1.4} fill="#daa520" stroke="#fff8" strokeWidth={0.3} />
            </svg>
            <div className="absolute bottom-2 left-2 text-[10px] text-foreground/50 font-mono">
              dim_reduce(pca) · k={k}
            </div>
          </div>
        </Panel>

        <Panel title="Top-K retrieved" className="lg:col-span-2">
          <div className="space-y-3">
            {docs.map((d, i) => (
              <motion.div
                key={d.src + tick}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: duration.base, ease: easing.outExpo }}
                className="rounded border border-accent/15 bg-card/50 p-2.5"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-accent font-mono truncate">{d.src}</span>
                  <span className="text-xs text-foreground/70 tabular-nums">{d.score}</span>
                </div>
                <p className="text-[11px] text-foreground/60 leading-relaxed italic">{d.snippet}</p>
              </motion.div>
            ))}
            <div className="pt-2 border-t border-accent/10">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider text-foreground/55">Feedback signal</span>
                <StatusPill label="+0.18" tone="success" />
              </div>
              <Bar pct={88} tone="success" />
              <div className="text-[10px] text-foreground/40 mt-1">↑ reranker boosted next iteration</div>
            </div>
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
