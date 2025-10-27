"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"

/**
 * Threat Graph Correlator demo component.
 * 
 * Simulates multi-system event ingestion, anomaly detection, graph construction,
 * and threat correlation using unified fade-in animation.
 */
export function ThreatGraphDemo() {
  // Build lines array
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Threat Graph Correlator v1.5", color: "text-accent", instant: true },
    { prefix: ">", text: "Ingesting events from 4 systems...", color: "text-info", instant: true },
    { prefix: "!", text: "Anomaly detected: 5 suspicious events", color: "text-yellow-500", instant: true },
    { text: "Threat score threshold: 70" },
    { text: "[65] Failed login: admin@system.local" },
    { text: "[78] Multiple port scans detected from external IP" },
    { text: "[92] Privilege escalation attempt on database server" },
    { text: "[85] Unusual data exfiltration pattern detected" },
    { prefix: ">", text: "Building threat graph...", color: "text-info", instant: true },
    { text: "Nodes: 5 (Firewall, IDS, Database, Web Server, Auth)" },
    { text: "Edges: 8 relationships identified" },
    { prefix: ">", text: "Correlating events...", color: "text-info", instant: true },
    { text: "Linked 5 suspicious events" },
    { text: "Threat chain detected: Reconnaissance → Intrusion → Exfiltration" },
    { prefix: "✓", text: "Threat graph visualization:", color: "text-green-500", instant: true },
    { text: "  A (Firewall) --- 75% ---> B (Database)" },
    { text: "  C (IDS) -- 82% --> E (Auth Log)" },
    { text: "Overall threat level: CRITICAL (Score: 92)" },
    { text: "Action: Alert security team immediately" }
  ], [])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="threat-graph-correlator">
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
