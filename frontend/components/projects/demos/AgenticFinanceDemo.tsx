"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"

/**
 * Agentic Finance Tracker demo component.
 * 
 * Simulates conversational finance assistant with terminal-style chat,
 * spending analysis, and actionable recommendations using unified fade-in animation.
 */
export function AgenticFinanceDemo() {
  // Build lines array
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Agentic Finance Tracker - Conversational AI", color: "text-accent", instant: true },
    { text: "User: Where is my budget going this month?" },
    { prefix: ">", text: "Analyzing spending patterns...", color: "text-info", instant: true },
    { text: "AI: Top categories: Entertainment (28%), Dining (23%), Shopping (20%)" },
    { text: "User: What can I do to save more?" },
    { prefix: ">", text: "Generating recommendations...", color: "text-info", instant: true },
    { text: "AI: 1) Reduce dining out by 40% → Save $152/month" },
    { text: "    2) Cancel unused subscriptions → Save $65/month" },
    { prefix: "✓", text: "Projected total: $217/month savings, 12% reduction", color: "text-green-500", instant: true }
  ], [])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="agentic-finance-tracker">
      {visibleLines.map((line, i) => (
        <TerminalLine
          key={i}
          text={line.text}
          prefix={line.prefix}
          color={line.color}
          isAnimating={line.isAnimating}
        />
      ))}
      {showCursor && (
        <span className="animate-cursor-blink text-accent">▊</span>
      )}
    </TerminalWindow>
  )
}
