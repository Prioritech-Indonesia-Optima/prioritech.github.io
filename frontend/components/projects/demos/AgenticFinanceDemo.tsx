"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { ChatBubble, Panel, AnimatedNumber } from "./shared/primitives"

/**
 * Agentic Finance Tracker — conversational SME finance with charts.
 */
export function AgenticFinanceDemo() {
  const transcript: { variant: "user" | "agent" | "system"; text: string; from?: string; meta?: string }[] = [
    { variant: "user",  text: "Where did we overspend this month?", meta: "you · 14:02" },
    { variant: "system", text: "Agent scanning ledger · 1,284 entries" },
    { variant: "agent", from: "agent", text: "I found 3 unusual patterns. Marketing tools subscriptions are +42% vs your 6-month average. Two services overlap in function: Mailchimp and ConvertKit.", meta: "agentic-finance · 14:02" },
    { variant: "user",  text: "Can you suggest a fix?", meta: "you · 14:03" },
    { variant: "agent", from: "agent", text: "Consolidate to ConvertKit (higher engagement on your last 3 campaigns). Cancel Mailchimp at renewal on Aug 22 — saves $1,840/year. Want me to draft the cancellation request?", meta: "agentic-finance · 14:03" },
  ]

  const [shown, setShown] = useState(1)
  useEffect(() => {
    if (shown >= transcript.length) {
      const t = setTimeout(() => setShown(1), 6000)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShown((s) => s + 1), 1400)
    return () => clearTimeout(t)
  }, [shown, transcript.length])

  const categories = [
    { name: "Marketing tools", value: 4280, pct: 100, tone: "danger" as const },
    { name: "Cloud & SaaS",    value: 3120, pct: 73, tone: "warn" as const },
    { name: "Payroll",         value: 12800, pct: 60, tone: "accent" as const },
    { name: "Equipment",       value: 1450, pct: 28, tone: "accent" as const },
    { name: "Travel",          value: 920,  pct: 18, tone: "success" as const },
  ]

  return (
    <DemoShell
      title="Agentic Finance Tracker"
      subtitle="Conversational finance for SMEs · spending patterns + actionable saves"
      status="live"
      kpis={[
        { label: "Spend this mo.", value: "$22.6k" },
        { label: "Anomalies", value: "3", trend: "up" },
        { label: "Saves identified", value: "$1.8k", trend: "up", hint: "annual" },
        { label: "Avg waste", value: "−12%", trend: "down" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Conversation" className="lg:col-span-3" right={<StatusPill label="encrypted" tone="info" />}>
          <div className="space-y-1 max-h-[360px] overflow-y-auto scrollbar-hide">
            {transcript.slice(0, shown).map((m, i) => (
              <ChatBubble key={i} variant={m.variant} from={m.from} text={m.text} meta={m.meta} />
            ))}
            {shown < transcript.length && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-secondary/40 italic ml-2"
              >
                agent is thinking…
              </motion.div>
            )}
          </div>
        </Panel>

        <Panel title="Spend by category · this month" className="lg:col-span-2">
          <div className="space-y-3">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-secondary/75">{c.name}</span>
                  <span className="text-accent font-medium">
                    $<AnimatedNumber value={c.value} />
                  </span>
                </div>
                <Bar pct={c.pct} tone={c.tone} />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-accent/10 text-[11px] text-secondary/55 leading-relaxed">
            <span className="text-rose-300">Marketing tools</span> is the largest anomaly · 42% above 6-mo avg
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
