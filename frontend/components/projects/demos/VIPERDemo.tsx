"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"
import { useRandomData } from "@/hooks/use-random-data"

/**
 * VIPER (Virtual Penetration Framework) demo component.
 * 
 * Simulates network discovery, vulnerability analysis, and exploit execution
 * using unified fade-in animation with pre-computed data.
 */
export function VIPERDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const IPs = randomData.generateIPs(5)
    const vulns = randomData.generateVulnerabilities(8)
    const ports = randomData.generatePorts(8)
    
    return { IPs, vulns, ports }
  }, [randomData])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "VIPER v2.0 - Automated Penetration Framework", color: "text-accent", instant: true },
    { prefix: ">", text: "Scanning network: 192.168.1.0/24", color: "text-info", instant: true },
    { prefix: "✓", text: "Discovered 5 live hosts:", color: "text-green-500", instant: true },
    { text: `  → ${demoData.IPs[0]}` },
    { text: `  → ${demoData.IPs[1]}` },
    { text: `  → ${demoData.IPs[2]}` },
    { prefix: ">", text: "Enumerating services...", color: "text-info", instant: true },
    { text: `  SSH (22) on ${demoData.IPs[0]}` },
    { text: `  HTTP (80) on ${demoData.IPs[1]}` },
    { text: `  HTTPS (443) on ${demoData.IPs[2]}` },
    { prefix: "!", text: "Vulnerabilities detected:", color: "text-red-500", instant: true },
    { text: `[CRITICAL] ${demoData.vulns[0].cve} (Port ${demoData.ports[0]})` },
    { text: `[HIGH] ${demoData.vulns[1].cve} (Port ${demoData.ports[1]})` },
    { text: `[MEDIUM] ${demoData.vulns[2].cve} (Port ${demoData.ports[2]})` },
    { prefix: ">", text: "Executing exploit...", color: "text-accent", instant: true },
    { text: `Exploit: ${demoData.vulns[0].cve}` },
    { text: `Status: Successfully exploited ${demoData.IPs[0]}` },
    { text: "Access: Remote shell established" },
    { prefix: "✓", text: "Vulnerability: HIGH risk confirmed", color: "text-green-500", instant: true }
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 250,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="viper-pentest">
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
