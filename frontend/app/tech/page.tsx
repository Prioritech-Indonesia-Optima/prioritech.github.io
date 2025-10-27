"use client"

import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { SectionCard } from "@/components/common/SectionCard"
import { TechStackIcon } from "@/components/common/IconComponents"
import { Timeline } from "@/components/aceternity/timeline"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { LampEffect } from "@/components/aceternity/lamp-effect"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { TracingBeam } from "@/components/aceternity/tracing-beam"
import { ArrowRight, CheckCircle } from "lucide-react"
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
          title="Our Technology Stack"
          subtitle="Engineering Excellence"
          description="Comprehensive technology stack spanning AI/ML, backend systems, frontend development, infrastructure, data management, and hardware integration."
        />

        {/* Tech Stack Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                <LampEffect>Technology Stack Overview</LampEffect>
              </h2>
              <div className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto font-mono">
                <TextGenerateEffect 
                  words="Our comprehensive technology stack enables us to build production-grade systems across all layers of the technology stack."
                  delayMultiple={0.04}
                />
              </div>
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
                    <div className="mb-6">
                      <h3 className="text-secondary text-xl font-semibold mb-2 font-mono">
                        <span className="text-accent">$</span> {layer.layer}
                      </h3>
                      <div className="text-secondary/70 text-sm font-mono">
                        {layer.description}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-4">
                      {layer.technologies.map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg flex-shrink-0">
                            <TechStackIcon tech={tech.name.toLowerCase()} size={16} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-secondary font-medium text-sm font-mono">
                              {tech.name}
                            </h4>
                            <p className="text-secondary/60 text-xs font-mono">
                              &gt; {tech.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Our Development Methodology
              </h2>
              <p className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto">
                We follow proven engineering principles to deliver reliable, scalable, and maintainable systems.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {methodologyPrinciples.map((principle, index) => (
                <SectionCard
                  key={index}
                  title={principle.title}
                  description={principle.description}
                  icon={principle.icon}
                />
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
              <p className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto">
                Our systematic approach ensures every project meets the highest standards of quality and reliability.
              </p>
            </div>
            
            <TracingBeam>
              <div className="bg-main/80 backdrop-blur-sm border border-accent/20 rounded-xl p-8 font-mono">
                <ul className="space-y-4">
                  {developmentApproach.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3 font-mono">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-secondary/70 text-sm sm:text-base">
                        <span className="text-accent">&gt;</span> {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TracingBeam>
          </div>
        </section>

        {/* R&D Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Research & Development
              </h2>
              <p className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto">
                We continuously invest in R&D to stay at the forefront of technology and deliver cutting-edge solutions.
              </p>
            </div>
            
            <Timeline 
              items={[
                {
                  title: "Research",
                  description: "Continuous exploration of emerging technologies, AI models, and engineering methodologies.",
                },
                {
                  title: "Development",
                  description: "Practical implementation and testing of new technologies in real-world scenarios.",
                },
                {
                  title: "Innovation",
                  description: "Creating novel solutions that push the boundaries of what's possible with current technology.",
                }
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6">
              Ready to Leverage Our Technology?
            </h2>
            <p className="text-secondary/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Discover how our comprehensive technology stack and proven methodology can accelerate your project's success.
            </p>
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
