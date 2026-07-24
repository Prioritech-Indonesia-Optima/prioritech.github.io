"use client"

import { createElement, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { splitText, animate, stagger, animeEase } from "@/lib/anime"
import { useMotionBudget } from "@/lib/motion"
import { isSplashDone } from "@/lib/splash-signal"

type Trigger = "splash" | "view" | "immediate"

/**
 * Headline whose characters snap in with a staggered spring. Splits text into
 * per-char spans (accessible: original text stays exposed to AT via aria-label)
 * and animates them. Renders plain, fully-visible text under reduced motion.
 *
 * `trigger`:
 *   - "immediate" → animate on mount
 *   - "view"      → animate when scrolled into view
 *   - "splash"    → animate on splash handoff (or immediately if already done)
 */
export function SplitTextHeading({
  as = "h2",
  trigger = "view",
  staggerMs = 22,
  className,
  children,
}: {
  as?: keyof JSX.IntrinsicElements
  trigger?: Trigger
  staggerMs?: number
  className?: string
  children: string
}): JSX.Element {
  const ref = useRef<HTMLElement>(null)
  const budget = useMotionBudget()
  const [splashDone, setSplashDone] = useState(false)

  // Watch the splash handoff at component level (hooks can't live in effects).
  useEffect(() => {
    if (trigger !== "splash") return
    if (isSplashDone()) {
      setSplashDone(true)
      return
    }
    const onDone = () => setSplashDone(true)
    window.addEventListener("prioritech:splash-done", onDone)
    return () => window.removeEventListener("prioritech:splash-done", onDone)
  }, [trigger])

  useEffect(() => {
    const el = ref.current
    if (!el || budget === "off") return
    if (trigger === "splash" && !splashDone) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    const run = () => {
      if (cancelled || !ref.current) return
      const splitter = splitText(ref.current, { chars: true, accessible: true })
      const anim = animate(splitter.chars, {
        y: [18, 0],
        opacity: [0, 1],
        duration: 700,
        ease: animeEase.outExpo,
        delay: stagger(staggerMs),
      })
      cleanup = () => {
        anim.revert?.()
        splitter.revert()
      }
    }

    if (trigger === "view") {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              io.disconnect()
              run()
            }
          })
        },
        { threshold: 0.3 },
      )
      io.observe(el)
      cleanup = () => io.disconnect()
    } else {
      run()
    }

    return () => {
      cancelled = true
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, splashDone, trigger, staggerMs])

  return createElement(
    as,
    { ref, className: cn(className), "aria-label": children },
    children,
  )
}
