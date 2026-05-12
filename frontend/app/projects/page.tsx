import { generateBreadcrumbSchema, generateProductSchema } from "@/lib/structured-data"
import { siteConfig } from "@/lib/seo"
import ProjectsClient from "./ProjectsClient"

const breadcrumbs = generateBreadcrumbSchema([
  { name: "Home", url: `${siteConfig.url}/` },
  { name: "Projects", url: `${siteConfig.url}/projects/` },
])

const projects = [
  { name: "Intelligent Query Assistant", description: "Natural-language analytics over structured enterprise data. 80% faster data retrieval.", category: "AI Systems" },
  { name: "Context-Aware Data Engine", description: "Adaptive retrieval and feedback system designed for precision analytics.", category: "AI Systems" },
  { name: "Virtual Penetration Framework", description: "Autonomous AI-driven pentest system that maps, analyzes, and exploits vulnerabilities safely.", category: "Cybersecurity" },
  { name: "Threat Graph Correlator", description: "A graph intelligence engine that links cross-system anomalies into actionable insights.", category: "Cybersecurity" },
  { name: "Market Forecast Engine", description: "Machine-learning pipeline predicting volatility and momentum with high consistency.", category: "Quantitative" },
  { name: "Breakout Probability Model", description: "Forecasting engine designed for real-time signal recognition and risk analysis.", category: "Quantitative" },
  { name: "Agentic Finance Tracker", description: "Conversational finance system for SMEs that identifies inefficiencies and spending gaps.", category: "Quantitative" },
  { name: "Edge-Vision Analytics", description: "Real-time vision system deployed at the edge for manufacturing and logistics optimization.", category: "Automation" },
  { name: "PLC Automation Suite", description: "Industrial automation pipeline designed for precision timing and error resilience.", category: "Automation" },
  { name: "Robotic R&D Series", description: "Drones, AI CCTV, and robotics systems integrating autonomy with reliability.", category: "Automation" },
  { name: "Therapeutic Dialogue AI", description: "Secure, sentiment-aware conversational engine built for sensitivity and privacy.", category: "Applied AI" },
  { name: "Offline Transcriber", description: "Lightweight summarizer that processes data without cloud dependency.", category: "Applied AI" },
  { name: "ERP Suite", description: "Unified finance, sales, inventory, HR on a single ledger of truth.", category: "Enterprise" },
  { name: "Warehouse Management System", description: "Bay-level inventory, optimized pick paths, forklift orchestration.", category: "Enterprise" },
  { name: "Supply Chain Management", description: "End-to-end supplier-to-retail visibility with risk scoring.", category: "Enterprise" },
  { name: "Customer Relationship Management", description: "Pipeline visibility, deal flow, revenue intelligence.", category: "Enterprise" },
  { name: "HRIS / HCM Platform", description: "Workforce intelligence, payroll cycles, retention analytics.", category: "Enterprise" },
  { name: "Manufacturing Execution System", description: "Live OEE, work orders, alarms across production lines.", category: "Enterprise" },
  { name: "Transportation Management", description: "Fleet tracking with route optimization and proof of delivery.", category: "Enterprise" },
  { name: "Point of Sale Platform", description: "Live transactions, product mix, end-of-day reconciliation.", category: "Enterprise" },
]

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Prioritech Project Portfolio",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: generateProductSchema({ name: p.name, description: p.description, category: p.category }),
  })),
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ProjectsClient />
    </>
  )
}
