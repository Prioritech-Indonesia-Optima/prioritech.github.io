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
  ArrowRight,
  Code2,
  Brain,
  Cog,
  Rocket,
  Shield,
  Zap,
  TrendingUp,
  Layers
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
      title: "AI Systems & Automation",
      description: "We transform complex operations into measurable, automated workflows.",
      icon: <Target size={24} />
    },
    {
      title: "Cybersecurity Intelligence",
      description: "We build defenses that adapt faster than threats.",
      icon: <Lightbulb size={24} />
    },
    {
      title: "Quantitative Systems",
      description: "We design data-driven models that measure, predict, and optimize performance.",
      icon: <CheckCircle size={24} />
    }
  ]

  const philosophyPoints = [
    "We build what's needed. No filler features, no empty dashboards.",
    "We work directly. Clients deal with engineers, not middlemen.",
    "We deliver results. Every product must prove its value in operation."
  ]

  return (
    <div className="min-h-screen bg-main">
      <Navbar />
      
      <main>
        {/* Hero Section */}
      <PageHero
        title="Precision. Elegance. Systems."
        subtitle="About Prioritech"
        description="Engineering firm that blends AI, automation, and data infrastructure into working systems."
      />

        {/* Company Overview */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="font-mono">
                <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6 font-mono">
                  What We Build
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                    <Rocket className="w-8 h-8 text-accent" />
                    <span className="text-secondary/70 text-xs font-mono text-center">Production Systems</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                    <Brain className="w-8 h-8 text-accent" />
                    <span className="text-secondary/70 text-xs font-mono text-center">AI Orchestration</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                    <Cog className="w-8 h-8 text-accent" />
                    <span className="text-secondary/70 text-xs font-mono text-center">Industrial Automation</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                    <Shield className="w-8 h-8 text-accent" />
                    <span className="text-secondary/70 text-xs font-mono text-center">Security Intelligence</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                    <TrendingUp className="w-8 h-8 text-accent" />
                    <span className="text-secondary/70 text-xs font-mono text-center">Financial Systems</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                    <Layers className="w-8 h-8 text-accent" />
                    <span className="text-secondary/70 text-xs font-mono text-center">Enterprise Platforms</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-main/70 backdrop-blur-sm border border-accent/20 rounded-xl p-8 font-mono">
                <h3 className="text-secondary text-xl font-semibold mb-6 font-mono">Our Principles</h3>
                <div className="space-y-3 mb-6">
                  {philosophyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-secondary/70 text-sm font-mono">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-accent/20 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg">
                      <Target className="w-6 h-6 text-accent" />
                      <span className="text-accent text-sm font-semibold font-mono">Vision</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg">
                      <Rocket className="w-6 h-6 text-accent" />
                      <span className="text-accent text-sm font-semibold font-mono">Mission</span>
                    </div>
                  </div>
                </div>
              </div>
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
            </div>
            
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 p-6 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all"
                  title={area.description}
                >
                  <div className="text-accent">
                    {area.icon}
                  </div>
                  <span className="text-secondary font-semibold text-sm font-mono text-center">{area.title.split('&')[0].trim()}</span>
                </div>
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
            </div>
            
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Target className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">10-Year Design</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Self-Documenting</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Lightbulb className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Cloud-Agnostic</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-secondary/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-mono italic">
              Performance speaks louder than promises.
            </div>
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
