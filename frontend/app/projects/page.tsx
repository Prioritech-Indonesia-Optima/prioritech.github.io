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
      id: 'intelligent-systems',
      title: 'Intelligent Systems',
      description: 'AI-powered systems that enhance business operations and decision-making.',
      projects: [
        {
          title: 'Sales Analytics Assistant',
          description: 'Problem: teams spent hours building reports from 10 years of fragmented sales data. Solution: RAG pipeline with real-time vector indexing. Built 800+ embedding queries per second, sub-100ms retrieval.',
          impact: '80% faster analytics, self-service dashboard eliminated manual reporting',
          technicalChallenge: 'How to make 500GB of historical data queryable in natural language without pre-indexing everything',
          engineeringDecision: 'Incremental indexing with vector similarity search. Trade-off: slightly stale data (acceptable for sales analytics)',
          techStack: ['FastAPI', 'LangChain', 'PostgreSQL', 'Vector Indexing'],
          category: 'intelligent-systems',
          unlocks: 'Now supports predictive analytics, trend detection, and automated dashboard generation'
        },
        {
          title: 'Graph Neural Fraud Detector',
          description: 'Problem: fraud patterns evolve faster than rule-based systems can adapt. Solution: GNN learning transaction graph structures in real-time. Processes 1M+ transactions per second.',
          impact: '92% precision prevents false positive cascade, reduces manual review by 60%',
          technicalChallenge: 'Detect fraud in real-time without killing legitimate transactions. Cannot afford batch processing.',
          engineeringDecision: 'Graph streaming with incremental learning. Model updates every 24 hours via MLOps pipeline.',
          techStack: ['PyTorch Geometric', 'GNN', 'PostgreSQL', 'Redis', 'Streaming'],
          category: 'intelligent-systems',
          unlocks: 'Basis for anomaly detection across banking, e-commerce, insurance domains'
        }
      ]
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Network Intelligence',
      description: 'Automated security solutions and intelligent threat detection systems.',
      projects: [
        {
          title: 'Virtual Penetration Framework',
          description: 'Problem: security teams need continuous testing, but manual pentesting is expensive and slow. Solution: AI agent that performs reconnaissance, identifies attack vectors, and synthesizes exploit scripts. Fully autonomous security posture improvement.',
          impact: 'Identifies vulnerabilities 10x faster than manual testing, updates attack strategies weekly',
          technicalChallenge: 'How to automate security testing without false positives that waste engineer time',
          engineeringDecision: 'Hierarchical agent architecture: reconnaissance → exploitation → reporting. Human-in-loop for critical findings.',
          techStack: ['Python', 'LLM Orchestration', 'Network Protocols', 'Exploit Frameworks'],
          category: 'cybersecurity',
          unlocks: 'Continuous security improvement that adapts as infrastructure evolves'
        },
        {
          title: 'Anomaly & Event Correlation Engine',
          description: 'Problem: security events across 20+ systems don\'t correlate. Attackers use infrastructure lag to evade detection. Solution: RAG-powered log analysis + GNN event correlation. Detects multi-system attack patterns in real-time.',
          impact: 'Identifies attack campaigns 5 hours earlier than manual correlation, reduces false positives by 80%',
          technicalChallenge: 'Correlate events across systems with different log formats, time zones, and network topologies',
          engineeringDecision: 'Unified event graph where nodes are systems and edges are event relationships. RAG for natural language log parsing.',
          techStack: ['RAG', 'GNN', 'Log Parsing', 'Event Correlation', 'Python'],
          category: 'cybersecurity',
          unlocks: 'SOC automation: automated incident response, threat hunting, and infrastructure hardening'
        }
      ]
    },
    {
      id: 'quantitative',
      title: 'Quantitative & Financial Systems',
      description: 'Machine learning-driven financial systems and algorithmic trading solutions.',
      projects: [
        {
          title: 'Futures Trading Engine',
          description: 'Problem: algorithmic trading needs millisecond execution but traditional ML pipelines are too slow. Solution: C++ order routing with 5ms latency guarantee. ML models run on separate thread, signals are queued.',
          impact: 'Sustained profitability in live markets. Risk management prevents 99.9% of catastrophic losses.',
          technicalChallenge: 'Sub-10ms total latency: network + order execution + risk check + confirmation',
          engineeringDecision: 'Dedicated C++ path for order execution. Python for ML model inference. Async risk checks.',
          techStack: ['C++', 'Machine Learning', 'Risk Management', 'Exchange APIs'],
          category: 'quantitative',
          unlocks: 'Scalable trading infrastructure: add new markets, instruments, strategies without rewrites'
        },
        {
          title: 'Predictive Equation Modeler',
          description: 'Problem: crypto volatility breaks traditional financial models. Solution: time-series framework with breakpoint detection. Models learn from 50 years of traditional market data, adapt to crypto microstructure.',
          impact: '70% precision on breakout prediction vs 45% baseline. Identifies regime shifts 2 hours early',
          technicalChallenge: 'How to detect structural breaks in market behavior without overfitting to noise',
          engineeringDecision: 'Ensemble of ARIMA + neural ODEs. Backtest on 50 years data, validate on crypto metrics.',
          techStack: ['Time Series', 'Forecasting', 'Python', 'Statistical Modeling'],
          category: 'quantitative',
          unlocks: 'Portfolio optimization: asset allocation that adapts to volatility regimes'
        },
        {
          title: 'Agentic Financial Assistant',
          description: 'Problem: SMEs lack financial analysis capability but can\'t afford advisors. Solution: conversational agent with financial reasoning. Analyzes spending patterns, suggests optimizations, plans cash flow.',
          impact: 'Pilot users reduced inefficient spending by 12% within first month',
          technicalChallenge: 'How to provide accurate financial advice without regulatory compliance violations',
          engineeringDecision: 'Clear disclaimers. Agent explains reasoning. Human audit trail for all recommendations.',
          techStack: ['Conversational AI', 'Financial Analysis', 'LangChain', 'FastAPI'],
          category: 'quantitative',
          unlocks: 'Financial literacy platform: SMEs learn good practices through daily interactions'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Automation & Mechatronics',
      description: 'Industrial automation, robotics, and IoT solutions for real-world applications.',
      projects: [
        {
          title: 'Edge-AI Kitchen Vision System',
          description: 'Problem: commercial kitchens need real-time efficiency monitoring but internet is unreliable. Solution: ARM-based edge computer vision. Processes 30 FPS locally, uploads summaries when online.',
          impact: '30% faster service from predictive bottleneck detection. Works fully offline during outages',
          technicalChallenge: 'Run neural networks on ARM Cortex-A78 without cloud dependency',
          engineeringDecision: 'TensorFlow Lite quantization. MobileNet backbone. Model compresses to 8MB, runs on $50 hardware.',
          techStack: ['Computer Vision', 'Edge AI', 'ARM Devices', 'TensorFlow Lite'],
          category: 'automation',
          unlocks: 'Offline-first AI: disaster response, rural deployments, privacy-sensitive applications'
        },
        {
          title: 'Industrial Automation Suite',
          description: 'Problem: automotive assembly lines have 100+ PLCs but no unified visibility. Solution: OPC-UA gateway aggregates all PLC data. Predictive maintenance prevents line stoppages.',
          impact: '30% faster BOM processing. Zero unplanned downtime from equipment failure in 6 months',
          technicalChallenge: 'Aggregate data from 100+ PLCs with different protocols, legacy hardware, proprietary formats',
          engineeringDecision: 'Modbus-to-OPC-UA conversion layer. Universal driver library. Standardized event system.',
          techStack: ['PLC Programming', 'OPC-UA', 'Modbus', 'Predictive Maintenance'],
          category: 'automation',
          unlocks: 'Smart factory: full visibility, predictive maintenance, autonomous quality control'
        },
        {
          title: 'IoT & Robotics R&D',
          description: 'Exploratory projects pushing boundaries: FPV ground drones for inspection, cloud AI CCTV with privacy-preserving analytics, adaptive irrigation that learns plant behavior.',
          impact: 'Energy efficiency: irrigation system uses 40% less water via ML-optimized schedules',
          technicalChallenge: 'How to make IoT systems work offline, respect privacy, and adapt to environmental changes',
          engineeringDecision: 'Hybrid architecture: edge intelligence + cloud coordination. Privacy-by-design in computer vision.',
          techStack: ['FPV Drones', 'Computer Vision', 'IoT', 'Adaptive Control', 'ROS'],
          category: 'automation',
          unlocks: 'Next-generation IoT: systems that adapt, self-heal, and work without constant connectivity'
        }
      ]
    },
    {
      id: 'ai-platforms',
      title: 'Applied AI Platforms',
      description: 'Production-ready AI applications and platforms for various industries.',
      projects: [
        {
          title: 'Cognitive Therapy Platform',
          description: 'Problem: mental health support should be private, available 24/7, and non-judgmental. Solution: conversational AI with long-term memory, sentiment tracking, and crisis detection. Fully encrypted, HIPAA-compliant.',
          impact: 'Thousands of sessions without data breach. Users report 60% improvement in mood tracking consistency',
          technicalChallenge: 'Maintain conversational context over months while preserving user privacy',
          engineeringDecision: 'Separate encryption for vector embeddings vs metadata. Zero-knowledge architecture.',
          techStack: ['LangChain', 'FastAPI', 'Encrypted Vector Stores', 'Sentiment Analysis', 'HIPAA Compliance'],
          category: 'ai-platforms',
          unlocks: 'Privacy-first AI: healthcare platforms, confidential counseling, personal assistant systems'
        },
        {
          title: 'Offline Summarizer App',
          description: 'Problem: professionals need note-taking but mobile apps require constant internet. Solution: on-device transcription + summarization. Works entirely offline, processes audio locally.',
          impact: 'Used by 50K+ users in remote areas without reliable connectivity',
          technicalChallenge: 'Run voice-to-text and summarization models on mobile hardware with <2GB RAM',
          engineeringDecision: 'Apple Core ML for transcription. Custom quantized summarization model. 150MB total footprint.',
          techStack: ['Flutter', 'Core ML', 'On-device AI', 'Audio Processing'],
          category: 'ai-platforms',
          unlocks: 'Edge AI products: voice assistants, meeting notes, accessibility tools that work anywhere'
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

                        {/* Technical Challenge */}
                        {project.technicalChallenge && (
                          <div className="mb-4">
                            <h4 className="text-accent font-medium text-sm mb-2 font-mono">Technical Challenge</h4>
                            <p className="text-secondary/70 text-xs italic font-mono">
                              {project.technicalChallenge}
                            </p>
                          </div>
                        )}

                        {/* Engineering Decision */}
                        {project.engineeringDecision && (
                          <div className="mb-4">
                            <h4 className="text-secondary font-medium text-sm mb-2 font-mono">Engineering Decision</h4>
                            <p className="text-secondary/60 text-xs font-mono">
                              {project.engineeringDecision}
                            </p>
                          </div>
                        )}

                        {/* Impact Metrics */}
                        <div className="mb-6">
                          <h4 className="text-accent font-medium text-sm mb-2 font-mono">Impact</h4>
                          <p className="text-secondary/80 text-sm font-medium font-mono">
                            &gt; {project.impact}
                          </p>
                        </div>

                        {/* What This Unlocks */}
                        {project.unlocks && (
                          <div className="mb-6 border-t border-accent/10 pt-4">
                            <h4 className="text-accent font-medium text-sm mb-2 font-mono">This Unlocks</h4>
                            <p className="text-secondary/70 text-xs font-mono italic">
                              {project.unlocks}
                            </p>
                          </div>
                        )}

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
