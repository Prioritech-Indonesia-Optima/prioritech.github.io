"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Brain, Shield, TrendingUp, Cog, Layers, type LucideIcon } from "lucide-react"
import { Sparkline } from "@/components/projects/demos/shared/primitives"
import { revealContainer, revealItem, easing } from "@/lib/motion"

/**
 * 5-tile bento — one hero + four supporting. Each tile previews its division
 * with a different micro-visualization. All inline, no modals.
 */
export function DivisionBento() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32 overflow-hidden">
      <div className="aurora-orb aurora-orb--gold" style={{ width: "55vw", height: "55vw", top: "-15vw", right: "-15vw", opacity: 0.15 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="text-accent font-mono text-sm tracking-wider mb-3">$ engineering divisions</p>
          <h2 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-tight mb-4">
            Five divisions, one operating system.
          </h2>
          <p className="text-secondary/65 text-base sm:text-lg leading-relaxed">
            Each division ships independently — but they share infrastructure, observability, and engineering principles. Cross-disciplinary by design.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealContainer(0.1, 0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Hero tile — AI Systems (spans 2 cols + 2 rows on lg) */}
          <BentoTile
            href="/divisions"
            title="AI Systems & Orchestration"
            tagline="Retrieval, automation, and workflows that make decisions auditable."
            Icon={Brain}
            accent
            className="lg:col-span-2 lg:row-span-2"
          >
            <AIPreview />
          </BentoTile>

          <BentoTile
            href="/divisions"
            title="Cybersecurity"
            tagline="Pentesting, anomaly detection, graph risk."
            Icon={Shield}
          >
            <CyberPreview />
          </BentoTile>

          <BentoTile
            href="/divisions"
            title="Quantitative"
            tagline="Predictive models, trading, real-time forecasting."
            Icon={TrendingUp}
          >
            <QuantPreview />
          </BentoTile>

          <BentoTile
            href="/divisions"
            title="Automation & Robotics"
            tagline="PLC, IoT, edge — data with motion."
            Icon={Cog}
          >
            <AutomationPreview />
          </BentoTile>

          <BentoTile
            href="/divisions"
            title="Applied Engineering"
            tagline="Enterprise platforms · ERP, WMS, SCM, CRM."
            Icon={Layers}
          >
            <ProductPreview />
          </BentoTile>
        </motion.div>
      </div>
    </section>
  )
}

function BentoTile({
  href, title, tagline, Icon, accent = false, className = "", children,
}: {
  href: string
  title: string
  tagline: string
  Icon: LucideIcon
  accent?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div variants={revealItem} className={className}>
      <Link
        href={href}
        className={`
          group relative block h-full rounded-2xl border overflow-hidden
          transition-all duration-500 ease-out
          ${accent
            ? "border-accent/30 bg-gradient-to-br from-main/95 via-main to-main/80 hover:border-accent/60"
            : "border-accent/15 bg-main/60 backdrop-blur-sm hover:border-accent/40 hover:bg-main/80"}
          hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10
        `}
      >
        {/* Hover gradient sweep */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex flex-col h-full p-5 sm:p-6">
          {/* Top row: icon + arrow */}
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${accent ? "bg-accent/20" : "bg-accent/10"} group-hover:bg-accent/25 transition-colors`}>
              <Icon size={20} className="text-accent" />
            </div>
            <ArrowUpRight size={18} className="text-secondary/40 group-hover:text-accent group-hover:rotate-12 transition-all duration-300" />
          </div>

          {/* Preview area — flexible */}
          <div className="flex-1 mb-4 min-h-[100px]">
            {children}
          </div>

          {/* Title + tagline */}
          <div>
            <h3 className={`font-mono font-semibold leading-tight mb-1.5 ${accent ? "text-secondary text-xl sm:text-2xl" : "text-secondary text-base sm:text-lg"}`}>
              {title}
            </h3>
            <p className={`${accent ? "text-secondary/65 text-sm" : "text-secondary/55 text-xs"} leading-relaxed`}>
              {tagline}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// Per-tile previews — each is a tiny captivating visualization
// ============================================================================

function AIPreview() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1200)
    return () => clearInterval(id)
  }, [])

  const lines = [
    { p: "$", t: "iqa --q 'sales by region'", c: "text-accent" },
    { p: "›", t: "intent=analytics scope=q4", c: "text-sky-300" },
    { p: "›", t: "schema match · 4 entities", c: "text-sky-300" },
    { p: "✓", t: "SQL generated · 43ms", c: "text-emerald-300" },
    { p: "✓", t: "4 rows · $4.53M total", c: "text-emerald-300" },
  ]
  const visible = lines.slice(0, ((tick % 6) + 1))

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      <div className="rounded-lg bg-main/60 border border-accent/15 p-3 font-mono text-[11px] leading-snug">
        {visible.map((l, i) => (
          <motion.div
            key={`${tick}-${i}`}
            initial={{ opacity: 0, x: -3 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex gap-1.5"
          >
            <span className={`${l.c} flex-shrink-0`}>{l.p}</span>
            <span className="text-secondary/80 truncate">{l.t}</span>
          </motion.div>
        ))}
      </div>
      <div className="rounded-lg bg-main/60 border border-accent/15 p-3">
        <div className="text-[10px] uppercase tracking-wider text-secondary/45 mb-2">Q4 results</div>
        {["West", "North", "East", "South"].map((r, i) => {
          const pct = [100, 89, 83, 71][i]
          return (
            <div key={r} className="mb-1.5 last:mb-0">
              <div className="flex justify-between text-[10px] mb-0.5">
                <span className="text-secondary/65">{r}</span>
                <span className="text-accent">${[1320, 1180, 1090, 940][i]}k</span>
              </div>
              <div className="h-1 rounded-full bg-main/80 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent/60 to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: easing.outExpo }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CyberPreview() {
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1500)
    return () => clearInterval(id)
  }, [])
  const nodes = [
    { x: 20, y: 25 }, { x: 50, y: 22 }, { x: 80, y: 28 },
    { x: 35, y: 55 }, { x: 65, y: 60 }, { x: 50, y: 80 },
  ]
  const edges: [number, number][] = [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 5]]
  return (
    <div className="relative w-full h-full min-h-[100px]">
      <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {edges.map(([a, b], i) => (
          <g key={i}>
            <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke="rgba(218,165,32,0.25)" strokeWidth={0.5} />
            <motion.circle key={`${i}-${pulse}`} r={0.9} fill="#daa520"
              initial={{ cx: nodes[a].x, cy: nodes[a].y, opacity: 0 }}
              animate={{ cx: nodes[b].x, cy: nodes[b].y, opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, delay: i * 0.15 }}
            />
          </g>
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={i === 1 ? 2.4 : 1.6}
              fill={i === 1 ? "#daa520" : "rgba(217,217,217,0.7)"}
              style={{ filter: i === 1 ? "drop-shadow(0 0 4px rgba(218,165,32,0.6))" : undefined }}
            />
            {i === 1 && (
              <motion.circle cx={n.x} cy={n.y} r={2.4}
                fill="none" stroke="#daa520" strokeWidth={0.4}
                animate={{ r: [2.4, 6], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

function QuantPreview() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [])
  const series = Array.from({ length: 18 }, (_, i) =>
    100 + Math.sin((i + tick) * 0.4) * 12 + Math.cos((i + tick) * 0.2) * 6
  )
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-xl font-bold text-accent tabular-nums">$112.42</span>
        <span className="text-[10px] text-emerald-300">+1.9σ</span>
      </div>
      <div className="text-accent flex-1">
        <Sparkline points={series} height={80} width={200} className="w-full h-full" stroke="#daa520" />
      </div>
    </div>
  )
}

function AutomationPreview() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 800)
    return () => clearInterval(id)
  }, [])
  const sensors = [
    { name: "Pressure", base: 4.2, range: 0.2, unit: "bar" },
    { name: "Temp",     base: 68,  range: 2,   unit: "°C" },
    { name: "Flow",     base: 122, range: 6,   unit: "L/m" },
  ]
  return (
    <div className="grid grid-cols-3 gap-2 h-full">
      {sensors.map((s, i) => {
        const v = +(s.base + Math.sin(tick * 0.4 + i) * s.range).toFixed(1)
        return (
          <div key={s.name} className="rounded bg-main/60 border border-accent/15 p-2 flex flex-col justify-between">
            <div className="text-[9px] uppercase tracking-wider text-secondary/45">{s.name}</div>
            <motion.div
              key={`${s.name}-${tick}`}
              initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
              className="text-base font-bold text-accent tabular-nums leading-none mt-1"
            >
              {v}
            </motion.div>
            <div className="text-[9px] text-secondary/40">{s.unit}</div>
          </div>
        )
      })}
    </div>
  )
}

function ProductPreview() {
  const platforms = ["ERP", "WMS", "SCM", "CRM", "HRIS", "MES"]
  return (
    <div className="grid grid-cols-3 gap-1.5 h-full">
      {platforms.map((p, i) => (
        <motion.div
          key={p}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: easing.outBack }}
          className="rounded bg-accent/10 border border-accent/30 flex items-center justify-center text-[11px] font-mono font-semibold text-accent"
        >
          {p}
        </motion.div>
      ))}
    </div>
  )
}
