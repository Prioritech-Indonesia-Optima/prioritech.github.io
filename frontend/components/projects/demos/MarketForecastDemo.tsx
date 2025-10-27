"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"
import { useRandomData } from "@/hooks/use-random-data"

/**
 * Market Forecast Engine demo component.
 * 
 * Simulates historical data loading, feature engineering, model training,
 * prediction generation, and performance metrics using unified fade-in animation.
 */
export function MarketForecastDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const historical = randomData.generateStockPrices(20, 150)
    const forecast = randomData.generateStockPrices(5, historical[historical.length - 1])
    
    return { historical, forecast }
  }, [randomData])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Market Forecast Engine", color: "text-accent", instant: true },
    { prefix: ">", text: "Loading historical data: AAPL", color: "text-info", instant: true },
    { text: "Period: Last 20 trading days" },
    { prefix: ">", text: "Feature engineering...", color: "text-info", instant: true },
    { prefix: "✓", text: "Momentum: -2.3%", color: "text-green-500", instant: true },
    { text: "Volatility: 18.5%" },
    { text: "RSI: 42.8" },
    { text: "MACD: Bullish crossover" },
    { prefix: ">", text: "Training model...", color: "text-info", instant: true },
    { text: "Epoch 1/20 - Loss: 0.0234" },
    { text: "Epoch 10/20 - Loss: 0.0145" },
    { prefix: "✓", text: "Epoch 20/20 - Loss: 0.0089", color: "text-green-500", instant: true },
    { prefix: ">", text: "Generating predictions...", color: "text-info", instant: true },
    { text: "Forecast (next 5 days):", instant: true },
    { text: `Day 1: $${demoData.forecast[0].toFixed(2)} ± $2.50` },
    { text: `Day 2: $${demoData.forecast[1].toFixed(2)} ± $2.80` },
    { text: "Performance Metrics:", instant: true },
    { text: "R² Score: 0.92" },
    { text: "RMSE: 2.34" },
    { text: "Sharpe Ratio: 1.85" },
    { color: "text-green-500", text: "ROI: +38% vs baseline", instant: true }
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="market-forecast">
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
