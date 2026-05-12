"use client"

import { motion } from "framer-motion"
import { Search, Wrench, Rocket } from "lucide-react"
import { revealContainer, revealItem, easing } from "@/lib/motion"

/**
 * Process strip — three connected steps with animated line draw between them.
 */
export function ProcessStrip() {
  const steps = [
    {
      n: "01",
      Icon: Search,
      title: "Discovery",
      body: "Architects, not account managers. We map your constraints, data, and decision flow before writing a line of code.",
    },
    {
      n: "02",
      Icon: Wrench,
      title: "Build",
      body: "Modular systems with observability, audit trails, and CI/CD from day one. You meet engineers, not handoffs.",
    },
    {
      n: "03",
      Icon: Rocket,
      title: "Deploy",
      body: "Production hardening, runbook delivery, and 30-day stabilization. We hand over a system, not a prototype.",
    },
  ]

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold" style={{ width: "40vw", height: "40vw", top: "-10vw", left: "30vw", opacity: 0.12 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="text-accent font-mono text-sm tracking-wider mb-3">$ how we work</p>
          <h2 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-tight">
            Three phases. No middlemen.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.1, 0.18)}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8"
        >
          {/* Connecting line — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.4, ease: easing.outExpo }}
            style={{ transformOrigin: "left center" }}
            className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 pointer-events-none"
          />

          {steps.map((s, i) => (
            <motion.div key={s.n} variants={revealItem} className="relative">
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-main/80 border border-accent/30 backdrop-blur-sm">
                    <s.Icon size={20} className="text-accent" />
                    {/* glow */}
                    <span className="absolute inset-0 rounded-full bg-accent/10 blur-md -z-10" />
                  </div>
                  <span className="text-accent/50 font-mono text-3xl font-light tabular-nums">{s.n}</span>
                </div>
                <h3 className="text-secondary text-xl sm:text-2xl font-bold font-mono mb-3">{s.title}</h3>
                <p className="text-secondary/60 text-sm sm:text-base leading-relaxed">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
