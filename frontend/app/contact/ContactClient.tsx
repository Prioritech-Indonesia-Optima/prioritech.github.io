"use client"

import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Building2, ArrowRight, Clock, MessageSquare, FileText } from "lucide-react"
import { Navbar } from "@/components/common/Navbar"
import { SectionLead } from "@/components/shared/SectionLead"
import { PrimaryButton } from "@/components/common/ModernButton"
import { revealContainer, revealItem, easing } from "@/lib/motion"

const Footer = lazy(() =>
  import("@/components/common/Footer").then((m) => ({ default: m.Footer }))
)

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
    q: "How quickly does Prioritech respond to inquiries?",
    a: "We typically respond within one business day from our Jakarta office.",
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
    <div className="min-h-screen bg-main">
      <Navbar />

      <main id="main-content">
        {/* ============================================================ */}
        {/* HERO                                                          */}
        {/* ============================================================ */}
        <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 overflow-hidden">
          <div
            className="aurora-orb aurora-orb--gold"
            style={{ width: "65vw", height: "65vw", top: "-25vw", left: "-15vw", opacity: 0.28 }}
          />
          <div
            className="aurora-orb aurora-orb--silver"
            style={{ width: "50vw", height: "50vw", bottom: "-20vw", right: "-10vw", opacity: 0.14, animationDelay: "-10s" }}
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealContainer(0.1, 0.14)}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <motion.p
              variants={revealItem}
              className="text-accent font-mono text-sm tracking-widest mb-5"
            >
              $ let&apos;s build together
            </motion.p>

            <motion.h1
              variants={revealItem}
              className="text-secondary text-4xl sm:text-5xl md:text-6xl font-bold font-mono leading-[1.05] tracking-tight mb-6"
            >
              Tell us what you need to{" "}
              <span className="text-sweep">ship next.</span>
            </motion.h1>

            <motion.p
              variants={revealItem}
              className="text-secondary/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              No forms. No ticketing system. Just an email — straight to the engineers who will actually build it.
            </motion.p>

            <motion.div variants={revealItem}>
              <a
                href={MAILTO}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent text-main font-bold font-mono text-base hover:bg-accent/90 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 group"
              >
                <Mail size={18} />
                Open email template
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.p
              variants={revealItem}
              className="mt-5 text-secondary/40 text-sm font-mono"
            >
              Opens your email client with a pre-filled message template.
            </motion.p>
          </motion.div>
        </section>

        {/* ============================================================ */}
        {/* CONTACT CARDS                                                 */}
        {/* ============================================================ */}
        <section className="relative py-16 sm:py-20 border-t border-accent/10">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLead
              eyebrow="find us"
              title="Where we are."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={revealContainer(0.15, 0.12)}
              className="grid sm:grid-cols-3 gap-5 mt-10"
            >
              {CONTACT_CARDS.map(({ Icon, label, lines, href }) => (
                <motion.div
                  key={label}
                  variants={revealItem}
                  className="group relative rounded-2xl border border-accent/20 bg-gradient-to-br from-main/95 via-main to-main/85 backdrop-blur-md p-6 hover:border-accent/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/15 transition-all duration-500 overflow-hidden"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <p className="text-accent font-mono text-[11px] tracking-widest mb-2">$ {label.toLowerCase()}</p>
                  <div className="space-y-0.5">
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          className="block text-secondary/80 text-sm font-mono hover:text-accent transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-secondary/75 text-sm font-mono leading-relaxed">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* WHAT TO EXPECT                                                */}
        {/* ============================================================ */}
        <section className="relative py-16 sm:py-20 border-t border-accent/10 overflow-hidden">
          <div
            className="aurora-orb aurora-orb--gold"
            style={{ width: "40vw", height: "40vw", top: "-10vw", right: "-10vw", opacity: 0.12 }}
          />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLead
              eyebrow="the process"
              title="What happens after you hit send."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={revealContainer(0.2, 0.14)}
              className="grid sm:grid-cols-3 gap-6 mt-10"
            >
              {PROCESS_STEPS.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  variants={revealItem}
                  className="relative"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 border border-accent/25">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-accent font-mono text-[10px] tracking-widest mb-1">
                        0{i + 1}
                      </p>
                      <h3 className="text-secondary font-bold font-mono text-base mb-2">{title}</h3>
                      <p className="text-secondary/60 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FAQ                                                           */}
        {/* ============================================================ */}
        <section className="relative py-16 sm:py-20 border-t border-accent/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionLead
              eyebrow="common questions"
              title="Quick answers."
            />

            <motion.dl
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={revealContainer(0.2, 0.1)}
              className="mt-10 space-y-4"
            >
              {FAQS.map(({ q, a }) => (
                <motion.div
                  key={q}
                  variants={revealItem}
                  className="rounded-xl border border-accent/15 bg-main/60 backdrop-blur-sm p-5"
                >
                  <dt className="text-secondary font-bold font-mono text-sm mb-2">{q}</dt>
                  <dd className="text-secondary/60 text-sm leading-relaxed">{a}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CLOSING CTA                                                   */}
        {/* ============================================================ */}
        <section className="relative py-24 sm:py-32 overflow-hidden border-t border-accent/10">
          <div
            className="aurora-orb aurora-orb--gold"
            style={{ width: "60vw", height: "60vw", top: "-20vw", left: "-15vw", opacity: 0.32 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easing.outExpo }}
            className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <p className="text-accent font-mono text-sm tracking-widest mb-5">$ ready when you are</p>
            <h2 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-[1.1] mb-6 tracking-tight">
              Stop shipping <span className="text-sweep">prototypes.</span>
            </h2>
            <p className="text-secondary/60 text-base sm:text-lg leading-relaxed mb-10">
              One email. Tell us what you need to outlast its requirements.
            </p>
            <PrimaryButton href={MAILTO} icon>
              $ Open email template
            </PrimaryButton>
          </motion.div>
        </section>
      </main>

      <Suspense fallback={<footer className="py-8 bg-main border-t border-accent/20" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
