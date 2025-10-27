"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"
import { useRandomData } from "@/hooks/use-random-data"

/**
 * Intelligent Query Assistant demo component.
 * 
 * Simulates natural language query processing with SQL generation and results display.
 * Uses unified fade-in animation system with pre-computed data.
 */
export function IntelligentQueryDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const sampleQueries = [
      "Show me sales by region for last quarter",
      "What are the top 10 customers by revenue?",
      "Analyze inventory levels for electronics category"
    ]
    
    const sampleSQL = [
      "SELECT region, SUM(amount) as sales FROM orders WHERE date >= NOW() - INTERVAL '3 months' GROUP BY region;",
      "SELECT customer_name, SUM(total) as revenue FROM orders GROUP BY customer_name ORDER BY revenue DESC LIMIT 10;",
      "SELECT category, SUM(quantity) as stock FROM inventory WHERE category = 'electronics' GROUP BY category;"
    ]
    
    const sampleResults = [
      [["North", "$1.2M"], ["South", "$950K"], ["East", "$1.1M"], ["West", "$1.3M"]],
      [["Acme Corp", "$450K"], ["TechCo", "$380K"], ["Global Inc", "$320K"]],
      [["electronics", "12,450 units"]]
    ]
    
    const index = Math.floor(Math.random() * sampleQueries.length)
    
    return {
      query: sampleQueries[index],
      sql: sampleSQL[index],
      results: sampleResults[index]
    }
  }, [])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Intelligent Query Assistant", color: "text-accent", instant: true },
    { prefix: "$", text: "User Query:", color: "text-accent", instant: true },
    { text: demoData.query },
    { prefix: ">", text: "Generated SQL:", color: "text-green-500", instant: true },
    { color: "text-secondary/80", text: demoData.sql },
    { prefix: ">", text: "Executing query...", color: "text-info", instant: true },
    { text: "Query plan: Index Scan (cost=0.42..12.48 rows=100)" },
    { text: `Rows matched: ${demoData.results.length}` },
    { prefix: "✓", text: "Query completed in 45ms", color: "text-green-500", instant: true },
    { text: "Results:", instant: true },
    ...demoData.results.map(row => ({
      text: `${row[0]}: ${row[1]}`
    }))
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="intelligent-query-assistant">
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
