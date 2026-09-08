"use client"

/**
 * Compact, reusable primitives for project demos.
 * Self-contained — only depend on framer-motion and motion tokens.
 */

import { useEffect, useState, useRef, useId, ReactNode } from "react"
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
  default: "text-foreground/85",
  ok: "text-emerald-300",
  warn: "text-amber-300",
  err: "text-rose-300",
  info: "text-sky-300",
  dim: "text-foreground/45",
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
      className={`relative overflow-hidden rounded-lg border border-accent/15 bg-card font-mono text-[12px] sm:text-[13px] leading-relaxed overflow-y-auto scrollbar-hide ${className}`}
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
        <span className="text-foreground">{line.text}</span>
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
        <span className="text-[10px] uppercase tracking-wider text-foreground/40 bg-card/60 border border-accent/10 rounded-full px-2 py-0.5">
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
            ? "bg-accent/15 border-accent/30 text-foreground rounded-br-sm"
            : "bg-card/70 border-accent/15 text-foreground/90 rounded-bl-sm"
        }`}
      >
        {from && (
          <div className="text-[10px] text-accent/70 uppercase tracking-wider mb-1">{from}</div>
        )}
        <div>{text}</div>
        {meta && <div className="text-[10px] text-foreground/40 mt-1">{meta}</div>}
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
    <div className={`rounded-lg border border-accent/15 bg-card/60 backdrop-blur-sm overflow-hidden ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-accent/10 bg-card/50">
          <div className="text-[11px] uppercase tracking-wider text-foreground/55">{title}</div>
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
                  : "bg-card/60 border-foreground/20 text-foreground/40"
              }`}
            >
              {s.status === "done" ? "✓" : s.status === "active" ? "•" : i + 1}
            </span>
            <span
              className={`text-xs sm:text-sm font-mono ${
                s.status === "pending" ? "text-foreground/40" : "text-foreground/85"
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

// ---------------------------------------------------------------------------
// LineChart — responsive SVG line/area chart with grid + axis labels.
// Optionally splits into a solid history + dashed forecast at `forecastFrom`.
// ---------------------------------------------------------------------------

export function LineChart({
  series,
  xLabels,
  yMin,
  yMax,
  height = 170,
  stroke = "#daa520",
  fill = true,
  forecastFrom,
  grid = true,
  yFormat = (v: number) => String(Math.round(v)),
  className = "",
}: {
  series: number[]
  xLabels?: string[]
  yMin?: number
  yMax?: number
  height?: number
  stroke?: string
  fill?: boolean
  forecastFrom?: number
  grid?: boolean
  yFormat?: (v: number) => string
  className?: string
}) {
  const gid = useId().replace(/:/g, "")
  const data = series
  const n = data.length
  const rawMin = Math.min(...data)
  const rawMax = Math.max(...data)
  const pad = (rawMax - rawMin || 1) * 0.14
  const min = yMin ?? rawMin - pad
  const max = yMax ?? rawMax + pad
  const range = max - min || 1
  const W = 100
  const H = 100
  const x = (i: number) => (i / (n - 1)) * W
  const y = (v: number) => H - ((v - min) / range) * H
  const linePath = data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ")
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`
  const hist = forecastFrom ? data.slice(0, forecastFrom) : data
  const fc = forecastFrom ? data.slice(forecastFrom - 1) : []
  const histPath = hist.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ")
  const fcPath = fc.map((v, i) => `${i === 0 ? "M" : "L"} ${x(forecastFrom! - 1 + i).toFixed(2)} ${y(v).toFixed(2)}`).join(" ")
  const gridLines = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      {/* Y-axis gutter */}
      <div className="absolute left-0 top-0 bottom-5 w-9 pointer-events-none">
        {grid &&
          gridLines.map((g, i) => (
            <span
              key={i}
              className="absolute right-1.5 text-[9px] font-mono text-foreground/35 leading-none tabular-nums"
              style={{ top: `${g * 100}%`, transform: "translateY(-50%)" }}
            >
              {yFormat(min + (max - min) * (1 - g))}
            </span>
          ))}
      </div>

      {/* Plot area */}
      <div className="absolute left-9 right-0 top-0 bottom-5">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>
          {grid &&
            gridLines.map((g, i) => (
              <line key={i} x1={0} x2={W} y1={H * g} y2={H * g} stroke="currentColor" strokeOpacity={0.09} strokeWidth={0.3} />
            ))}
          {fill && <path d={areaPath} fill={`url(#${gid})`} />}
          {forecastFrom ? (
            <>
              <path d={histPath} stroke={stroke} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={fcPath} stroke={stroke} strokeWidth={1.4} fill="none" strokeDasharray="4 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity={0.85} />
              <line x1={x(forecastFrom - 1)} x2={x(forecastFrom - 1)} y1={0} y2={H} stroke={stroke} strokeOpacity={0.3} strokeWidth={0.4} strokeDasharray="2 2" />
            </>
          ) : (
            <motion.path
              d={linePath}
              stroke={stroke}
              strokeWidth={1.4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <circle cx={x(n - 1)} cy={y(data[n - 1])} r={2.2} fill={stroke} />
        </svg>
      </div>

      {/* X-axis labels */}
      {xLabels && (
        <div className="absolute left-9 right-0 bottom-0 h-4 flex justify-between items-center text-[9px] font-mono text-foreground/30">
          {xLabels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// RadialGauge — circular progress ring with a centered value.
// ---------------------------------------------------------------------------

export function RadialGauge({
  value,
  max = 100,
  label,
  size = 128,
  stroke = "#daa520",
  suffix = "",
}: {
  value: number
  max?: number
  label?: string
  size?: number
  stroke?: string
  suffix?: string
}) {
  const r = 44
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value / max))
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="8" className="text-foreground/10" stroke="currentColor" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="8"
          stroke={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold tabular-nums" style={{ color: stroke }}>
          {Math.round(value)}
          {suffix}
        </span>
        {label && <span className="text-[10px] uppercase tracking-wider text-foreground/45 mt-0.5">{label}</span>}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Donut — multi-segment composition ring with a centered total.
// ---------------------------------------------------------------------------

export function Donut({
  segments,
  size = 128,
  thickness = 12,
  centerValue,
  centerLabel,
}: {
  segments: { value: number; color: string }[]
  size?: number
  thickness?: number
  centerValue?: string
  centerLabel?: string
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const r = 40
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth={thickness} className="text-foreground/5" stroke="currentColor" />
        {segments.map((s, i) => {
          const len = (s.value / total) * c
          const el = (
            <motion.circle
              key={i}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${len} ${c - len}`}
              initial={{ strokeDashoffset: -offset, opacity: 0 }}
              animate={{ strokeDashoffset: -offset, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          )
          offset += len
          return el
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {centerValue && <span className="text-lg font-bold tabular-nums text-foreground">{centerValue}</span>}
        {centerLabel && <span className="text-[9px] uppercase tracking-wider text-foreground/45">{centerLabel}</span>}
      </div>
    </div>
  )
}
