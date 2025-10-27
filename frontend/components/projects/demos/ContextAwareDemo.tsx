"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"
import { useRandomData } from "@/hooks/use-random-data"

/**
 * Context-Aware Data Engine demo component.
 * 
 * Simulates RAG pipeline with document ingestion, vector embeddings,
 * semantic search, and feedback loops using unified fade-in animation.
 */
export function ContextAwareDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const similarities = randomData.generateSimilarityScores(5)
    return { similarities }
  }, [randomData])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Context-Aware Data Engine", color: "text-accent", instant: true },
    { prefix: "$", text: "Document Ingestion", color: "text-accent", instant: true },
    { prefix: "✓", text: "Ingested 5 documents", color: "text-green-500", instant: true },
    { prefix: ">", text: "Generating vector embeddings...", color: "text-info", instant: true },
    { text: "Dimensions: 768" },
    { text: "Embeddings: 5/5 complete" },
    { prefix: "$", text: "User Query: How to set up authentication?", color: "text-accent", instant: true },
    { prefix: ">", text: "Performing semantic search...", color: "text-info", instant: true },
    { prefix: "✓", text: "Top 3 results:", color: "text-green-500", instant: true },
    { text: `[${demoData.similarities[0]}] Technical documentation: API endpoints` },
    { text: `[${demoData.similarities[1]}] User manual: Configuration and troubleshooting` },
    { text: `[${demoData.similarities[2]}] Release notes: Version 2.1.0 features` },
    { prefix: ">", text: "Updating model based on user feedback...", color: "text-info", instant: true },
    { text: "Relevance score improved: 0.72 → 0.85" }
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="context-aware-engine">
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
