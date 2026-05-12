"use client"

import { ReactNode, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { duration as motionDuration, easing } from "@/lib/motion"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
  direction?: "up" | "left" | "right" | "scale"
}

/**
 * Scroll-triggered reveal. Respects prefers-reduced-motion. Uses shared
 * easing/duration tokens from lib/motion for consistent choreography.
 */
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  duration,
  yOffset = 24,
  direction = "up",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  const initial =
    direction === "up"
      ? { opacity: 0, y: yOffset }
      : direction === "left"
      ? { opacity: 0, x: -yOffset }
      : direction === "right"
      ? { opacity: 0, x: yOffset }
      : { opacity: 0, scale: 0.94 }

  const animateTo =
    direction === "scale" ? { opacity: 1, scale: 1 } : { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animateTo : initial}
      transition={{
        duration: duration ?? motionDuration.slow,
        delay,
        ease: easing.outExpo,
      }}
    >
      {children}
    </motion.div>
  )
}
