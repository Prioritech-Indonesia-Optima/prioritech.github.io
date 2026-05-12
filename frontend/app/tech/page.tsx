import { generateBreadcrumbSchema } from "@/lib/structured-data"
import { siteConfig } from "@/lib/seo"
import TechClient from "./TechClient"

const breadcrumbs = generateBreadcrumbSchema([
  { name: "Home", url: `${siteConfig.url}/` },
  { name: "Technology", url: `${siteConfig.url}/tech/` },
])

const techPageSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Prioritech Technology Stack",
  description:
    "Backend languages, AI/ML frameworks, frontend tools, infrastructure, and methodology that powers Prioritech's production systems.",
  author: { "@type": "Organization", name: siteConfig.name },
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: { "@type": "ImageObject", url: `${siteConfig.url}/prioritech-logo-navbar.png` },
  },
  about: [
    "Python", "C++", "Java", "Go", "Rust", "PyTorch", "LangChain",
    "Next.js", "React", "TypeScript", "AWS", "Docker", "Kubernetes",
    "PostgreSQL", "Redis", "Kafka", "PLC", "ROS",
  ],
}

export default function TechPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techPageSchema) }}
      />
      <TechClient />
    </>
  )
}
