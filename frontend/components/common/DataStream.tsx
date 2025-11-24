"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

/**
 * Data Stream Component
 * 
 * Creates a scrolling binary/hexadecimal code effect in the background.
 * Simulates data flowing past, adding tech aesthetic.
 * 
 * Features:
 * - Scrolling binary/hex code
 * - Monospace font for tech feel
 * - Low opacity for subtle background effect
 * - Continuous loop animation
 * 
 * @param className - Optional CSS classes to apply
 * @param speed - Scroll speed multiplier (default: 1)
 * @param useHex - Whether to use hex instead of binary (default: false)
 * 
 * @returns JSX element containing the data stream
 */
export function DataStream({
  className = "",
  speed = 1,
  useHex = false,
}: {
  className?: string
  speed?: number
  useHex?: boolean
}) {
  const [streams, setStreams] = useState<Array<{ id: number; y: number; data: string[] }>>([])

  useEffect(() => {
    // Generate random binary or hex data
    const generateData = (length: number): string[] => {
      const data = []
      const chars = useHex ? "0123456789ABCDEF" : "01"
      
      for (let i = 0; i < length; i++) {
        data.push(chars[Math.floor(Math.random() * chars.length)])
      }
      return data
    }

    // Initialize streams
    const streamCount = 8
    const newStreams = []
    for (let i = 0; i < streamCount; i++) {
      newStreams.push({
        id: i,
        y: (i / streamCount) * 100,
        data: generateData(20),
      })
    }
    setStreams(newStreams)

    // Update data periodically
    const interval = setInterval(() => {
      setStreams((prev) =>
        prev.map((stream) => ({
          ...stream,
          data: generateData(20),
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [useHex])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute font-mono text-xs whitespace-nowrap"
          style={{
            left: "0%",
            top: `${stream.y}%`,
            color: "#daa520",
            opacity: 0.15,
            fontSize: "10px",
          }}
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            duration: 10 / speed,
            repeat: Infinity,
            ease: "linear",
            delay: stream.id * 0.2,
          }}
        >
          {stream.data.join(" ")}
        </motion.div>
      ))}
    </div>
  )
}

