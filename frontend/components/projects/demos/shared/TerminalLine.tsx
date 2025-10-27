"use client"

import { DemoLine } from "@/hooks/use-unified-demo"

/**
 * TerminalLine component for rendering terminal lines with fade-in animation.
 * 
 * Displays text with optional prefix and color styling. Supports fade-in
 * animation via CSS opacity transition controlled by isAnimating prop.
 * 
 * @param text - Text content to display
 * @param prefix - Terminal prefix symbol ($, >, !, ✓)
 * @param color - Text color class
 * @param isAnimating - Whether line is currently animating in
 * 
 * @returns Terminal line with prefix and color, with fade-in animation
 */
interface TerminalLineProps extends DemoLine {
  isAnimating?: boolean
}

export function TerminalLine({
  text,
  prefix = "",
  color = "text-secondary",
  isAnimating = false
}: TerminalLineProps) {
  const getPrefixColor = () => {
    switch (prefix) {
      case "$": return "text-accent"
      case ">": return "text-accent"
      case "!": return "text-red-500"
      case "✓": return "text-green-500"
      default: return ""
    }
  }

  return (
    <div className={`${color} font-mono transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'} ${isAnimating ? 'animate-fade-in' : ''}`}>
      {prefix && (
        <span className={`${getPrefixColor()} font-bold mr-2`}>{prefix}</span>
      )}
      {text}
    </div>
  )
}

