"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface LoadingBarProps {
  /**
   * Duration for the progress animation in seconds
   */
  duration?: number
  
  /**
   * Callback when progress reaches 100%
   */
  onComplete?: () => void
  
  /**
   * Optional label text shown above the bar
   */
  label?: string
  
  /**
   * Success message shown when complete
   */
  successMessage?: string
}

/**
 * CLI-style loading bar component with animated progress.
 * 
 * Features:
 * - Terminal-style bracket design [========  ]
 * - Animated percentage counter
 * - Success state with color change
 * - Monospace font for terminal aesthetic
 * 
 * @param duration - Animation duration in seconds (default: 3)
 * @param onComplete - Callback when animation completes
 * @param label - Optional text above the bar
 * @param successMessage - Message shown when complete
 * 
 * @returns JSX element containing animated loading bar
 */
export function LoadingBar({
  duration = 3,
  onComplete,
  label = "Initializing systems...",
  successMessage = "System ready"
}: LoadingBarProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // If already complete, stay at 100% and do nothing
    if (isComplete) {
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000
      const newProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(newProgress)

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        // Reached 100% - set complete and STOP animation
        setIsComplete(true)
        setShowSuccess(true)
        if (onComplete) {
          setTimeout(() => onComplete(), 300)
        }
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [duration, onComplete, isComplete])

  // Generate bars (20 total = 5% per bar)
  // Always show all bars when complete to stay at 100%
  const totalBars = 20
  const filledBars = isComplete ? totalBars : Math.floor((progress / 100) * totalBars)
  const emptyBars = totalBars - filledBars

  return (
    <div className="font-mono text-secondary space-y-2">
      {label && (
        <div className="text-sm text-secondary/70 mb-1">
          {label}
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <span className="text-accent text-xs">[</span>
        <div className="flex gap-0.5">
          {Array.from({ length: filledBars }).map((_, i) => (
            <motion.div
              key={`filled-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-1.5 h-3 bg-accent"
            />
          ))}
          {Array.from({ length: emptyBars }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-1.5 h-3 bg-secondary/20"
            />
          ))}
        </div>
        <span className="text-accent text-xs">]</span>
        <span className="text-secondary/60 text-xs ml-1 min-w-[3ch]">
          {isComplete ? 100 : Math.round(progress)}%
        </span>
      </div>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-terminal-success text-sm font-medium"
        >
          [{successMessage}]
        </motion.div>
      )}
    </div>
  )
}

