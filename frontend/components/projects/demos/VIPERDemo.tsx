"use client"

import { useMemo } from "react"
import { useRandomData } from "@/hooks/use-random-data"
import { VIPERAttackFlow } from "./visualizations/VIPERAttackFlow"

/**
 * VIPER (Virtual Penetration Framework) demo component.
 * 
 * Displays VIPER attack flow visualization showing VIPER as a central attacker
 * performing different attack methods against multiple targets (network, server, client, etc.).
 * Demonstrates automated penetration testing with various attack vectors.
 */
export function VIPERDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const IPs = randomData.generateIPs(5)
    
    // Generate target nodes
    const targets = [
      { id: "target1", label: IPs[0], type: "server" as const },
      { id: "target2", label: IPs[1], type: "database" as const },
      { id: "target3", label: IPs[2] || "192.168.1.100", type: "workstation" as const },
      { id: "target4", label: IPs[3] || "192.168.1.101", type: "firewall" as const },
      { id: "target5", label: "Network", type: "network" as const },
    ]
    
    // Generate sequential attack sequence with narrative flow
    // Each target gets attempts - some fail first, then succeed with different method
    const attackSequence = [
      // Target 1: Server - succeeds first try
      {
        target: "target1",
        method: "Port Scan",
        status: "scanning" as const,
      },
      {
        target: "target1",
        method: "Port Scan",
        status: "exploiting" as const,
      },
      {
        target: "target1",
        method: "Port Scan",
        status: "compromised" as const,
      },
      // Target 2: Database - fails first attempt, succeeds with alternative
      {
        target: "target2",
        method: "SQL Injection",
        status: "scanning" as const,
      },
      {
        target: "target2",
        method: "SQL Injection",
        status: "exploiting" as const,
      },
      {
        target: "target2",
        method: "SQL Injection",
        status: "failed" as const,
        reason: "WAF blocked",
      },
      {
        target: "target2",
        method: "Exploit CVE-2024-1234",
        status: "scanning" as const,
      },
      {
        target: "target2",
        method: "Exploit CVE-2024-1234",
        status: "compromised" as const,
      },
      // Target 3: Workstation - brute force succeeds
      {
        target: "target3",
        method: "Brute Force",
        status: "scanning" as const,
      },
      {
        target: "target3",
        method: "Brute Force",
        status: "exploiting" as const,
      },
      {
        target: "target3",
        method: "Brute Force",
        status: "compromised" as const,
      },
      // Target 4: Firewall - fails first, succeeds with exploit
      {
        target: "target4",
        method: "Port Scan",
        status: "scanning" as const,
      },
      {
        target: "target4",
        method: "Port Scan",
        status: "failed" as const,
        reason: "Firewall filtered",
      },
      {
        target: "target4",
        method: "Exploit CVE-2024-5678",
        status: "scanning" as const,
      },
      {
        target: "target4",
        method: "Exploit CVE-2024-5678",
        status: "exploiting" as const,
      },
      {
        target: "target4",
        method: "Exploit CVE-2024-5678",
        status: "compromised" as const,
      },
      // Target 5: Network - phishing attempt
      {
        target: "target5",
        method: "Phishing",
        status: "scanning" as const,
      },
      {
        target: "target5",
        method: "Phishing",
        status: "exploiting" as const,
      },
      {
        target: "target5",
        method: "Phishing",
        status: "compromised" as const,
      },
    ]
    
    return { targets, attackSequence }
  }, [randomData])

  return (
    <VIPERAttackFlow
      targets={demoData.targets}
      attackSequence={demoData.attackSequence}
    />
  )
}
