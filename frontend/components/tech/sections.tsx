"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown, Layers, Brain, Database, Cog, Shield, Code2, Cpu, Cloud,
  CheckCircle, Eye, Lock, Zap, type LucideIcon,
} from "lucide-react"
import { SectionLead } from "@/components/shared/SectionLead"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"
import { PulseDot } from "@/components/projects/demos/shared/primitives"
import { revealContainer, revealItem, easing } from "@/lib/motion"

// ============================================================================
// HERO
// ============================================================================

export function TechHero() {
  return (
    <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
      <div className="aurora-orb aurora-orb--gold" style={{ width: "65vw", height: "65vw", top: "-25vw", left: "-15vw", opacity: 0.22 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={revealContainer(0.1, 0.12)}>
          <motion.p variants={revealItem} className="text-accent font-mono text-sm tracking-widest mb-4">
            $ technology stack
          </motion.p>
          <motion.h1 variants={revealItem}
            className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] tracking-tight mb-6 max-w-4xl"
          >
            Tools change.{" "}
            <span className="text-sweep">Principles don't.</span>
          </motion.h1>
          <motion.p variants={revealItem} className="text-secondary/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl">
            Six layers, one operating philosophy. We pick the boring, proven stack for production paths — and the sharp edge only where it earns its place.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// STACK LAYERS — interactive 6-tier visualization
// ============================================================================

interface Layer {
  id: string
  label: string
  caption: string
  Icon: LucideIcon
  techs: string[]
  tone: string
}

const LAYERS: Layer[] = [
  {
    id: "frontend",
    label: "Frontend & Mobile",
    caption: "What the operator sees and touches.",
    Icon: Code2,
    techs: ["Next.js 14", "React 18", "TypeScript", "Tailwind 4", "Flutter", "Framer Motion"],
    tone: "from-accent/30 to-accent/5",
  },
  {
    id: "backend",
    label: "Backend & APIs",
    caption: "Stateless services, contracts, and orchestration.",
    Icon: Cog,
    techs: ["Python · FastAPI", "Go", "Rust", "Java · Spring", "gRPC", "GraphQL"],
    tone: "from-accent/25 to-accent/5",
  },
  {
    id: "ai",
    label: "AI / ML",
    caption: "Models, orchestrators, retrieval.",
    Icon: Brain,
    techs: ["PyTorch", "LangChain", "CrewAI", "Ollama", "HuggingFace", "Vector DBs"],
    tone: "from-accent/22 to-accent/4",
  },
  {
    id: "data",
    label: "Data & Storage",
    caption: "Where state lives — transactional, analytical, ephemeral.",
    Icon: Database,
    techs: ["PostgreSQL", "Redis", "Kafka", "ClickHouse", "TimescaleDB", "DuckDB"],
    tone: "from-accent/20 to-accent/4",
  },
  {
    id: "infra",
    label: "Infrastructure",
    caption: "Cloud, containers, IaC, and runtime.",
    Icon: Cloud,
    techs: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux", "Vercel"],
    tone: "from-accent/18 to-accent/3",
  },
  {
    id: "hardware",
    label: "Hardware & Edge",
    caption: "Where bits meet atoms — PLC, robotics, embedded.",
    Icon: Cpu,
    techs: ["Embedded C", "ROS", "Modbus / OPC-UA", "ESP32 / ARM", "SCADA", "PLC ladder"],
    tone: "from-accent/15 to-accent/3",
  },
]

export function TechStackLayers() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--silver" style={{ width: "45vw", height: "45vw", top: "10vw", right: "-15vw", opacity: 0.12 }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="the stack"
          title={<>Six layers. <span className="text-accent/80">One system.</span></>}
          subtitle="Hover or tap a layer to see what's inside. We swap tools when something better arrives — but the layering is invariant."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.2, 0.1)}
          className="mt-14 lg:mt-16 space-y-3"
        >
          {LAYERS.map((l, i) => {
            const isActive = active === l.id
            return (
              <motion.div
                key={l.id}
                variants={revealItem}
                onMouseEnter={() => setActive(l.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(l.id)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                className={`group relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? "border-accent/60 -translate-y-1 shadow-2xl shadow-accent/20"
                    : "border-accent/15 hover:border-accent/40"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${l.tone} pointer-events-none transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-60"}`} />
                <div className="absolute inset-0 bg-main/85 backdrop-blur-sm pointer-events-none" />

                <div className="relative px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-4 sm:gap-5">
                  <span className="text-accent/40 font-mono text-xs tabular-nums tracking-wider flex-shrink-0 w-6">
                    L{i + 1}
                  </span>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-all duration-300 ${
                    isActive ? "bg-accent/20 border border-accent/60" : "bg-accent/10 border border-accent/20"
                  }`}>
                    <l.Icon size={20} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-secondary font-mono font-semibold text-base sm:text-lg leading-tight">
                      {l.label}
                    </h3>
                    <p className="text-secondary/55 text-xs sm:text-sm mt-0.5">{l.caption}</p>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-secondary/40 transition-transform duration-300 flex-shrink-0 ${
                      isActive ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: easing.outExpo }}
                      className="relative overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                        <div className="border-t border-accent/15 pt-4">
                          <div className="flex flex-wrap gap-2">
                            {l.techs.map((t, ti) => (
                              <motion.span
                                key={t}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: ti * 0.04, duration: 0.3, ease: easing.outExpo }}
                                className="inline-flex items-center px-3 py-1.5 rounded-md bg-accent/10 border border-accent/25 text-accent text-xs sm:text-sm font-mono font-medium"
                              >
                                {t}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// PRINCIPLES — three engineering principles
// ============================================================================

export function EngineeringPrinciples() {
  const principles = [
    {
      word: "Modular.",
      body: "Documented interfaces. Components are upgraded, not rewritten. Your system survives the next refactor cycle.",
      Icon: Layers,
    },
    {
      word: "Observable.",
      body: "Structured logs, metrics, distributed traces by default. Know why systems fail before they fail.",
      Icon: Eye,
    },
    {
      word: "Tested.",
      body: "Unit, integration, load — at every layer. CI/CD that fails fast. Production is not where you learn the bug exists.",
      Icon: CheckCircle,
    },
  ]
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold" style={{ width: "40vw", height: "40vw", top: "5vw", right: "20vw", opacity: 0.12 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="engineering principles"
          title={<>Three rules that <span className="text-accent/80">don't move.</span></>}
          subtitle="Tools change every quarter. These three don't. If a system can't meet all three, we don't ship it."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.15, 0.15)}
          className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-14 lg:mt-16"
        >
          {principles.map((p) => (
            <motion.article
              key={p.word}
              variants={revealItem}
              className="group relative rounded-2xl border border-accent/15 bg-main/60 backdrop-blur-sm p-7 lg:p-8 overflow-hidden hover:border-accent/40 hover:bg-main/80 transition-all duration-500"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 mb-6">
                <p.Icon size={22} className="text-accent" />
              </div>
              <h3 className="text-secondary text-4xl sm:text-5xl font-bold font-mono leading-none mb-4 group-hover:text-accent/90 transition-colors">
                {p.word}
              </h3>
              <p className="text-secondary/60 text-sm sm:text-base leading-relaxed">{p.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// SECURITY + HARDWARE SPLIT
// ============================================================================

export function SecurityHardwareSplit() {
  const security = [
    { Icon: Shield, name: "Zero-Trust", caption: "every request verified, no implicit perimeter" },
    { Icon: Lock,   name: "Encrypted",  caption: "TLS in transit, AES-256 at rest, KMS-managed" },
    { Icon: Eye,    name: "Audited",    caption: "every action logged, retained, queryable" },
    { Icon: Zap,    name: "Automated",  caption: "threat detection + response in the pipeline" },
  ]
  const hardware = [
    { Icon: Cpu,  name: "Firmware",  caption: "ARM, ESP32, real-time RTOS" },
    { Icon: Cog,  name: "PLC",       caption: "ladder logic, structured text, IEC 61131" },
    { Icon: Brain, name: "Edge AI",   caption: "int8 quantized models, sub-50ms inference" },
    { Icon: Database, name: "Telemetry", caption: "Modbus, OPC-UA, MQTT — protocol-agnostic" },
  ]
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="the edges of the stack"
          title={<>Security & hardware. <span className="text-accent/80">No afterthoughts.</span></>}
          subtitle="Two areas where most companies bolt on later, we design in first."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.2, 0.12)}
          className="grid lg:grid-cols-2 gap-6 mt-14 lg:mt-16"
        >
          <motion.div variants={revealItem} className="rounded-2xl border border-accent/15 bg-main/60 backdrop-blur-sm p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30">
                <Shield size={20} className="text-accent" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">domain</div>
                <h3 className="text-secondary text-xl sm:text-2xl font-bold font-mono leading-tight">Security architecture</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {security.map((s) => (
                <div key={s.name} className="rounded-lg bg-main/50 border border-accent/15 p-3.5 hover:border-accent/40 transition-colors">
                  <s.Icon size={18} className="text-accent mb-2" />
                  <div className="text-secondary font-mono font-semibold text-sm">{s.name}</div>
                  <div className="text-secondary/45 text-[11px] mt-1 leading-snug">{s.caption}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={revealItem} className="rounded-2xl border border-accent/15 bg-main/60 backdrop-blur-sm p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30">
                <Cpu size={20} className="text-accent" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-secondary/45 font-mono">domain</div>
                <h3 className="text-secondary text-xl sm:text-2xl font-bold font-mono leading-tight">Hardware & embedded</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {hardware.map((h) => (
                <div key={h.name} className="rounded-lg bg-main/50 border border-accent/15 p-3.5 hover:border-accent/40 transition-colors">
                  <h.Icon size={18} className="text-accent mb-2" />
                  <div className="text-secondary font-mono font-semibold text-sm">{h.name}</div>
                  <div className="text-secondary/45 text-[11px] mt-1 leading-snug">{h.caption}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// DEVELOPMENT APPROACH — 6 bullets
// ============================================================================

export function DevelopmentApproach() {
  const points = [
    { title: "Modular by design", body: "Documented interfaces. Upgrade components without system-wide rewrites." },
    { title: "Tested at every layer", body: "Unit, integration, load. CI/CD that fails fast — never in prod." },
    { title: "Observable by default", body: "Structured logs, metrics, distributed tracing. Know why systems fail." },
    { title: "Documentation as code", body: "API contracts, deployment runbooks, failure mode analysis — versioned with the code." },
    { title: "Cloud-agnostic", body: "Migration paths designed in. Run anywhere, move when needed, no vendor lock-in." },
    { title: "Security through design", body: "Threat modeling, defense in depth, least privilege, audit trails — from day one." },
  ]
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden border-t border-accent/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLead
          eyebrow="how the work happens"
          title={<>Engineering <span className="text-accent/80">discipline.</span></>}
          subtitle="Patterns we apply on every project, regardless of division or complexity."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer(0.1, 0.08)}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 lg:mt-16"
        >
          {points.map((p, i) => (
            <motion.div key={p.title} variants={revealItem}
              className="relative rounded-xl border border-accent/15 bg-main/50 backdrop-blur-sm p-5 hover:border-accent/40 hover:bg-main/70 transition-all"
            >
              <div className="text-accent/40 font-mono text-xs tabular-nums mb-2">0{i + 1}</div>
              <h3 className="text-secondary font-mono font-semibold text-base sm:text-lg mb-2">{p.title}</h3>
              <p className="text-secondary/55 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA
// ============================================================================

export function TechCTA() {
  return (
    <section className="relative py-28 sm:py-32 lg:py-40 overflow-hidden border-t border-accent/10">
      <div className="aurora-orb aurora-orb--gold" style={{ width: "65vw", height: "65vw", top: "-20vw", left: "-15vw", opacity: 0.32 }} />
      <div className="aurora-orb aurora-orb--silver" style={{ width: "50vw", height: "50vw", bottom: "-15vw", right: "-15vw", opacity: 0.18, animationDelay: "-12s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: easing.outExpo }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <p className="text-accent font-mono text-sm tracking-widest mb-6">$ build with us</p>
        <h2 className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono leading-[1.05] tracking-tight mb-8">
          Pick the boring stack.{" "}
          <span className="text-sweep">Ship the sharp system.</span>
        </h2>
        <p className="text-secondary/65 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          We pick proven tools for the production path. The sharp edge only where it earns its place. The result is a system you can rely on for years.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton href="/contact" icon>$ Start a Build</PrimaryButton>
          <SecondaryButton href="/projects" icon>$ See It Running</SecondaryButton>
        </div>
      </motion.div>
    </section>
  )
}
