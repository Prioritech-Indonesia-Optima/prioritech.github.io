"use client"

import { useEffect, useState, useMemo, useRef, useCallback, memo } from "react"
import { motion } from "framer-motion"

/**
 * ASCII art logo data for Prioritech.
 * 
 * Contains the complete ASCII representation of the Prioritech logo,
 * split into lines for progressive animation rendering.
 */
const ASCII_ART = [
  "           -                                                                                        ",
  "-         -                                                                                         ",
  "   --------                                                                                         ",
  "     ------                                                                                         ",
  "     --------                                                                                       ",
  "     ----   -----    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%            ",
  "     -          ------     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%       ",
  "                   --------    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%     ",
  "               %%%    ---------     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   ",
  "               %%%%%%%   ----------     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ",
  "               %%%%%%%%%%    ----------     %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ",
  "                                ----------                                             %%%%%%%%%%%% ",
  "                                   -----------                                           %%%%%%%%%%%",
  "                                      -----------                                        %%%%%%%%%%%",
  "                                         -----------                                     %%%%%%%%%%%",
  "                                            ----------                                  %%%%%%%%%%%%",
  "                                              -----------                            %%%%%%%%%%%%%% ",
  "                                %%%%%%%%%%%%%%   ----------   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  ",
  "                                %%%%%%%%%%%%%%%%   ----------   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%   ",
  "                                %%%%%%%%%%%%%%%%%%   ----------   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%    ",
  "                                %%%%%%%%%%%%%%%%%%%%   ----------   %%%%%%%%%%%%%%%%%%%%%%%%%%      ",
  "                                %%%%%%%%%%%%%%%%%%%%%%   ---------   %%%%%%%%%%%%%%%%%%%%%%         ",
  "                                %%%%%%%%%%                ----------                                ",
  "                                %%%%%%%%%%                 ----------                               ",
  "                                %%%%%%%%%%      %%%%%%%%%%  ----------  %%%%%%%%%%%%%%%%%           ",
  "                                %%%%%%%%%%      %%%%%%%%%%%  ----------  %%%%%%%%%%%%%%%%           ",
  "                                %%%%%%%%%%      %%%%%%%%%%%%  ----------  %%%%%%%%%%%%%%%           ",
  "                                %%%%%%%%%%      %%%%%%%%%%%%   ----------  %%%%%%%%%%%%%%           ",
  "                                %%%%%%%%%%      %%%%%%%%%%%%%  ----------   %%%%%%%%%%%%%            ",
  "                                %%%%%%%%%%      %%%%%%%%%%%%%   ----------  %%%%%%%%%%%%%            ",
  "                                                                ----------                          ",
  "                                                                -----------                         ",
  "                                                                -----------                         ",
  "                                                                 ----------                         ",
  "                                                                 ----------                         ",
  "                                                                 ----------                         ",
  "                                                                 ----------                         ",
  "                                                                 ----------                         ",
  "                                                                 ----------                         ",
  "                                                                 ----------                         ",
  "                                                                 ----------                         ",
]

/**
 * Numeric character pool for random shifting effect.
 * 
 * Used to create streaming random numeric characters (0-9)
 * that smoothly shift and morph into the ASCII logo.
 */
const NUMERIC_CHARS = "0123456789"

/**
 * Character position interface for animation tracking.
 * 
 * Tracks the position of each character in the ASCII art
 * for hex stream animation.
 */
interface CharPosition {
  lineIndex: number
  charIndex: number
  char: string
}

/**
 * Props for AnimatedAsciiLogo component.
 */
interface AnimatedAsciiLogoProps {
  /**
   * Callback when ASCII animation completes
   */
  onComplete: () => void
  
  /**
   * Whether the animation is active
   */
  isActive: boolean
}

/**
 * Animated ASCII art logo component with random numeric stream animation.
 * 
 * Displays the Prioritech logo in ASCII art format with random numeric
 * stream animation. Starts with random numeric characters (0-9) that
 * continuously shift and change smoothly, then gradually morphs into
 * the ASCII logo. Includes gold glow effects matching the Prioritech
 * brand colors.
 * 
 * Features:
 * - Random numeric stream (characters continuously shifting)
 * - Smooth morph from random numbers to ASCII logo
 * - Gold glow effects (#daa520)
 * - Pulse glow effect (twice) after morph completes
 * - Optimized rendering for 60fps
 * - Complete animation in 1-2 seconds
 * 
 * @param onComplete - Callback fired when animation completes
 * @param isActive - Whether animation should be active
 * 
 * @returns JSX element containing animated ASCII logo
 */
export function AnimatedAsciiLogo({ onComplete, isActive }: AnimatedAsciiLogoProps) {
  const [charStates, setCharStates] = useState<Map<string, string>>(new Map())
  const [animationPhase, setAnimationPhase] = useState<"streaming" | "morphing" | "pulsing" | "complete">("streaming")
  const [glowIntensity, setGlowIntensity] = useState(1)
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const morphStartTimeRef = useRef<number>(0)

  /**
   * Generate all character positions from ASCII art.
   * 
   * Creates a map of all character positions for hex stream animation.
   * 
   * @returns Map of character positions
   */
  const charPositions = useMemo(() => {
    const positions = new Map<string, CharPosition>()
    
    ASCII_ART.forEach((line, lineIndex) => {
      line.split("").forEach((char, charIndex) => {
        const key = `${lineIndex}-${charIndex}`
        positions.set(key, {
          lineIndex,
          charIndex,
          char
        })
      })
    })
    
    return positions
  }, [])

  /**
   * Initialize with random numeric characters.
   */
  useEffect(() => {
    if (!isActive) return

    // Initialize all positions with random numeric characters
    const initialNumeric = new Map<string, string>()
    charPositions.forEach((pos, key) => {
      // For spaces, keep as space, otherwise random numeric
      if (pos.char === " ") {
        initialNumeric.set(key, " ")
      } else {
        initialNumeric.set(key, NUMERIC_CHARS[Math.floor(Math.random() * NUMERIC_CHARS.length)])
      }
    })
    
    setCharStates(initialNumeric)
    setAnimationPhase("streaming")
    setGlowIntensity(1)
    morphStartTimeRef.current = 0
  }, [isActive, charPositions])

  /**
   * Random numeric streaming effect - characters continuously shift.
   * 
   * Creates smooth streaming effect by continuously changing random
   * numeric characters to simulate data flowing across the screen.
   */
  useEffect(() => {
    if (!isActive || animationPhase !== "streaming") return

    // Stream for 400ms before starting morph
    const streamDuration = 400
    const streamStartTime = Date.now()

    streamingIntervalRef.current = setInterval(() => {
      setCharStates(prev => {
        const updated = new Map(prev)
        
        // Update random characters with new numeric values (smooth shifting)
        charPositions.forEach((pos, key) => {
          if (pos.char !== " ") {
            // Higher chance to change for smooth continuous shifting
            if (Math.random() < 0.4) {
              updated.set(key, NUMERIC_CHARS[Math.floor(Math.random() * NUMERIC_CHARS.length)])
            }
          }
        })
        
        return updated
      })

      // After stream duration, start morphing
      if (Date.now() - streamStartTime >= streamDuration) {
        if (streamingIntervalRef.current) {
          clearInterval(streamingIntervalRef.current)
          streamingIntervalRef.current = null
        }
        setAnimationPhase("morphing")
        morphStartTimeRef.current = Date.now()
      }
    }, 30) // Update every 30ms for smooth continuous shifting

    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current)
        streamingIntervalRef.current = null
      }
    }
  }, [isActive, animationPhase, charPositions])

  /**
   * Morph from random numeric characters to ASCII logo.
   * 
   * Gradually replaces random numeric characters with correct ASCII
   * logo characters using smooth easing. Characters continue to shift
   * smoothly during morph for continuous effect.
   */
  useEffect(() => {
    if (!isActive || animationPhase !== "morphing") return

    const morphDuration = 1200 // 1.2 seconds for morph
    const startTime = morphStartTimeRef.current || Date.now()
    morphStartTimeRef.current = startTime

    /**
     * Easing function for smooth morph transition.
     * 
     * @param t - Progress value (0-1)
     * @returns Eased progress value
     */
    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / morphDuration, 1)
      const easedProgress = easeInOutCubic(progress)

      setCharStates(prev => {
        const updated = new Map(prev)
        
        charPositions.forEach((pos, key) => {
          // Skip spaces
          if (pos.char === " ") {
            updated.set(key, " ")
            return
          }

          // Calculate morph probability based on progress
          // Characters morph gradually, not all at once
          const morphChance = easedProgress
          
          if (Math.random() < morphChance) {
            // Morph to correct character
            updated.set(key, pos.char)
          } else {
            // Keep shifting numeric character smoothly
            if (Math.random() < 0.3) {
              updated.set(key, NUMERIC_CHARS[Math.floor(Math.random() * NUMERIC_CHARS.length)])
            }
          }
        })
        
        return updated
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Ensure all characters are correct
        const final = new Map<string, string>()
        charPositions.forEach((pos, key) => {
          final.set(key, pos.char)
        })
        setCharStates(final)
        setAnimationPhase("pulsing")
      }
    }

    requestAnimationFrame(animate)
  }, [isActive, animationPhase, charPositions])

  /**
   * Smooth pulse glow effect (twice) after morph completes.
   * 
   * Uses smooth animation for glow intensity changes.
   */
  useEffect(() => {
    if (!isActive || animationPhase !== "pulsing") return

    let pulseCount = 0
    const pulseDuration = 400 // ms per pulse (longer for smoother effect)
    const pauseDuration = 300 // ms pause between pulses
    
    const pulse = () => {
      // Smooth pulse up
      setGlowIntensity(1.6)
      
      setTimeout(() => {
        // Smooth pulse down
        setGlowIntensity(1)
        pulseCount++
        
        if (pulseCount < 2) {
          setTimeout(pulse, pauseDuration)
        } else {
          // Done pulsing, complete
          setTimeout(() => {
            setAnimationPhase("complete")
            setTimeout(() => {
              onComplete()
            }, 0)
          }, 200)
        }
      }, pulseDuration)
    }

    // Start first pulse after brief delay
    setTimeout(pulse, 150)
  }, [isActive, animationPhase, onComplete])

  /**
   * Memoized character component for performance optimization.
   * 
   * Renders a single character with glow effects.
   * Memoized to prevent unnecessary re-renders.
   */
  const CharComponent = memo(({ 
    char, 
    glowIntensity
  }: { 
    char: string
    glowIntensity: number
  }) => {
    return (
      <motion.span
        className="text-accent"
        animate={{
          textShadow: char !== " "
            ? `0 0 ${5 * glowIntensity}px rgba(218, 165, 32, ${0.8 * glowIntensity}), 0 0 ${10 * glowIntensity}px rgba(218, 165, 32, ${0.6 * glowIntensity}), 0 0 ${15 * glowIntensity}px rgba(218, 165, 32, ${0.4 * glowIntensity})`
            : "none"
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}
        style={{
          color: "#daa520"
        }}
      >
        {char}
      </motion.span>
    )
  }, (prevProps, nextProps) => {
    // Only re-render if character or glow intensity changes
    return prevProps.char === nextProps.char &&
           prevProps.glowIntensity === nextProps.glowIntensity
  })
  
  CharComponent.displayName = "CharComponent"

  return (
    <div className="relative w-full overflow-hidden">
      {/* ASCII Art Container */}
      <div 
        className="font-mono text-[8px] sm:text-[10px] md:text-[12px] leading-tight text-center select-none"
        style={{
          fontFamily: "var(--font-mono)",
          filter: "contrast(1.1) brightness(1.05)"
        }}
      >
        {ASCII_ART.map((line, lineIndex) => (
          <div key={lineIndex} className="whitespace-pre">
            {line.split("").map((char, charIndex) => {
              const key = `${lineIndex}-${charIndex}`
              const displayChar = charStates.get(key) || char
              
              return (
                <CharComponent
                  key={charIndex}
                  char={displayChar}
                  glowIntensity={glowIntensity}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
