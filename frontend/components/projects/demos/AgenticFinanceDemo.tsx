"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill } from "./shared/DemoShell"
import { ChatBubble, Panel, Donut } from "./shared/primitives"

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
    { name: "Payroll",         value: 12800, color: "#daa520" },
    { name: "Marketing tools", value: 4280,  color: "#f43f5e" },
    { name: "Cloud & SaaS",    value: 3120,  color: "#f59e0b" },
    { name: "Equipment",       value: 1450,  color: "#38bdf8" },
    { name: "Travel",          value: 920,   color: "#10b981" },
  ]
  const totalSpend = categories.reduce((s, c) => s + c.value, 0)

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
                className="text-xs text-foreground/40 italic ml-2"
              >
                agent is thinking…
              </motion.div>
            )}
          </div>
        </Panel>

        <Panel title="Spend by category · this month" className="lg:col-span-2">
          <div className="flex flex-col items-center">
            <Donut
              segments={categories.map((c) => ({ value: c.value, color: c.color }))}
              centerValue={`$${(totalSpend / 1000).toFixed(1)}k`}
              centerLabel="total"
              size={148}
              thickness={14}
            />
            <div className="w-full mt-4 space-y-2">
              {categories.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-foreground/75">
                    <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="text-foreground tabular-nums">
                    <span className="text-foreground/40 mr-1">{Math.round((c.value / totalSpend) * 100)}%</span>
                    ${c.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-accent/10 text-[11px] text-foreground/55 leading-relaxed">
            <span className="text-rose-300">Marketing tools</span> is the largest anomaly · 42% above 6-mo avg
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
