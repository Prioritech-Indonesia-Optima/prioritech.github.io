"use client"

/**
 * Centralized anime.js v4 access layer.
 *
 * RULE: no component imports `animejs` directly — everything routes through
 * this file so tree-shaking stays centralized and easing constants mirror
 * `lib/motion.ts` (both engines feel identical).
 */

import { useEffect, useRef, type RefObject, type MutableRefObject } from "react"
import {
  animate,
  createScope,
  createTimer,
  createTimeline,
  createDraggable,
  createSpring,
  createDrawable,
  createMotionPath,
  cubicBezier,
  onScroll,
  stagger,
  svg,
  text,
  splitText,
  utils,
  type Scope,
} from "animejs"
import { useMotionBudget, type MotionBudget } from "@/lib/motion"

// Re-export the modular surface components are allowed to use ---------------
export {
  animate,
  createScope,
  createTimer,
  createTimeline,
  createDraggable,
  createSpring,
  createDrawable,
  createMotionPath,
  onScroll,
  stagger,
  svg,
  text,
  splitText,
  utils,
}
export type { Scope }

// Easing constants — mirror lib/motion.ts's curves --------------------------

export const animeEase = {
  outExpo: cubicBezier(0.16, 1, 0.3, 1),
  outQuart: cubicBezier(0.25, 1, 0.5, 1),
  inOutCubic: cubicBezier(0.65, 0, 0.35, 1),
  outBack: cubicBezier(0.34, 1.56, 0.64, 1),
} as const

/** Stiff, minimal-bounce spring — the "crispy" release feel. */
export const crispSpring = () => createSpring({ stiffness: 360, damping: 30 })
/** Slightly looser spring for draggable return. */
export const dragSpring = () => createSpring({ stiffness: 220, damping: 22 })

/**
 * React-safe anime.js scope.
 *
 * Runs `build` inside a `createScope({ root })` on mount and reverts on
 * unmount (removes animations + restores inline styles). When the motion
 * budget is "off" the build is skipped entirely — components render their
 * static fallback via the same `useMotionBudget()` source of truth.
 *
 * `budget` is part of the effect deps so an OS-level reduced-motion toggle
 * mid-session tears down and (if allowed) rebuilds.
 */
export function useAnimeScope(
  root: RefObject<HTMLElement | null>,
  build: (scope: Scope, budget: MotionBudget) => void,
  deps: unknown[] = [],
): MutableRefObject<Scope | null> {
  const scopeRef = useRef<Scope | null>(null)
  const budget = useMotionBudget()

  useEffect(() => {
    if (budget === "off") return
    if (!root.current) return

    const scope = createScope({ root: root as RefObject<HTMLElement> }).add((self) => {
      if (self) build(self, budget)
    })
    scopeRef.current = scope

    return () => {
      scope.revert()
      scopeRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, ...deps])

  return scopeRef
}
