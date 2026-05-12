import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/structured-data"
import { siteConfig } from "@/lib/seo"
import DivisionsClient from "./DivisionsClient"

const breadcrumbs = generateBreadcrumbSchema([
  { name: "Home", url: `${siteConfig.url}/` },
  { name: "Divisions", url: `${siteConfig.url}/divisions/` },
])

const divisionServices = [
  {
    name: "AI Systems & Orchestration",
    description:
      "Build retrieval, automation, and workflow engines that make decision-making autonomous and auditable.",
    serviceType: "Artificial Intelligence Engineering",
  },
  {
    name: "Cybersecurity & Intelligence",
    description: "AI-assisted pentesting, anomaly detection, and graph-based risk modeling.",
    serviceType: "Cybersecurity Services",
  },
  {
    name: "Quantitative & Financial Systems",
    description: "Predictive modeling, trading automation, and real-time forecasting engines.",
    serviceType: "Quantitative Engineering",
  },
  {
    name: "Industrial & Edge Automation",
    description: "Robotics, PLC, and IoT frameworks that connect data with motion.",
    serviceType: "Industrial Automation",
  },
  {
    name: "Applied Software Engineering",
    description:
      "Enterprise-grade systems combining backend precision with intuitive user interfaces.",
    serviceType: "Software Engineering",
  },
].map((s) =>
  generateServiceSchema({
    name: s.name,
    description: s.description,
    provider: siteConfig.name,
    serviceType: s.serviceType,
    areaServed: "ID",
  })
)

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Prioritech Engineering Divisions",
  itemListElement: divisionServices.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: service,
  })),
}

export default function DivisionsPage() {
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
      <DivisionsClient />
    </>
  )
}
