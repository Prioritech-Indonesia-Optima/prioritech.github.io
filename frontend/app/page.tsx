"use client"

import { Suspense, lazy } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { PageScene } from "@/components/three/PageScene"
import { SectionIndicator, ScrollProgress, useScrollProgress } from "@/components/three/ScrollScene"

const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

const DIVISIONS = [
  { num: "01", name: "AI Systems & Orchestration", desc: "LLM pipelines, agent frameworks, RAG architectures" },
  { num: "02", name: "Cybersecurity Intelligence", desc: "Threat modeling, SOC automation, red teaming" },
  { num: "03", name: "Quantitative Engineering", desc: "Pricing models, risk engines, execution systems" },
  { num: "04", name: "Automation & Robotics", desc: "Edge vision, PLC integration, physical AI" },
  { num: "05", name: "Applied Product Engineering", desc: "Full-stack systems, data platforms, integrations" },
]

const CAPABILITIES = [
  { label: "Architecture", detail: "System design that survives contact with production" },
  { label: "Implementation", detail: "Type-safe, tested, documented — not just working" },
  { label: "Operations", detail: "Monitoring, alerting, and runbooks from day one" },
  { label: "Evolution", detail: "Systems designed to be modified, not replaced" },
]

const PROCESS = [
  { phase: "Discover", desc: "We map your domain, constraints, and failure modes before writing a line of code." },
  { phase: "Architect", desc: "System design with explicit tradeoffs. You see the blueprint before build." },
  { phase: "Build", desc: "Incremental delivery. Working software in production within weeks, not quarters." },
  { phase: "Operate", desc: "We stay. Monitoring, iteration, and evolution are part of the engagement." },
]

export default function HomePage() {
  const [containerRef, progress, activeSection] = useScrollProgress()

  return (
    <div ref={containerRef} className="relative">
      <PageScene pageId="home" />

      <div className="fixed inset-0 z-[1] pointer-events-none vignette" />

      <ScrollProgress progress={progress} />
      <SectionIndicator activeIndex={activeSection} />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <StageSection
          index="Stage 02 — Disassembly"
          title="We take systems apart until nothing is mysterious."
          line="Nacelle panels release first. Then every module slides out, forward to aft, one at a time."
          align="right"
        />
        <StageSection
          index="Stage 03 — Exploded view"
          title="Complexity is a choice. We choose legibility."
          line="If a system cannot be drawn in parts, it cannot be maintained by strangers."
          align="left"
        />
        <DivisionsSection />
        <StageSection
          index="Stage 04 — Reassembly"
          title="Everything we ship is designed to be rebuilt."
          line="Parts return in reverse order. Tolerances hold. No surprises on the bench."
          align="right"
        />
        <PrinciplesSection />
        <EngineeringSection />
        <StageSection
          index="Stage 05 — Intake"
          title="We listen at full width before we compress."
          line="2.8 metres of fan. 1,250 kilograms a second. Airflow first, pressure later."
          align="left"
        />
        <StageSection
          index="Stage 06 — Compression"
          title="Pressure is the point."
          line="Constraints do not slow engineering down. They are the fuel."
          align="right"
        />
        <QuoteSection />
        <StageSection
          index="Stage 07 — Combustion"
          title="Ideas do not count until they burn."
          line="We ship ignition, not slides. Live systems, in production, under load."
          align="left"
        />
        <ProcessSection />
        <StageSection
          index="Stage 08 — Exhaust"
          title="Measure the thrust, not the noise."
          line="Monitoring, SLOs, and runbooks — the exhaust of good engineering is visible."
          align="right"
        />
        <StageSection
          index="Stage 09 — Full throttle"
          title="Boring on purpose. Relentless by temperament."
          line="N1 98%. The whole machine alive, doing exactly what it was drawn to do."
          align="left"
        />
        <ContactSection />
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

const PRINCIPLES = [
  { num: "I", title: "Ownership is the whole job", desc: "We don't hand off and disappear. If it runs in production, it runs on our watch too." },
  { num: "II", title: "Taste is a technical skill", desc: "Naming, structure, and restraint are engineering decisions — not decoration applied later." },
  { num: "III", title: "Boring on purpose", desc: "We spend the innovation budget in exactly one place: where it earns rent. Everything else is proven steel." },
  { num: "IV", title: "Slow to promise, fast to prove", desc: "Estimates stay conservative. Deltas stay incremental. Demos stay live." },
]

function StageSection({ index, title, line, align }: { index: string; title: string; line: string; align: "left" | "right" }) {
  return (
    <section data-scene-step className="relative h-[110vh] flex items-center px-6 sm:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-sm text-backdrop p-6 sm:p-8 ${align === "right" ? "ml-auto text-right" : ""}`}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent block mb-4 text-shadow-subtle">
          {index}
        </span>
        <h2 className="text-xl sm:text-2xl font-mono font-bold leading-snug text-foreground/90 mb-4 text-shadow-deep">
          {title}
        </h2>
        <p className="text-xs sm:text-sm font-mono text-foreground/50 leading-relaxed text-shadow-subtle">
          {line}
        </p>
      </motion.div>
    </section>
  )
}

function PrinciplesSection() {
  return (
    <section id="principles" data-scene-step className="relative min-h-[140vh] flex items-center px-6 sm:px-12 lg:px-20 py-32">
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-backdrop p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent block mb-4 text-shadow-subtle">
            04 — Operating temperament
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-shadow-deep">
            Skills get hired.<br />
            <span className="text-muted-foreground">Temperament gets trusted.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/30">
          {PRINCIPLES.map((pr, i) => (
            <motion.div
              key={pr.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="ink-slab p-6 sm:p-8"
            >
              <span className="text-[10px] font-mono text-accent/50 block mb-4">{pr.num}</span>
              <h3 className="text-sm sm:text-base font-mono font-semibold text-foreground/90 mb-3 leading-snug text-shadow-subtle">
                {pr.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-muted-foreground leading-relaxed text-shadow-subtle">
                {pr.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteSection() {
  return (
    <section data-scene-step className="relative h-[110vh] flex items-center px-6 sm:px-12 lg:px-20">
      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto text-center text-backdrop p-8 sm:p-10"
      >
        <p className="text-2xl sm:text-4xl font-mono font-bold leading-snug tracking-tight text-foreground/90 text-shadow-deep">
          &ldquo;Software is infrastructure.<br />
          <span className="text-muted-foreground">Infrastructure deserves engineers who stay.&rdquo;</span>
        </p>
        <footer className="mt-8 text-[10px] font-mono tracking-[0.3em] uppercase text-accent text-shadow-subtle">
          — Operating principle #01
        </footer>
      </motion.blockquote>
    </section>
  )
}

function HeroSection() {
  return (
    <section id="hero" data-scene-step className="relative min-h-screen flex items-end pb-20 sm:pb-28 px-6 sm:px-12 lg:px-20">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl min-w-0 text-backdrop p-8 sm:p-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-foreground/50 text-shadow-subtle">
            Prioritech Indonesia Optima
          </span>
        </div>

        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-mono font-bold leading-[0.9] tracking-tight mb-8 text-shadow-deep">
          <span className="block">Engineering</span>
          <span className="block text-muted-foreground">that endures.</span>
        </h1>

        <p className="text-base sm:text-lg text-foreground/50 max-w-lg leading-relaxed font-mono text-shadow-subtle">
          We build production systems for AI, automation, and defense.
          Designed in Jakarta. Built to outlast their requirements.
        </p>

        <div className="mt-12 flex items-center gap-6">
          <Link
            href="#divisions"
            className="group inline-flex items-center gap-2 text-sm font-mono text-foreground/70 hover:text-accent transition-colors text-shadow-subtle"
          >
            <span className="w-8 h-px bg-foreground/30 group-hover:bg-accent transition-colors" />
            Explore
          </Link>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-mono text-foreground/70 hover:text-accent transition-colors text-shadow-subtle"
          >
            Live Demos
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <a
          href="https://code.prioritech.co.id"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 border border-accent/40 px-4 py-2.5 font-mono text-xs text-foreground/80 hover:border-accent hover:text-accent transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
          Now open source — code.prioritech.co.id
          <ArrowUpRight size={12} />
        </a>
      </motion.div>

      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 flex items-center gap-2 text-muted-foreground/70">
        <span className="text-[10px] font-mono tracking-wider">SCROLL</span>
        <span className="w-px h-4 bg-foreground/20 animate-pulse" />
      </div>
    </section>
  )
}

function DivisionsSection() {
  return (
    <section id="divisions" data-scene-step className="relative min-h-[140vh] flex items-center px-6 sm:px-12 lg:px-20 py-32">

      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-backdrop p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent block mb-4 text-shadow-subtle">
            02 — Divisions
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-shadow-deep">
            Five disciplines.<br />
            <span className="text-muted-foreground">One standard.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {DIVISIONS.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ink-slab p-6 sm:p-8 group hover:bg-main transition-colors duration-300 ${i === DIVISIONS.length - 1 ? "lg:col-span-2" : ""}`}
            >
              <span className="text-[10px] font-mono text-accent/50 block mb-4">
                {d.num}
              </span>
              <h3 className="text-sm sm:text-base font-mono font-semibold text-foreground/90 mb-2 leading-snug text-shadow-subtle">
                {d.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed text-shadow-subtle">
                {d.desc}
              </p>
              <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-foreground/20 group-hover:bg-accent transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EngineeringSection() {
  return (
    <section id="engineering" data-scene-step className="relative min-h-[140vh] flex items-center px-6 sm:px-12 lg:px-20 py-32">

      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-backdrop p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent block mb-4 text-shadow-subtle">
            03 — Engineering
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-shadow-deep">
            Built like<br />
            <span className="text-muted-foreground">infrastructure.</span>
          </h2>
        </motion.div>

        <div className="text-backdrop p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-6"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 to-transparent" />
              <h3 className="text-lg sm:text-xl font-mono font-semibold text-foreground/90 mb-3 text-shadow-subtle">
                {c.label}
              </h3>
              <p className="text-sm text-foreground/45 font-mono leading-relaxed max-w-sm text-shadow-subtle">
                {c.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 p-6 sm:p-8 border ink-slab"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm font-mono text-foreground/60 text-shadow-subtle">
              <span className="text-accent">3</span> systems live in production.
              <span className="text-muted-foreground/70 mx-2">·</span>
              <span className="text-accent">0</span> subcontractors, ever.
            </p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm font-mono text-foreground/70 hover:text-accent transition-colors text-shadow-subtle"
            >
              See the work
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" data-scene-step className="relative min-h-[140vh] flex items-center px-6 sm:px-12 lg:px-20 py-32">

      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-backdrop p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent block mb-4 text-shadow-subtle">
            04 — Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-shadow-deep">
            Four phases.<br />
            <span className="text-muted-foreground">No surprises.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" />

          {PROCESS.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 sm:pl-12 pb-16 last:pb-0"
            >
              <div className="absolute left-[-3px] top-1 w-[7px] h-[7px] rounded-full bg-accent" />
              <div className="text-backdrop p-5 sm:p-6">
                <span className="text-[10px] font-mono text-muted-foreground/70 block mb-2">
                  PHASE {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl sm:text-2xl font-mono font-semibold text-foreground/90 mb-3 text-shadow-subtle">
                  {p.phase}
                </h3>
                <p className="text-sm text-foreground/45 font-mono leading-relaxed max-w-md text-shadow-subtle">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" data-scene-step className="relative min-h-[140vh] flex items-end pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl w-full text-backdrop p-8 sm:p-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent block mb-6 text-shadow-subtle">
          05 — Contact
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold leading-[0.95] tracking-tight mb-8 text-shadow-deep">
          <span className="block">Ready to build</span>
          <span className="block text-muted-foreground">something real?</span>
        </h2>

        <p className="text-base sm:text-lg text-foreground/50 font-mono leading-relaxed mb-12 max-w-lg text-shadow-subtle">
          Tell us what you need to outlast its requirements.
          We&apos;ll architect the system that gets there.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-background font-mono text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            Start a conversation
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-foreground/20 text-foreground/70 font-mono text-sm hover:border-foreground/40 hover:text-foreground transition-colors bg-foreground/5"
          >
            View live demos
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-muted-foreground/70 text-shadow-subtle">
            Jakarta, Indonesia — operating since 2025
          </span>
          <a
            href="mailto:ivan.aurelius@prioritech.co.id"
            className="text-[11px] font-mono text-muted-foreground hover:text-accent transition-colors text-shadow-subtle"
          >
            ivan.aurelius@prioritech.co.id
          </a>
        </div>
      </motion.div>
    </section>
  )
}
