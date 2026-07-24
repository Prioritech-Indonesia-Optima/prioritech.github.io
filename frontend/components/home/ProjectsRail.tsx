"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Brain, Store, Banknote, type LucideIcon } from "lucide-react"
import { MicroLabel } from "@/components/lattice/MicroLabel"
import { CornerTicks } from "@/components/lattice/CornerTicks"
import { easing } from "@/lib/motion"

/**
 * Live systems as instrument cards on a horizontal scroll-snap rail. Reuses the
 * three production vizzes (AI hosting, marketplace, FX ERP) from the old
 * LiveProducts section, reframed in the lattice language.
 */
export function ProjectsRail(): JSX.Element {
  return (
    <section className="relative border-b border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-line py-3">
          <MicroLabel index="005" live>
            SYSTEMS / IN PRODUCTION
          </MicroLabel>
          <MicroLabel className="hidden sm:inline-flex">DRAG · SCROLL →</MicroLabel>
        </div>

        <div className="py-10">
          <h2 className="mb-2 font-sans text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl">
            Three live systems. Today.
          </h2>
          <p className="mb-8 max-w-2xl text-secondary/60">
            Not roadmap promises — production workloads we operate now.
          </p>
        </div>
      </div>

      {/* centered card row — scroll-snap below lg, even 3-col grid at lg+ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible">
          <InstrumentCard index="001" Icon={Brain} title="AI Hosting" category="MANAGED INFERENCE"
            body="Managed inference for production AI workloads — GPUs, routing, autoscaling.">
            <AIHostingViz />
          </InstrumentCard>
          <InstrumentCard index="002" Icon={Store} title="Marketplace" category="OPERATED PLATFORM"
            body="An end-to-end marketplace we operate, not just hand off. Listings to settlement.">
            <MarketplaceViz />
          </InstrumentCard>
          <InstrumentCard index="003" Icon={Banknote} title="FX ERP" category="INDUSTRY VERTICAL"
            body="ERP purpose-built for FX operators — treasury, positions, settlement, reconciliation.">
            <FxErpViz />
          </InstrumentCard>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 font-mono text-sm text-accent transition-colors hover:text-accent/80"
        >
          View all projects &amp; live demos
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  )
}

function InstrumentCard({
  index, Icon, title, category, body, children,
}: {
  index: string
  Icon: LucideIcon
  title: string
  category: string
  body: string
  children: ReactNode
}): JSX.Element {
  return (
    <Link
      href="/projects"
      className="group relative flex w-[300px] shrink-0 snap-start flex-col border border-line bg-panel p-5 transition-colors hover:border-line-strong sm:w-[340px] lg:w-auto"
    >
      <CornerTicks color="line" />
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="border border-accent/40 px-1.5 py-0.5 font-mono text-[10px] font-bold tabular-nums text-accent">
            {index}
          </span>
          <Icon size={16} className="text-secondary/50" />
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> LIVE
        </span>
      </div>

      <h3 className="font-mono text-xl font-bold leading-tight text-secondary">{title}</h3>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary/45">{category}</div>
      <p className="mt-3 text-sm leading-relaxed text-secondary/60">{body}</p>

      <div className="mt-auto border border-line bg-canvas/60 p-3">{children}</div>
    </Link>
  )
}

// --- reused production vizzes ------------------------------------------------

function AIHostingViz(): JSX.Element {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [])
  const models = [
    { name: "embed-3 / small", load: 0.78 },
    { name: "llama-3 / 8b", load: 0.62 },
    { name: "whisper / base", load: 0.41 },
  ]
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between font-mono">
        <span className="text-[10px] uppercase tracking-wider text-secondary/45">active models</span>
        <span className="text-[10px] text-secondary/55">{2400 + Math.round(Math.sin(tick * 0.3) * 180)} tok/s</span>
      </div>
      <div className="space-y-2">
        {models.map((m) => (
          <div key={m.name}>
            <div className="mb-1 flex justify-between font-mono text-[11px]">
              <span className="truncate text-secondary/75">{m.name}</span>
              <span className="text-accent">{Math.round(m.load * 100)}%</span>
            </div>
            <div className="h-1 overflow-hidden bg-canvas">
              <motion.div
                className="h-full bg-accent"
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

function MarketplaceViz(): JSX.Element {
  const [feed, setFeed] = useState<{ id: number; text: string; tone: "new" | "sale" | "list" }[]>([])
  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n++
      const samples = [
        { text: "new listing posted", tone: "list" as const },
        { text: "transaction settled · seller", tone: "sale" as const },
        { text: "new vendor onboarded", tone: "new" as const },
        { text: "auction window opened", tone: "list" as const },
        { text: "transaction settled · buyer", tone: "sale" as const },
      ]
      const s = samples[Math.floor(Math.random() * samples.length)]
      setFeed((prev) => [{ id: n, ...s }, ...prev].slice(0, 4))
    }, 1300)
    return () => clearInterval(id)
  }, [])
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between font-mono">
        <span className="text-[10px] uppercase tracking-wider text-secondary/45">activity feed</span>
        <span className="text-[10px] text-secondary/55">streaming</span>
      </div>
      {/* fixed height + clipped so spawning log lines never resize the card */}
      <div className="h-[104px] space-y-1.5 overflow-hidden">
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
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                f.tone === "sale" ? "bg-emerald-400" : f.tone === "new" ? "bg-sky-400" : "bg-accent"
              }`} />
              <span className="truncate text-secondary/80">{f.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FxErpViz(): JSX.Element {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500)
    return () => clearInterval(id)
  }, [])
  const pairs = [
    { sym: "USD / IDR", base: 15820, range: 18 },
    { sym: "USD / SGD", base: 1.345, range: 0.004 },
    { sym: "EUR / IDR", base: 17220, range: 22 },
  ]
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between font-mono">
        <span className="text-[10px] uppercase tracking-wider text-secondary/45">fx rates</span>
        <span className="text-[10px] text-secondary/55">spot</span>
      </div>
      <div className="space-y-1.5">
        {pairs.map((p, i) => {
          const drift = Math.sin(tick * 0.3 + i) * p.range
          const v = p.base + drift
          const up = drift >= 0
          return (
            <div key={p.sym} className="flex items-baseline justify-between font-mono text-[12px]">
              <span className="tracking-wide text-secondary/75">{p.sym}</span>
              <motion.span
                key={`${p.sym}-${tick}`}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`font-semibold tabular-nums ${up ? "text-emerald-300" : "text-rose-300"}`}
              >
                {p.range > 1 ? v.toFixed(0) : v.toFixed(4)} <span className="ml-1 text-[10px]">{up ? "▲" : "▼"}</span>
              </motion.span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
