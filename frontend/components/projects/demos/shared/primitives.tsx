"use client"

/**
 * Compact, reusable primitives for project demos.
 * Self-contained — only depend on framer-motion and motion tokens.
 */

import { useEffect, useState, useRef, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { easing, duration } from "@/lib/motion"

// ---------------------------------------------------------------------------
// AnimatedTerminal — auto-scrolling typed log with prefix tokens.
// ---------------------------------------------------------------------------

export type TermLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "default" | "ok" | "warn" | "err" | "info" | "dim" }
  | { kind: "ok"; text: string }
  | { kind: "err"; text: string }
  | { kind: "warn"; text: string }
  | { kind: "info"; text: string }
  | { kind: "rule" }

const toneClass = {
  default: "text-secondary/85",
  ok: "text-emerald-300",
  warn: "text-amber-300",
  err: "text-rose-300",
  info: "text-sky-300",
  dim: "text-secondary/45",
}

export function AnimatedTerminal({
  lines,
  speed = 60,
  loop = true,
  height = 360,
  className = "",
}: {
  lines: TermLine[]
  speed?: number
  loop?: boolean
  height?: number
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [iter, setIter] = useState(0)
  const [fading, setFading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (count >= lines.length) {
      if (!loop) return
      const t = setTimeout(() => {
        setFading(true)
        const reset = setTimeout(() => {
          setCount(0)
          setIter((i) => i + 1)
          setFading(false)
        }, 280)
        return () => clearTimeout(reset)
      }, 2400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount((c) => c + 1), speed + Math.random() * 90)
    return () => clearTimeout(t)
  }, [count, lines.length, loop, speed])

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [count])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg border border-accent/15 bg-main/70 backdrop-blur-sm font-mono text-[12px] sm:text-[13px] leading-relaxed overflow-y-auto scrollbar-hide ${className}`}
      style={{ height, opacity: fading ? 0 : 1, transition: "opacity 0.28s ease" }}
    >
      {/* faint scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div className="relative px-4 py-3">
        {lines.slice(0, count).map((line, i) => (
          <TermRow key={`${iter}-${i}`} line={line} />
        ))}
        {count < lines.length && <Caret />}
      </div>
    </div>
  )
}

function TermRow({ line }: { line: TermLine }) {
  if (line.kind === "rule") {
    return <div className="my-2 border-t border-accent/15" />
  }
  if (line.kind === "cmd") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.fast, ease: easing.outQuart }}
        className="flex gap-2"
      >
        <span className="text-accent select-none">$</span>
        <span className="text-secondary">{line.text}</span>
      </motion.div>
    )
  }
  const prefix = { ok: "✓", err: "✗", warn: "!", info: "›" }[line.kind as "ok" | "err" | "warn" | "info"]
  const cls =
    line.kind === "ok"
      ? "text-emerald-300"
      : line.kind === "err"
      ? "text-rose-300"
      : line.kind === "warn"
      ? "text-amber-300"
      : line.kind === "info"
      ? "text-sky-300"
      : toneClass[(line as { tone?: keyof typeof toneClass }).tone ?? "default"]
  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: duration.fast, ease: easing.outQuart }}
      className="flex gap-2"
    >
      {prefix && <span className={cls + " select-none"}>{prefix}</span>}
      <span className={cls}>{line.text}</span>
    </motion.div>
  )
}

function Caret() {
  return <span className="inline-block w-2 h-3.5 align-middle bg-accent ml-0.5 animate-pulse" />
}

// ---------------------------------------------------------------------------
// ChatBubble — sender / receiver bubbles with timestamps.
// ---------------------------------------------------------------------------

export function ChatBubble({
  from,
  text,
  meta,
  variant = "user",
}: {
  from?: string
  text: ReactNode
  meta?: string
  variant?: "user" | "agent" | "system"
}) {
  const isUser = variant === "user"
  const isSystem = variant === "system"

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-[10px] uppercase tracking-wider text-secondary/40 bg-main/60 border border-accent/10 rounded-full px-2 py-0.5">
          {text}
        </span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: easing.outExpo }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed border ${
          isUser
            ? "bg-accent/15 border-accent/30 text-secondary rounded-br-sm"
            : "bg-main/70 border-accent/15 text-secondary/90 rounded-bl-sm"
        }`}
      >
        {from && (
          <div className="text-[10px] text-accent/70 uppercase tracking-wider mb-1">{from}</div>
        )}
        <div>{text}</div>
        {meta && <div className="text-[10px] text-secondary/40 mt-1">{meta}</div>}
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Sparkline — tiny SVG line.
// ---------------------------------------------------------------------------

export function Sparkline({
  points,
  height = 32,
  width = 100,
  className = "",
  stroke = "currentColor",
}: {
  points: number[]
  height?: number
  width?: number
  className?: string
  stroke?: string
}) {
  if (points.length < 2) return null
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const step = width / (points.length - 1)
  const path = points
    .map((p, i) => {
      const x = i * step
      const y = height - ((p - min) / range) * height
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: easing.outExpo }}
      />
      {/* End dot */}
      <motion.circle
        cx={(points.length - 1) * step}
        cy={height - ((points[points.length - 1] - min) / range) * height}
        r={2}
        fill={stroke}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4, ease: easing.outBack }}
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// PulseDot — animated radar pulse, used for live indicators.
// ---------------------------------------------------------------------------

export function PulseDot({ color = "bg-emerald-400", size = 8 }: { color?: string; size?: number }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span className={`absolute inset-0 rounded-full opacity-50 animate-ping ${color}`} />
      <span className={`relative inline-flex rounded-full ${color}`} style={{ width: size, height: size }} />
    </span>
  )
}

// ---------------------------------------------------------------------------
// AnimatedNumber — count-up.
// ---------------------------------------------------------------------------

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const dur = 1100
    const from = 0
    const to = value
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(from + (to - from) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Cell — generic content cell with title + body.
// ---------------------------------------------------------------------------

export function Panel({
  title,
  right,
  children,
  className = "",
}: {
  title?: string
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-lg border border-accent/15 bg-main/60 backdrop-blur-sm overflow-hidden ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-accent/10 bg-main/50">
          <div className="text-[11px] uppercase tracking-wider text-secondary/55">{title}</div>
          {right}
        </div>
      )}
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step list — animated check sequence
// ---------------------------------------------------------------------------

export function StepFlow({ steps }: { steps: { label: string; status: "done" | "active" | "pending" }[] }) {
  return (
    <ol className="space-y-2">
      <AnimatePresence>
        {steps.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: duration.base, ease: easing.outExpo }}
            className="flex items-center gap-3"
          >
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                s.status === "done"
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                  : s.status === "active"
                  ? "bg-accent/20 border-accent/60 text-accent animate-pulse"
                  : "bg-main/60 border-secondary/20 text-secondary/40"
              }`}
            >
              {s.status === "done" ? "✓" : s.status === "active" ? "•" : i + 1}
            </span>
            <span
              className={`text-xs sm:text-sm font-mono ${
                s.status === "pending" ? "text-secondary/40" : "text-secondary/85"
              }`}
            >
              {s.label}
            </span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ol>
  )
}
