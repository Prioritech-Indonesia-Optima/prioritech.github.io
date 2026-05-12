import { generateBreadcrumbSchema } from "@/lib/structured-data"
import { siteConfig } from "@/lib/seo"
import AboutClient from "./AboutClient"

const breadcrumbs = generateBreadcrumbSchema([
  { name: "Home", url: `${siteConfig.url}/` },
  { name: "About", url: `${siteConfig.url}/about/` },
])

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${siteConfig.name}`,
  url: `${siteConfig.url}/about/`,
  description:
    "Engineering firm that blends AI, automation, and data infrastructure into working systems. Founded in Indonesia, building production-grade systems.",
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <AboutClient />
    </>
  )
}
