"use client"

import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { SectionCard } from "@/components/common/SectionCard"
import { ProjectCategoryIcon } from "@/components/common/IconComponents"
import { Timeline } from "@/components/aceternity/timeline"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { LampEffect } from "@/components/aceternity/lamp-effect"
import { CardSpotlight } from "@/components/aceternity/card-spotlight"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { ArrowRight, ExternalLink } from "lucide-react"

/**
 * Projects page for Prioritech Indonesia Optima.
 * 
 * Displays portfolio showcase organized by category with case studies.
 * Each project shows title, description, impact metrics, and tech stack.
 * Features responsive design with consistent Prioritech branding.
 * 
 * @returns JSX element containing the projects page content
 */
export default function ProjectsPage() {
  const projectCategories = [
    {
      id: 'ai-systems',
      title: 'AI Systems',
      description: 'AI-powered systems that enhance business operations and decision-making.',
      projects: [
        {
          title: 'Intelligent Query Assistant',
          description: 'Natural-language analytics over structured enterprise data.',
          impact: '80% faster data retrieval.',
          techStack: ['LangChain', 'FastAPI', 'PostgreSQL'],
          category: 'ai-systems'
        },
        {
          title: 'Context-Aware Data Engine',
          description: 'Adaptive retrieval and feedback system designed for precision analytics.',
          impact: 'Self-improving data retrieval system.',
          techStack: ['RAG', 'Vector Stores', 'Feedback Loops'],
          category: 'ai-systems'
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Intelligence',
      description: 'Automated security solutions and intelligent threat detection systems.',
      projects: [
        {
          title: 'Virtual Penetration Framework',
          description: 'Autonomous AI-driven pentest system that maps, analyzes, and exploits vulnerabilities safely.',
          impact: 'Reduces manual security review time by over 70%.',
          techStack: ['AI Pentesting', 'Security Automation'],
          category: 'cybersecurity'
        },
        {
          title: 'Threat Graph Correlator',
          description: 'A graph intelligence engine that links cross-system anomalies into actionable insights.',
          impact: 'Real-time threat detection across complex systems.',
          techStack: ['Graph Intelligence', 'Anomaly Detection'],
          category: 'cybersecurity'
        }
      ]
    },
    {
      id: 'quantitative',
      title: 'Quantitative Systems',
      description: 'Machine learning-driven financial systems and algorithmic trading solutions.',
      projects: [
        {
          title: 'Market Forecast Engine',
          description: 'Machine-learning pipeline predicting volatility and momentum with high consistency.',
          impact: '+38% ROI over baseline performance.',
          techStack: ['Machine Learning', 'Time Series', 'Forecasting'],
          category: 'quantitative'
        },
        {
          title: 'Breakout Probability Model',
          description: 'Forecasting engine designed for real-time signal recognition and risk analysis.',
          impact: 'High-consistency market prediction system.',
          techStack: ['Signal Processing', 'Risk Analysis', 'Real-time ML'],
          category: 'quantitative'
        },
        {
          title: 'Agentic Finance Tracker',
          description: 'Conversational finance system for SMEs that identifies inefficiencies and spending gaps.',
          impact: 'Reduced wasted spend by 12%.',
          techStack: ['Conversational AI', 'Financial Analysis'],
          category: 'quantitative'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Automation & Robotics',
      description: 'Industrial automation, robotics, and IoT solutions for real-world applications.',
      projects: [
        {
          title: 'Edge-Vision Analytics',
          description: 'Real-time vision system deployed at the edge for manufacturing and logistics optimization.',
          impact: 'Optimized manufacturing processes with edge AI.',
          techStack: ['Edge AI', 'Computer Vision', 'Real-time Processing'],
          category: 'automation'
        },
        {
          title: 'PLC Automation Suite',
          description: 'Industrial automation pipeline designed for precision timing and error resilience.',
          impact: 'High-reliability industrial control systems.',
          techStack: ['PLC', 'Industrial Automation', 'SCADA'],
          category: 'automation'
        },
        {
          title: 'Robotic R&D Series',
          description: 'Drones, AI CCTV, and robotics systems integrating autonomy with reliability.',
          impact: 'Advanced robotics for diverse industrial applications.',
          techStack: ['Robotics', 'ROS', 'AI Vision', 'Drones'],
          category: 'automation'
        }
      ]
    },
    {
      id: 'ai-platforms',
      title: 'Applied AI Platforms',
      description: 'Production-ready AI applications and platforms for various industries.',
      projects: [
        {
          title: 'Therapeutic Dialogue AI',
          description: 'Secure, sentiment-aware conversational engine built for sensitivity and privacy.',
          impact: 'Secure and private conversational AI for sensitive applications.',
          techStack: ['Conversational AI', 'Sentiment Analysis', 'Privacy'],
          category: 'ai-platforms'
        },
        {
          title: 'Offline Transcriber',
          description: 'Lightweight summarizer that processes data without cloud dependency.',
          impact: 'Offline-capable AI transcription and summarization.',
          techStack: ['On-device AI', 'Transcription', 'Summarization'],
          category: 'ai-platforms'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-main">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <PageHero
          title="What We've Built"
          subtitle="Technical Portfolio"
          description="Systems that solve real problems at scale. Every project ships with production discipline, failure recovery, and 10-year maintenance plans."
        />

        {/* Project Categories */}
        {projectCategories.map((category) => (
          <section key={category.id} className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                    <ProjectCategoryIcon category={category.id} size={24} />
                  </div>
                  <h2 className="text-secondary text-2xl sm:text-3xl font-bold font-mono">
                    <LampEffect>{category.title}</LampEffect>
                  </h2>
                </div>
                <div className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto font-mono">
                  <TextGenerateEffect 
                    words={category.description}
                    delayMultiple={0.05}
                  />
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.projects.map((project, index) => (
                  <CardSpotlight key={index}>
                    <div className="bg-main/80 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:border-accent/50 hover:bg-main/90 transition-all duration-300 font-mono terminal-window relative">
                      {/* Terminal header bar */}
                      <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-3 border-b border-accent/20 bg-main/50">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500/50" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                          <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>
                      </div>

                      {/* Terminal line numbers */}
                      <div className="absolute left-0 top-10 bottom-0 w-8 border-r border-accent/20 flex flex-col pt-4">
                        {[1, 2, 3].map((num) => (
                          <span key={num} className="text-accent/40 text-xs px-1">
                            {num}
                          </span>
                        ))}
                      </div>

                      <div className="pt-16 ml-10">
                        {/* Project Header */}
                        <div className="mb-6">
                          <h3 className="text-secondary text-xl font-semibold mb-3 font-mono">
                            <span className="text-accent">$</span> {project.title}
                          </h3>
                          <div className="text-secondary/70 text-sm leading-relaxed mb-4">
                            <TextGenerateEffect 
                              words={project.description}
                              delayMultiple={0.03}
                            />
                          </div>
                        </div>

                        {/* Impact Metrics */}
                        <div className="mb-6">
                          <h4 className="text-accent font-medium text-sm mb-2 font-mono">Impact</h4>
                          <p className="text-secondary/80 text-sm font-medium font-mono">
                            &gt; {project.impact}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="border-t border-accent/10 pt-4">
                          <h4 className="text-secondary font-medium text-sm mb-3 font-mono">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium font-mono"
                              >
                                {tech}
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
        ))}

        {/* What We Can Achieve Together */}
        <section className="py-16 bg-main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
                What We Can Achieve Together
              </h2>
              <div className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto font-mono italic mb-8">
                We engineer results that make your workflow faster, smarter, and more profitable.
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">AI systems that think, analyze, and act on your behalf</div>
              </div>
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">Automation frameworks that scale without human babysitting</div>
              </div>
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">Predictive intelligence for operations, trading, or security</div>
              </div>
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">Private AI environments that keep your data inside your walls</div>
              </div>
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">Decision dashboards that don't just visualize — they execute</div>
              </div>
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">End-to-end enterprise infrastructure with integrated AI agents</div>
              </div>
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">Quant engines that optimize cost, risk, and opportunity</div>
              </div>
              <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono hover:border-accent/50 transition-all">
                <div className="text-accent text-sm font-medium mb-2">Custom AI applications that transform day-to-day business execution</div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-secondary/70 text-sm sm:text-base font-mono italic">
                You don't need another platform — you need a system that works. We build that.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Our Project Methodology
              </h2>
              <p className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto">
                Every project follows our proven approach to deliver production-grade solutions.
              </p>
            </div>
            
            <Timeline 
              items={[
                {
                  title: "Discovery",
                  description: "Requirements analysis and technical feasibility assessment",
                },
                {
                  title: "Design",
                  description: "Architecture design and technology stack selection",
                },
                {
                  title: "Development",
                  description: "Iterative development with continuous testing and validation",
                },
                {
                  title: "Deployment",
                  description: "Production deployment with monitoring and optimization",
                }
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-secondary/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with production-grade 
              engineering solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MovingBorder borderRadius="8px">
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
                >
                  $ Start a Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </MovingBorder>
              <MovingBorder borderRadius="8px">
                <a 
                  href="/tech"
                  className="inline-flex items-center justify-center border border-accent/30 hover:border-accent text-secondary hover:text-accent px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
                >
                  $ View Our Tech Stack
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </MovingBorder>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
