"use client"

import { useEffect, useState, ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight, Brain, Shield, TrendingUp, Cog, Layers,
  Search, Code2, Rocket, Eye, type LucideIcon,
} from "lucide-react"
import { SectionLead } from "@/components/shared/SectionLead"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"
import {
  AnimatedNumber, PulseDot, Sparkline,
} from "@/components/projects/demos/shared/primitives"
import { Bar } from "@/components/projects/demos/shared/DemoShell"
import { revealContainer, revealItem, easing, duration } from "@/lib/motion"

// ============================================================================
// HERO
// ============================================================================

export function DivisionsHero() {
  const divisions = [
    { id: "ai",         name: "AI Systems",    Icon: Brain },
    { id: "cyber",      name: "Cybersecurity", Icon: Shield },
    { id: "quant",      name: "Quantitative",  Icon: TrendingUp },
    { id: "automation", name: "Automation",    Icon: Cog },
    { id: "applied",    name: "Applied",       Icon: Layers },
  ]
  return (
    <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
      <div className="aurora-orb aurora-orb--gold" style={{ width: "65vw", height: "65vw", top: "-20vw", left: "-15vw", opacity: 0.25 }} />
      <div className="aurora-orb aurora-orb--silver" style={{ width: "45vw", height: "45vw", bottom: "-10vw", right: "-10vw", opacity: 0.15, animationDelay: "-12s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={revealContainer(0.1, 0.12)}>
          <motion.p variants={revealItem} className="text-accent font-mono text-sm tracking-widest mb-4">
            $ five engineering divisions
          </motion.p>
          <motion.h1 variants={revealItem}
            className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] tracking-tight mb-6 max-w-4xl"
          >
            Specialized teams.{" "}
            <span className="text-sweep">Shared infrastructure.</span>
          </motion.h1>
          <motion.p variants={revealItem} className="text-secondary/65 text-lg sm:text-xl leading-relaxed mb-12 max-w-3xl">
            Each division ships independently — but they share observability, CI/CD, audit trails, and engineering principles. Cross-disciplinary by design, single-platform by choice.
          </motion.p>

          {/* Anchor nav */}
          <motion.nav
            variants={revealItem}
            aria-label="Jump to division"
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            {divisions.map((d) => (
              <Link
                key={d.id}
                href={`#${d.id}`}
                className="group inline-flex items-center gap-2 px-3 py-2 rounded-full border border-accent/20 bg-main/60 backdrop-blur-sm hover:border-accent/50 hover:bg-main/80 transition-all"
              >
                <d.Icon size={14} className="text-accent/80 group-hover:text-accent" />
                <span className="text-xs sm:text-sm text-secondary/80 group-hover:text-secondary font-mono">{d.name}</span>
              </Link>
            ))}
          </motion.nav>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// DIVISION PANEL — full-bleed, alternating, with live preview
// ============================================================================

interface DivisionPanelProps {
  id: string
  index: number
  Icon: LucideIcon
  eyebrow: string
  title: string
  body: string
  capabilities: string[]
  projects: { name: string; href?: string }[]
  preview: ReactNode
  align: "left" | "right"
}

export function DivisionPanel({
  id, index, Icon, eyebrow, title, body, capabilities, projects, preview, align,
}: DivisionPanelProps) {
  return (
    <section
      id={id}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10 scroll-mt-24"
    >
      <div className={`aurora-orb ${align === "left" ? "aurora-orb--gold" : "aurora-orb--silver"}`}
        style={{
          width: "55vw", height: "55vw",
          [align === "left" ? "right" : "left"]: "-20vw",
          top: "8vw",
          opacity: 0.16,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-12 gap-10 lg:gap-12 items-center ${align === "right" ? "lg:[&>*:first-child]:order-2" : ""}`}>
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: align === "left" ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: easing.outExpo }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent/60 font-mono text-sm tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-10 bg-accent/30" />
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30">
                <Icon size={20} className="text-accent" />
              </div>
            </div>
            <p className="text-accent font-mono text-sm tracking-wider mb-3">$ {eyebrow}</p>
            <h2 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-[1.1] tracking-tight mb-5">
              {title}
            </h2>
            <p className="text-secondary/65 text-base sm:text-lg leading-relaxed mb-8">{body}</p>

            <div className="mb-6">
              <p className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono mb-3">capabilities</p>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((c) => (
                  <span
                    key={c}
                    className="inline-flex px-2.5 py-1 text-xs font-mono text-secondary/80 bg-accent/10 border border-accent/20 rounded"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono mb-3">featured projects</p>
              <ul className="space-y-2">
                {projects.map((p) => (
                  <li key={p.name}>
                    <Link
                      href={p.href ?? "/projects"}
                      className="group inline-flex items-center gap-2 text-secondary/85 hover:text-accent text-sm font-mono transition-colors"
                    >
                      <span className="text-accent">$</span>
                      <span>{p.name}</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-base font-medium font-mono group transition-colors"
            >
              Explore systems
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easing.outExpo, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl border border-accent/20 bg-gradient-to-br from-main/95 via-main to-main/80 backdrop-blur-md p-5 sm:p-7 shadow-2xl shadow-accent/10">
              {preview}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// DIVISION PREVIEWS — captivating per-division mini visualizations
// ============================================================================

export function AISystemsPreview() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1200)
    return () => clearInterval(id)
  }, [])
  const lines = [
    { p: "$", t: "iqa --q 'last quarter sales by region'", c: "text-accent" },
    { p: "›", t: "Intent: analytics · scope=q4 · entities=4", c: "text-sky-300" },
    { p: "›", t: "Schema match: orders.amount, orders.region", c: "text-sky-300" },
    { p: "✓", t: "SQL generated · 43ms · 4 rows", c: "text-emerald-300" },
    { p: "✓", t: "Workflow logged · audit ID #a8b2c4", c: "text-emerald-300" },
    { p: "›", t: "Agent: shall I summarize by quarter trend?", c: "text-sky-300" },
  ]
  const shown = lines.slice(0, ((tick % 7) + 1))
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">live agent · audit trail</span>
        <div className="flex items-center gap-2"><PulseDot color="bg-emerald-400" /><span className="text-[10px] uppercase tracking-widest text-emerald-300 font-mono">orchestrating</span></div>
      </div>
      <div className="rounded-lg bg-main/60 border border-accent/15 p-4 font-mono text-[11px] sm:text-[13px] leading-relaxed min-h-[200px]">
        {shown.map((l, i) => (
          <motion.div key={`${tick}-${i}`} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }} className="flex gap-2">
            <span className={`${l.c} flex-shrink-0`}>{l.p}</span>
            <span className="text-secondary/85">{l.t}</span>
          </motion.div>
        ))}
        <span className="inline-block w-2 h-3 bg-accent ml-0.5 animate-pulse" />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4 text-[11px] font-mono">
        <div><div className="text-secondary/45">QUERIES/DAY</div><div className="text-accent font-bold tabular-nums">12.4k</div></div>
        <div><div className="text-secondary/45">LATENCY</div><div className="text-accent font-bold tabular-nums">43ms</div></div>
        <div><div className="text-secondary/45">ACCURACY</div><div className="text-emerald-300 font-bold tabular-nums">97.2%</div></div>
      </div>
    </div>
  )
}

export function CyberPreview() {
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1400)
    return () => clearInterval(id)
  }, [])
  const nodes = [
    { x: 18, y: 25 }, { x: 50, y: 20 }, { x: 82, y: 28 },
    { x: 30, y: 55 }, { x: 65, y: 58 }, { x: 85, y: 70 },
    { x: 15, y: 78 }, { x: 50, y: 80 },
  ]
  const edges: [number, number][] = [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [3, 6], [6, 7], [7, 4], [1, 4]]
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">threat graph · correlation</span>
        <div className="flex items-center gap-2"><PulseDot color="bg-amber-400" /><span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono">2 anomalies</span></div>
      </div>
      <div className="rounded-lg bg-main/60 border border-accent/15 overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
        <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="w-full h-full">
          {edges.map(([a, b], i) => (
            <g key={i}>
              <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
                stroke={a === 4 || b === 4 ? "rgba(218,165,32,0.5)" : "rgba(218,165,32,0.18)"} strokeWidth={0.4} />
              {(a === 4 || b === 4) && (
                <motion.circle key={`${i}-${pulse}`} r={0.8} fill="#daa520"
                  initial={{ cx: nodes[a].x, cy: nodes[a].y, opacity: 0 }}
                  animate={{ cx: nodes[b].x, cy: nodes[b].y, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, delay: i * 0.1 }}
                />
              )}
            </g>
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={i === 4 ? 2.4 : 1.5}
                fill={i === 4 ? "#daa520" : "rgba(217,217,217,0.7)"}
                style={{ filter: i === 4 ? "drop-shadow(0 0 4px rgba(218,165,32,0.6))" : undefined }}
              />
              {i === 4 && (
                <motion.circle cx={n.x} cy={n.y} r={2.4} fill="none" stroke="#daa520" strokeWidth={0.4}
                  animate={{ r: [2.4, 7], opacity: [0.6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <Bar pct={91} label="Critical exposure" value="9.1" tone="danger" />
        <Bar pct={68} label="Auth posture" value="6.8" tone="warn" />
        <Bar pct={42} label="Net hardening" value="4.2" tone="warn" />
      </div>
    </div>
  )
}

export function QuantPreview() {
  const series = Array.from({ length: 24 }, (_, i) =>
    100 + Math.sin(i * 0.4) * 10 + Math.cos(i * 0.2) * 4 + i * 0.4
  )
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">forecast · live</span>
        <div className="flex items-center gap-2"><PulseDot color="bg-emerald-400" /><span className="text-[10px] uppercase tracking-widest text-emerald-300 font-mono">+1.9σ</span></div>
      </div>
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-4xl sm:text-5xl font-bold text-accent tabular-nums leading-none">
          $<AnimatedNumber value={112.42} decimals={2} />
        </span>
        <span className="text-sm text-emerald-300">+38% ROI vs baseline</span>
      </div>
      <div className="text-accent rounded-lg bg-main/60 border border-accent/15 p-4">
        <Sparkline points={series} height={80} width={360} className="w-full h-24" stroke="#daa520" />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4 text-[11px] font-mono">
        <div><div className="text-secondary/45">SHARPE</div><div className="text-accent font-bold tabular-nums">2.14</div></div>
        <div><div className="text-secondary/45">HIT RATE</div><div className="text-accent font-bold tabular-nums">74%</div></div>
        <div><div className="text-secondary/45">LATENCY</div><div className="text-accent font-bold tabular-nums">8ms</div></div>
      </div>
    </div>
  )
}

export function AutomationPreview() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [])
  const sensors = [
    { name: "Pressure A", base: 4.2, range: 0.15, unit: "bar" },
    { name: "Temp #1",    base: 68,  range: 1.5,  unit: "°C" },
    { name: "Flow rate",  base: 122, range: 4,    unit: "L/min" },
    { name: "Vibration",  base: 0.8, range: 0.06, unit: "mm/s" },
  ]
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">plc · floor-1 · 100ms scan</span>
        <div className="flex items-center gap-2"><PulseDot color="bg-emerald-400" /><span className="text-[10px] uppercase tracking-widest text-emerald-300 font-mono">RUNNING</span></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {sensors.map((s) => {
          const v = +(s.base + Math.sin(tick * 0.4 + s.name.length) * s.range).toFixed(2)
          return (
            <div key={s.name} className="rounded-lg bg-main/60 border border-accent/15 p-3">
              <div className="text-[10px] uppercase tracking-wider text-secondary/45 mb-1">{s.name}</div>
              <motion.div key={`${s.name}-${tick}`}
                initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-accent tabular-nums leading-none mb-1"
              >
                {v}
              </motion.div>
              <div className="text-[10px] text-secondary/40 font-mono">{s.unit}</div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[11px]">
        <span className="text-secondary/55">cycle <span className="text-accent">24.3s</span></span>
        <span className="text-secondary/55">uptime <span className="text-emerald-300">99.97%</span></span>
        <span className="text-secondary/55">energy <span className="text-emerald-300">−14%</span></span>
      </div>
    </div>
  )
}

export function AppliedPreview() {
  const platforms = ["ERP", "WMS", "SCM", "CRM", "HRIS", "MES", "TMS", "POS"]
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">enterprise platforms · live</span>
        <div className="flex items-center gap-2"><PulseDot color="bg-accent" /><span className="text-[10px] uppercase tracking-widest text-accent font-mono">8 modules</span></div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {platforms.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: duration.base, ease: easing.outBack }}
            className="aspect-square flex items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent font-mono font-bold text-base sm:text-lg hover:bg-accent/20 hover:border-accent/60 transition-colors"
          >
            {p}
          </motion.div>
        ))}
      </div>
      <div className="rounded-lg bg-main/60 border border-accent/15 p-4">
        <div className="text-[10px] uppercase tracking-wider text-secondary/45 mb-2 font-mono">platform load profile</div>
        <div className="space-y-2">
          <Bar pct={84} label="Finance · live" value="84%" tone="success" />
          <Bar pct={72} label="Inventory · sync" value="72%" tone="accent" />
          <Bar pct={56} label="HR · payroll cycle" value="56%" tone="accent" />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// SHARED PLATFORM — what the divisions have in common
// ============================================================================

export function SharedPlatform() {
  const layers = [
    { name: "5 Divisions",            items: ["AI", "Cyber", "Quant", "Automation", "Applied"], tone: "accent" },
    { name: "Engineering Principles",  items: ["Modular", "Observable", "Tested", "Documented"], tone: "neutral" },
    { name: "Shared Infrastructure",   items: ["CI/CD", "Audit Trails", "Observability", "Security"], tone: "neutral" },
  ]
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--silver" style={{ width: "40vw", height: "40vw", top: "10vw", left: "30vw", opacity: 0.12 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="shared foundation"
          title={<>One platform. <span className="text-accent/80">Five expressions.</span></>}
          subtitle="Each division has its own stack — but they stand on a shared platform of audit, observability, and engineering principles."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.2, 0.15)}
          className="mt-14 lg:mt-16 space-y-4"
        >
          {layers.map((l, i) => (
            <motion.div key={l.name} variants={revealItem}
              className={`rounded-2xl border ${l.tone === "accent" ? "border-accent/30 bg-accent/[0.04]" : "border-accent/15 bg-main/50"} p-5 sm:p-6 backdrop-blur-sm`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-accent/60 font-mono text-xs tabular-nums">L{i + 1}</span>
                  <span className="h-px w-6 bg-accent/20" />
                  <h3 className={`font-mono font-semibold text-base sm:text-lg ${l.tone === "accent" ? "text-accent" : "text-secondary"}`}>
                    {l.name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {l.items.map((it) => (
                  <span key={it}
                    className={`px-3 py-1.5 rounded font-mono text-xs sm:text-sm border ${
                      l.tone === "accent"
                        ? "bg-main/60 border-accent/30 text-secondary"
                        : "bg-main/60 border-accent/15 text-secondary/80"
                    }`}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// METHODOLOGY STRIP
// ============================================================================

export function MethodologyStrip() {
  const steps = [
    { Icon: Search, title: "Discovery", body: "Map constraints, data, decision flow." },
    { Icon: Code2,  title: "Design",    body: "Architecture, contracts, failure modes." },
    { Icon: Rocket, title: "Deploy",    body: "Production hardening + runbooks." },
    { Icon: Eye,    title: "Observe",   body: "Audit, metrics, continuous improvement." },
  ]
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="how divisions work"
          title={<>Four phases. <span className="text-accent/80">Every division.</span></>}
          subtitle="The shape of every engagement, whether AI orchestration or PLC suite. Consistent process across specializations."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.15, 0.12)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14 lg:mt-16 relative"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4, ease: easing.outExpo }}
            style={{ transformOrigin: "left center" }}
            className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 pointer-events-none"
          />
          {steps.map((s, i) => (
            <motion.div key={s.title} variants={revealItem} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-main/80 border border-accent/30 backdrop-blur-sm">
                  <s.Icon size={20} className="text-accent" />
                  <span className="absolute inset-0 rounded-full bg-accent/10 blur-md -z-10" />
                </div>
                <span className="text-accent/50 font-mono text-2xl font-light tabular-nums">0{i + 1}</span>
              </div>
              <h3 className="text-secondary text-lg sm:text-xl font-bold font-mono mb-2">{s.title}</h3>
              <p className="text-secondary/60 text-sm leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA
// ============================================================================

export function DivisionsCTA() {
  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold" style={{ width: "65vw", height: "65vw", top: "-20vw", right: "-15vw", opacity: 0.32 }} />
      <div className="aurora-orb aurora-orb--silver" style={{ width: "50vw", height: "50vw", bottom: "-15vw", left: "-15vw", opacity: 0.18, animationDelay: "-12s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: easing.outExpo }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <p className="text-accent font-mono text-sm tracking-widest mb-6">$ work with a division</p>
        <h2 className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] tracking-tight mb-8">
          Tell us which <span className="text-sweep">division</span> you need.
        </h2>
        <p className="text-secondary/65 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Or describe the problem — we'll route you to the right team. Cross-disciplinary engagements are the norm, not the exception.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton href="/contact" icon>$ Start a Conversation</PrimaryButton>
          <SecondaryButton href="/projects" icon>$ See Real Systems</SecondaryButton>
        </div>
      </motion.div>
    </section>
  )
}
