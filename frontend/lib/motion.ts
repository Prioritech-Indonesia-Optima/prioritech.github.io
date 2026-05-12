/**
 * Unified motion design system.
 *
 * Single source of truth for easing curves, durations, stagger, and Framer Motion
 * variants used across the site. Respects prefers-reduced-motion and adapts to
 * mobile / save-data via useMotionBudget().
 */

import { useEffect, useState } from "react"
import type { Variants, Transition } from "framer-motion"

// Easing curves --------------------------------------------------------------

export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOutCubic: [0.65, 0, 0.35, 1] as const,
  outBack: [0.34, 1.56, 0.64, 1] as const,
} as const

export const easingCss = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  outQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  inOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const

// Durations ------------------------------------------------------------------

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.56,
  cinematic: 0.9,
} as const

// Stagger --------------------------------------------------------------------

export const stagger = {
  tight: 0.04,
  base: 0.08,
  dramatic: 0.14,
} as const

// Springs --------------------------------------------------------------------

export const spring = {
  soft: { type: "spring", stiffness: 180, damping: 24 } as Transition,
  snappy: { type: "spring", stiffness: 360, damping: 30 } as Transition,
  bouncy: { type: "spring", stiffness: 260, damping: 14 } as Transition,
} as const

// Variants -------------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing.outQuart },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.outExpo },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easing.outExpo },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

/** Parent that staggers children. Use with `revealItem` children. */
export const revealContainer = (delayChildren: number = 0, staggerChildren: number = stagger.base): Variants => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
})

/** Standard staggered child. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.outExpo },
  },
}

// Motion budget --------------------------------------------------------------

export type MotionBudget = "full" | "reduced" | "off"

/**
 * Hook that returns the available motion budget for this client.
 * - "off"     → user requested reduced-motion
 * - "reduced" → mobile viewport or save-data
 * - "full"    → everything goes
 */
export function useMotionBudget(): MotionBudget {
  const [budget, setBudget] = useState<MotionBudget>("full")

  useEffect(() => {
    const compute = () => {
      if (typeof window === "undefined") return
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) {
        setBudget("off")
        return
      }
      const narrow = window.matchMedia("(max-width: 768px)").matches
      // navigator.connection is experimental but widely supported
      const conn = (navigator as any).connection
      const saveData = conn?.saveData === true
      const slow = conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g"
      if (narrow || saveData || slow) {
        setBudget("reduced")
        return
      }
      setBudget("full")
    }
    compute()
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mqWidth = window.matchMedia("(max-width: 768px)")
    mq.addEventListener("change", compute)
    mqWidth.addEventListener("change", compute)
    return () => {
      mq.removeEventListener("change", compute)
      mqWidth.removeEventListener("change", compute)
    }
  }, [])

  return budget
}

/** Hook returning true if user prefers reduced motion. SSR-safe. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}
