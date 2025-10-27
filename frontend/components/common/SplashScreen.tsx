"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingBar } from "./LoadingBar"

const TERMINAL_COMMANDS = [
  "sudo su",
  {
    text: "[sudo] password for user: ",
    static: "[sudo] password for user: ",
    animated: "********"
  },
  "cd /opt/prioritech",
  "./start-program.sh"
]

interface SplashScreenProps {
  /**
   * Callback when splash screen completes and should close
   */
  onComplete: () => void
  
  /**
   * Whether to show the splash screen
   */
  show: boolean
}

/**
 * CLI/terminal splash screen component.
 * 
 * Simulates a boot sequence with typewriter effects, displaying
 * sudo commands and script execution in a terminal interface.
 * Includes loading bar animation and auto-transition after completion.
 * 
 * Features:
 * - Full-screen terminal interface
 * - Sequential command typing with delays
 * - Animated loading bar with percentage
 * - Success message
 * - Smooth fade-out transition
 * 
 * @param onComplete - Callback when animation completes
 * @param show - Whether to display the splash screen
 * 
 * @returns JSX element containing the splash screen
 */
export function SplashScreen({ onComplete, show }: SplashScreenProps) {
  const [showLoading, setShowLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isWaitingForPassword, setIsWaitingForPassword] = useState(false)

  const handleLoadingComplete = () => {
    // Show success message
    setShowSuccess(true)
    
    // After showing success message, start preparing home screen (fade out)
    setTimeout(() => {
      setIsClosing(true)
      
      // Call onComplete to show the prepared home screen after fade
      setTimeout(() => {
        onComplete()
      }, 1000) // 1 second fade out
    }, 2000) // Show success message for 2 seconds before starting fade
  }

  // Reset when component mounts or show changes
  useEffect(() => {
    if (show) {
      setCurrentCommandIndex(0)
      setCurrentText("")
      setIsTyping(true)
      setShowLoading(false)
      setShowSuccess(false)
      setIsClosing(false)
      setIsWaitingForPassword(false)
    }
  }, [show])

  // Typewriter effect
  useEffect(() => {
    if (!show || !isTyping) return

    const currentCommand = TERMINAL_COMMANDS[currentCommandIndex]
    if (!currentCommand) return

    const timer = setTimeout(() => {
      // Check if this is the password command (has static and animated parts)
      const isPasswordCommand = typeof currentCommand === 'object' && currentCommand.static && currentCommand.animated
      
      if (isPasswordCommand) {
        // For password: initialize with static text if empty
        if (currentText === "") {
          setCurrentText(currentCommand.static)
          setIsWaitingForPassword(true)
          // Wait 500ms before starting to type asterisks
          setTimeout(() => {
            setIsWaitingForPassword(false)
          }, 500)
          return
        }
        
        // If still waiting, don't proceed with asterisk typing yet
        if (isWaitingForPassword) {
          return
        }
        
        // Then animate asterisks one by one
        const staticLength = currentCommand.static.length
        const asteriskLength = currentText.length > staticLength ? currentText.length - staticLength : 0
        
        if (asteriskLength < currentCommand.animated.length) {
          // Type next asterisk
          setCurrentText(currentCommand.static + currentCommand.animated.slice(0, asteriskLength + 1))
        } else {
          // All asterisks typed, wait then advance
          setIsTyping(false)
          setTimeout(() => {
            if (currentCommandIndex < TERMINAL_COMMANDS.length - 1) {
              setCurrentCommandIndex(prev => prev + 1)
              setCurrentText("")
              setIsTyping(true)
              setIsWaitingForPassword(false)
            } else {
              setShowLoading(true)
            }
          }, 800)
        }
      } else {
        // Normal command: type character by character
        const targetLength = currentText.length
        const commandText = typeof currentCommand === 'string' ? currentCommand : currentCommand.text || ''
        
        if (targetLength < commandText.length) {
          setCurrentText(prev => {
            const nextLength = prev.length + 1
            return commandText.slice(0, nextLength)
          })
        } else {
          setIsTyping(false)
          setTimeout(() => {
            if (currentCommandIndex < TERMINAL_COMMANDS.length - 1) {
              setCurrentCommandIndex(prev => prev + 1)
              setCurrentText("")
              setIsTyping(true)
            } else {
              setShowLoading(true)
            }
          }, 800)
        }
      }
    }, 30)

    return () => clearTimeout(timer)
  }, [currentText, currentCommandIndex, isTyping, show, isWaitingForPassword])

  if (!show) return null

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 bg-main z-50 flex items-center justify-center font-mono p-6"
        >
          {/* Terminal window container */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Window frame with borders and shadow */}
            <div className="border border-accent/50 bg-main/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden">
              {/* Window title bar */}
              <div className="bg-secondary/10 border-b border-accent/30 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-terminal-error cursor-pointer hover:bg-terminal-error/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-success cursor-pointer hover:bg-terminal-success/80"></div>
                </div>
                <div className="flex-1 text-secondary/60 text-xs font-mono">
                  terminal — 80x24
                </div>
                <div className="text-secondary/40 text-xs font-mono">
                  ● ● ●
                </div>
              </div>
              
              {/* Terminal content area */}
              <div className="px-6 md:px-8 py-6 min-h-[400px] bg-main">

            {/* Commands display area */}
            <div className="space-y-3 min-h-[300px]">
              {/* Show all completed commands */}
              {TERMINAL_COMMANDS.slice(0, currentCommandIndex).map((cmd, idx) => {
                // Handle both string and object commands
                const isObject = typeof cmd === 'object'
                const cmdText = isObject ? (cmd.static + cmd.animated) : cmd
                const prompt = cmdText.startsWith("#") ? "# " : cmdText.startsWith("[") ? "" : "$ "
                const displayText = cmdText.replace(/^[\$\#\[]*/, "")
                
                return (
                  <div key={idx} className="text-secondary text-sm md:text-base">
                    {cmdText.startsWith("[") ? (
                      <span className="text-terminal-error">{cmdText}</span>
                    ) : (
                      <>
                        <span className="text-accent">{prompt}</span>
                        <span>{displayText}</span>
                      </>
                    )}
                  </div>
                )
              })}

              {/* Current typing command - appears immediately with typing effect */}
              {currentCommandIndex < TERMINAL_COMMANDS.length && (() => {
                const cmd = TERMINAL_COMMANDS[currentCommandIndex]
                const isObject = typeof cmd === 'object'
                const cmdText = isObject ? cmd.text : cmd
                const isPasswordCommand = isObject && cmd.static && cmd.animated
                const prompt = cmdText.startsWith("#") ? "# " : cmdText.startsWith("[") ? "" : "$ "
                
                return (
                  <div className="text-secondary text-sm md:text-base">
                    {!cmdText.startsWith("[") && (
                      <span className="text-accent mr-2">{prompt}</span>
                    )}
                    <span className={cmdText.startsWith("[") ? "text-terminal-error" : ""}>
                      {currentText}
                      {isTyping && (
                        <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-cursor-blink" />
                      )}
                    </span>
                  </div>
                )
              })()}

              {/* Loading bar */}
              {showLoading && !isClosing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <LoadingBar
                    duration={3}
                    onComplete={handleLoadingComplete}
                    successMessage="OK"
                  />
                </motion.div>
              )}

              {/* Success message */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-terminal-success text-sm md:text-base mt-4"
                >
                  # System initialized successfully.
                </motion.div>
              )}
            </div>

                {/* Footer hint */}
                {!showLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-secondary/30 text-xs text-center"
                  >
                    Initializing Prioritech systems...
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

