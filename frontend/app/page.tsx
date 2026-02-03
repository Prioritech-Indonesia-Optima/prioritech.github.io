"use client";

import React, { useRef, Suspense, lazy } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, TrendingUp, Shield } from "lucide-react"
import { LineShadowText } from "@/components/line-shadow-text"
import { Navbar } from "@/components/common/Navbar"
import { SectionCard } from "@/components/common/SectionCard"
import { PrimaryButton, SecondaryButton } from "@/components/common/ModernButton"
import { ScrollProgress } from "@/components/common/ScrollProgress"
import { DivisionIcon, ProjectCategoryIcon, TechStackIcon } from "@/components/common/IconComponents"
import { AnimatedThreadBackground } from "@/components/common/AnimatedThreadBackground"
import { TypewriterEffect } from "@/components/aceternity/typewriter-effect"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { motion, useScroll, useTransform } from "framer-motion"
import { MovingBorder } from "@/components/aceternity/moving-border"
import { LampEffect } from "@/components/aceternity/lamp-effect"
import Link from "next/link"

// Lazy load below-fold components to reduce initial bundle size
const Footer = lazy(() => import("@/components/common/Footer").then(mod => ({ default: mod.Footer })));
const SectionReveal = lazy(() => import("@/components/common/SectionReveal").then(mod => ({ default: mod.SectionReveal })));

/**
 * Hero section component with parallax background effects.
 * 
 * Creates depth by applying subtle parallax scrolling to background elements.
 * Uses Framer Motion's useScroll and useTransform for smooth parallax effects.
 * 
 * @returns JSX element containing hero section with parallax
 */
function HeroSectionWithParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  // Parallax transforms - subtle movement for depth
  const threadY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <div ref={ref} className="relative min-h-[85vh] py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Hero Background - Space image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Space background image */}
        <Image
          src="/hero-bg.jpg"
          alt="Space background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability - reduced opacity */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Tech pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(218,165,32,0.05)_50%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(217,217,217,0.03)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(218,165,32,0.02)_0%,transparent_50%)]" />
        </div>
        {/* Subtle gradient overlay - lighter */}
        <div className="absolute inset-0 bg-gradient-to-b from-main/40 via-main/30 to-main/50" />
        {/* Subtle vignette - lighter */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,44,44,0.15)_100%)]" />
      </div>
      
      {/* Animated Background - contained within hero with parallax */}
      <motion.div style={{ y: threadY }} className="absolute inset-0 z-[1] opacity-40">
        <AnimatedThreadBackground />
      </motion.div>
      
      {/* Ambient gradient animation */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent blur-3xl animate-pulse-slow delay-1000" />
      </div>
      
      {/* Hero Content - properly layered above animation with subtle parallax */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-10 flex items-center min-h-[70vh] pt-8 sm:pt-12 lg:pt-16 w-full"
      >
        <div className="mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 w-full">
          <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl space-y-4 sm:space-y-5 md:space-y-6 bg-transparent">
            {/* CLI-style Badge */}
            <div>
              <div className="inline-flex items-center bg-main/60 backdrop-blur-md border border-accent/40 rounded-lg px-3 sm:px-4 py-2 font-mono shadow-lg">
                <span className="text-accent text-xs md:text-sm">
                  $ Building systems that outlast their requirements
                </span>
              </div>
            </div>

            <h1 className="text-secondary text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-balance font-mono drop-shadow-lg">
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


            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <PrimaryButton href="/projects" icon>
                  $ Explore Our Work
                </PrimaryButton>
                <SecondaryButton href="/contact" icon>
                  $ Start a Build
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

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
export default function HomePage(): JSX.Element {
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
  ];

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
  ];

  return (
    <div className="min-h-screen bg-main">
      <ScrollProgress />
      <Navbar />
      <HeroSectionWithParallax />

      {/* Content Sections - outside hero, no animation interference */}
      
      {/* About Summary */}
      <Suspense fallback={<section className="py-16 bg-main"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" /></section>}>
        <SectionReveal>
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
                <LampEffect>We are Prioritech</LampEffect>
              </h2>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 hover:border-accent/50 transition-all">
                  <Rocket className="w-5 h-5 text-accent" />
                  <span className="text-secondary font-mono text-sm">Production-Ready</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 hover:border-accent/50 transition-all">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-secondary font-mono text-sm">Scalable</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 hover:border-accent/50 transition-all">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-secondary font-mono text-sm">Built to Last</span>
                </div>
              </div>
              
              
              <Link 
                href="/about"
                className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors font-mono hover:shadow-gold"
              >
                $ Our engineering philosophy →
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
        </SectionReveal>
      </Suspense>

      {/* Divisions Summary */}
      <Suspense fallback={<section className="py-16 bg-main/50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" /></section>}>
        <SectionReveal delay={0.1}>
        <section className="py-16 bg-main/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
              <LampEffect>Our Engineering Divisions</LampEffect>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {divisions.slice(0, 3).map((division, index) => (
              <SectionReveal key={division.id} delay={0.2 + index * 0.1} duration={0.5}>
                <div className="h-full">
                  <SectionCard
                    title={division.title}
                    description={division.description}
                    icon={<DivisionIcon division={division.icon} size={24} />}
                    className="h-full flex flex-col min-h-[220px]"
                  />
                </div>
              </SectionReveal>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/divisions"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-mono hover:shadow-lg hover:shadow-accent/25"
            >
              $ View All Divisions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
        </SectionReveal>
      </Suspense>

      {/* Featured Projects */}
      <Suspense fallback={<section className="py-16 bg-main"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" /></section>}>
        <SectionReveal delay={0.1}>
        <section className="py-16 bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
              <LampEffect>Featured Projects</LampEffect>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {featuredProjects.map((project, index) => (
              <SectionReveal key={index} delay={0.2 + index * 0.1} duration={0.5}>
                <div className="h-full group">
                  <div 
                    className="relative bg-main/70 backdrop-blur-md border border-accent/20 rounded-xl p-6 hover:border-accent/60 hover:bg-main/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 ease-out font-mono cursor-pointer h-full flex flex-col min-h-[200px] overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    {/* Terminal line numbers */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-accent/20 flex flex-col pt-6">
                      {[1, 2, 3].map((num) => (
                        <span key={num} className="text-accent/40 text-xs px-1">
                          {num}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-start space-x-4 ml-10 flex-1 relative z-10">
                      <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg flex-shrink-0 group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                        <ProjectCategoryIcon category={project.category} size={24} />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="mb-2">
                          <span className="text-accent">$</span>{" "}
                          <span className="text-secondary font-bold text-base group-hover:text-accent/90 transition-colors duration-300">
                            {project.title}
                          </span>
                        </div>
                        <p className="text-accent/70 text-xs font-medium mb-2">
                          {project.description}
                        </p>
                        <p className="text-accent/80 text-sm font-medium mt-auto">
                          {project.challenge}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/projects"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-main px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-mono hover:shadow-lg hover:shadow-accent/25"
            >
              $ View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
        </SectionReveal>
      </Suspense>

      {/* Tech Stack Summary */}
      <Suspense fallback={<section className="py-16 bg-main/50"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" /></section>}>
        <SectionReveal delay={0.1}>
        <section className="py-16 bg-main/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-4 font-mono">
              <LampEffect>Our Technology Stack</LampEffect>
            </h2>
          </div>
          
          <div className="mb-12">
            <div className="space-y-8">
              {/* Backend Languages */}
              <div>
                <h3 className="text-secondary/80 text-sm font-mono mb-4 text-center">Backend Languages</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-3xl mx-auto">
                  {['Python', 'C', 'Java', 'Go', 'Rust'].map((tech) => (
                    <div 
                      key={tech}
                      className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-xl hover:border-accent/60 hover:bg-main/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg text-accent group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                        <TechStackIcon tech={tech.toLowerCase()} size={24} />
                      </div>
                      <span className="text-secondary/80 text-xs font-mono text-center font-medium group-hover:text-accent/80 transition-colors duration-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI / ML */}
              <div>
                <h3 className="text-secondary/80 text-sm font-mono mb-4 text-center">AI / ML</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-4xl mx-auto">
                  {['PyTorch', 'LangChain', 'CrewAI', 'Agno', 'Ollama', 'HuggingFace'].map((tech) => (
                    <div 
                      key={tech}
                      className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-xl hover:border-accent/60 hover:bg-main/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg text-accent group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                        <TechStackIcon tech={tech.toLowerCase()} size={24} />
                      </div>
                      <span className="text-secondary/80 text-xs font-mono text-center font-medium group-hover:text-accent/80 transition-colors duration-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend & Mobile */}
              <div>
                <h3 className="text-secondary/80 text-sm font-mono mb-4 text-center">Frontend & Mobile</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {['Next.js', 'React', 'TypeScript', 'Flutter'].map((tech) => (
                    <div 
                      key={tech}
                      className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-xl hover:border-accent/60 hover:bg-main/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg text-accent group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                        <TechStackIcon tech={tech.toLowerCase()} size={24} />
                      </div>
                      <span className="text-secondary/80 text-xs font-mono text-center font-medium group-hover:text-accent/80 transition-colors duration-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div>
                <h3 className="text-secondary/80 text-sm font-mono mb-4 text-center">Infrastructure</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl mx-auto">
                  {['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform'].map((tech) => (
                    <div 
                      key={tech}
                      className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-xl hover:border-accent/60 hover:bg-main/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg text-accent group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                        <TechStackIcon tech={tech.toLowerCase()} size={24} />
                      </div>
                      <span className="text-secondary/80 text-xs font-mono text-center font-medium group-hover:text-accent/80 transition-colors duration-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data & Testing */}
              <div>
                <h3 className="text-secondary/80 text-sm font-mono mb-4 text-center">Data & Testing</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-3xl mx-auto">
                  {['PostgreSQL', 'Redis', 'Kafka', 'SQLite', 'MongoDB'].map((tech) => (
                    <div 
                      key={tech}
                      className="flex flex-col items-center gap-2 p-4 bg-main/50 border border-accent/20 rounded-xl hover:border-accent/60 hover:bg-main/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ease-out group"
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg text-accent group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
                        <TechStackIcon tech={tech.toLowerCase()} size={24} />
                      </div>
                      <span className="text-secondary/80 text-xs font-mono text-center font-medium group-hover:text-accent/80 transition-colors duration-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              href="/tech"
              className="inline-flex items-center border border-accent/30 hover:border-accent bg-main/60 backdrop-blur-sm text-secondary hover:text-accent px-6 py-3 rounded-lg font-semibold transition-all duration-300 font-mono hover:bg-main/80 hover:shadow-lg"
            >
              $ View Full Tech Stack
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
        </SectionReveal>
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<section className="py-16 bg-main"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" /></section>}>
        <SectionReveal delay={0.1}>
        <section className="py-16 bg-main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-secondary text-2xl sm:text-3xl font-bold mb-6 font-mono">
            <LampEffect>What Could We Build Together?</LampEffect>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton href="/contact" icon>
              $ Start a Build
            </PrimaryButton>
            <SecondaryButton href="/projects">
              $ Explore Our Work
            </SecondaryButton>
          </div>
        </div>
      </section>
        </SectionReveal>
      </Suspense>
      
      {/* Footer - Always visible at bottom */}
      <Suspense fallback={<footer className="py-8 bg-main border-t border-accent/20" />}>
        <Footer />
      </Suspense>
    </div>
  )
}