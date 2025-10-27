"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"
import { useRandomData } from "@/hooks/use-random-data"

/**
 * Edge-Vision Analytics demo component.
 * 
 * Simulates camera initialization, frame processing pipeline, object detection,
 * and performance metrics using unified fade-in animation with pre-computed data.
 */
export function EdgeVisionDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const objects = randomData.generateObjectTypes(3)
    const confidences = objects.map(() => 0.75 + Math.random() * 0.25)
    
    return { objects, confidences }
  }, [randomData])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Edge Vision Analytics System", color: "text-accent", instant: true },
    { prefix: ">", text: "Initializing camera...", color: "text-info", instant: true },
    { text: "Resolution: 1920x1080" },
    { text: "FPS: 30" },
    { prefix: ">", text: "Calibrating model...", color: "text-info", instant: true },
    { text: "Model: YOLOv8-Edge" },
    { text: "Detections: 3 classes" },
    { prefix: ">", text: "Processing frame #247...", color: "text-info", instant: true },
    { text: "Inference: 32ms" },
    { text: "Preprocessing: 8ms" },
    { text: "Total latency: 40ms" },
    { prefix: "✓", text: "Objects detected:", color: "text-green-500", instant: true },
    ...demoData.objects.map((obj, i) => ({ 
      text: `[${demoData.confidences[i].toFixed(2)}] ${obj.toUpperCase()}` 
    })),
    { prefix: ">", text: "Performance Metrics:", color: "text-info", instant: true },
    { text: "FPS: 25 (target: 30)" },
    { text: "Latency: 40ms avg" },
    { text: "GPU Usage: 78%" },
    { text: "Decision: Quality control PASS" }
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="edge-vision-analytics">
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
