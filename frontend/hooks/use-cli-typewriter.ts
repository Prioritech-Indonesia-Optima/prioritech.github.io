"use client"

import { useState, useEffect, useCallback, useRef } from "react"

/**
 * Custom hook for sequential CLI command typing with delays and callbacks.
 * 
 * Provides a typewriter effect for terminal-style interfaces, typing out
 * commands one line at a time with configurable delays between lines.
 * 
 * @param commands - Array of strings to type out sequentially
 * @param onComplete - Callback fired when all commands are typed
 * @param typingSpeed - Delay between each character (ms), default 50
 * @param lineDelay - Delay after each command completes (ms), default 800
 * 
 * @returns Current command text being displayed, current command index, 
 *          and a function to manually advance to next command
 */
export function useCliTypewriter(
  commands: string[],
  onComplete?: () => void,
  typingSpeed: number = 50,
  lineDelay: number = 800
) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const advanceToNext = useCallback(() => {
    if (currentCommandIndex < commands.length - 1) {
      setCurrentCommandIndex(prev => prev + 1)
      setCurrentText("")
      setIsTyping(true)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentCommandIndex, commands.length, onComplete])

  // Initialize effect to start typing
  useEffect(() => {
    // Start typing immediately when command changes
    if (isTyping && currentText === "" && currentCommandIndex < commands.length) {
      const timer = setTimeout(() => {
        setCurrentText(commands[currentCommandIndex][0] || "")
      }, typingSpeed)
      
      return () => clearTimeout(timer)
    }
  }, [currentCommandIndex, isTyping])

  // Type next character effect
  useEffect(() => {
    if (!isTyping) return

    const currentCommand = commands[currentCommandIndex]
    if (!currentCommand || currentText.length >= currentCommand.length) return

    const currentLength = currentText.length
    
    // Type next character
    timeoutRef.current = setTimeout(() => {
      if (currentLength < currentCommand.length) {
        setCurrentText(currentCommand.slice(0, currentLength + 1))
      }
    }, typingSpeed)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentText, currentCommandIndex, commands, isTyping, typingSpeed])

  // Handle command completion
  useEffect(() => {
    if (!isTyping) return
    
    const currentCommand = commands[currentCommandIndex]
    if (!currentCommand || currentText.length < currentCommand.length) return

    // Command complete, wait then advance
    setIsTyping(false)
    timeoutRef.current = setTimeout(() => {
      advanceToNext()
    }, lineDelay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentText, currentCommandIndex, commands, isTyping, lineDelay, advanceToNext])

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setCurrentCommandIndex(0)
    setCurrentText("")
    setIsTyping(true)
  }, [])

  return {
    currentText,
    currentCommandIndex,
    isTyping,
    totalCommands: commands.length,
    reset,
    advanceToNext
  }
}

