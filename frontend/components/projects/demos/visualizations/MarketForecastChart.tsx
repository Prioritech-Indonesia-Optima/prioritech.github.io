"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

/**
 * MarketForecastChart component for displaying market forecast predictions.
 * 
 * Animated line chart showing historical price data and forecast predictions.
 * Uses recharts LineChart with framer-motion animations for smooth entrance.
 * Styled with Prioritech theme colors (gold accent, silver secondary, graphite main).
 * 
 * @param historicalData - Array of historical price data points
 * @param forecastData - Array of forecast price data points  
 * @param className - Optional CSS classes
 * 
 * @returns Animated line chart visualization
 */
interface MarketForecastChartProps {
  historicalData: { day: string; price: number }[]
  forecastData: { day: string; price: number }[]
  className?: string
}

export function MarketForecastChart({
  historicalData,
  forecastData,
  className = "",
}: MarketForecastChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedData, setAnimatedData] = useState<Array<{ day: string; historical: number | null; forecast: number | null }>>([])
  const hasAnimatedRef = useRef(false)
  const initialDataRef = useRef<Array<{ day: string; historical: number | null; forecast: number | null }>>([])

  // Combine historical and forecast data with nulls to separate lines
  const combinedData = [
    ...historicalData.map(d => ({ ...d, historical: d.price, forecast: null })),
    ...forecastData.map(d => ({ ...d, historical: null, forecast: d.price }))
  ]

  // Store initial data on first render
  if (initialDataRef.current.length === 0 && combinedData.length > 0) {
    initialDataRef.current = combinedData
  }

  useEffect(() => {
    if (hasAnimatedRef.current) {
      // If already animated, just set the full data (use initial data to prevent re-animation)
      setAnimatedData(initialDataRef.current)
      setIsVisible(true)
      return
    }

    setIsVisible(true)
    hasAnimatedRef.current = true
    
    // Animate data points appearing one by one using initial data
    const dataToAnimate = initialDataRef.current.length > 0 ? initialDataRef.current : combinedData
    let currentIndex = 0
    const animateInterval = setInterval(() => {
      if (currentIndex < dataToAnimate.length) {
        setAnimatedData(dataToAnimate.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(animateInterval)
      }
    }, 100)

    return () => clearInterval(animateInterval)
  }, []) // Only run once on mount

  const chartConfig = {
    historical: {
      label: "Historical",
      color: "#d9d9d9", // silver
    },
    forecast: {
      label: "Forecast",
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
      <div className="bg-main/50 border border-accent/20 rounded-lg p-4 font-mono">
        <h3 className="text-accent text-sm font-semibold mb-4">Price Forecast Visualization</h3>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#4a4949"
                opacity={0.3}
              />
              <XAxis
                dataKey="day"
                stroke="#a0a0a0"
                fontSize={12}
                tickLine={{ stroke: "#a0a0a0" }}
                axisLine={{ stroke: "#a0a0a0" }}
              />
              <YAxis
                stroke="#a0a0a0"
                fontSize={12}
                tickLine={{ stroke: "#a0a0a0" }}
                axisLine={{ stroke: "#a0a0a0" }}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="bg-main border-accent/30 text-secondary font-mono"
                    formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
                  />
                }
              />
              {/* Historical line */}
              <Line
                type="monotone"
                dataKey="historical"
                stroke="#d9d9d9"
                strokeWidth={2}
                dot={{ fill: "#d9d9d9", r: 3 }}
                activeDot={{ r: 5 }}
                connectNulls={false}
                isAnimationActive={true}
                animationDuration={500}
                name="Historical"
              />
              {/* Forecast line (dashed) */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#daa520"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#daa520", r: 4 }}
                activeDot={{ r: 5 }}
                connectNulls={false}
                isAnimationActive={true}
                animationDuration={500}
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-secondary"></div>
            <span className="text-secondary/70">Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 border-dashed border-t border-accent"></div>
            <span className="text-accent/70">Forecast</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
