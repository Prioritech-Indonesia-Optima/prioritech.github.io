"use client"

import { useMemo } from "react"
import { useRandomData } from "@/hooks/use-random-data"
import { MarketBreakoutIndicator } from "./visualizations/MarketBreakoutIndicator"

/**
 * Breakout Probability Model demo component.
 * 
 * Displays predictive market breakout indicator showing PST (Predictive Signal Threshold)
 * that signals breakouts BEFORE they occur. PST goes to +1 for upward breakouts or -1
 * for downward breakouts ahead of actual price peaks/bottoms.
 */
export function BreakoutProbabilityDemo() {
  const randomData = useRandomData()
  
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const basePrice = 145.50
    const dataPoints = 30
    
    // Generate price data with eventual breakout
    const priceData: Array<{ time: string; price: number }> = []
    const indicatorData: Array<{ time: string; pst: number }> = []
    
    let currentPrice = basePrice
    const breakoutType = Math.random() > 0.5 ? "bottom" : "peak" // "bottom" = price bottoms then goes up, "peak" = price peaks then goes down
    let breakoutPoint = Math.floor(dataPoints * 0.7) // Breakout happens at 70% of data
    
    for (let i = 0; i < dataPoints; i++) {
      const time = `T${i + 1}`
      
      // Price movement - build to peak/bottom then breakout
      if (i < breakoutPoint) {
        // Before breakout: move toward peak or bottom
        if (breakoutType === "bottom") {
          // Price declining toward bottom
          const change = -0.02 - Math.random() * 0.03 // -2% to -5%
          currentPrice *= 1 + change
        } else {
          // Price rising toward peak
          const change = 0.02 + Math.random() * 0.03 // +2% to +5%
          currentPrice *= 1 + change
        }
      } else if (i === breakoutPoint) {
        // At breakout point: reverse direction
        if (breakoutType === "bottom") {
          // Hit bottom, now break upward
          currentPrice += Math.abs((Math.random() - 0.5) * 10) + 5
        } else {
          // Hit peak, now break downward
          currentPrice -= Math.abs((Math.random() - 0.5) * 10) + 5
        }
      } else {
        // After breakout: continue in breakout direction
        if (breakoutType === "bottom") {
          // Upward after bottom
          currentPrice += 1 + Math.random() * 3
        } else {
          // Downward after peak
          currentPrice -= 1 + Math.random() * 3
        }
      }
      
      priceData.push({ time, price: Number(currentPrice.toFixed(2)) })
      
      // PST Indicator: Predicts breakout BEFORE it happens
      // PST goes to -1 before price bottoms (breakout down), +1 before price peaks (breakout up)
      let pst = 0
      const predictionStart = breakoutPoint - 5 // PST starts predicting 5 points before
      
      if (i < predictionStart) {
        // Early: neutral, slight noise
        pst = (Math.random() - 0.5) * 0.2 // -0.1 to 0.1
      } else if (i < breakoutPoint) {
        // Before breakout: PST gradually signals
        const progress = (i - predictionStart) / (breakoutPoint - predictionStart) // 0 to 1
        if (breakoutType === "bottom") {
          // Price heading to bottom → PST predicts -1 (breakout down to bottom)
          pst = -1 * progress // Gradually move to -1
        } else {
          // Price heading to peak → PST predicts +1 (breakout up to peak)
          pst = 1 * progress // Gradually move to +1
        }
      } else {
        // After breakout: PST maintains signal
        if (breakoutType === "bottom") {
          pst = -1.0 // Was -1 before bottom, stays at -1
        } else {
          pst = 1.0 // Was +1 before peak, stays at +1
        }
      }
      
      indicatorData.push({ time, pst: Number(pst.toFixed(2)) })
    }
    
    return { priceData, indicatorData }
  }, [randomData])

  return (
    <MarketBreakoutIndicator
      priceData={demoData.priceData}
      indicatorData={demoData.indicatorData}
    />
  )
}
