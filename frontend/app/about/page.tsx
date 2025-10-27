"use client"

import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { SectionCard } from "@/components/common/SectionCard"
import { DivisionIcon } from "@/components/common/IconComponents"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { TracingBeam } from "@/components/aceternity/tracing-beam"
import { Timeline } from "@/components/aceternity/timeline"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { 
  Target, 
  Users, 
  Lightbulb, 
  CheckCircle,
  ArrowRight 
} from "lucide-react"
import Link from "next/link"

/**
 * About page for Prioritech Indonesia Optima.
 * 
 * Displays company identity, engineering ethos, focus areas, and philosophy.
 * Features responsive design with consistent Prioritech branding.
 * 
 * @returns JSX element containing the about page content
 */
export default function AboutPage() {
  const focusAreas = [
    {
      title: "AI Systems with Production Discipline",
      description: "Agentic systems with observability hooks, failure modes, and audit trails. Built to evolve over 10 years without rewrites.",
      icon: <Target size={24} />
    },
    {
      title: "Fraud Detection at Scale",
      description: "GNN architectures that learn transaction patterns in real-time. 92% precision on million-TPS throughput without false positive cascades.",
      icon: <Lightbulb size={24} />
    },
    {
      title: "Automated Security Testing",
      description: "AI-assisted penetration testing with script synthesis. Security postures that improve faster than exploits evolve.",
      icon: <CheckCircle size={24} />
    },
    {
      title: "Quantitative Trading Systems",
      description: "C++ order routing with 5ms latency guarantees. Backtested against 50 years of market data. Production-grade execution.",
      icon: <Users size={24} />
    },
    {
      title: "Industrial Control & Edge AI",
      description: "PLC code that survives hardware migrations. Edge vision systems that work offline. Redundant fail-safes in every circuit.",
      icon: <Target size={24} />
    }
  ]

  const philosophyPoints = [
    "Uptime over uptick — we measure system availability, not page views.",
    "Every system ships with its own diagnostic tools and failure recovery built-in.",
    "We optimize for debuggability, not just performance. 3 AM debugging should be pleasant.",
    "Documentation is code; code is documentation. Both must read clearly.",
    "Systems designed to outgrow their initial requirements without rewrites.",
    "Redundancy and graceful degradation from day one. Failures are features too."
  ]

  return (
    <div className="min-h-screen bg-main">
      <Navbar />
      
      <main>
        {/* Hero Section */}
      <PageHero
        title="We build systems that outlast their creators"
        subtitle="About Prioritech"
        description="Jakarta-based engineering firm. We measure success in system uptime, not marketing materials. Every design decision includes: how will the next engineer debug this at 3 AM?"
      />

        {/* Company Overview */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="font-mono">
                <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6 font-mono">
                  What We Build
                </h2>
                <div className="text-secondary/70 text-base sm:text-lg leading-relaxed mb-6">
                  <TextGenerateEffect 
                    words="Systems that inherit well. Code that documents itself. Infrastructure that fails gracefully. We don't optimize for demos; we build for the engineer who inherits our work in 5 years."
                    delayMultiple={0.03}
                  />
                </div>
                <div className="text-secondary/70 text-base sm:text-lg leading-relaxed">
                  <TextGenerateEffect 
                    words="Every system ships with: observability infrastructure, failure mode documentation, and a 10-year maintenance strategy. Because software outlives requirements."
                    delayMultiple={0.03}
                  />
                </div>
              </div>
              
              <TracingBeam>
                <div className="bg-main/70 backdrop-blur-sm border border-accent/20 rounded-xl p-8 font-mono">
                  <h3 className="text-secondary text-xl font-semibold mb-4 font-mono">Our Philosophy</h3>
                  <ul className="space-y-3">
                    {philosophyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-secondary/70 text-sm sm:text-base font-mono">
                          <span className="text-accent">&gt;</span> {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TracingBeam>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Our Focus Areas
              </h2>
              <p className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto">
                We specialize in five core engineering disciplines that drive modern enterprise innovation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((area, index) => (
                <SectionCard
                  key={index}
                  title={area.title}
                  description={area.description}
                  icon={area.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Approach */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Our Engineering Approach
              </h2>
              <p className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto">
                We design modular pipelines — built to scale, auditable, and cloud-agnostic.
              </p>
            </div>
            
            <Timeline 
              items={[
                {
                  title: "Design for 10-Year Evolution",
                  description: "Every component interfaces through documented contracts. Upgrade one piece without breaking others. Your 2025 code should still work in 2035.",
                  icon: <Target className="w-8 h-8 text-accent" />
                },
                {
                  title: "Self-Documenting Systems",
                  description: "Logging that tells a story. Metrics that diagnose issues before they cascade. The system teaches engineers how it works.",
                  icon: <CheckCircle className="w-8 h-8 text-accent" />
                },
                {
                  title: "Infrastructure Agnostic",
                  description: "Runs on AWS, Azure, on-prem, or your garage. Migration paths for all scenarios. Vendor lock-in is technical debt we refuse to incur.",
                  icon: <Lightbulb className="w-8 h-8 text-accent" />
                }
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6">
              Ready to Build Something Together?
            </h2>
            <p className="text-secondary/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how Prioritech can help transform your business with intelligent, 
              production-grade engineering solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MovingBorder borderRadius="8px">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
                >
                  $ Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </MovingBorder>
              <MovingBorder borderRadius="8px">
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center border border-accent/30 hover:border-accent text-secondary hover:text-accent px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
                >
                  $ View Our Work
                </Link>
              </MovingBorder>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
