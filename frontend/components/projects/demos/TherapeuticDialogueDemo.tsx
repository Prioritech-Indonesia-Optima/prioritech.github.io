"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"

/**
 * Therapeutic Dialogue AI demo component.
 * 
 * Simulates sensitive chat interface with privacy focus, sentiment analysis,
 * and session summaries using unified fade-in animation.
 */
export function TherapeuticDialogueDemo() {
  // Build lines array
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "✓", text: "Privacy: End-to-end encrypted • Local storage only • HIPAA compliant", color: "text-green-500", instant: true },
    { text: "User (10:15 AM): I've been feeling really overwhelmed with work lately." },
    { text: "Sentiment: stressed" },
    { prefix: ">", text: "AI (10:15 AM): I understand. That sounds difficult. Can you tell me more?", color: "text-info" },
    { text: "Sentiment: positive" },
    { text: "User (10:16 AM): There's just so much pressure and expectations. I feel like I can't keep up." },
    { text: "Sentiment: stressed" },
    { prefix: ">", text: "AI (10:17 AM): It sounds like you're carrying a lot of responsibility.", color: "text-info" },
    { text: "Session Summary:", instant: true },
    { text: "Duration: 12 minutes" },
    { text: "Sentiment: Improved (Stressed → Calm)" },
    { text: "Topics: Work stress, expectations, patterns" },
    { prefix: "✓", text: "Data encrypted and stored locally", color: "text-green-500", instant: true }
  ], [])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="therapeutic-dialogue">
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
