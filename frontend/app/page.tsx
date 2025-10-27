"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { LineShadowText } from "@/components/line-shadow-text"
import { Navbar } from "@/components/common/Navbar"
import { Footer } from "@/components/common/Footer"
import { SectionCard } from "@/components/common/SectionCard"
import { DivisionIcon, ProjectCategoryIcon } from "@/components/common/IconComponents"
import { AnimatedThreadBackground } from "@/components/common/AnimatedThreadBackground"
import { TypewriterEffect } from "@/components/aceternity/typewriter-effect"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { GridBackground } from "@/components/aceternity/grid-background"
import { CodeBlock } from "@/components/aceternity/code-block"
import Link from "next/link"

/**
 * Home page component for Prioritech Indonesia Optima.
 * 
 * The main landing page showcasing company capabilities. Key sections:
 * 
 * - Hero with company statement about building real systems
 * - About section with company description and highlights
 * - Engineering divisions preview
 * - Featured projects showcase
 * - Technology stack overview
 * - Call-to-action sections
 * 
 * All content aligned with official Prioritech blueprint. Removed fake metrics.
 * Uses Prioritech color palette (graphite, silver, gold) and responsive design.
 * 
 * @returns JSX element containing the complete home page
 */
export default function HomePage() {
  const divisions = [
    {
      id: 'ai-systems',
      title: 'AI Systems & Orchestration',
      description: 'Build retrieval, automation, and workflow engines that make decision-making autonomous and auditable.',
      icon: 'ai-systems'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Intelligence',
      description: 'AI-assisted pentesting, anomaly detection, and graph-based risk modeling.',
      icon: 'cybersecurity'
    },
    {
      id: 'quantitative',
      title: 'Quantitative & Financial Systems',
      description: 'Predictive modeling, trading automation, and real-time forecasting engines.',
      icon: 'quantitative'
    },
    {
      id: 'automation',
      title: 'Industrial & Edge Automation',
      description: 'Robotics, PLC, and IoT frameworks that connect data with motion.',
      icon: 'automation'
    },
    {
      id: 'product',
      title: 'Applied Software Engineering',
      description: 'Enterprise-grade systems combining backend precision with intuitive user interfaces.',
      icon: 'product'
    }
  ]

  const featuredProjects = [
    {
      title: 'Intelligent Query Assistant',
      description: 'Natural-language analytics over structured enterprise data. 80% faster data retrieval.',
      challenge: 'Context-aware system designed for precision analytics',
      category: 'intelligent-systems'
    },
    {
      title: 'Virtual Penetration Framework',
      description: 'Autonomous AI-driven pentest system that maps, analyzes, and exploits vulnerabilities safely.',
      challenge: 'Reduces manual security review time by over 70%',
      category: 'cybersecurity'
    },
    {
      title: 'Market Forecast Engine',
      description: 'Machine-learning pipeline predicting volatility and momentum with high consistency.',
      challenge: '+38% ROI over baseline performance',
      category: 'quantitative'
    },
    {
      title: 'Edge-Vision Analytics',
      description: 'Real-time vision system deployed at the edge for manufacturing and logistics optimization.',
      challenge: 'Industrial automation with precision timing',
      category: 'automation'
    }
  ]

  return (
    <div className="min-h-screen bg-main">
      {/* Navigation - Fixed positioning, always visible */}
      <Navbar />
      
      {/* Hero Section with Animation */}
      <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
        {/* Animated Background - contained within hero */}
        <AnimatedThreadBackground />
        
        {/* Grid overlay for terminal aesthetic */}
        <GridBackground className="z-[5]" opacity={0.15} strokeWidth={0.3} spacing={24} />
        
        {/* Hero Content - properly layered above animation */}
        <div className="relative z-10 flex items-start pt-8 sm:pt-12 lg:pt-16 w-full">
          <div className="mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 w-full">
            <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl space-y-4 sm:space-y-5 md:space-y-6 bg-transparent">
        {/* CLI-style Badge */}
              <div>
              <div className="inline-flex items-center bg-main/80 backdrop-blur-sm border border-accent/30 rounded px-3 sm:px-4 py-2 font-mono">
            <span className="text-accent text-xs md:text-xs">
              $ Building systems that outlast their requirements
            </span>
          </div>
        </div>

              <h1 className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-balance font-mono">
                <TypewriterEffect 
                  words={[
                    { text: "Progress.", className: "font-light" },
                    { text: "Precision.", className: "font-light" },
                    { text: "Prioritech.", className: "font-bold text-accent" }
                  ]}
                  className="font-light"
                  cursorClassName="text-accent"
                />
              </h1>

              <div className="text-secondary/70 text-sm sm:text-base md:text-base lg:text-xl max-w-2xl">
                <TextGenerateEffect 
                  words="Technology that performs where it counts. Real, production-ready systems for your excellence. No half-built ideas."
                  className="font-mono"
                  delayMultiple={0.08}
                />
              </div>

              <div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/projects">
            <Button className="group relative bg-accent/90 hover:bg-accent text-main px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base md:text-xs lg:text-lg font-semibold flex items-center gap-2 border border-accent hover:glow-gold transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 font-mono">
              $ Explore Our Work
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="group relative border border-accent/30 hover:border-accent text-secondary hover:text-accent px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base md:text-xs lg:text-lg font-semibold flex items-center gap-2 hover:glow-gold transition-all duration-300 font-mono">
              $ Start a Build
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections - outside hero, no animation interference */}
      
      {/* About Summary */}
      <section className="py-16 bg-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-main/80 backdrop-blur-sm border border-accent/20 rounded-lg p-8 hover:border-accent/50 hover:bg-main/90 transition-all duration-300 font-mono terminal-window">
            {/* Terminal header bar */}
            <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-3 border-b border-accent/20 bg-main/50 rounded-t-lg">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
            
            <div className="pt-16">
              <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-8 font-mono">
                We are Prioritech
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="text-secondary/80 font-mono">
                  <span className="text-accent">$</span> Production-Ready from Day-1
                </div>
                <div className="text-secondary/80 font-mono">
                  <span className="text-accent">$</span> Futureproof & Scalable
                </div>
                <div className="text-secondary/80 font-mono">
                  <span className="text-accent">$</span> Built to Last
                </div>
              </div>
              
              <div className="text-secondary/60 text-sm italic mb-8 font-mono">
                Performance speaks louder than promises.
              </div>
              
              <Link 
                href="/about"
                className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors font-mono hover:glow-gold"
              >
                $ Our engineering philosophy →
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions Summary */}
      <section className="py-16 bg-main/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
              Our Engineering Divisions
            </h2>
            <div className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto mb-8 font-mono">
              <TextGenerateEffect 
                words="Five specialized engineering disciplines driving modern enterprise innovation."
                delayMultiple={0.1}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {divisions.slice(0, 3).map((division) => (
              <SectionCard
                key={division.id}
                title={division.title}
                description={division.description}
                icon={<DivisionIcon division={division.icon} size={24} />}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/divisions"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-colors font-mono hover:glow-gold"
            >
              $ View All Divisions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
              Featured Projects
            </h2>
            <div className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto mb-8 font-mono">
              <TextGenerateEffect 
                words="Real-world projects demonstrating our engineering capabilities across AI systems, cybersecurity, and automation."
                delayMultiple={0.05}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <div 
                key={index}
                className="relative bg-main/80 backdrop-blur-sm border border-accent/20 rounded-lg p-6 hover:border-accent/50 hover:bg-main/90 transition-all duration-300 font-mono terminal-window"
              >
                {/* Terminal line numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-accent/20 flex flex-col pt-6">
                  {[1, 2].map((num) => (
                    <span key={num} className="text-accent/40 text-xs px-1">
                      {num}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-start space-x-4 ml-10">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
                    <ProjectCategoryIcon category={project.category} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-accent">$</span>{" "}
                      <span className="text-secondary font-bold text-base">
                        {project.title}
                      </span>
                    </div>
                    <p className="text-secondary/60 text-xs mb-2">
                      {project.description}
                    </p>
                    <p className="text-accent/80 text-xs font-medium italic">
                      Challenge: {project.challenge}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/projects"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-colors font-mono hover:glow-gold"
            >
              $ View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Summary */}
      <section className="py-16 bg-main/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
              Our Technology Stack
            </h2>
            <TextGenerateEffect 
              words="We choose tools for longevity and maintainability. Every technology decision includes a 10-year maintenance plan."
              className="text-secondary/70 text-base sm:text-lg max-w-3xl mx-auto mb-8 font-mono"
              delayMultiple={0.05}
            />
          </div>
          
          <div className="mb-12">
            <CodeBlock showLineNumbers className="max-w-4xl mx-auto">
              {/* Backend - Multi-language stack */}
              const backend = ['Python', 'C', 'Java', 'Go', 'Rust'];
              
              {/* AI/ML - Production-ready */}
              const aiStack = ['PyTorch', 'LangChain', 'CrewAI', 'Ollama'];
              
              {/* Frontend - Web & Mobile */}
              const frontend = ['Next.js', 'React', 'TypeScript', 'Flutter'];
              
              {/* Automation - Industrial grade */}
              const automation = ['PLC', 'ROS', 'Modbus', 'OPC-UA', 'Embedded C'];
              
              {/* Infrastructure - Cloud & on-prem */}
              const infrastructure = ['AWS', 'Docker', 'Linux', 'Kubernetes'];
              
              {/* Data - Battle-tested */}
              const dataStack = ['PostgreSQL', 'Redis', 'Kafka', 'SQLite'];
            </CodeBlock>
          </div>
          
          <div className="text-center">
            <Link 
              href="/tech"
              className="inline-flex items-center border border-accent/30 hover:border-accent text-secondary hover:text-accent px-6 py-3 rounded-lg font-semibold transition-colors font-mono glow-gold hover:glow-gold-strong"
            >
              $ View Full Tech Stack
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6 font-mono">
            What Could We Build Together?
          </h2>
          <div className="text-secondary/70 text-base sm:text-lg mb-8 max-w-2xl mx-auto font-mono">
            <TextGenerateEffect 
              words="We engineer results that make your workflow faster, smarter, and more profitable. Systems that run for decades. Infrastructure that scales without breaking. Code that engineers are proud to maintain."
              delayMultiple={0.06}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold hover:scale-105"
            >
              $ Start a Build
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link 
              href="/projects"
              className="inline-flex items-center justify-center border border-accent/30 hover:border-accent text-secondary hover:text-accent px-6 py-3 rounded-lg font-semibold transition-all font-mono hover:glow-gold"
            >
              $ Explore Our Work
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer - Always visible at bottom */}
      <Footer />
    </div>
  )
}