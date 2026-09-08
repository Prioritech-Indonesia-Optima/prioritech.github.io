"use client"

import { Suspense, lazy, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { SubPageScene } from "@/components/three/SubPageScene"
import { ProjectDemoModal } from "@/components/projects/ProjectDemoModal"

const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

const CATEGORIES = [
  {
    id: "ai-systems",
    title: "AI Systems",
    projects: [
      { title: "Intelligent Query Assistant", desc: "Natural-language analytics over structured enterprise data.", impact: "80% faster data retrieval", stack: ["LangChain", "FastAPI", "PostgreSQL"] },
      { title: "Context-Aware Data Engine", desc: "Adaptive retrieval and feedback system for precision analytics.", impact: "Self-improving retrieval", stack: ["RAG", "Vector Stores", "Feedback Loops"] },
      { title: "Therapeutic Dialogue AI", desc: "Sentiment-aware conversational engine with on-device privacy.", impact: "Sensitivity-first, zero cloud", stack: ["On-device LLM", "Sentiment", "Guardrails"] },
      { title: "Offline Transcriber", desc: "On-device transcription + summarization with zero cloud dependency.", impact: "180ms latency, 4.1% WER", stack: ["whisper.cpp", "VAD", "Local LLM"] },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    projects: [
      { title: "Virtual Penetration Framework", desc: "Autonomous AI-driven pentest system with sandboxed exploit chains.", impact: "70% reduction in manual review time", stack: ["AI Pentesting", "Security Automation"] },
      { title: "Threat Graph Correlator", desc: "Graph intelligence engine linking cross-system anomalies.", impact: "Real-time threat detection", stack: ["Graph Intelligence", "Anomaly Detection"] },
    ],
  },
  {
    id: "quantitative",
    title: "Quantitative",
    projects: [
      { title: "Market Forecast Engine", desc: "ML pipeline predicting volatility and momentum.", impact: "+38% ROI over baseline", stack: ["Machine Learning", "Time Series"] },
      { title: "Breakout Probability Model", desc: "Real-time signal recognition and risk analysis.", impact: "High-consistency predictions", stack: ["Signal Processing", "Risk Analysis"] },
      { title: "Agentic Finance Tracker", desc: "Conversational finance system identifying inefficiencies.", impact: "12% reduction in wasted spend", stack: ["Conversational AI", "Financial Analysis"] },
    ],
  },
  {
    id: "automation",
    title: "Automation & Robotics",
    projects: [
      { title: "Edge-Vision Analytics", desc: "Real-time vision at the edge for manufacturing optimization.", impact: "Optimized production processes", stack: ["Edge AI", "Computer Vision"] },
      { title: "PLC Automation Suite", desc: "Industrial automation with precision timing and error resilience.", impact: "High-reliability control systems", stack: ["PLC", "SCADA", "Industrial IoT"] },
      { title: "Robotic R&D Series", desc: "Drones, AI CCTV, and robotics integrating autonomy with reliability.", impact: "Advanced industrial robotics", stack: ["Robotics", "ROS", "AI Vision"] },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    projects: [
      { title: "ERP Suite", desc: "Unified finance, sales, inventory, HR on a single ledger.", impact: "One pane of glass for operations", stack: ["Postgres", "Event Sourcing", "Next.js"] },
      { title: "Warehouse Management", desc: "Bay-level inventory, pick paths, forklift orchestration.", impact: "184 picks/hr, 82% fill rate", stack: ["Realtime DB", "Path Optimization"] },
      { title: "Supply Chain Management", desc: "End-to-end supplier-to-retail visibility with risk scoring.", impact: "96% on-time, 18% shorter lead times", stack: ["EDI", "Risk Models", "Event Streaming"] },
      { title: "CRM Platform", desc: "Pipeline visibility, deal flow, revenue intelligence.", impact: "+34% win rate, -24% sales cycle", stack: ["ML Scoring", "TypeScript"] },
      { title: "HRIS / HCM Platform", desc: "Workforce intelligence, payroll, retention analytics.", impact: "Payroll: 3 days to 4 hours", stack: ["Payroll Engine", "Compliance"] },
      { title: "Manufacturing Execution", desc: "Live OEE, work orders, alarms across production lines.", impact: "OEE +9pp, scrap -36%", stack: ["OPC-UA", "MQTT", "TimescaleDB"] },
      { title: "Transportation Management", desc: "Fleet tracking with route optimization and POD capture.", impact: "-18% fuel, 94% on-time", stack: ["Route Optimization", "GPS"] },
      { title: "Point of Sale Platform", desc: "Live transactions, product mix, end-of-day reconciliation.", impact: "Sub-second checkout", stack: ["Edge Sync", "Tax Engine"] },
    ],
  },
]

export default function ProjectsClient() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDemo = (title: string) => {
    setSelectedProject(title)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <SubPageScene pageId="projects" />
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
              Projects
            </span>
            <h1 className="text-4xl sm:text-6xl font-mono font-bold leading-[0.95] tracking-tight mb-8">
              <span className="block">Systems in</span>
              <span className="block text-foreground/40">production.</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/50 font-mono leading-relaxed max-w-2xl">
              Every project below is live or has been deployed to a client environment.
              Interactive demos available where applicable.
            </p>
          </motion.div>
        </section>

        {CATEGORIES.map((cat) => (
          <section key={cat.id} className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[10px] font-mono tracking-[0.3em] uppercase text-foreground/40 mb-10">
                {cat.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
                {cat.projects.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-background/60 backdrop-blur-[4px] p-6 group"
                  >
                    <h3 className="text-sm font-mono font-semibold text-foreground/90 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-foreground/40 font-mono leading-relaxed mb-3">
                      {p.desc}
                    </p>
                    <p className="text-[11px] text-accent/60 font-mono mb-4">
                      {p.impact}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.stack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono text-foreground/35 px-2 py-1 border border-border/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenDemo(p.title)}
                      className="inline-flex items-center gap-2 text-[11px] font-mono text-foreground/50 hover:text-accent transition-colors"
                    >
                      <Play size={10} />
                      View demo
                    </button>
                  </motion.div>
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
              Need something similar?
            </h2>
            <p className="text-sm text-foreground/50 font-mono mb-8">
              These are systems we&apos;ve built. Yours would be different — same standard.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-background font-mono text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Scope your system
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {selectedProject && (
        <ProjectDemoModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          projectTitle={selectedProject}
        />
      )}
    </div>
  )
}
