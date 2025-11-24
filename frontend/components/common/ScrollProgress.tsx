"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

/**
 * ScrollProgress component that displays page scroll progress.
 * 
 * Shows a thin gold progress bar at the top of the viewport that fills
 * as the user scrolls down the page. Uses Framer Motion for smooth
 * animations and respects prefers-reduced-motion.
 * 
 * @returns JSX element containing the scroll progress indicator
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const [shouldShow, setShouldShow] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener("change", handleChange)
    
    // Show progress bar after a small delay to avoid flash on page load
    const timer = setTimeout(() => setShouldShow(true), 100)
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      clearTimeout(timer)
    }
  }, [])

  // Don't render if user prefers reduced motion
  if (prefersReducedMotion || !shouldShow) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent/20 z-[100] origin-left"
      style={{ scaleX, willChange: "transform" }}
    >
      <motion.div
        className="h-full bg-accent shadow-lg shadow-accent/50"
        style={{ scaleX }}
      />
    </motion.div>
  )
}

