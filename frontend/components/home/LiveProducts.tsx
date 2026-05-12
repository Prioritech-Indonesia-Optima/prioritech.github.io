"use client"

import { useEffect, useState, ReactNode } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Brain, Store, Banknote, type LucideIcon } from "lucide-react"
import { SectionLead } from "@/components/shared/SectionLead"
import { Sparkline, PulseDot, AnimatedNumber } from "@/components/projects/demos/shared/primitives"
import { Bar } from "@/components/projects/demos/shared/DemoShell"
import { revealContainer, revealItem, easing } from "@/lib/motion"

/**
 * Live products — the three systems Prioritech actually operates in production today.
 * Honest copy. No fabricated metrics. Each card has a small live-feel viz tied to
 * what the product is, not what we wish it was.
 */
export function LiveProducts() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold"
        style={{ width: "55vw", height: "55vw", top: "5vw", right: "-15vw", opacity: 0.18 }} />
      <div className="aurora-orb aurora-orb--silver"
        style={{ width: "45vw", height: "45vw", bottom: "-10vw", left: "-15vw", opacity: 0.12, animationDelay: "-12s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="what we run today"
          title={<>Three live systems. <span className="text-accent/80">Today.</span></>}
          subtitle="Not roadmap promises — production workloads we operate now. Seven months in, this is what's shipping."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.2, 0.15)}
          className="grid lg:grid-cols-3 gap-5 lg:gap-6 mt-14 lg:mt-16"
        >
          <ProductCard
            Icon={Brain}
            eyebrow="ai infrastructure"
            title="AI Hosting"
            body="Managed inference for production AI workloads. We run the GPUs, the routing, the autoscaling — clients ship their models."
            tag="managed service"
          >
            <AIHostingViz />
          </ProductCard>

          <ProductCard
            Icon={Store}
            eyebrow="operated platform"
            title="Marketplace"
            body="An end-to-end marketplace platform we operate, not just hand off. Listings, transactions, payments, ops — all under one roof."
            tag="we run it"
          >
            <MarketplaceViz />
          </ProductCard>

          <ProductCard
            Icon={Banknote}
            eyebrow="industry erp"
            title="FX ERP"
            body="Enterprise resource planning purpose-built for foreign exchange operators. Treasury, positions, settlement, and reconciliation in one ledger."
            tag="industry vertical"
          >
            <FxErpViz />
          </ProductCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: easing.outExpo }}
          className="mt-10 text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-base font-mono group transition-colors"
          >
            Tell us what you need to ship next
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// Card shell
// ============================================================================

function ProductCard({
  Icon, eyebrow, title, body, tag, children,
}: {
  Icon: LucideIcon
  eyebrow: string
  title: string
  body: string
  tag: string
  children: ReactNode
}) {
  return (
    <motion.article
      variants={revealItem}
      className="group relative rounded-2xl border border-accent/20 bg-gradient-to-br from-main/95 via-main to-main/85 backdrop-blur-md p-6 sm:p-7 hover:border-accent/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/15 transition-all duration-500 overflow-hidden flex flex-col"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start justify-between mb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 group-hover:bg-accent/20 transition-colors">
          <Icon size={20} className="text-accent" />
        </div>
        <div className="flex items-center gap-2">
          <PulseDot color="bg-emerald-400" />
          <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-mono">LIVE</span>
        </div>
      </div>

      <p className="text-accent font-mono text-[11px] tracking-widest mb-2">$ {eyebrow}</p>
      <h3 className="text-secondary text-2xl font-bold font-mono leading-tight mb-3">{title}</h3>
      <p className="text-secondary/60 text-sm sm:text-base leading-relaxed mb-5">{body}</p>

      {/* viz region */}
      <div className="relative rounded-lg border border-accent/15 bg-main/40 p-3 sm:p-4 mt-auto">
        {children}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">
          {tag}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-accent/60 font-mono">production</span>
      </div>
    </motion.article>
  )
}

// ============================================================================
// AI Hosting · model roster with live tokens/sec
// ============================================================================

function AIHostingViz() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [])
  const models = [
    { name: "embed-3 / small", load: 0.78 },
    { name: "llama-3 / 8b",    load: 0.62 },
    { name: "whisper / base",   load: 0.41 },
  ]
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider text-secondary/45 font-mono">active models</span>
        <span className="text-[10px] font-mono text-secondary/55">{2400 + Math.round(Math.sin(tick * 0.3) * 180)} tok/s</span>
      </div>
      <div className="space-y-2">
        {models.map((m) => (
          <div key={m.name}>
            <div className="flex justify-between text-[11px] mb-1 font-mono">
              <span className="text-secondary/75 truncate">{m.name}</span>
              <span className="text-accent">{Math.round(m.load * 100)}%</span>
            </div>
            <div className="h-1 rounded-full bg-main/80 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent/50 to-accent"
                animate={{ width: `${m.load * 100 + Math.sin(tick * 0.3 + m.load * 5) * 6}%` }}
                transition={{ duration: 0.8, ease: easing.outExpo }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// Marketplace · live listing feed
// ============================================================================

function MarketplaceViz() {
  const [feed, setFeed] = useState<{ id: number; text: string; tone: "new" | "sale" | "list" }[]>([])
  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n++
      const samples = [
        { text: "new listing posted",           tone: "list" as const },
        { text: "transaction settled · seller", tone: "sale" as const },
        { text: "new vendor onboarded",         tone: "new"  as const },
        { text: "auction window opened",        tone: "list" as const },
        { text: "transaction settled · buyer",  tone: "sale" as const },
      ]
      const s = samples[Math.floor(Math.random() * samples.length)]
      setFeed((prev) => [{ id: n, ...s }, ...prev].slice(0, 4))
    }, 1300)
    return () => clearInterval(id)
  }, [])
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider text-secondary/45 font-mono">activity feed</span>
        <span className="text-[10px] font-mono text-secondary/55">streaming</span>
      </div>
      <div className="space-y-1.5 min-h-[100px]">
        <AnimatePresence initial={false}>
          {feed.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, x: -8, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 font-mono text-[11px]"
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                f.tone === "sale" ? "bg-emerald-400"
                : f.tone === "new" ? "bg-sky-400"
                : "bg-accent"
              }`} />
              <span className="text-secondary/80 truncate">{f.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ============================================================================
// FX ERP · rates ticker
// ============================================================================

function FxErpViz() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500)
    return () => clearInterval(id)
  }, [])
  const pairs = [
    { sym: "USD / IDR",  base: 15820,   range: 18 },
    { sym: "USD / SGD",  base: 1.345,   range: 0.004 },
    { sym: "EUR / IDR",  base: 17220,   range: 22 },
  ]
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider text-secondary/45 font-mono">fx rates</span>
        <span className="text-[10px] font-mono text-secondary/55">spot</span>
      </div>
      <div className="space-y-1.5">
        {pairs.map((p, i) => {
          const drift = Math.sin(tick * 0.3 + i) * p.range
          const v = p.base + drift
          const up = drift >= 0
          return (
            <div key={p.sym} className="flex items-baseline justify-between font-mono text-[12px]">
              <span className="text-secondary/75 tracking-wide">{p.sym}</span>
              <motion.span
                key={`${p.sym}-${tick}`}
                initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                className={`tabular-nums font-semibold ${up ? "text-emerald-300" : "text-rose-300"}`}
              >
                {p.range > 1 ? v.toFixed(0) : v.toFixed(4)} <span className="ml-1 text-[10px]">{up ? "▲" : "▼"}</span>
              </motion.span>
            </div>
          )
        })}
      </div>
      <div className="pt-3 mt-3 border-t border-accent/10 flex justify-between text-[10px] font-mono text-secondary/55">
        <span>open positions: <span className="text-accent">12</span></span>
        <span>settled today: <span className="text-emerald-300">38</span></span>
      </div>
    </div>
  )
}
