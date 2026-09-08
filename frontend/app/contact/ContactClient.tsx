"use client"

import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Building2, ArrowRight, Clock, MessageSquare, FileText } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { SubPageScene } from "@/components/three/SubPageScene"

const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

const MAILTO =
  "mailto:ivan.aurelius@prioritech.co.id" +
  "?subject=Project%20Inquiry%20%E2%80%94%20Prioritech" +
  "&body=Hi%20Prioritech%20team%2C%0A%0ACompany%3A%20%0AName%3A%20%0ARole%3A%20%0A%0AWhat%20I%27m%20looking%20to%20build%3A%0A%0ATimeline%3A%20%0ABudget%20range%3A%20%0A%0AAnything%20else%3A%0A"

const CONTACT_CARDS = [
  {
    Icon: Building2,
    label: "Company",
    lines: ["PT PRIORITECH INDONESIA OPTIMA"],
  },
  {
    Icon: MapPin,
    label: "Office",
    lines: [
      "NEO SOHO Podomoro City, Unit 3106",
      "Jl. Letjen S. Parman Kav. 28",
      "Jakarta Barat, DKI Jakarta 11470",
    ],
  },
  {
    Icon: Mail,
    label: "Email",
    lines: ["ivan.aurelius@prioritech.co.id"],
    href: MAILTO,
  },
]

const PROCESS_STEPS = [
  {
    Icon: Clock,
    title: "We respond",
    body: "Expect a reply within one business day — usually the same afternoon, Jakarta time.",
  },
  {
    Icon: MessageSquare,
    title: "Discovery call",
    body: "A short call to scope the system, understand constraints, and ask the right questions.",
  },
  {
    Icon: FileText,
    title: "Written proposal",
    body: "Approach, architecture, timeline, and pricing in writing. No lock-in before you've read it.",
  },
]

const FAQS = [
  {
    q: "How quickly do you respond?",
    a: "Within one business day from our Jakarta office. Usually the same afternoon.",
  },
  {
    q: "Where are you based?",
    a: "NEO SOHO Podomoro City, Jakarta Barat. We deliver remote engagements globally.",
  },
  {
    q: "What kind of projects do you take on?",
    a: "Production-grade systems across AI, cybersecurity, quantitative finance, industrial automation, and enterprise software.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. Cloud-agnostic delivery means we can work with teams anywhere.",
  },
  {
    q: "How does an engagement start?",
    a: "Inquiry → discovery call → written proposal. No commitment until you've read what we're proposing.",
  },
]

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-background">
      <SubPageScene pageId="contact" />
      <div className="fixed inset-0 z-[1] pointer-events-none vignette" />
      <Navbar />
      <main id="main-content" className="relative z-10 pt-16">
        <section className="px-6 sm:px-12 lg:px-20 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-6">
              Contact
            </span>
            <h1 className="text-4xl sm:text-6xl font-mono font-bold leading-[0.95] tracking-tight mb-8">
              <span className="block">Tell us what you</span>
              <span className="block text-foreground/40">need to ship.</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/50 font-mono leading-relaxed max-w-xl mb-10">
              No forms. No ticketing. Just an email — straight to the engineers
              who will actually build it.
            </p>
            <a
              href={MAILTO}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-mono text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              <Mail size={16} />
              Open email template
              <ArrowRight size={14} />
            </a>
            <p className="mt-4 text-foreground/30 text-xs font-mono">
              Opens your email client with a pre-filled message.
            </p>
          </motion.div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-5xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-10"
            >
              Find us
            </motion.span>

            <div className="grid sm:grid-cols-3 gap-px bg-border/30">
              {CONTACT_CARDS.map(({ Icon, label, lines, href }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-background/60 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={16} className="text-accent" />
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground/40">
                      {label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {lines.map((line) =>
                      href ? (
                        <a key={line} href={href} className="block text-xs text-foreground/60 font-mono hover:text-accent transition-colors">
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-xs text-foreground/50 font-mono leading-relaxed">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-5xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-10"
            >
              What happens next
            </motion.span>

            <div className="grid sm:grid-cols-3 gap-8">
              {PROCESS_STEPS.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[10px] font-mono text-accent/50 block mb-3">
                    0{i + 1}
                  </span>
                  <h3 className="text-sm font-mono font-semibold text-foreground/90 mb-2">{title}</h3>
                  <p className="text-xs text-foreground/45 font-mono leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-12 lg:px-20 py-16 border-t border-border">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent/70 block mb-10"
            >
              FAQ
            </motion.span>

            <div className="space-y-px bg-border/30">
              {FAQS.map(({ q, a }, i) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-background/60 p-5"
                >
                  <p className="text-xs font-mono font-semibold text-foreground/80 mb-2">{q}</p>
                  <p className="text-xs text-foreground/45 font-mono leading-relaxed">{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
