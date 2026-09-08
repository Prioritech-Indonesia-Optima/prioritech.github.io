"use client"

import { Suspense, lazy, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { ScrollCanvas, SectionIndicator, ScrollProgress, useScrollProgress } from "@/components/three/ScrollScene"

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

  const handleProgress = useCallback(() => {}, [])

  return (
    <div ref={containerRef} className="relative">
      <ScrollCanvas onProgress={handleProgress} />

      <div className="fixed inset-0 z-[1] pointer-events-none vignette" />

      <ScrollProgress progress={progress} />
      <SectionIndicator activeIndex={activeSection} />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <DivisionsSection />
        <EngineeringSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-end pb-20 sm:pb-28 px-6 sm:px-12 lg:px-20">
      <div className="vignette-bottom absolute inset-x-0 bottom-0 h-64 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl text-backdrop p-8 sm:p-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-foreground/50 text-shadow-subtle">
            Prioritech Indonesia Optima
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-mono font-bold leading-[0.9] tracking-tight mb-8 text-shadow-deep">
          <span className="block">Engineering</span>
          <span className="block text-foreground/40">that endures.</span>
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
      </motion.div>

      <div className="absolute bottom-8 left-6 sm:left-12 lg:left-20 flex items-center gap-2 text-foreground/30">
        <span className="text-[10px] font-mono tracking-wider">SCROLL</span>
        <span className="w-px h-4 bg-foreground/20 animate-pulse" />
      </div>
    </section>
  )
}

function DivisionsSection() {
  return (
    <section id="divisions" className="relative min-h-screen flex items-center px-6 sm:px-12 lg:px-20 py-32">
      <div className="vignette-bottom absolute inset-x-0 bottom-0 h-64 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-backdrop p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-4 text-shadow-subtle">
            02 — Divisions
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-shadow-deep">
            Five disciplines.<br />
            <span className="text-foreground/40">One standard.</span>
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
              className={`relative bg-background/40 backdrop-blur-[4px] p-6 sm:p-8 group hover:bg-background/60 transition-colors duration-300 ${i === DIVISIONS.length - 1 ? "lg:col-span-2" : ""}`}
            >
              <span className="text-[10px] font-mono text-accent/50 block mb-4">
                {d.num}
              </span>
              <h3 className="text-sm sm:text-base font-mono font-semibold text-foreground/90 mb-2 leading-snug text-shadow-subtle">
                {d.name}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/40 font-mono leading-relaxed text-shadow-subtle">
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
    <section id="engineering" className="relative min-h-screen flex items-center px-6 sm:px-12 lg:px-20 py-32">
      <div className="vignette-bottom absolute inset-x-0 bottom-0 h-64 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-backdrop p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-4 text-shadow-subtle">
            03 — Engineering
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-shadow-deep">
            Built like<br />
            <span className="text-foreground/40">infrastructure.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
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
          className="mt-20 p-6 sm:p-8 border border-border/50 bg-background/30 backdrop-blur-[4px]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm font-mono text-foreground/60 text-shadow-subtle">
              <span className="text-accent">3</span> systems live in production.
              <span className="text-foreground/30 mx-2">·</span>
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
    <section id="process" className="relative min-h-screen flex items-center px-6 sm:px-12 lg:px-20 py-32">
      <div className="vignette-bottom absolute inset-x-0 bottom-0 h-64 pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-backdrop p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-4 text-shadow-subtle">
            04 — Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold tracking-tight text-shadow-deep">
            Four phases.<br />
            <span className="text-foreground/40">No surprises.</span>
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
                <span className="text-[10px] font-mono text-foreground/30 block mb-2">
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
    <section id="contact" className="relative min-h-screen flex items-end pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20">
      <div className="vignette-bottom absolute inset-x-0 bottom-0 h-64 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-3xl w-full text-backdrop p-8 sm:p-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-6 text-shadow-subtle">
          05 — Contact
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold leading-[0.95] tracking-tight mb-8 text-shadow-deep">
          <span className="block">Ready to build</span>
          <span className="block text-foreground/40">something real?</span>
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
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border/50 text-foreground/70 font-mono text-sm hover:border-foreground/30 hover:text-foreground transition-colors bg-background/30 backdrop-blur-[4px]"
          >
            View live demos
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-foreground/30 text-shadow-subtle">
            Jakarta, Indonesia — operating since 2024
          </span>
          <a
            href="mailto:ivan.aurelius@prioritech.co.id"
            className="text-[11px] font-mono text-foreground/40 hover:text-accent transition-colors text-shadow-subtle"
          >
            ivan.aurelius@prioritech.co.id
          </a>
        </div>
      </motion.div>
    </section>
  )
}
