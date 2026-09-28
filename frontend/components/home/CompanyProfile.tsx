"use client"

/**
 * Company Profile section — quick identity in the cinematic scroll track.
 * Two-column layout: copy left, stats/visual right.
 * Content sourced from the About page narrative.
 */

import { motion } from "framer-motion"
import { PulseDot } from "@/components/projects/demos/shared/primitives"
import { MicroLabel } from "@/components/lattice/MicroLabel"
import { OdometerNumber } from "@/components/lattice/OdometerNumber"
import { revealContainer, revealItem } from "@/lib/motion"

export function CompanyProfile(): JSX.Element {
  const stats = [
    { v: 3, label: "Systems Live" },
    { v: 5, label: "Divisions" },
    { v: 0, label: "Subcontractors" },
    { v: 1, label: "Office · Jakarta" },
  ]

  return (
    <section className="absolute inset-x-0 flex h-[90vh] items-center" style={{ top: "22%" }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="scene-card max-w-3xl p-6 sm:p-8 lg:p-10"
        >
          <motion.div variants={revealContainer(0.1, 0.1)}>
            <motion.div variants={revealItem} className="mb-5">
              <MicroLabel index="006" live>WHO WE ARE</MicroLabel>
            </motion.div>

            <motion.h2
              variants={revealItem}
              className="font-sans text-2xl font-bold leading-tight tracking-tight text-secondary sm:text-3xl lg:text-4xl"
            >
              Engineering firm. Not an agency.
            </motion.h2>

            <motion.p variants={revealItem} className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/65 sm:text-base">
              Prioritech Indonesia Optima architects, builds, and ships production systems
              across AI, defense, quantitative engineering, automation, and enterprise platforms.
              From one office in Jakarta. Every engineer is in-house. The Slack handle on your
              project is the person writing the code.
            </motion.p>

            <motion.p variants={revealItem} className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary/50 sm:text-base">
              We design for failure modes before the happy path. Observability, audit, and
              rollback are scaffolding — not features to add later.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={revealItem} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-accent/30 pl-3 sm:pl-4">
                  <div className="text-2xl font-bold text-accent tabular-nums font-mono leading-none sm:text-3xl">
                    <OdometerNumber value={s.v} />
                  </div>
                  <div className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-secondary/50 font-mono">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Identity card */}
            <motion.div variants={revealItem} className="mt-6 flex items-center gap-3">
              <PulseDot color="bg-accent" />
              <span className="text-[10px] uppercase tracking-[0.16em] text-accent/70 font-mono">
                PT Prioritech Indonesia Optima · Est. Oct 2025 · Jakarta
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
