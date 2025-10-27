"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"
import { useRandomData } from "@/hooks/use-random-data"

/**
 * Breakout Probability Model demo component.
 * 
 * Simulates real-time market data streaming, signal detection, probability
 * calculation, risk analysis, and trade recommendations using unified fade-in animation.
 */
export function BreakoutProbabilityDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const price = 145.50 + Math.random() * 10 - 5
    const probability = 60 + Math.random() * 30
    const signals = randomData.generateTradeSignals(3)
    
    return { price, probability, signals }
  }, [randomData])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Breakout Probability Model", color: "text-accent", instant: true },
    { prefix: ">", text: "Real-time market data: AAPL", color: "text-info", instant: true },
    { text: `Current price: $${demoData.price.toFixed(2)}` },
    { prefix: ">", text: "Detecting signals...", color: "text-info", instant: true },
    { text: "Support level: $142.80" },
    { text: "Resistance level: $148.20" },
    { text: "Current position: 87% towards resistance" },
    { prefix: ">", text: "Calculating breakout probability...", color: "text-info", instant: true },
    { color: "text-accent", text: `Breakout probability: ${demoData.probability.toFixed(1)}%`, instant: true },
    { text: "Signal strength: STRONG" },
    { prefix: "!", text: "Risk Analysis:", color: "text-yellow-500", instant: true },
    { text: "Position sizing: 100 shares" },
    { text: "Stop loss: $143.50 (-1.4%)" },
    { text: "Take profit: $149.80 (+3.0%)" },
    { text: "Risk/Reward: 1:2.1" },
    { prefix: "✓", text: "Trade Recommendation:", color: "text-green-500", instant: true },
    { text: `Signal: ${demoData.signals[0].signal}` },
    { text: `Confidence: ${demoData.signals[0].probability}%` },
    { text: `Entry: $${demoData.price.toFixed(2)}` },
    { text: "Win rate: 68% (backtested)" }
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="breakout-probability">
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
