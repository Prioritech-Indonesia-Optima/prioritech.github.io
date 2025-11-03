"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"

/**
 * MarketBreakoutIndicator component for displaying predictive breakout signals.
 * 
 * Shows market price data with a predictive indicator (PST) that signals breakouts
 * BEFORE they occur. PST goes to +1 for upward breakouts or -1 for downward breakouts
 * ahead of the actual price peak/bottom.
 * 
 * @param priceData - Array of price data points with timestamp and price
 * @param indicatorData - Array of PST indicator values (-1 to +1)
 * @param className - Optional CSS classes
 * 
 * @returns Animated market breakout indicator visualization
 */
interface PricePoint {
  time: string
  price: number
}

interface IndicatorPoint {
  time: string
  pst: number // Predictive Signal Threshold: -1 to +1
}

interface MarketBreakoutIndicatorProps {
  priceData: PricePoint[]
  indicatorData: IndicatorPoint[]
  className?: string
}

export function MarketBreakoutIndicator({
  priceData,
  indicatorData,
  className = "",
}: MarketBreakoutIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedData, setAnimatedData] = useState<Array<{ time: string; price: number | null; pst: number | null }>>([])
  const hasAnimatedRef = useRef(false)
  const initialDataRef = useRef<Array<{ time: string; price: number | null; pst: number | null }>>([])

  // Combine price and indicator data
  const combinedData = priceData.map((pricePoint, i) => ({
    time: pricePoint.time,
    price: pricePoint.price,
    pst: indicatorData[i]?.pst ?? null,
  }))

  // Store initial data on first render
  if (initialDataRef.current.length === 0 && combinedData.length > 0) {
    initialDataRef.current = combinedData
  }

  useEffect(() => {
    if (hasAnimatedRef.current) {
      // If already animated, just set the full data
      setAnimatedData(initialDataRef.current)
      setIsVisible(true)
      return
    }

    setIsVisible(true)
    hasAnimatedRef.current = true
    
    // Animate data points appearing one by one
    const dataToAnimate = initialDataRef.current.length > 0 ? initialDataRef.current : combinedData
    let currentIndex = 0
    const animateInterval = setInterval(() => {
      if (currentIndex < dataToAnimate.length) {
        setAnimatedData(dataToAnimate.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(animateInterval)
      }
    }, 80)

    return () => clearInterval(animateInterval)
  }, []) // Only run once on mount

  const chartConfig = {
    price: {
      label: "Price",
      color: "#d9d9d9", // silver
    },
    pst: {
      label: "PST Indicator",
      color: "#daa520", // gold accent
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono">
        <h3 className="text-accent text-sm font-semibold mb-4 text-center">
          Predictive Breakout Indicator (PST)
        </h3>
        <p className="text-secondary/70 text-xs text-center mb-4">
          PST signals breakouts BEFORE they occur: +1 (upward) or -1 (downward)
        </p>
        
        {/* Price Chart */}
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full mb-4"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#4a4949"
                opacity={0.3}
              />
              <XAxis
                dataKey="time"
                stroke="#a0a0a0"
                fontSize={11}
                tickLine={{ stroke: "#a0a0a0" }}
                axisLine={{ stroke: "#a0a0a0" }}
              />
              <YAxis
                yAxisId="price"
                stroke="#a0a0a0"
                fontSize={11}
                tickLine={{ stroke: "#a0a0a0" }}
                axisLine={{ stroke: "#a0a0a0" }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <YAxis
                yAxisId="pst"
                orientation="right"
                stroke="#daa520"
                fontSize={11}
                tickLine={{ stroke: "#daa520" }}
                axisLine={{ stroke: "#daa520" }}
                domain={[-1.2, 1.2]}
                tickFormatter={(value) => {
                  if (value === 1) return "+1"
                  if (value === -1) return "-1"
                  return ""
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="bg-main border-accent/30 text-secondary font-mono"
                    formatter={(value: number | null, name: string) => {
                      if (name === "price") return [`$${value?.toFixed(2) ?? 'N/A'}`, "Price"]
                      if (name === "pst") {
                        const pstValue = value ?? 0
                        if (pstValue >= 0.8) return [`+1 (Breakout Up Predicted)`, "PST"]
                        if (pstValue <= -0.8) return [`-1 (Breakout Down Predicted)`, "PST"]
                        return [`${pstValue.toFixed(2)}`, "PST"]
                      }
                      return [value, name]
                    }}
                  />
                }
              />
              
              {/* Zero line for PST indicator */}
              <ReferenceLine 
                yAxisId="pst"
                y={0} 
                stroke="#4a4949" 
                strokeDasharray="2 2"
                opacity={0.5}
              />
              
              {/* Price line */}
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="#d9d9d9"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
                isAnimationActive={true}
                animationDuration={500}
                name="Price"
              />
              
              {/* PST Indicator line */}
              <Line
                yAxisId="pst"
                type="monotone"
                dataKey="pst"
                stroke="#daa520"
                strokeWidth={2.5}
                dot={(props: any) => {
                  const pstValue = props.payload?.pst
                  if (pstValue === null) return null
                  // Highlight when PST reaches +1 or -1
                  const isSignal = Math.abs(pstValue) >= 0.8
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r={isSignal ? 5 : 3} 
                      fill={isSignal ? "#daa520" : "#daa52080"}
                      stroke={isSignal ? "#f59e0b" : "none"}
                      strokeWidth={isSignal ? 2 : 0}
                    />
                  )
                }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={500}
                name="PST"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Legend and explanation */}
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-secondary"></div>
              <span className="text-secondary/70">Price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-accent"></div>
              <span className="text-accent/70">PST Indicator</span>
            </div>
          </div>
          <div className="text-center text-secondary/60 italic text-[10px]">
            PST predicts breakouts before price peaks/bottoms occur
          </div>
        </div>
      </div>
    </motion.div>
  )
}
