"use client"

import { useState, useEffect, useCallback, useRef } from "react"

/**
 * Unified demo animation system for project demonstrations.
 * 
 * Centralized animation controller that handles line-by-line fade-in animations
 * with pre-computed data, auto-looping, freeze behavior, and speed control.
 * Uses single interval-based timing for predictable, reliable animations.
 * 
 * @param lines - Array of lines to animate, pre-computed before hook is called
 * @param options - Animation configuration options
 * 
 * @returns visibleLines with animation state, showCursor indicator, and controls
 */
export interface DemoLine {
  prefix?: "$" | ">" | "!" | "✓" | ""
  text: string
  color?: string
  instant?: boolean
  delay?: number
}

/**
 * Calculate semantic delay based on line prefix and content.
 * 
 * Provides realistic variable timing (100ms-2000ms) based on what's happening:
 * - Prompts ($): instant (100-300ms)
 * - Processing (>): slow (800-2000ms) when doing work
 * - Headers (>): fast (150-400ms) otherwise
 * - Success (✓): medium-fast (200-500ms)
 * - Warnings (!): medium (300-700ms)
 * - Data: fast (150-400ms)
 */
function calculateSemanticDelay(line: DemoLine): number {
  // If line has custom delay, use it
  if (line.delay !== undefined) return line.delay
  
  // If instant, return 0
  if (line.instant) return 0
  
  // Semantic calculation based on prefix and content
  const text = line.text.toLowerCase()
  let min: number, max: number
  
  switch (line.prefix) {
    case "$":
      // Prompts - readable but not too slow
      min = 500
      max = 800
      break
      
    case ">":
      // Check if processing/working
      if (text.includes("processing") || 
          text.includes("analyzing") || 
          text.includes("executing") ||
          text.includes("generating") ||
          text.includes("training") ||
          text.includes("loading") ||
          text.includes("scanning") ||
          text.includes("building") ||
          text.includes("transcribing") ||
          text.includes("calculating") ||
          text.includes("correlating")) {
        // Slow processing - give good time to read
        min = 2000
        max = 3000
      } else {
        // Headers/status - comfortable reading pace
        min = 600
        max = 1000
      }
      break
      
    case "✓":
      // Success - medium, attention but readable
      min = 700
      max = 1200
      break
      
    case "!":
      // Warnings/errors - needs attention and readability
      min = 900
      max = 1500
      break
      
    default:
      // Plain text data - comfortable reading pace
      min = 600
      max = 1000
  }
  
  // Calculate base delay
  const baseDelay = min + Math.random() * (max - min)
  
  // Add ±10% variance for natural feel
  const variance = baseDelay * 0.1 * (Math.random() * 2 - 1)
  
  return Math.round(baseDelay + variance)
}

interface UseUnifiedDemoOptions {
  lineDelay?: number
  shouldLoop?: boolean
  freezeDuration?: number
  slowdownMultiplier?: number
  maxVisibleLines?: number
}

export function useUnifiedDemo(
  lines: DemoLine[],
  {
    lineDelay = 400,
    shouldLoop = true,
    freezeDuration = 5000,
    slowdownMultiplier = 2,
    maxVisibleLines = 15  // Reduced from 18 for better fit
  }: UseUnifiedDemoOptions = {}
) {
  const [visibleLineCount, setVisibleLineCount] = useState(0)
  const [loopCount, setLoopCount] = useState(0)
  const [isFreezing, setIsFreezing] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout>()
  const freezeTimeoutRef = useRef<NodeJS.Timeout>()
  
  // Show cursor when animating current line
  const showCursor = isAnimating && visibleLineCount < lines.length
  
  // Get visible lines including the one currently animating
  // Auto-scroll: show only the last maxVisibleLines
  const totalLinesToShow = visibleLineCount + (isAnimating ? 1 : 0)
  const startIndex = Math.max(0, totalLinesToShow - maxVisibleLines)
  const visibleLines = lines.slice(startIndex, totalLinesToShow).map((line, index) => ({
    ...line,
    prefix: line.prefix || "",
    color: line.color || "text-secondary",
    isAnimating: (startIndex + index) === visibleLineCount && isAnimating
  }))
  
  // Main animation effect
  useEffect(() => {
    if (lines.length === 0) return
    
    const animateNextLine = () => {
      if (isFreezing) return
      
      const currentLine = lines[visibleLineCount]
      if (!currentLine) {
        // All lines complete
        if (shouldLoop) {
          setIsFreezing(true)
          setIsAnimating(false)
          
          freezeTimeoutRef.current = setTimeout(() => {
            setLoopCount(prev => prev + 1)
            setVisibleLineCount(0)
            setIsFreezing(false)
          }, freezeDuration)
        }
        return
      }
      
      // Calculate semantic delay for this line
      const lineDelay = calculateSemanticDelay(currentLine)
      
      if (lineDelay === 0) {
        // Instant lines (headers) skip animation delay
        setIsAnimating(false)
        setVisibleLineCount(prev => prev + 1)
      } else {
        setIsAnimating(true)
        
        // Trigger fade-in animation with calculated delay
        const timer = setTimeout(() => {
          setIsAnimating(false)
          setVisibleLineCount(prev => prev + 1)
        }, lineDelay)
        
        intervalRef.current = timer
      }
    }
    
    animateNextLine()
    
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [visibleLineCount, isFreezing, shouldLoop, lines, freezeDuration])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
      if (freezeTimeoutRef.current) clearTimeout(freezeTimeoutRef.current)
    }
  }, [])
  
  // Reset function
  const reset = useCallback(() => {
    setVisibleLineCount(0)
    setLoopCount(0)
    setIsFreezing(false)
    setIsAnimating(false)
  }, [])
  
  return {
    visibleLines,
    showCursor,
    currentLineIndex: visibleLineCount,
    isComplete: visibleLineCount >= lines.length,
    loopCount,
    isFreezing,
    reset
  }
}

