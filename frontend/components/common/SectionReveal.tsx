"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/**
 * SectionReveal wrapper component for scroll-triggered animations.
 * 
 * Wraps sections with fade-in and slide-up animations when they enter
 * the viewport. Respects prefers-reduced-motion and provides configurable
 * animation options.
 * 
 * @param children - Child elements to animate
 * @param className - Optional CSS classes
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param yOffset - Vertical offset for slide animation (default: 30)
 * 
 * @returns JSX element with scroll-triggered animations
 */
interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  yOffset = 30,
}: SectionRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const prefersReducedMotion = useReducedMotion()

  // If reduced motion is preferred, show content immediately without animation
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth Prioritech aesthetic
      }}
    >
      {children}
    </motion.div>
  )
}

