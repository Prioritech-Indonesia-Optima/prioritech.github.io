"use client"

import { useMemo } from "react"
import { useRandomData } from "@/hooks/use-random-data"
import { ThreatGraphFirewallFlow } from "./visualizations/ThreatGraphFirewallFlow"

/**
 * Threat Graph Correlator demo component.
 * 
 * Displays firewall threat detection visualization showing firewall as central monitoring system
 * detecting and responding to suspicious network activity. Demonstrates traffic analysis,
 * threat detection, connection termination, and blacklisting capabilities.
 */
export function ThreatGraphDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const IPs = randomData.generateIPs(6)
    
    // Generate network components
    const networkComponents = [
      { id: "external", label: "External Network", type: "external" as const, ip: "203.0.113.0/24" },
      { id: "webserver", label: "Web Server", type: "server" as const, ip: IPs[0] },
      { id: "database", label: "Database", type: "database" as const, ip: IPs[1] },
      { id: "workstation", label: "Workstation", type: "workstation" as const, ip: IPs[2] },
      { id: "auth", label: "Auth System", type: "auth" as const, ip: IPs[3] },
    ]
    
    // Generate traffic sequence with mix of normal, suspicious, and blocked traffic
    const trafficSequence = [
      // Normal incoming traffic - allowed
      {
        source: "external",
        target: "webserver",
        type: "incoming" as const,
        status: "normal" as const,
      },
      // Normal internal traffic
      {
        source: "webserver",
        target: "database",
        type: "internal" as const,
        status: "normal" as const,
      },
      // Suspicious incoming traffic - monitored
      {
        source: "external",
        target: "webserver",
        type: "incoming" as const,
        status: "suspicious" as const,
        threatLevel: 6,
      },
      // Normal outgoing traffic
      {
        source: "workstation",
        target: "external",
        type: "outgoing" as const,
        status: "normal" as const,
      },
      // Blocked incoming traffic - terminated and blacklisted
      {
        source: "external",
        target: "database",
        type: "incoming" as const,
        status: "blocked" as const,
        threatLevel: 9,
        reason: "Unauthorized access attempt",
      },
      // Normal internal traffic
      {
        source: "workstation",
        target: "auth",
        type: "internal" as const,
        status: "normal" as const,
      },
      // Suspicious outgoing traffic
      {
        source: "workstation",
        target: "external",
        type: "outgoing" as const,
        status: "suspicious" as const,
        threatLevel: 5,
      },
      // Blocked incoming traffic - high threat
      {
        source: "external",
        target: "auth",
        type: "incoming" as const,
        status: "blocked" as const,
        threatLevel: 10,
        reason: "Brute force attack detected",
      },
      // Normal internal traffic
      {
        source: "auth",
        target: "database",
        type: "internal" as const,
        status: "normal" as const,
      },
      // Final blocked attempt
      {
        source: "external",
        target: "webserver",
        type: "incoming" as const,
        status: "blocked" as const,
        threatLevel: 8,
        reason: "Known malicious IP pattern",
      },
    ]
    
    return { networkComponents, trafficSequence }
  }, [randomData])

  return (
    <ThreatGraphFirewallFlow
      networkComponents={demoData.networkComponents}
      trafficSequence={demoData.trafficSequence}
    />
  )
}
