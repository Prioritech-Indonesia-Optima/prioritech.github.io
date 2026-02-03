"use client"

import { useState } from "react"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { PageHero } from "@/components/common/PageHero"
import { ModernCard } from "@/components/common/ModernCard"
import { ImageSection } from "@/components/common/ImageSection"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"
import { ProjectCategoryIcon, TechStackIcon } from "@/components/common/IconComponents"
import { LampEffect } from "@/components/aceternity/lamp-effect"
import { ArrowRight, ExternalLink, Brain, Cog, TrendingUp, Shield, Zap, BarChart3, Layers, Target, Search, Code2, Rocket, Eye } from "lucide-react"

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
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenDemo = (projectTitle: string) => {
    setSelectedProject(projectTitle)
    setIsModalOpen(true)
  }

  const handleCloseDemo = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

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
          description="Systems in production."
          variant="gradient"
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
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.projects.map((project, index) => (
                  <ModernCard
                    key={index}
                    title={project.title}
                    icon={<ProjectCategoryIcon category={project.category} size={24} />}
                    className="h-full cursor-pointer"
                    delay={index * 0.1}
                  >
                    <div className="space-y-4">
                      <p className="text-accent/80 text-sm font-medium font-mono">
                        {project.description}
                      </p>
                      <p className="text-accent/60 text-xs font-medium font-mono">
                        {project.impact}
                      </p>

                      {/* Tech Stack */}
                      <div className="border-t border-accent/10 pt-4">
                        <p className="text-secondary/60 text-xs font-mono mb-3">Tech Stack:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, techIndex) => (
                            <div 
                              key={techIndex}
                              className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg hover:border-accent/50 hover:bg-accent/20 transition-all group"
                              title={tech}
                            >
                              <TechStackIcon tech={tech.toLowerCase()} size={16} className="text-accent" />
                              <span className="text-secondary/80 text-xs font-mono">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Demo Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenDemo(project.title)
                        }}
                        className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>▶</span>
                        Click to view demo
                      </button>
                    </div>
                  </ModernCard>
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
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Brain className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">AI Systems</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Cog className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Automation</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <TrendingUp className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Predictive Intelligence</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Shield className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Private AI</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <BarChart3 className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Dashboards</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Layers className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Enterprise Infrastructure</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Target className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Quant Engines</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-lg hover:border-accent/50 transition-all">
                <Zap className="w-8 h-8 text-accent" />
                <span className="text-accent text-xs font-mono text-center">Custom Apps</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-secondary/70 text-sm sm:text-base font-mono italic">
                You don't need another platform — you need a system that works. We build that.
              </p>
            </div>
          </div>
        </section>

        {/* Case Study Showcase Image */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ImageSection
              src="/projects-dashboard.jpg"
              alt="Data dashboard and analytics visualization"
              title="Real-Time Analytics"
              description="Live dashboards that turn complex data into actionable insights."
              height="md"
              textPosition="bottom-left"
            />
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-main/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4">
                Our Project Methodology
              </h2>
            </div>
            
            <div className="flex justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Search className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Discovery</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Code2 className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Design</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Rocket className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Development</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Eye className="w-12 h-12 text-accent" />
                <span className="text-secondary/70 text-xs font-mono text-center">Deployment</span>
              </div>
            </div>
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
              <PrimaryButton href="/contact" icon>
                $ Start a Project
              </PrimaryButton>
              <SecondaryButton href="/tech" icon>
                $ View Our Tech Stack
              </SecondaryButton>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Demo Modal */}
      {selectedProject && (
        <ProjectDemoModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          projectTitle={selectedProject}
        />
      )}
    </div>
  )
}
