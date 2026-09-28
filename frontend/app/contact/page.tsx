import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
} from "@/lib/structured-data"
import { siteConfig } from "@/lib/seo"
import ContactClient from "./ContactClient"

const breadcrumbs = generateBreadcrumbSchema([
  { name: "Home", url: `${siteConfig.url}/` },
  { name: "Contact", url: `${siteConfig.url}/contact/` },
])

const localBusiness = generateLocalBusinessSchema()

const faqs = generateFAQSchema([
  {
    question: "How quickly does Prioritech respond to inquiries?",
    answer:
      "We typically respond to new business inquiries within one business day from our Jakarta office.",
  },
  {
    question: "Where is Prioritech located?",
    answer:
      "Our office is at NEO SOHO Podomoro City Unit 3106, Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan, Jakarta Barat, DKI Jakarta 11470, Indonesia.",
  },
  {
    question: "What kind of projects does Prioritech take on?",
    answer:
      "Production-grade systems across five divisions: AI Systems & Orchestration, Cybersecurity & Intelligence, Quantitative & Financial Systems, Industrial & Edge Automation, and Applied Software Engineering.",
  },
  {
    question: "Does Prioritech work with international clients?",
    answer:
      "Yes. While we're based in Jakarta, we deliver remote engagements globally and our systems are designed cloud-agnostic.",
  },
  {
    question: "How does an engagement typically start?",
    answer:
      "After an initial inquiry, we schedule a discovery call to scope requirements, then follow up with a written proposal outlining approach, timeline, and pricing.",
  },
])

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${siteConfig.name}`,
  url: `${siteConfig.url}/contact/`,
  description:
    "Contact Prioritech Indonesia Optima for AI systems, engineering solutions, and production-grade automation. Based in Jakarta, working globally.",
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqs) }}
      />
      <ContactClient />
    </>
  )
}
