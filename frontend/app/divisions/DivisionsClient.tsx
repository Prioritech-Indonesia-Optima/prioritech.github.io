"use client"

import { Suspense, lazy } from "react"
import { Brain, Shield, TrendingUp, Cog, Layers } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import {
  DivisionsHero,
  DivisionPanel,
  SharedPlatform,
  MethodologyStrip,
  DivisionsCTA,
  AISystemsPreview,
  CyberPreview,
  QuantPreview,
  AutomationPreview,
  AppliedPreview,
} from "@/components/divisions/sections"

const Footer = lazy(() =>
  import("@/components/common/Footer").then((m) => ({ default: m.Footer }))
)

const PANELS = [
  {
    id: "ai",
    Icon: Brain,
    eyebrow: "ai systems & orchestration",
    title: "Decisions that explain themselves.",
    body: "Retrieval, agent orchestration, and workflow engines built for the audit trail. Every output is traceable; every escalation routes to the right human. Not just chatbots — production systems with observability and rollback.",
    capabilities: [
      "Retrieval-augmented generation",
      "Multi-agent orchestration",
      "Workflow engines with audit",
      "Custom evals & guardrails",
      "Vector + structured stores",
      "On-prem & cloud deployment",
    ],
    projects: [
      { name: "Intelligent Query Assistant" },
      { name: "Context-Aware Data Engine" },
    ],
    preview: <AISystemsPreview />,
    align: "left" as const,
  },
  {
    id: "cyber",
    Icon: Shield,
    eyebrow: "cybersecurity & intelligence",
    title: "Defenses that adapt faster than threats.",
    body: "Autonomous pentesting with sandboxed exploit chains. Graph correlation across logs, network, and identity. Every vulnerability arrives with evidence and a remediation path — not just a CVE number.",
    capabilities: [
      "AI-assisted pentesting",
      "Anomaly detection",
      "Graph-based risk modeling",
      "Threat intel pipelines",
      "Zero-trust architecture",
      "Security posture automation",
    ],
    projects: [
      { name: "Virtual Penetration Framework" },
      { name: "Threat Graph Correlator" },
    ],
    preview: <CyberPreview />,
    align: "right" as const,
  },
  {
    id: "quant",
    Icon: TrendingUp,
    eyebrow: "quantitative & financial systems",
    title: "ML forecasts that ship to production.",
    body: "Trained on tick data with confidence bands wide enough to trust. Volatility regime detection drives signal sizing in real time. Designed for the desk — not the paper trade.",
    capabilities: [
      "Predictive modeling",
      "Real-time signal generation",
      "Trading automation",
      "Volatility regime detection",
      "Portfolio optimization",
      "Risk management",
    ],
    projects: [
      { name: "Market Forecast Engine" },
      { name: "Breakout Probability Model" },
      { name: "Agentic Finance Tracker" },
    ],
    preview: <QuantPreview />,
    align: "left" as const,
  },
  {
    id: "automation",
    Icon: Cog,
    eyebrow: "industrial & edge automation",
    title: "Bridging silicon and software.",
    body: "PLC, robotics, IoT — production-grade automation with deterministic timing and resilient failure modes. Edge inference on commodity hardware. We connect data to motion.",
    capabilities: [
      "PLC programming",
      "Robotics & ROS",
      "IoT framework integration",
      "Edge computing & vision",
      "Industrial data connectivity",
      "Motion control systems",
    ],
    projects: [
      { name: "Edge-Vision Analytics" },
      { name: "PLC Automation Suite" },
      { name: "Robotic R&D Series" },
    ],
    preview: <AutomationPreview />,
    align: "right" as const,
  },
  {
    id: "applied",
    Icon: Layers,
    eyebrow: "applied software engineering",
    title: "Enterprise platforms, end-to-end.",
    body: "ERP, WMS, SCM, CRM, HRIS, MES — built for operators, not procurement. Single ledger of truth, modular by design, deployed on infrastructure you control. The boring kind of magic.",
    capabilities: [
      "Enterprise backend systems",
      "Full-stack web applications",
      "Mobile development (Flutter)",
      "API design at scale",
      "Database optimization",
      "Cloud-agnostic deployment",
    ],
    projects: [
      { name: "ERP Suite" },
      { name: "WMS / SCM / CRM" },
      { name: "Therapeutic Dialogue AI" },
    ],
    preview: <AppliedPreview />,
    align: "left" as const,
  },
]

export default function DivisionsClient() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main-content">
        <DivisionsHero />
        {PANELS.map((p, i) => (
          <DivisionPanel
            key={p.id}
            id={p.id}
            index={i}
            Icon={p.Icon}
            eyebrow={p.eyebrow}
            title={p.title}
            body={p.body}
            capabilities={p.capabilities}
            projects={p.projects}
            preview={p.preview}
            align={p.align}
          />
        ))}
        <SharedPlatform />
        <MethodologyStrip />
        <DivisionsCTA />
      </main>
      <Suspense fallback={<footer className="py-8 bg-canvas border-t border-line" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
