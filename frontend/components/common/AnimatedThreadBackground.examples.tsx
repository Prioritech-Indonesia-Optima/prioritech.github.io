/**
 * Usage examples for AnimatedThreadBackground component
 * 
 * This file demonstrates different ways to use the AnimatedThreadBackground
 * component across the Prioritech website.
 */

import { AnimatedThreadBackground } from "@/components/common/AnimatedThreadBackground"

// Example 1: Basic usage (as used in homepage hero)
export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatedThreadBackground />
      <div className="relative z-10 flex flex-col justify-center min-h-screen">
        {/* Hero content */}
      </div>
    </section>
  )
}

// Example 2: Minimal background without hero ellipses
export function TechSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <AnimatedThreadBackground 
        showHeroBackground={false}
        className="opacity-30"
      />
      <div className="relative z-10">
        {/* Tech content */}
      </div>
    </section>
  )
}

// Example 3: Custom viewBox for different aspect ratios
export function AboutSection() {
  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      <AnimatedThreadBackground 
        viewBox="0 0 1200 600"
        threadCount={5}
      />
      <div className="relative z-10">
        {/* About content */}
      </div>
    </section>
  )
}

// Example 4: Subtle background for content sections
export function ProjectSection() {
  return (
    <section className="relative py-16 overflow-hidden bg-main/50">
      <AnimatedThreadBackground 
        showHeroBackground={false}
        threadCount={3}
        className="opacity-20"
      />
      <div className="relative z-10">
        {/* Project content */}
      </div>
    </section>
  )
}
