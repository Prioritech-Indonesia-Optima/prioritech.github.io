"use client"

import { Suspense, lazy } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { SubPageScene } from "@/components/three/SubPageScene"

const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

const PRINCIPLES = [
  { num: "01", title: "Production first", desc: "Every system we ship is designed to run unattended. No hand-holding, no 'it works on my machine.'" },
  { num: "02", title: "Auditable by default", desc: "Decisions are traceable. Outputs are explainable. You can always answer 'why did it do that?'" },
  { num: "03", title: "Boring technology", desc: "We reach for the tool that will still be maintained in 5 years, not the one that trends this quarter." },
  { num: "04", title: "Small team, deep work", desc: "No account managers. No handoffs. The people who scope your system are the people who build it." },
]

const ANTI_FEATURES = [
  "We don't do slide decks. We do working software.",
  "We don't subcontract. Ever.",
  "We don't build prototypes that die in a drawer.",
  "We don't chase frameworks. We solve problems.",
]

const TIMELINE = [
  { year: "2024", event: "Founded in Jakarta. First production system shipped within 6 weeks." },
  { year: "2025", event: "Three systems live in production. Five divisions formalized." },
  { year: "2026", event: "Expanding into industrial automation and edge AI deployments." },
]

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-background">
      <SubPageScene pageId="about" />
      <div className="fixed inset-0 z-[1] pointer-events-none vignette" />
      <Navbar />
      <main id="main-content" className="relative z-10 pt-16">
        <section className="px-6 sm:px-12 lg:px-20 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-6">
              About
            </span>
            <h1 className="text-4xl sm:text-6xl font-mono font-bold leading-[0.95] tracking-tight mb-8">
              <span className="block">We build systems</span>
              <span className="block text-foreground/40">that outlast their requirements.</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/50 font-mono leading-relaxed max-w-2xl">
              Prioritech Indonesia Optima is an engineering firm based in Jakarta.
              We design and build production-grade systems across AI, cybersecurity,
              quantitative finance, industrial automation, and enterprise software.
            </p>
          </motion.div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-10"
            >
              Principles
            </motion.span>

            <div className="space-y-12">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-6"
                >
                  <span className="text-[10px] font-mono text-accent/50 pt-1">{p.num}</span>
                  <div>
                    <h3 className="text-lg font-mono font-semibold text-foreground/90 mb-2">{p.title}</h3>
                    <p className="text-sm text-foreground/45 font-mono leading-relaxed max-w-lg">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-10"
            >
              What we don&apos;t do
            </motion.span>

            <div className="space-y-4">
              {ANTI_FEATURES.map((item, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-sm sm:text-base text-foreground/50 font-mono pl-4 border-l border-accent/30"
                >
                  {item}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-10"
            >
              Timeline
            </motion.span>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  <div className="absolute left-[-3px] top-1 w-[7px] h-[7px] rounded-full bg-accent" />
                  <span className="text-[10px] font-mono text-foreground/30 block mb-1">{t.year}</span>
                  <p className="text-sm text-foreground/60 font-mono">{t.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-24 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight mb-6">
              <span className="text-foreground/40">Jakarta.</span>
            </h2>
            <p className="text-sm text-foreground/45 font-mono leading-relaxed mb-8">
              NEO SOHO Podomoro City, Unit 3106
              <br />
              Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan
              <br />
              Jakarta Barat, DKI Jakarta 11470
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-mono text-foreground/70 hover:text-accent transition-colors"
            >
              Get in touch
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
