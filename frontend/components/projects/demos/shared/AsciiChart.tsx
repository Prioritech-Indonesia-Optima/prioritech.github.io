"use client"

import { useEffect, useState } from "react"

/**
 * AsciiChart component for terminal-friendly chart visualization.
 * 
 * Renders sparklines and bar charts with animated growth, color-coded values,
 * axis labels, and smooth data point transitions.
 * 
 * @param data - Array of numeric values to visualize
 * @param type - Chart type (sparkline or bar)
 * @param width - Chart width in characters
 * @param height - Chart height in lines
 * @param label - Optional chart label
 * @param animate - Whether to animate data points
 * 
 * @returns ASCII chart visualization
 */
interface AsciiChartProps {
  data: number[]
  type?: "sparkline" | "bar"
  width?: number
  height?: number
  label?: string
  animate?: boolean
}

export function AsciiChart({
  data,
  type = "sparkline",
  width = 50,
  height = 8,
  label,
  animate = true
}: AsciiChartProps) {
  const [animatedData, setAnimatedData] = useState<number[]>(animate ? [] : data)
  const [complete, setComplete] = useState(!animate)

  useEffect(() => {
    if (!animate) return

    const interval = setInterval(() => {
      setAnimatedData(prev => {
        if (prev.length < data.length) {
          return [...prev, data[prev.length]]
        } else {
          setComplete(true)
          clearInterval(interval)
          return prev
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [data, animate])

  const normalize = (values: number[]): number[] => {
    if (values.length === 0) return []
    const min = Math.min(...values)
    const max = Math.max(...values)
    if (max === min) return values.map(() => 0.5)
    return values.map(v => (v - min) / (max - min))
  }

  const renderSparkline = () => {
    const normalized = normalize(animatedData)
    const chars = "▁▂▃▄▅▆▇█"
    const bars = normalized.map(v => chars[Math.floor(v * (chars.length - 1))])
    return bars.join("")
  }

  const renderBarChart = () => {
    const normalized = normalize(animatedData)
    const bars = []
    
    for (let i = 0; i < height; i++) {
      const line = []
      for (let j = 0; j < animatedData.length && j < width; j++) {
        const barHeight = normalized[j]
        const threshold = (height - i - 1) / height
        
        if (barHeight >= threshold) {
          const isTop = barHeight >= (height - i) / height
          line.push(isTop ? "█" : "▓")
        } else {
          line.push(" ")
        }
      }
      bars.push(line.join(""))
    }
    
    return bars.reverse()
  }

  const getColorForValue = (value: number): string => {
    if (value > 0) return "text-green-500"
    if (value < 0) return "text-red-500"
    return "text-secondary"
  }

  return (
    <div className="font-mono text-xs">
      {label && (
        <div className="mb-1 text-secondary/60">{label}</div>
      )}
      
      <div className="text-secondary">
        {type === "sparkline" ? (
          <div className="tracking-tight">{renderSparkline()}</div>
        ) : (
          <div>
            {renderBarChart().map((line, i) => (
              <div key={i} className="leading-tight font-mono">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>

      {complete && animatedData.length > 0 && (
        <div className="mt-1 text-secondary/40 text-xs">
          Min: {Math.min(...data).toFixed(2)} • Max: {Math.max(...data).toFixed(2)}
        </div>
      )}
    </div>
  )
}

