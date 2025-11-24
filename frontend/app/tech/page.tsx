"use client"

import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { SectionCard } from "@/components/common/SectionCard"
import { TechStackIcon } from "@/components/common/IconComponents"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { LampEffect } from "@/components/aceternity/lamp-effect"
import { ArrowRight, CheckCircle, Cpu, Cog, Brain, Database, Shield, Lock, Key, Eye, Layers, Code2, Zap, Rocket, Search, TrendingUp } from "lucide-react"
import Link from "next/link"

/**
 * Tech page for Prioritech Indonesia Optima.
 * 
 * Displays technology stack overview, methodology, and R&D approach.
 * Features organized tech stack by layers with icons and descriptions.
 * Includes methodology section and development approach details.
 * 
 * @returns JSX element containing the tech page content
 */
export default function TechPage() {
  const techStack = [
    {
      layer: 'Backend Languages',
      description: 'Multi-language approach: Python for rapid iteration, C for performance-critical paths, Java for enterprise, Go for microservices',
      technologies: [
        { name: 'Python', description: 'Primary backend language. FastAPI, Flask, Django' },
        { name: 'C / C++', description: 'Performance-critical: trading systems, embedded control' },
        { name: 'Java', description: 'Enterprise: Spring Boot, JVM ecosystems' },
        { name: 'Go', description: 'Microservices: high-throughput APIs' },
        { name: 'Rust', description: 'Systems programming: memory safety, zero-cost abstractions' }
      ]
    },
    {
      layer: 'AI / ML',
      description: 'Production ML frameworks with observability and version control',
      technologies: [
        { name: 'PyTorch', description: 'Deep learning for research and production' },
        { name: 'LangChain', description: 'LLM orchestration with RAG pipelines' },
        { name: 'CrewAI', description: 'Multi-agent systems with task delegation' },
        { name: 'Agno', description: 'AI orchestration and workflow management' },
        { name: 'Ollama', description: 'Local LLM deployment, privacy-first' },
        { name: 'HuggingFace', description: 'Model hub, transformers, inference' }
      ]
    },
    {
      layer: 'Frontend & Mobile',
      description: 'Web frameworks and cross-platform mobile development',
      technologies: [
        { name: 'Next.js', description: 'React framework with SSR, production-ready' },
        { name: 'React', description: 'Component-based UI library' },
        { name: 'TypeScript', description: 'Type-safe JavaScript at scale' },
        { name: 'Flutter', description: 'Cross-platform mobile: iOS, Android' }
      ]
    },
    {
      layer: 'Automation & Hardware',
      description: 'Industrial automation, robotics, embedded systems, and IoT',
      technologies: [
        { name: 'PLC Programming', description: 'Ladder logic, structured text for industrial control' },
        { name: 'ROS', description: 'Robot Operating System for autonomous systems' },
        { name: 'SCADA', description: 'Supervisory control and data acquisition' },
        { name: 'Modbus / OPC-UA', description: 'Industrial communication protocols' },
        { name: 'Embedded C', description: 'ARM, ESP32, real-time systems' },
        { name: 'CAD Tools', description: 'Design and simulation for mechatronics' }
      ]
    },
    {
      layer: 'Infrastructure',
      description: 'Cloud platforms, containerization, orchestration, and deployment',
      technologies: [
        { name: 'AWS', description: 'Cloud services, EC2, Lambda, S3' },
        { name: 'Docker', description: 'Containerization for reproducible deployments' },
        { name: 'Kubernetes', description: 'Container orchestration at scale' },
        { name: 'Linux', description: 'Production OS: Ubuntu, CentOS' },
        { name: 'Terraform', description: 'Infrastructure as code' }
      ]
    },
    {
      layer: 'Data & Testing',
      description: 'Databases, data processing, and testing frameworks',
      technologies: [
        { name: 'PostgreSQL', description: 'Relational database, production workloads' },
        { name: 'Redis', description: 'In-memory cache, pub/sub, real-time' },
        { name: 'Kafka', description: 'Event streaming, microservices messaging' },
        { name: 'SQLite', description: 'Lightweight embedded database' },
        { name: 'MongoDB', description: 'NoSQL document database' },
        { name: 'Pytest / Jest', description: 'Testing frameworks with coverage' },
        { name: 'Load Testing', description: 'Performance and stress testing tools' }
      ]
    }
  ]

  const methodologyPrinciples = [
    {
      title: 'Modular Design',
      description: 'Every system is built with modularity in mind, ensuring components can be scaled, replaced, or upgraded independently.',
      icon: <CheckCircle size={24} />
    },
    {
      title: 'Production-First',
      description: 'We design for production from day one, focusing on reliability, scalability, and maintainability over rapid prototyping.',
      icon: <CheckCircle size={24} />
    },
    {
      title: 'Cloud-Agnostic',
      description: 'Our solutions work across cloud providers and on-premises environments, giving you deployment flexibility.',
      icon: <CheckCircle size={24} />
    },
    {
      title: 'Auditable Systems',
      description: 'All systems include comprehensive logging, monitoring, and audit trails for enterprise compliance and debugging.',
      icon: <CheckCircle size={24} />
    }
  ]

  const developmentApproach = [
    'Modular design with documented interfaces. Upgrade components without system-wide rewrites.',
    'Automated testing at every layer: unit, integration, load. CI/CD that fails fast.',
    'Observability by default: structured logging, metrics, distributed tracing. Know why systems fail.',
    'Documentation as code: API contracts, deployment runbooks, failure mode analysis.',
    'Cloud-agnostic with migration paths. Run anywhere, migrate when needed, no vendor lock-in.',
    'Security through design: threat modeling, defense in depth, least privilege, audit trails.'
  ]

  return (
    <div className="min-h-screen bg-main">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <PageHero
          title="Tools change. Principles don't."
          subtitle="How We Build"
          description="Comprehensive technology stack."
        />

        {/* Tech Stack Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                <LampEffect>Technology Stack Overview</LampEffect>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {techStack.map((layer, index) => (
                <div 
                  key={index}
                  className="bg-main/80 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:border-accent/50 hover:glow-gold transition-all duration-300 font-mono terminal-window relative"
                >
                  {/* Terminal header bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-3 border-b border-accent/20 bg-main/50">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>

                  <div className="pt-12">
                    {/* Layer Header */}
                    <div className="mb-4">
                      <h3 className="text-secondary text-xl font-semibold mb-2 font-mono">
                        <span className="text-accent">$</span> {layer.layer}
                      </h3>
                      <p className="text-secondary/60 text-xs font-mono leading-relaxed">
                        {layer.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                      {layer.technologies.map((tech, techIndex) => (
                        <div 
                          key={techIndex} 
                          className="flex flex-col items-center gap-2 p-3 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 hover:bg-main/70 transition-all group"
                          title={tech.description}
                        >
                          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors text-accent">
                            <TechStackIcon tech={tech.name.toLowerCase()} size={20} />
                          </div>
                          <span className="text-secondary/80 text-xs font-mono text-center font-medium">{tech.name}</span>
                          <span className="text-secondary/50 text-[10px] font-mono text-center leading-tight line-clamp-2">{tech.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware & Embedded Systems */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                Hardware & Embedded Systems
              </h2>
            </div>
            
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Cpu className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Firmware</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Cog className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">PLC</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Rocket className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Robotics</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Brain className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Edge AI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Security Architecture */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                Security Architecture
              </h2>
            </div>
            
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Shield className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Zero-Trust</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Lock className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Encryption</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Key className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Access Control</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Eye className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Testing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline Tooling */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                Pipeline Tooling
              </h2>
            </div>
            
            <div className="flex justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Database className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Data</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Brain className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Model</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Code2 className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Logic</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Layers className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Interface</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Ops</span>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering Principles */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                Engineering Principles
              </h2>
            </div>
            
            <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Eye className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Clarity</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Search className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Observable</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Shield className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Ownership</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Zap className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Tested</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Code2 className="w-8 h-8 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Documented</span>
              </div>
            </div>
          </div>
        </section>

        {/* What We Can Achieve Together */}
        <section className="py-16 bg-main/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                What We Can Achieve Together
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Brain className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Multi-Agent AI</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Zap className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">AI Copilots</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Shield className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Private AI</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Eye className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Cyber-Defense</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <TrendingUp className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Predictive Automation</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Rocket className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Robotics</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Layers className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Full-Stack AI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-main">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Our Development Methodology
              </h2>
            </div>
            
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
              {methodologyPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 bg-main/80 border border-accent/20 rounded-lg hover:border-accent/50 transition-all"
                >
                  <div className="text-accent">
                    {principle.icon}
                  </div>
                  <span className="text-secondary font-semibold text-xs font-mono text-center">{principle.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Approach */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Development Approach
              </h2>
            </div>
            
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <Layers className="w-10 h-10 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Modular</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Zap className="w-10 h-10 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Tested</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Eye className="w-10 h-10 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Observable</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Code2 className="w-10 h-10 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Documented</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Database className="w-10 h-10 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Cloud-Agnostic</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-10 h-10 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Secure</span>
              </div>
            </div>
          </div>
        </section>

        {/* R&D Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Research & Development
              </h2>
            </div>
            
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Search className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Research</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Code2 className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Development</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Rocket className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Innovation</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6">
              Ready to Leverage Our Technology?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MovingBorder borderRadius="8px">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
                >
                  $ Start a Project
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
