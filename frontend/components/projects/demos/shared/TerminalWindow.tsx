"use client"

import { ReactNode, useEffect, useRef } from "react"

/**
 * TerminalWindow component for project demos.
 * 
 * Provides a complete terminal window wrapper with realistic decorations including
 * header with traffic lights, title bar, line numbers, and scanline effect overlay.
 * 
 * @param children - Content to render inside the terminal
 * @param title - Optional title to display in the terminal header
 * @param className - Additional CSS classes
 * 
 * @returns Terminal-styled container with all decorations
 */
interface TerminalWindowProps {
  children: ReactNode
  title?: string
  className?: string
}

export function TerminalWindow({ children, title = "terminal", className = "" }: TerminalWindowProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom whenever content changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [children])

  return (
    <div className={`terminal-window bg-[#2d2c2c] border border-accent/20 rounded-lg overflow-hidden font-mono h-[500px] flex flex-col ${className}`}>
      {/* Terminal Header with Traffic Lights */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-accent/20 bg-[#2d2c2c] flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-secondary/60 text-xs">{title}</span>
        </div>
        <div className="w-2.5 h-2.5 rounded-full" />
      </div>

      {/* Terminal Content Area - fixed viewport, auto-scroll to bottom */}
      <div className="relative overflow-hidden flex-1">
        <div ref={contentRef} className="absolute inset-0 px-4 pt-4 overflow-y-auto scrollbar-hide" id="terminal-content">
          {/* Content - will auto-scroll to bottom */}
          <div className="relative text-secondary text-sm leading-relaxed pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

