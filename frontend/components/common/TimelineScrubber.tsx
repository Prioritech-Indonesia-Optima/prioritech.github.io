"use client"

import { useScroll, useSpring, useTransform, motion } from "framer-motion"
import { usePrefersReducedMotion } from "@/lib/motion"

const TICKS = 42

/**
 * Film-strip page scrubber — the animejs.com signature chrome. A dark chip of
 * tick marks pinned bottom-right; the gold playhead tracks page scroll with a
 * springy ease. Purely decorative (pointer-events: none).
 */
export function TimelineScrubber(): JSX.Element | null {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const eased = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const left = useTransform(eased, (v) => `${3 + v * 91}%`)

  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 right-5 z-40 hidden h-10 w-60 items-center rounded-[5px] border border-line bg-[#151414]/95 px-2 shadow-lg md:flex"
    >
      <div className="relative flex h-full w-full items-center justify-between">
        {Array.from({ length: TICKS }).map((_, i) => (
          <span
            key={i}
            className="w-px bg-secondary/25"
            style={{ height: i % 5 === 0 ? 14 : 9 }}
          />
        ))}
        <motion.span
          className="absolute top-1/2 w-[3px] -translate-y-1/2 rounded-sm bg-accent"
          style={{ left, height: 18 }}
        />
      </div>
    </div>
  )
}
