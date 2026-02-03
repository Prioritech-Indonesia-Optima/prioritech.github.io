"use client"

import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { ModernCard } from "@/components/common/ModernCard"
import { ImageSection } from "@/components/common/ImageSection"
import { DivisionIcon } from "@/components/common/IconComponents"
import { ArrowRight, Brain, Workflow, Database, Shield, TrendingUp, Cog, Layers, Zap, GitBranch, Eye, Search, Code2, Rocket, Network, Cpu, CheckCircle } from "lucide-react"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"

/**
 * Divisions page for Prioritech Indonesia Optima.
 * 
 * Displays detailed breakdown of the 5 core engineering divisions.
 * Each division includes description, key capabilities, and related projects.
 * Features responsive design with consistent Prioritech branding.
 * 
 * @returns JSX element containing the divisions page content
 */
/**
 * Maps capability text to icon and short label
 */
function getCapabilityIcon(capability: string) {
  const lower = capability.toLowerCase()
  
  // AI Systems capabilities
  if (lower.includes('autonomous') || lower.includes('decision')) return { icon: Brain, label: 'Autonomous AI' }
  if (lower.includes('workflow') || lower.includes('audit trail')) return { icon: Workflow, label: 'Workflows' }
  if (lower.includes('retrieval') || lower.includes('enterprise data')) return { icon: Database, label: 'Data Retrieval' }
  if (lower.includes('orchestration') || lower.includes('process')) return { icon: GitBranch, label: 'Orchestration' }
  if (lower.includes('auditable') || lower.includes('operations')) return { icon: Eye, label: 'Auditable Ops' }
  if (lower.includes('production') || lower.includes('infrastructure')) return { icon: Layers, label: 'Production AI' }
  
  // Cybersecurity capabilities
  if (lower.includes('penetration') || lower.includes('pentesting')) return { icon: Shield, label: 'Pentesting' }
  if (lower.includes('anomaly') || lower.includes('detection')) return { icon: Eye, label: 'Anomaly Detection' }
  if (lower.includes('graph') || lower.includes('risk modeling')) return { icon: Network, label: 'Risk Modeling' }
  if (lower.includes('threat') || lower.includes('intelligence')) return { icon: Shield, label: 'Threat Intel' }
  if (lower.includes('monitoring') || lower.includes('security')) return { icon: Eye, label: 'Security Monitor' }
  if (lower.includes('posture') || lower.includes('automation')) return { icon: Zap, label: 'Security Automation' }
  
  // Quantitative capabilities
  if (lower.includes('predictive') || lower.includes('modeling')) return { icon: TrendingUp, label: 'Predictive Models' }
  if (lower.includes('trading') || lower.includes('automation')) return { icon: Zap, label: 'Trading Systems' }
  if (lower.includes('forecasting') || lower.includes('real-time')) return { icon: TrendingUp, label: 'Forecasting' }
  if (lower.includes('market') || lower.includes('analysis')) return { icon: TrendingUp, label: 'Market Analysis' }
  if (lower.includes('risk management')) return { icon: Shield, label: 'Risk Management' }
  if (lower.includes('portfolio')) return { icon: TrendingUp, label: 'Portfolio Opt' }
  
  // Automation capabilities
  if (lower.includes('plc') || lower.includes('programming')) return { icon: Cog, label: 'PLC Systems' }
  if (lower.includes('robotics') || lower.includes('control')) return { icon: Rocket, label: 'Robotics' }
  if (lower.includes('iot') || lower.includes('framework')) return { icon: Network, label: 'IoT Integration' }
  if (lower.includes('edge') || lower.includes('computing')) return { icon: Cpu, label: 'Edge Computing' }
  if (lower.includes('data connectivity') || lower.includes('industrial')) return { icon: Network, label: 'Data Connect' }
  if (lower.includes('motion control')) return { icon: Cog, label: 'Motion Control' }
  
  // Product capabilities
  if (lower.includes('enterprise backend') || lower.includes('backend')) return { icon: Code2, label: 'Backend Systems' }
  if (lower.includes('full-stack') || lower.includes('web')) return { icon: Layers, label: 'Full-Stack' }
  if (lower.includes('mobile')) return { icon: Rocket, label: 'Mobile Apps' }
  if (lower.includes('api')) return { icon: Network, label: 'API Design' }
  if (lower.includes('database') || lower.includes('optimization')) return { icon: Database, label: 'Database Opt' }
  if (lower.includes('cloud')) return { icon: Layers, label: 'Cloud Infra' }
  
  // Default
  return { icon: CheckCircle, label: capability.split(' ').slice(0, 2).join(' ') }
}

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
          description="Five core engineering disciplines."
          variant="image"
          imageSrc="/hero-divisions.jpg"
          imageAlt="Technology circuit board"
        />

        {/* Divisions Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {divisions.map((division, index) => (
                <ModernCard
                  key={division.id}
                  title={division.title}
                  icon={<DivisionIcon division={division.icon} size={24} />}
                  className="h-full"
                  delay={index * 0.1}
                >
                  {/* Division Content */}
                  <div className="space-y-6">
                    {/* Engineering Approach */}
                    {division.engineeringApproach && (
                      <div className="border-t border-accent/10 pt-4">
                        <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 w-fit">
                          <Zap className="w-4 h-4 text-accent" />
                          <span className="text-accent text-xs font-mono">Engineering Approach</span>
                        </div>
                      </div>
                    )}

                    {/* Capabilities */}
                    <div>
                      <h4 className="text-secondary font-medium text-sm mb-3 font-mono">Key Capabilities</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {division.capabilities.slice(0, 6).map((capability, idx) => {
                          const { icon: Icon, label } = getCapabilityIcon(capability)
                          return (
                            <div 
                              key={idx} 
                              className="flex flex-col items-center gap-1 p-2 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all"
                              title={capability}
                            >
                              <Icon className="w-4 h-4 text-accent" />
                              <span className="text-secondary/70 text-[10px] font-mono text-center leading-tight">{label}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Related Projects */}
                    <div className="border-t border-accent/10 pt-4">
                      <h4 className="text-secondary font-medium text-sm mb-3 font-mono">Featured Projects</h4>
                      <div className="flex flex-wrap gap-2">
                        {division.projects.map((project, idx) => (
                          <span 
                            key={idx}
                            className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium font-mono"
                          >
                            ${" "}{project}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          </div>
        </section>

        {/* AI Systems Showcase */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageSection
              src="/divisions-ai.jpg"
              alt="AI and neural network visualization"
              title="Intelligent Systems"
              description="From neural networks to autonomous agents — we architect AI that thinks."
              height="md"
              textPosition="bottom-right"
            />
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                Our Division Methodology
              </h2>
            </div>
            
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Search className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Research</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Code2 className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Design</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Rocket className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Deploy</span>
              </div>
            </div>
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
              <PrimaryButton href="/projects" icon>
                $ View Our Projects
              </PrimaryButton>
              <SecondaryButton href="/contact">
                $ Contact Our Teams
              </SecondaryButton>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
