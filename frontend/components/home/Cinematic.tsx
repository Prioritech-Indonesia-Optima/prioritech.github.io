"use client"

/**
 * The home cinematic track — a 620vh scroll journey choreographed against the
 * persistent engine canvas (see EngineStage). This component only renders the
 * HTML overlays and writes scroll progress into engineStore.phase; the 3D rig
 * does the rest frame by frame.
 *
 * Timeline (track %):
 *   0–14    hero — assembled engine, dark
 *   14–26   dissection — background to paper, engine explodes
 *   26–82   five division windows (content cards left, engine right)
 *   82–96   reassembly → ignition
 *   96–100  CTA hold
 */

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"
import { MicroLabel } from "@/components/lattice/MicroLabel"
import { MonoTimer } from "@/components/lattice/MonoTimer"
import { SplitTextHeading } from "@/components/lattice/SplitTextHeading"
import { engineStore, DIVISION_PARTS } from "@/lib/engine-store"
import { revealContainer, revealItem } from "@/lib/motion"

export function Cinematic(): JSX.Element {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    engineStore.phase.set(v)
  })

  return (
    <div ref={track} className="relative h-[620vh]">
      {/* ============ HERO (track 0–14%) ============ */}
      <section className="absolute inset-x-0 top-0 flex h-[92vh] flex-col">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6 lg:px-8">
          <MicroLabel live>JAKARTA · -6.2088 / 106.8456</MicroLabel>
          <MicroLabel className="hidden items-center gap-2 sm:inline-flex">
            UPTIME <MonoTimer mode="stopwatch" startOnSplash className="text-accent" />
          </MicroLabel>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <motion.div initial="hidden" animate="visible" variants={revealContainer(0.25, 0.1)}>
              <motion.div variants={revealItem} className="mb-6">
                <MicroLabel index="001">PROPULSION-GRADE ENGINEERING · EST. JAKARTA</MicroLabel>
              </motion.div>
            </motion.div>

            <SplitTextHeading
              as="h1"
              trigger="splash"
              staggerMs={14}
              className="font-sans text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-tight text-secondary"
            >
              Five divisions. One engine.
            </SplitTextHeading>

            <motion.div initial="hidden" animate="visible" variants={revealContainer(0.55, 0.1)}>
              <motion.p variants={revealItem} className="mt-6 max-w-lg text-base leading-relaxed text-secondary/65 sm:text-lg">
                AI in. Thrust out. We build auditable, production-grade systems across five
                engineering divisions — assembled like a rocket engine, and dissected the same way.
              </motion.p>
              <motion.p variants={revealItem} className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary/50">
                Scroll to dissect ↓
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FIVE DIVISION WINDOWS (26–82%) ============ */}
      {DIVISION_PARTS.map((d, i) => (
        <section
          key={d.index}
          className="absolute inset-x-0 flex h-[68vh] items-center"
          style={{ top: `${26.5 + i * 11.2}%` }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="scene-card max-w-md p-6 sm:p-7"
            >
              <div className="mb-3 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="font-bold text-[#b8860b]">{d.index}</span>
                <span className="opacity-55">PART — {d.part}</span>
              </div>
              <h2 className="font-sans text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{d.name}</h2>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] opacity-55">{d.spec}</p>
              <p className="mt-4 text-sm leading-relaxed opacity-75">{DIVISION_COPY[i]}</p>
              <Link
                href={d.href}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[#b8860b] transition-opacity hover:opacity-70"
              >
                Enter division <ArrowUpRight size={13} />
              </Link>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ============ IGNITION CTA (84–100%) ============ */}
      <section className="absolute inset-x-0 bottom-0 flex h-[100vh] flex-col items-center justify-end pb-[16vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="px-4"
        >
          <MicroLabel live className="mb-6 inline-flex">
            006 / IGNITION SEQUENCE
          </MicroLabel>
          <h2 className="font-sans text-5xl font-bold leading-[0.98] tracking-tight text-secondary sm:text-6xl lg:text-7xl">
            Stop shipping prototypes.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-secondary/65">
            Tell us what you need to outlast its requirements. We&apos;ll build the engine that gets it there.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton href="/contact" icon>
              Start a Build
            </PrimaryButton>
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-base text-secondary/70 transition-colors hover:text-accent"
            >
              See the demos first
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

const DIVISION_COPY = [
  "Everything enters through intelligence — retrieval, agents, and LLM pipelines that make decisions auditable from the first token.",
  "Pressure-hardening the flow: penetration testing, detection graphs, and SOC tooling that assume the adversary is already inside.",
  "Precision metering — market models, forecasting, and execution engines where being right is measured in basis points.",
  "Where energy becomes work: PLCs, robotics, and edge vision driving physical systems in production, not in demos.",
  "Thrust delivered — the enterprise platforms (ERP, WMS, SCM, CRM) that ship out the nozzle and carry the payload.",
]
