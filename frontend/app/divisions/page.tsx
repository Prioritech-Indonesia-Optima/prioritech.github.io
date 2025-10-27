"use client"

import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { SectionCard } from "@/components/common/SectionCard"
import { DivisionIcon } from "@/components/common/IconComponents"
import { Timeline } from "@/components/aceternity/timeline"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { CardSpotlight } from "@/components/aceternity/card-spotlight"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

/**
 * Divisions page for Prioritech Indonesia Optima.
 * 
 * Displays detailed breakdown of the 5 core engineering divisions.
 * Each division includes description, key capabilities, and related projects.
 * Features responsive design with consistent Prioritech branding.
 * 
 * @returns JSX element containing the divisions page content
 */
export default function DivisionsPage() {
  const divisions = [
    {
      id: 'ai-systems',
      title: 'AI Systems & Orchestration',
      description: 'Agentic systems with observability built-in. Every AI pipeline includes failure modes, automated recovery, audit trails, and 10-year evolution paths.',
      capabilities: [
        'RAG pipelines with real-time vector indexing (500+ QPS)',
        'Multi-agent orchestration with failure recovery',
        'Natural language understanding with explainability',
        'Intelligent workflows with human-in-the-loop',
        'Enterprise integration with audit compliance',
        'AI observability: metrics, tracing, model versioning'
      ],
      engineeringApproach: 'Built-in failure modes for every agent. Graceful degradation when models fail. Full audit trail for enterprise compliance. Systems evolve without rewrites.',
      projects: ['Sales Analytics Assistant', 'Agentic Financial Assistant'],
      icon: 'ai-systems'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Intelligence',
      description: 'Fraud detection at 1M+ TPS with sub-second latency. Automated penetration testing that improves faster than exploits evolve. Security that learns.',
      capabilities: [
        'AI-assisted pentesting (10x faster than manual)',
        'GNN fraud detection at million-transactions-per-second',
        'Real-time anomaly detection with 92% precision',
        'Cross-system event correlation (20+ systems)',
        'Automated incident response and threat hunting',
        'Security postures that self-improve weekly'
      ],
      engineeringApproach: 'Defense in depth. Multiple detection layers. Automated response without false positive cascades. Threat intelligence that evolves in real-time.',
      projects: ['Virtual Penetration Framework', 'Anomaly & Event Correlation Engine'],
      icon: 'cybersecurity'
    },
    {
      id: 'quantitative',
      title: 'Quantitative Engineering',
      description: 'Trading systems with 5ms execution guarantees. Risk models backtested against 50 years of data. Deterministic execution, probabilistic risk.',
      capabilities: [
        'C++ order routing with microsecond precision',
        'Time-series forecasting with structural break detection',
        'Risk management with 99.9% loss prevention',
        'Quantitative models backtested on 50 years data',
        'Real-time market data processing at scale',
        'Portfolio optimization adapting to volatility regimes'
      ],
      engineeringApproach: 'Production-grade execution paths in C++. ML inference on separate threads. Async risk checks. Backtest thoroughly, deploy conservatively, monitor everything.',
      projects: ['Futures Trading Engine', 'Predictive Equation Modeler'],
      icon: 'quantitative'
    },
    {
      id: 'automation',
      title: 'Automation & Robotics',
      description: 'Industrial control systems with redundant fail-safes. PLC code that survives hardware migrations. Edge AI that works offline.',
      capabilities: [
        'PLC programming (ladder logic, structured text)',
        'Industrial automation with OPC-UA/Modbus gateways',
        '100+ device aggregation with unified visibility',
        'ROS-based robotics with safety interlocks',
        'Edge AI vision on ARM Cortex-A78',
        'Offline-first IoT with adaptive control'
      ],
      engineeringApproach: 'Redundant fail-safes in every circuit. PLC code survives part replacements. Edge AI compresses to 8MB, runs on $50 hardware. Offline-first architecture.',
      projects: ['Edge-AI Kitchen Vision System', 'Industrial Automation Suite', 'IoT & Robotics R&D'],
      icon: 'automation'
    },
    {
      id: 'product',
      title: 'Applied Product Engineering',
      description: 'Backend services in Python/C/Java. Mobile in Flutter. Infrastructure that scales linearly. Code that documents itself.',
      capabilities: [
        'Fullstack web: Next.js, React, TypeScript',
        'Backend APIs: FastAPI, Spring Boot, Go',
        'Mobile apps: Flutter (iOS, Android)',
        'OCR and document processing systems',
        'Voice AI with on-device transcription',
        'Cloud platforms: AWS, on-prem, hybrid'
      ],
      engineeringApproach: 'Multi-language backends: Python for velocity, C for performance, Java for enterprise, Go for scale. Flutter for mobile. Infrastructure that grows linearly, not exponentially.',
      projects: ['Cognitive Therapy Platform', 'Offline Summarizer App'],
      icon: 'product'
    }
  ]

  return (
    <div className="min-h-screen bg-main">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <PageHero
          title="Our Engineering Divisions"
          subtitle="Specialized Expertise"
          description="Five core engineering disciplines driving modern enterprise innovation. Each division combines deep technical expertise with practical implementation experience."
        />

        {/* Divisions Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {divisions.map((division) => (
                <CardSpotlight key={division.id}>
                  <div className="bg-main/80 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:border-accent/50 hover:bg-main/90 transition-all duration-300 font-mono terminal-window relative">
                    {/* Terminal header bar */}
                    <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-3 border-b border-accent/20 bg-main/50">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      </div>
                    </div>

                    <div className="pt-12">
                      {/* Division Header */}
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg flex-shrink-0">
                          <DivisionIcon division={division.icon} size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-secondary text-xl font-semibold mb-2 font-mono">
                            {division.title}
                          </h3>
                          <p className="text-secondary/70 text-sm leading-relaxed font-mono">
                            <span className="text-accent">&gt;</span> {division.description}
                          </p>
                        </div>
                      </div>

                      {/* Engineering Approach */}
                      {division.engineeringApproach && (
                        <div className="mb-6 border-t border-accent/10 pt-4">
                          <h4 className="text-accent font-medium text-sm mb-2 font-mono">Engineering Approach</h4>
                          <p className="text-secondary/70 text-xs italic font-mono">
                            {division.engineeringApproach}
                          </p>
                        </div>
                      )}

                      {/* Capabilities */}
                      <div className="mb-6">
                        <h4 className="text-secondary font-medium text-sm mb-3 font-mono">Key Capabilities</h4>
                        <ul className="space-y-2">
                          {division.capabilities.map((capability, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                              <span className="text-secondary/60 text-xs font-mono">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Related Projects */}
                      <div className="border-t border-accent/10 pt-4">
                        <h4 className="text-secondary font-medium text-sm mb-3 font-mono">Featured Projects</h4>
                        <div className="flex flex-wrap gap-2">
                          {division.projects.map((project, index) => (
                            <span 
                              key={index}
                              className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium font-mono"
                            >
                              ${" "}{project}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                Our Division Methodology
              </h2>
              <div className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto font-mono">
                Each division follows a consistent approach to deliver production-grade solutions.
              </div>
            </div>
            
            <Timeline 
              items={[
                {
                  title: "Research & Analysis",
                  description: "Deep dive into requirements, existing systems, and technical constraints to design optimal solutions.",
                },
                {
                  title: "Design & Prototype",
                  description: "Create modular, scalable architectures with rapid prototyping to validate concepts before full implementation.",
                },
                {
                  title: "Deploy & Monitor",
                  description: "Production deployment with comprehensive monitoring, logging, and continuous optimization for enterprise reliability.",
                }
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6">
              Ready to Work with Our Divisions?
            </h2>
            <p className="text-secondary/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Discover how our specialized engineering teams can transform your business 
              with intelligent, production-grade solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MovingBorder borderRadius="8px">
                <Link 
                  href="/projects"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
                >
                  $ View Our Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </MovingBorder>
              <MovingBorder borderRadius="8px">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center border border-accent/30 hover:border-accent text-secondary hover:text-accent px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
                >
                  $ Contact Our Teams
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
