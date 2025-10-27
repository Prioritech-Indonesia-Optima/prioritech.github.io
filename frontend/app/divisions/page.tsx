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
      description: 'Build retrieval, automation, and workflow engines that make decision-making autonomous and auditable.',
      capabilities: [
        'Autonomous decision-making systems',
        'Workflow engines with audit trails',
        'Retrieval systems for enterprise data',
        'Automated process orchestration',
        'Auditable AI operations',
        'Production-ready AI infrastructure'
      ],
      engineeringApproach: 'We build systems designed for transparency and reliability. Every AI application includes built-in observability and audit capabilities.',
      projects: ['Intelligent Query Assistant', 'Context-Aware Data Engine'],
      icon: 'ai-systems'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Intelligence',
      description: 'AI-assisted pentesting, anomaly detection, and graph-based risk modeling.',
      capabilities: [
        'AI-assisted penetration testing',
        'Anomaly detection systems',
        'Graph-based risk modeling',
        'Threat intelligence platforms',
        'Automated security monitoring',
        'Security posture automation'
      ],
      engineeringApproach: 'We build defenses that adapt faster than threats. Every system includes proactive security measures and real-time monitoring.',
      projects: ['Virtual Penetration Framework', 'Threat Graph Correlator'],
      icon: 'cybersecurity'
    },
    {
      id: 'quantitative',
      title: 'Quantitative & Financial Systems',
      description: 'Predictive modeling, trading automation, and real-time forecasting engines.',
      capabilities: [
        'Predictive financial modeling',
        'Trading automation systems',
        'Real-time forecasting engines',
        'Market analysis platforms',
        'Risk management systems',
        'Portfolio optimization'
      ],
      engineeringApproach: 'We design data-driven models that measure, predict, and optimize performance. All systems include comprehensive risk management.',
      projects: ['Market Forecast Engine', 'Breakout Probability Model', 'Agentic Finance Tracker'],
      icon: 'quantitative'
    },
    {
      id: 'automation',
      title: 'Industrial & Edge Automation',
      description: 'Robotics, PLC, and IoT frameworks that connect data with motion.',
      capabilities: [
        'PLC programming and automation',
        'Robotics control systems',
        'IoT framework integration',
        'Edge computing solutions',
        'Industrial data connectivity',
        'Motion control systems'
      ],
      engineeringApproach: 'We connect data with motion. Every automation system includes reliability measures and integrates seamlessly with enterprise infrastructure.',
      projects: ['Edge-Vision Analytics', 'PLC Automation Suite', 'Robotic R&D Series'],
      icon: 'automation'
    },
    {
      id: 'product',
      title: 'Applied Software Engineering',
      description: 'Enterprise-grade systems combining backend precision with intuitive user interfaces.',
      capabilities: [
        'Enterprise backend systems',
        'Full-stack web applications',
        'Mobile application development',
        'API design and implementation',
        'Database optimization',
        'Cloud infrastructure'
      ],
      engineeringApproach: 'We build systems that work. Every application balances backend precision with user-friendly interfaces. Code that documents itself.',
      projects: ['Therapeutic Dialogue AI', 'Offline Transcriber'],
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

        {/* Closing Statement */}
        <section className="py-16 bg-main/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-secondary/70 text-lg sm:text-xl mb-8 font-mono italic">
              Every division shares one principle: build systems that outperform expectations.
            </p>
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
