"use client"

import { DemoShell, Bar, StatusPill } from "./shared/DemoShell"
import { AnimatedTerminal, Panel, TermLine, AnimatedNumber } from "./shared/primitives"

/**
 * Intelligent Query Assistant — natural language → SQL → results
 */
export function IntelligentQueryDemo() {
  const lines: TermLine[] = [
    { kind: "cmd", text: "iqa --query \"show me sales by region for last quarter\"" },
    { kind: "info", text: "Parsing intent... entities=[sales, region, last_quarter]" },
    { kind: "ok", text: "Schema match found: orders.amount, orders.region, orders.created_at" },
    { kind: "out", text: "Generated SQL:", tone: "info" },
    { kind: "out", text: "  SELECT region, SUM(amount) AS total", tone: "default" },
    { kind: "out", text: "  FROM orders", tone: "default" },
    { kind: "out", text: "  WHERE created_at >= NOW() - INTERVAL '3 months'", tone: "default" },
    { kind: "out", text: "  GROUP BY region ORDER BY total DESC;", tone: "default" },
    { kind: "rule" },
    { kind: "info", text: "Executing on warehouse-primary..." },
    { kind: "ok", text: "Plan: Parallel Index Scan, cost=12.48, rows=4" },
    { kind: "ok", text: "Query completed in 43ms" },
  ]

  const rows = [
    { region: "West", total: 1320, pct: 100 },
    { region: "North", total: 1180, pct: 89 },
    { region: "East", total: 1090, pct: 83 },
    { region: "South", total: 940, pct: 71 },
  ]

  return (
    <DemoShell
      title="Intelligent Query Assistant"
      subtitle="Natural-language analytics over structured enterprise data"
      status="live"
      kpis={[
        { label: "Queries / day", value: "12.4k", trend: "up" },
        { label: "Avg latency", value: "43ms", trend: "down", hint: "↓ 78% vs SQL" },
        { label: "Accuracy", value: "97.2%", trend: "up" },
        { label: "Data sources", value: "8", hint: "warehouses" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <AnimatedTerminal lines={lines} height={340} />
        </div>
        <Panel
          title="Results · Q4 sales by region"
          right={<StatusPill label="USD k" tone="muted" />}
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {rows.map((r, i) => (
              <div key={r.region}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-foreground/80">{r.region}</span>
                  <span className="text-sm text-accent font-medium">
                    $<AnimatedNumber value={r.total} />k
                  </span>
                </div>
                <Bar pct={r.pct} tone={i === 0 ? "accent" : "accent"} />
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-accent/10 flex items-center justify-between">
              <span className="text-xs text-foreground/55">Total</span>
              <span className="text-sm text-foreground font-bold">
                $<AnimatedNumber value={4530} />k
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </DemoShell>
  )
}
