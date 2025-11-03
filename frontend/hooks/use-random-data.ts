"use client"

import { useMemo } from "react"

/**
 * use-random-data hook for generating realistic random data.
 * 
 * Generates realistic random data on mount including IPs, timestamps, metrics,
 * prices, vulnerabilities, and sentences. Uses seeded randomness for consistent loops.
 * 
 * @param seed - Optional seed for reproducible randomness
 * 
 * @returns Object with various data generation functions
 */
export function useRandomData(seed?: number) {
  const random = useMemo(() => {
    let seedValue = seed || Math.random() * 1000000
    const seededRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280
      return seedValue / 233280
    }
    return seededRandom
  }, [seed])

  const generateIPs = (count: number): string[] => {
    const IPs = []
    for (let i = 0; i < count; i++) {
      IPs.push(`192.168.${Math.floor(random() * 255)}.${Math.floor(random() * 255)}`)
    }
    return IPs
  }

  const generatePorts = (count: number): number[] => {
    const commonPorts = [22, 80, 443, 3306, 5432, 8080, 8443]
    const ports = []
    for (let i = 0; i < count; i++) {
      if (random() > 0.3) {
        ports.push(commonPorts[Math.floor(random() * commonPorts.length)])
      } else {
        ports.push(Math.floor(random() * 65535))
      }
    }
    return ports
  }

  const generateTimestamps = (count: number, hoursAgo: number = 24): string[] => {
    const now = Date.now()
    return Array.from({ length: count }, (_, i) => {
      const time = new Date(now - (hoursAgo - i) * 60 * 60 * 1000)
      return time.toISOString().replace('T', ' ').substring(0, 19)
    })
  }

  const generateStockPrices = (count: number, basePrice: number = 100): number[] => {
    let price = basePrice
    return Array.from({ length: count }, () => {
      const change = (random() - 0.5) * 2 // -1 to 1
      price *= 1 + change * 0.06 // ±6% volatility (increased from 2%)
      return Number(price.toFixed(2))
    })
  }

  const generateMetrics = (count: number, min: number = 0, max: number = 100): number[] => {
    return Array.from({ length: count }, () => 
      Number((min + random() * (max - min)).toFixed(2))
    )
  }

  const generateVulnerabilities = (count: number): Array<{ cve: string; severity: string; score: number }> => {
    const severities = ["HIGH", "MEDIUM", "LOW", "CRITICAL"]
    return Array.from({ length: count }, () => ({
      cve: `CVE-2024-${Math.floor(1000 + random() * 9000)}`,
      severity: severities[Math.floor(random() * severities.length)],
      score: Number((3 + random() * 7).toFixed(1)) // 3.0 to 10.0
    }))
  }

  const generateSentences = (count: number, topic: string): string[] => {
    const templates = {
      sales: [
        "Sales increased by {percent}% in Q4",
        "Top performing product category: {category}",
        "Revenue per customer: ${amount}",
        "{count} new customers acquired this month"
      ],
      technical: [
        "System throughput: {value} req/s",
        "Average latency: {ms}ms",
        "Cache hit rate: {percent}%",
        "Memory usage: {percent}%"
      ],
      generic: [
        "Processing {item}...",
        "Analyzing {count} records",
        "Estimated completion: {time}",
        "Status: {status}"
      ]
    }

    const selectedTemplates = templates[topic as keyof typeof templates] || templates.generic
    
    return Array.from({ length: count }, () => {
      let template = selectedTemplates[Math.floor(random() * selectedTemplates.length)]
      template = template.replace("{percent}", Math.floor(random() * 100).toString())
      template = template.replace("{ms}", Math.floor(random() * 1000).toString())
      template = template.replace("{value}", Math.floor(random() * 10000).toString())
      template = template.replace("{amount}", Math.floor(random() * 500).toString())
      template = template.replace("{count}", Math.floor(random() * 1000).toString())
      template = template.replace("{time}", `${Math.floor(random() * 60)}s`)
      template = template.replace("{item}", "data")
      template = template.replace("{category}", "electronics")
      template = template.replace("{status}", "operational")
      return template
    })
  }

  const generateCVE = (): string => {
    return `CVE-2024-${Math.floor(1000 + random() * 9000)}`
  }

  const generateConfidence = (): number => {
    return Number((0.6 + random() * 0.4).toFixed(2)) // 0.6 to 1.0
  }

  const generateSimilarityScores = (count: number): number[] => {
    return Array.from({ length: count }, () => 
      Number((0.7 + random() * 0.3).toFixed(2)) // 0.7 to 1.0
    ).sort((a, b) => b - a) // Sort descending
  }

  const generateTradeSignals = (count: number): Array<{ signal: string; probability: number }> => {
    const signals = ["BUY", "SELL", "HOLD"]
    return Array.from({ length: count }, () => ({
      signal: signals[Math.floor(random() * signals.length)],
      probability: Number((50 + random() * 50).toFixed(1)) // 50% to 100%
    }))
  }

  const generateObjectTypes = (count: number): string[] => {
    const types = ["person", "vehicle", "box", "container", "equipment"]
    return Array.from({ length: count }, () => 
      types[Math.floor(random() * types.length)]
    )
  }

  return {
    generateIPs,
    generatePorts,
    generateTimestamps,
    generateStockPrices,
    generateMetrics,
    generateVulnerabilities,
    generateSentences,
    generateCVE,
    generateConfidence,
    generateSimilarityScores,
    generateTradeSignals,
    generateObjectTypes
  }
}

