"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { animate, animeEase } from "@/lib/anime"
import { useMotionBudget } from "@/lib/motion"

/**
 * Count-up "odometer" number. Rolls 0 → value with a crisp ease once scrolled
 * into view (one-shot). Writes directly to the DOM node — no re-render.
 * Renders the final value statically under reduced motion.
 */
export function OdometerNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1400,
  className,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  durationMs?: number
  className?: string
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null)
  const budget = useMotionBudget()
  const done = useRef(false)

  const format = (n: number) =>
    `${prefix}${n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (budget === "off") {
      el.textContent = format(value)
      return
    }

    el.textContent = format(0)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return
          done.current = true
          const proxy = { v: 0 }
          animate(proxy, {
            v: value,
            duration: durationMs,
            ease: animeEase.outExpo,
            onUpdate: () => {
              el.textContent = format(proxy.v)
            },
          })
          io.disconnect()
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, value, decimals, prefix, suffix, durationMs])

  return <span ref={ref} className={cn("font-mono tabular-nums", className)}>{format(budget === "off" ? value : 0)}</span>
}
