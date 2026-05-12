"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { revealContainer, revealItem } from "@/lib/motion"

interface KPI {
  label: string
  value: string
  trend?: "up" | "down" | "flat"
  hint?: string
}

interface DemoShellProps {
  title: string
  subtitle?: string
  status?: "live" | "idle" | "alert" | "secure"
  kpis?: KPI[]
  children: ReactNode
  className?: string
  /** Optional accent color: gold default. Override with tailwind hex e.g. "text-emerald-400". */
  accentTextClass?: string
}

const statusStyle: Record<string, { dot: string; label: string; pulse: boolean }> = {
  live:   { dot: "bg-emerald-400", label: "LIVE",   pulse: true },
  idle:   { dot: "bg-secondary/40", label: "IDLE", pulse: false },
  alert:  { dot: "bg-amber-400",   label: "ALERT",  pulse: true },
  secure: { dot: "bg-sky-400",      label: "SECURE", pulse: false },
}

const trendGlyph = { up: "↑", down: "↓", flat: "→" } as const
const trendClass = { up: "text-emerald-400", down: "text-rose-400", flat: "text-secondary/60" } as const

/**
 * Captivating demo shell with header, status indicator, KPI strip, and body.
 * Provides consistent chrome across all project demos.
 */
export function DemoShell({
  title,
  subtitle,
  status = "live",
  kpis,
  children,
  className = "",
  accentTextClass = "text-accent",
}: DemoShellProps) {
  const s = statusStyle[status]
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={revealContainer(0.05, 0.06)}
      className={`relative w-full rounded-xl border border-accent/20 bg-gradient-to-br from-main via-main to-main/95 overflow-hidden font-mono ${className}`}
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      {/* Header */}
      <motion.div
        variants={revealItem}
        className="relative flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-accent/15 bg-main/40 backdrop-blur-sm"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs ${accentTextClass}`}>$</span>
            <h3 className="text-secondary font-semibold text-sm sm:text-base truncate">{title}</h3>
          </div>
          {subtitle && (
            <p className="text-secondary/55 text-xs leading-relaxed line-clamp-2">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="relative flex w-2 h-2">
            {s.pulse && (
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${s.dot}`} />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${s.dot}`} />
          </span>
          <span className="text-[10px] tracking-widest text-secondary/70 uppercase">{s.label}</span>
        </div>
      </motion.div>

      {/* KPI strip */}
      {kpis && kpis.length > 0 && (
        <motion.div
          variants={revealItem}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-accent/10 border-b border-accent/15"
        >
          {kpis.map((k, i) => (
            <div key={i} className="bg-main/60 backdrop-blur-sm px-4 py-3">
              <div className="flex items-baseline gap-1.5">
                <span className={`text-lg sm:text-xl font-bold tabular-nums ${accentTextClass}`}>
                  {k.value}
                </span>
                {k.trend && (
                  <span className={`text-xs ${trendClass[k.trend]}`}>{trendGlyph[k.trend]}</span>
                )}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-secondary/55 mt-0.5">
                {k.label}
              </div>
              {k.hint && <div className="text-[10px] text-secondary/40 mt-0.5">{k.hint}</div>}
            </div>
          ))}
        </motion.div>
      )}

      {/* Body */}
      <motion.div variants={revealItem} className="relative p-4 sm:p-6">
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Status pill for inline metadata. */
export function StatusPill({
  label,
  tone = "accent",
}: {
  label: string
  tone?: "accent" | "success" | "warn" | "danger" | "info" | "muted"
}) {
  const tones = {
    accent:  "bg-accent/10 text-accent border-accent/30",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    warn:    "bg-amber-500/10 text-amber-300 border-amber-500/30",
    danger:  "bg-rose-500/10 text-rose-300 border-rose-500/30",
    info:    "bg-sky-500/10 text-sky-300 border-sky-500/30",
    muted:   "bg-secondary/10 text-secondary/60 border-secondary/20",
  } as const
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded border ${tones[tone]}`}>
      {label}
    </span>
  )
}

/** Animated horizontal bar — fills on mount, uses accent gradient. */
export function Bar({
  pct,
  label,
  value,
  tone = "accent",
}: {
  pct: number
  label?: string
  value?: string
  tone?: "accent" | "success" | "warn" | "danger"
}) {
  const tones = {
    accent:  "from-accent/40 via-accent to-accent/80",
    success: "from-emerald-500/40 via-emerald-400 to-emerald-500/80",
    warn:    "from-amber-500/40 via-amber-400 to-amber-500/80",
    danger:  "from-rose-500/40 via-rose-400 to-rose-500/80",
  } as const
  return (
    <div className="w-full">
      {(label || value) && (
        <div className="flex justify-between items-baseline mb-1">
          {label && <span className="text-xs text-secondary/70">{label}</span>}
          {value && <span className="text-xs text-secondary tabular-nums">{value}</span>}
        </div>
      )}
      <div className="h-1.5 rounded-full bg-main/60 border border-accent/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${tones[tone]}`}
          initial={{ width: "0%" }}
          animate={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
