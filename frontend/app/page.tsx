"use client"

import { Suspense, lazy } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Shield, TrendingUp, Cog, Layers } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { ScrollProgress } from "@/components/common/ScrollProgress"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"
import { HeroControlPanel } from "@/components/home/HeroControlPanel"
import { LiveProducts } from "@/components/home/LiveProducts"
import { DivisionBento } from "@/components/home/DivisionBento"
import { ProcessStrip } from "@/components/home/ProcessStrip"
import { revealContainer, revealItem, easing } from "@/lib/motion"

const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

/**
 * Home — completely redesigned. Lead with a live control room, not a tagline.
 * Demos are the marketing.
 */
export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-main">
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        {/* ============================================================ */}
        {/* HERO — left copy, right live control panel                  */}
        {/* ============================================================ */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
          {/* Aurora backdrop */}
          <div className="aurora-orb aurora-orb--gold"
            style={{ width: "70vw", height: "70vw", top: "-25vw", left: "-15vw", opacity: 0.3 }} />
          <div className="aurora-orb aurora-orb--silver"
            style={{ width: "50vw", height: "50vw", bottom: "-20vw", right: "-10vw", opacity: 0.18, animationDelay: "-12s" }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-center">
              {/* Left: copy (3 cols) */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={revealContainer(0.15, 0.12)}
                className="lg:col-span-3"
              >
                <motion.div variants={revealItem} className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-accent/30 bg-main/60 backdrop-blur-sm">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-secondary/85 font-mono">
                    Jakarta · AI Engineering
                  </span>
                </motion.div>

                <motion.h1 variants={revealItem}
                  className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] mb-6 tracking-tight"
                >
                  Production systems for{" "}
                  <span className="text-sweep">AI, automation, and defense.</span>
                </motion.h1>

                <motion.p variants={revealItem}
                  className="text-secondary/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl"
                >
                  We build the systems other engineering firms ship around. Auditable, production-grade, and designed to outlast their requirements — from a single Jakarta office.
                </motion.p>

                {/* Stat strip — honest numbers */}
                <motion.div variants={revealItem} className="grid grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-xl">
                  {[
                    { v: "3", l: "systems live in production" },
                    { v: "5", l: "engineering divisions" },
                    { v: "0", l: "subcontractors · ever" },
                  ].map((s) => (
                    <div key={s.l} className="border-l border-accent/30 pl-3 sm:pl-4">
                      <div className="text-2xl sm:text-3xl font-bold text-accent tabular-nums font-mono leading-none">
                        {s.v}
                      </div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-secondary/55 mt-1.5 font-mono">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div variants={revealItem} className="flex flex-col sm:flex-row gap-3">
                  <PrimaryButton href="/projects" icon>
                    $ Explore Live Demos
                  </PrimaryButton>
                  <SecondaryButton href="/contact" icon>
                    $ Start a Build
                  </SecondaryButton>
                </motion.div>
              </motion.div>

              {/* Right: live control panel (2 cols) */}
              <div className="lg:col-span-2">
                <HeroControlPanel />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CAPABILITY STRIP — quick categorical glance                 */}
        {/* ============================================================ */}
        <section className="relative py-10 sm:py-12 border-y border-accent/10 bg-main/40 backdrop-blur-sm overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
              {[
                { Icon: Brain,      title: "Intelligence",      caption: "AI retrieval · agents · automation" },
                { Icon: Shield,     title: "Defense",            caption: "pentesting · threat graphs · SOC" },
                { Icon: TrendingUp, title: "Quant",              caption: "forecasting · trading · risk" },
                { Icon: Cog,        title: "Automation",         caption: "PLC · robotics · edge vision" },
                { Icon: Layers,     title: "Enterprise",         caption: "ERP · WMS · SCM · CRM" },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: easing.outExpo }}
                  className="flex items-start gap-3"
                >
                  <div className="flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-lg bg-accent/10 border border-accent/20">
                    <c.Icon size={18} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-secondary font-semibold text-sm font-mono">{c.title}</div>
                    <div className="text-secondary/45 text-[11px] font-mono mt-0.5 truncate">{c.caption}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* DIVISION BENTO — 5 tiles with mini live previews            */}
        {/* ============================================================ */}
        <DivisionBento />

        {/* ============================================================ */}
        {/* LIVE PRODUCTS — the 3 systems we actually run today          */}
        {/* ============================================================ */}
        <LiveProducts />

        {/* ============================================================ */}
        {/* PROCESS — three phases                                       */}
        {/* ============================================================ */}
        <ProcessStrip />

        {/* ============================================================ */}
        {/* CLOSING CTA — punchy, single message                         */}
        {/* ============================================================ */}
        <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden border-t border-accent/10">
          <div className="aurora-orb aurora-orb--gold"
            style={{ width: "70vw", height: "70vw", top: "-20vw", left: "-20vw", opacity: 0.4 }} />
          <div className="aurora-orb aurora-orb--silver"
            style={{ width: "55vw", height: "55vw", bottom: "-20vw", right: "-15vw", opacity: 0.22, animationDelay: "-12s" }} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easing.outExpo }}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <p className="text-accent font-mono text-sm tracking-widest mb-6">$ let's build something that lasts</p>
            <h2 className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] mb-8 tracking-tight">
              Stop shipping{" "}
              <span className="text-sweep">prototypes.</span>
            </h2>
            <p className="text-secondary/65 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              Tell us what you need to outlast its requirements. We'll architect the system that gets there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton href="/contact" icon>
                $ Start a Build
              </PrimaryButton>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 text-secondary/70 hover:text-accent text-base font-mono px-6 py-3 transition-colors group"
              >
                See the demos first
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Suspense fallback={<footer className="py-8 bg-main border-t border-accent/20" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
