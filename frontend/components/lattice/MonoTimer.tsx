"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { createTimer, useAnimeScope } from "@/lib/anime"
import { useSplashHandoff } from "@/lib/splash-signal"

function pad(n: number, w = 2): string {
  return String(Math.floor(n)).padStart(w, "0")
}

/** Elapsed milliseconds → `T+HH:MM:SS.mmm` */
function fmtStopwatch(ms: number): string {
  const t = Math.max(0, ms)
  const h = Math.floor(t / 3_600_000)
  const m = Math.floor((t % 3_600_000) / 60_000)
  const s = Math.floor((t % 60_000) / 1000)
  const millis = Math.floor(t % 1000)
  return `T+${pad(h)}:${pad(m)}:${pad(s)}.${pad(millis, 3)}`
}

/** Current time in a timezone → `HH:MM:SS` */
function fmtWallclock(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    }).format(new Date())
  } catch {
    return "--:--:--"
  }
}

/**
 * Live mono timer. `stopwatch` counts up from mount (or from the splash
 * handoff when `startOnSplash`); `wallclock` shows the current time in a
 * timezone. Driven by anime's `createTimer`; writes straight to the DOM node
 * (no React re-render). Frozen static value under reduced motion.
 */
export function MonoTimer({
  mode,
  timeZone = "Asia/Jakarta",
  startOnSplash = false,
  suffix,
  className,
}: {
  mode: "stopwatch" | "wallclock"
  timeZone?: string
  startOnSplash?: boolean
  suffix?: string
  className?: string
}): JSX.Element {
  const root = useRef<HTMLSpanElement>(null)
  const startAt = useRef<number>(0)
  const started = useRef<boolean>(!startOnSplash)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Anchor the stopwatch to the splash handoff if requested.
  useSplashHandoff(() => {
    if (mode !== "stopwatch") return
    started.current = true
  })

  useAnimeScope(
    root,
    () => {
      const write = (text: string) => {
        const node = root.current?.firstChild
        if (node) node.textContent = text
      }
      let lastSecond = -1
      createTimer({
        duration: 1e9,
        onUpdate: () => {
          if (mode === "wallclock") {
            // reformat only when the whole second changes (avoid 60fps Intl calls)
            const s = Math.floor(performance.now() / 1000)
            if (s === lastSecond) return
            lastSecond = s
            write(fmtWallclock(timeZone))
            return
          }
          if (!started.current) {
            write(fmtStopwatch(0))
            return
          }
          if (startAt.current === 0) startAt.current = performance.now()
          write(fmtStopwatch(performance.now() - startAt.current))
        },
      })
    },
    [mode, timeZone],
  )

  const fallback = mode === "stopwatch" ? fmtStopwatch(0) : mounted ? fmtWallclock(timeZone) : "--:--:--"

  return (
    <span ref={root} className={cn("font-mono tabular-nums", className)}>
      <span>{fallback}</span>
      {suffix && <span className="ml-1 opacity-60">{suffix}</span>}
    </span>
  )
}
