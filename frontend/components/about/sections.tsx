"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, X, MapPin, Mail, Building2 } from "lucide-react"
import { SectionLead } from "@/components/shared/SectionLead"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"
import { PulseDot } from "@/components/projects/demos/shared/primitives"
import { DotMatrix } from "@/components/lattice/DotMatrix"
import { MicroLabel } from "@/components/lattice/MicroLabel"
import { OdometerNumber } from "@/components/lattice/OdometerNumber"
import { revealContainer, revealItem, easing, duration } from "@/lib/motion"

// ============================================================================
// HERO — strong identity statement
// ============================================================================

export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
      <DotMatrix fade="radial" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealContainer(0.15, 0.12)}
          className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center"
        >
          <div className="lg:col-span-3">
            <motion.div variants={revealItem} className="mb-4">
              <MicroLabel index="010" live>ABOUT PRIORITECH</MicroLabel>
            </motion.div>
            <motion.h1 variants={revealItem}
              className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] tracking-tight mb-6"
            >
              We build the systems other firms{" "}
              <span className="text-accent">ship around.</span>
            </motion.h1>
            <motion.p variants={revealItem}
              className="text-secondary/65 text-lg sm:text-xl leading-relaxed max-w-2xl"
            >
              Prioritech Indonesia Optima is an engineering firm — not an agency, not a consultancy. We architect, build, and ship production systems across AI, defense, quantitative engineering, automation, and enterprise platforms. From one office in Jakarta.
            </motion.p>
          </div>

          {/* Right: identity card */}
          <motion.div
            variants={revealItem}
            className="lg:col-span-2 relative rounded-2xl border border-accent/25 bg-gradient-to-br from-main/95 via-main to-main/80 backdrop-blur-md p-6 sm:p-7 shadow-2xl shadow-accent/10"
          >
            <div className="flex items-center gap-2 mb-5">
              <PulseDot color="bg-accent" />
              <span className="text-[10px] uppercase tracking-widest text-accent font-mono">identity</span>
            </div>
            <dl className="space-y-4 font-mono">
              {[
                { k: "legal",      v: "PT Prioritech Indonesia Optima" },
                { k: "founded",    v: "Oct 2025 · Jakarta, Indonesia" },
                { k: "engineering", v: "5 divisions · in-house" },
                { k: "operations", v: "one office · no subcontractors" },
              ].map((row) => (
                <div key={row.k} className="border-l-2 border-accent/30 pl-3">
                  <dt className="text-[10px] uppercase tracking-widest text-secondary/45 mb-0.5">{row.k}</dt>
                  <dd className="text-secondary text-sm">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-accent/5 blur-3xl pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MANIFESTO — four numbered principles
// ============================================================================

export function PrincipleManifest() {
  const principles = [
    {
      n: "01",
      title: "We build what's needed, not what fits.",
      body:
        "No filler features. No empty dashboards. Every line of code answers a real constraint the operator named in discovery.",
    },
    {
      n: "02",
      title: "Engineers, not middlemen.",
      body:
        "You meet the people writing the code. No account managers, no overseas subcontractors. The architect who scopes the system is on the deploy call.",
    },
    {
      n: "03",
      title: "Production from day one.",
      body:
        "We design for the failure modes before the happy path. Observability, audit, and rollback are scaffolding — not features to add later.",
    },
    {
      n: "04",
      title: "Systems that outlast their requirements.",
      body:
        "We optimize for the migration path, not the prototype. Modular, documented, cloud-agnostic. The next team should thank us, not curse us.",
    },
  ]

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold"
        style={{ width: "40vw", height: "40vw", top: "5vw", left: "30vw", opacity: 0.1 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="what we believe"
          title={<>Four principles. <span className="text-accent/80">No exceptions.</span></>}
          subtitle="These aren't poster slogans. They show up in the architecture decisions, the contracts we sign, and the work we turn down."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.2, 0.12)}
          className="grid md:grid-cols-2 gap-5 lg:gap-6 mt-12 lg:mt-16"
        >
          {principles.map((p, i) => (
            <motion.article
              key={p.n}
              variants={revealItem}
              className="group relative rounded-2xl border border-accent/15 bg-main/60 backdrop-blur-sm p-6 lg:p-8 hover:border-accent/40 hover:bg-main/80 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 text-[120px] sm:text-[140px] font-bold text-accent/[0.06] font-mono leading-none select-none group-hover:text-accent/10 transition-colors duration-500">
                {p.n}
              </div>
              <div className="relative">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-accent/70 font-mono text-sm tracking-wider">{p.n}</span>
                  <span className="h-px flex-1 bg-accent/20" />
                </div>
                <h3 className="text-secondary text-xl sm:text-2xl font-bold font-mono leading-tight mb-3 group-hover:text-accent/90 transition-colors">
                  {p.title}
                </h3>
                <p className="text-secondary/60 text-sm sm:text-base leading-relaxed">
                  {p.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// STATS — by the numbers
// ============================================================================

export function CompanyStats() {
  const stats = [
    { v: 3, suffix: "",  label: "systems live",         caption: "AI hosting · marketplace · FX ERP" },
    { v: 5, suffix: "",  label: "engineering divisions", caption: "in-house, cross-disciplinary" },
    { v: 0, suffix: "",  label: "subcontractors",       caption: "every engineer is in-house" },
    { v: 1, suffix: "",  label: "office · Jakarta",     caption: "Tanjung Duren · ships globally" },
  ]
  return (
    <section className="relative py-16 sm:py-20 border-y border-line bg-panel/40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealContainer(0.1, 0.1)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={revealItem} className="border-l border-accent/30 pl-4 sm:pl-5">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-accent tabular-nums font-mono leading-none">
                <OdometerNumber value={s.v} suffix={s.suffix} />
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-wider text-secondary/75 mt-3 font-mono font-semibold">
                {s.label}
              </div>
              <div className="text-[11px] text-secondary/45 mt-1">{s.caption}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// ANTI-FEATURES — what we don't do
// ============================================================================

export function AntiFeatures() {
  const items = [
    {
      title: "Generic platforms looking for use cases.",
      body: "We don't sell SaaS. Every system is built for the operator who scoped it. No \"customize after purchase.\"",
    },
    {
      title: "Outsourcing through middlemen.",
      body: "No staffing agencies in the chain. The Slack handle on your project is the engineer writing the code.",
    },
    {
      title: "Demos that don't survive production.",
      body: "We don't ship prototypes with a roadmap to make them real. The first deploy is a system you can rely on.",
    },
  ]
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="what we don't do"
          title={<>What we're <span className="text-accent/80">allergic</span> to.</>}
          subtitle="Just as important as what we build. If any of these patterns is what you're looking for, we'll point you somewhere else."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.15, 0.12)}
          className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-12 lg:mt-16"
        >
          {items.map((it) => (
            <motion.article
              key={it.title}
              variants={revealItem}
              className="relative rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] backdrop-blur-sm p-6 lg:p-7 hover:border-rose-500/30 transition-colors duration-500"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-500/15 border border-rose-500/30 mb-4">
                <X size={20} className="text-rose-300" />
              </div>
              <h3 className="text-secondary text-lg sm:text-xl font-bold font-mono leading-snug mb-3">
                {it.title}
              </h3>
              <p className="text-secondary/55 text-sm sm:text-base leading-relaxed">{it.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// TIMELINE — vertical milestones
// ============================================================================

export function CompanyTimeline() {
  const milestones = [
    {
      year: "Oct 2025",
      title: "Founded in Jakarta",
      body: "PT Prioritech Indonesia Optima registered. One office in Tanjung Duren, a small team, and a stubborn opinion: ship working systems, not roadmaps.",
    },
    {
      year: "Q4 2025",
      title: "First production deploys",
      body: "AI Systems and Cybersecurity ship first. The pattern holds: every engagement starts with discovery and ends with a runbook — no in-between roadmap.",
    },
    {
      year: "Q1 2026",
      title: "Five divisions stood up",
      body: "AI Systems, Cybersecurity, Quantitative, Automation, and Applied Engineering — each with its own focus, all on a single shared platform.",
    },
    {
      year: "today",
      title: "Three systems in production",
      body: "AI hosting infrastructure, an operated marketplace, and an FX-industry ERP — live and serving load. No legacy code, no organizational inertia, no subcontractors. The portfolio compounds from here.",
    },
  ]
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold"
        style={{ width: "45vw", height: "45vw", top: "20%", right: "-15vw", opacity: 0.1 }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="how we got here"
          title={<>Young by design. <span className="text-accent/80">Built fast.</span></>}
          subtitle="Founded October 2025. Three systems live, five engineering divisions, one office in Jakarta. No legacy decisions to maintain, no slow committee to satisfy."
        />

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealContainer(0.2, 0.15)}
          className="relative mt-14 lg:mt-20 space-y-10 sm:space-y-12 before:absolute before:left-[14px] sm:before:left-[18px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-accent/20 before:to-transparent"
        >
          {milestones.map((m, i) => (
            <motion.li key={i} variants={revealItem} className="relative pl-12 sm:pl-16">
              <div className="absolute left-0 top-1.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-main border-2 border-accent/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-accent/70 font-mono mb-2">{m.year}</div>
              <h3 className="text-secondary text-lg sm:text-xl font-bold font-mono leading-snug mb-2">{m.title}</h3>
              <p className="text-secondary/60 text-sm sm:text-base leading-relaxed max-w-2xl">{m.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}

// ============================================================================
// LOCATION — Jakarta office band
// ============================================================================

export function LocationBand() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--silver"
        style={{ width: "50vw", height: "50vw", top: "-15vw", left: "-15vw", opacity: 0.18, animationDelay: "-6s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: easing.outExpo }}
          >
            <p className="text-accent font-mono text-sm tracking-widest mb-3">$ where we are</p>
            <h2 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-tight mb-6 tracking-tight">
              Jakarta. <span className="text-accent/80">One office.</span> No subcontractors.
            </h2>
            <p className="text-secondary/65 text-base sm:text-lg leading-relaxed mb-8">
              Our entire engineering organization works from a single floor in Tanjung Duren. Same room, same coffee, same standards. We deliver remotely worldwide — but we ship from here.
            </p>
            <div className="space-y-3 font-mono">
              <div className="flex items-start gap-3 text-secondary/75">
                <Building2 size={18} className="text-accent flex-shrink-0 mt-1" />
                <span className="text-sm">PT PRIORITECH INDONESIA OPTIMA</span>
              </div>
              <div className="flex items-start gap-3 text-secondary/75">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-1" />
                <span className="text-sm leading-relaxed">
                  NEO SOHO Podomoro City Unit 3106<br />
                  Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan<br />
                  Jakarta Barat, DKI Jakarta 11470
                </span>
              </div>
              <div className="flex items-start gap-3 text-secondary/75">
                <Mail size={18} className="text-accent flex-shrink-0 mt-1" />
                <a href="mailto:ivan.aurelius@prioritech.co.id" className="text-sm hover:text-accent transition-colors">
                  ivan.aurelius@prioritech.co.id
                </a>
              </div>
            </div>
          </motion.div>

          {/* Stylized map of Jakarta region */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easing.outExpo, delay: 0.15 }}
            className="relative rounded-2xl border border-accent/20 bg-gradient-to-br from-main via-main to-main/80 overflow-hidden aspect-[4/3] shadow-2xl shadow-accent/10"
          >
            <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
              <defs>
                <radialGradient id="pulse" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#daa520" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#daa520" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Stylized landmass */}
              <path
                d="M 10 60 Q 30 50, 60 55 Q 85 45, 110 52 Q 140 48, 175 58 Q 195 60, 190 80 Q 180 100, 150 105 Q 110 115, 70 110 Q 30 105, 12 95 Z"
                fill="rgba(218,165,32,0.06)"
                stroke="rgba(218,165,32,0.3)"
                strokeWidth={0.5}
              />
              {/* Grid lines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 25} x2={i * 25} y1={0} y2={150}
                  stroke="rgba(218,165,32,0.05)" strokeWidth={0.3} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h${i}`} y1={i * 25} y2={i * 25} x1={0} x2={200}
                  stroke="rgba(218,165,32,0.05)" strokeWidth={0.3} />
              ))}
              {/* Major cities */}
              {[
                { x: 50, y: 80, name: "Tangerang", small: true },
                { x: 95, y: 78, name: "Jakarta", primary: true },
                { x: 145, y: 82, name: "Bekasi", small: true },
                { x: 105, y: 105, name: "Bogor", small: true },
              ].map((c) => (
                <g key={c.name}>
                  {c.primary && (
                    <>
                      <circle cx={c.x} cy={c.y} r={20} fill="url(#pulse)" />
                      <motion.circle
                        cx={c.x} cy={c.y} r={3}
                        fill="none" stroke="#daa520" strokeWidth={0.4}
                        animate={{ r: [3, 14], opacity: [0.7, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    </>
                  )}
                  <circle cx={c.x} cy={c.y} r={c.primary ? 2.5 : 1.3} fill={c.primary ? "#daa520" : "rgba(217,217,217,0.7)"} />
                  <text
                    x={c.x} y={c.y - 5}
                    textAnchor="middle"
                    fontSize={c.primary ? 4.5 : 3}
                    fill={c.primary ? "#daa520" : "rgba(217,217,217,0.7)"}
                    fontFamily="monospace"
                    fontWeight={c.primary ? "bold" : "normal"}
                  >
                    {c.primary && "★ "}{c.name}
                  </text>
                </g>
              ))}
              {/* Pin marker */}
              <g>
                <text x={95} y={92} textAnchor="middle" fontSize={3} fill="rgba(218,165,32,0.7)" fontFamily="monospace">
                  Tanjung Duren · 11470
                </text>
              </g>
            </svg>
            <div className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-secondary/45 font-mono">
              jakarta · 6.1751° S, 106.8650° E
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <PulseDot color="bg-emerald-400" />
              <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-mono">on-site</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA
// ============================================================================

export function AboutCTA() {
  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold"
        style={{ width: "65vw", height: "65vw", top: "-20vw", left: "-20vw", opacity: 0.35 }} />
      <div className="aurora-orb aurora-orb--silver"
        style={{ width: "50vw", height: "50vw", bottom: "-15vw", right: "-15vw", opacity: 0.2, animationDelay: "-12s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: easing.outExpo }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <p className="text-accent font-mono text-sm tracking-widest mb-6">$ work with us</p>
        <h2 className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] tracking-tight mb-8">
          Performance speaks <span className="text-accent">louder than promises.</span>
        </h2>
        <p className="text-secondary/65 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Tell us the system you need to outlast its requirements. We'll tell you whether we're the right team to build it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton href="/contact" icon>$ Start a Build</PrimaryButton>
          <SecondaryButton href="/projects" icon>$ See What We've Shipped</SecondaryButton>
        </div>
      </motion.div>
    </section>
  )
}
