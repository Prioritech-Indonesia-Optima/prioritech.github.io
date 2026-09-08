"use client"

import { Suspense, lazy } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { SubPageScene } from "@/components/three/SubPageScene"

const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

const DIVISIONS = [
  {
    id: "ai-systems",
    num: "01",
    name: "AI Systems & Orchestration",
    title: "Decisions that explain themselves.",
    body: "Retrieval, agent orchestration, and workflow engines built for the audit trail. Every output is traceable; every escalation routes to the right human.",
    capabilities: ["RAG pipelines", "Multi-agent orchestration", "Workflow engines with audit", "Custom evals & guardrails", "Vector + structured stores", "On-prem & cloud deployment"],
    projects: ["Intelligent Query Assistant", "Context-Aware Data Engine"],
  },
  {
    id: "cybersecurity",
    num: "02",
    name: "Cybersecurity Intelligence",
    title: "Defenses that adapt faster than threats.",
    body: "Autonomous pentesting with sandboxed exploit chains. Graph correlation across logs, network, and identity. Every vulnerability arrives with evidence and a remediation path.",
    capabilities: ["AI-assisted pentesting", "Anomaly detection", "Graph-based risk modeling", "Threat intel pipelines", "Zero-trust architecture", "Security posture automation"],
    projects: ["Virtual Penetration Framework", "Threat Graph Correlator"],
  },
  {
    id: "quantitative",
    num: "03",
    name: "Quantitative Engineering",
    title: "ML forecasts that ship to production.",
    body: "Trained on tick data with confidence bands wide enough to trust. Volatility regime detection drives signal sizing in real time. Designed for the desk — not the paper trade.",
    capabilities: ["Predictive modeling", "Real-time signal generation", "Trading automation", "Volatility regime detection", "Portfolio optimization", "Risk management"],
    projects: ["Market Forecast Engine", "Breakout Probability Model", "Agentic Finance Tracker"],
  },
  {
    id: "automation",
    num: "04",
    name: "Automation & Robotics",
    title: "Bridging silicon and software.",
    body: "PLC, robotics, IoT — production-grade automation with deterministic timing and resilient failure modes. Edge inference on commodity hardware. We connect data to motion.",
    capabilities: ["PLC programming", "Robotics & ROS", "IoT framework integration", "Edge computing & vision", "Industrial data connectivity", "Motion control systems"],
    projects: ["Edge-Vision Analytics", "PLC Automation Suite", "Robotic R&D Series"],
  },
  {
    id: "applied",
    num: "05",
    name: "Applied Product Engineering",
    title: "Enterprise platforms, end-to-end.",
    body: "ERP, WMS, SCM, CRM, HRIS, MES — built for operators, not procurement. Single ledger of truth, modular by design, deployed on infrastructure you control.",
    capabilities: ["Enterprise backend systems", "Full-stack web applications", "API design at scale", "Database optimization", "Cloud-agnostic deployment", "Mobile development"],
    projects: ["ERP Suite", "WMS / SCM / CRM", "Therapeutic Dialogue AI"],
  },
]

export default function DivisionsClient() {
  return (
    <div className="min-h-screen bg-background">
      <SubPageScene pageId="divisions" />
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
              Divisions
            </span>
            <h1 className="text-4xl sm:text-6xl font-mono font-bold leading-[0.95] tracking-tight mb-8">
              <span className="block">Five disciplines.</span>
              <span className="block text-foreground/40">One standard.</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/50 font-mono leading-relaxed max-w-2xl">
              Each division operates independently but shares the same engineering
              bar: production-grade, auditable, built to be maintained.
            </p>
          </motion.div>
        </section>

        {DIVISIONS.map((d, i) => (
          <section key={d.id} id={d.id} className="px-6 sm:px-12 lg:px-20 py-20 border-t border-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[10px] font-mono text-accent/50">{d.num}</span>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground/40">
                  {d.name}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-mono font-bold tracking-tight mb-6">
                {d.title}
              </h2>

              <p className="text-sm sm:text-base text-foreground/50 font-mono leading-relaxed max-w-2xl mb-10">
                {d.body}
              </p>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-2 mb-10">
                {d.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-3 py-2 border-b border-border/50">
                    <span className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-foreground/50 font-mono">{cap}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {d.projects.map((p) => (
                  <Link
                    key={p}
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground/50 font-mono text-xs hover:border-accent/40 hover:text-foreground transition-colors"
                  >
                    {p}
                    <ArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </section>
        ))}

        <section className="px-6 sm:px-12 lg:px-20 py-24 border-t border-border">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight mb-6">
              Ready to scope a system?
            </h2>
            <p className="text-sm text-foreground/50 font-mono mb-8">
              Tell us what you need to outlast its requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-background font-mono text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Start a conversation
              <ArrowRight size={14} />
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
