"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { GridBackground } from "@/components/aceternity/grid-background"
import { ParticleSystem } from "./ParticleSystem"
import { DataStream } from "./DataStream"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLogoBounds } from "@/hooks/use-logo-bounds"

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
 * Modern techy splash screen component with sequential text reveal.
 * 
 * Features a captivating animation sequence:
 * 1. "Progress" text appears and fades out completely
 * 2. 50ms gap
 * 3. "Precision" text appears and fades out completely
 * 4. 50ms gap
 * 5. "Prioritech" text (gold) appears and fades out completely
 * 6. 50ms gap
 * 7. Logo fades in while background effects fade out
 * 
 * Background effects (particles, data stream, grid) continue animating
 * throughout text stages and only fade out when logo appears.
 * 
 * All effects use the Prioritech brand colors (gold #daa520 on dark #2d2c2c).
 * 
 * @param onComplete - Callback when animation completes
 * @param show - Whether to display the splash screen
 * 
 * @returns JSX element containing the splash screen
 */
export function SplashScreen({ onComplete, show }: SplashScreenProps) {
  const [isClosing, setIsClosing] = useState(false)
  const isMobile = useIsMobile()
  const logoRef = useRef<HTMLDivElement>(null)
  const [logoSize, setLogoSize] = useState({ width: 600, height: 300 })
  
  // Use responsive image with fallback to original
  const logoImageSrc = "/logos/new/Asset 10.png"
  const { bounds: logoBounds, isLoading: boundsLoading } = useLogoBounds(
    logoImageSrc,
    logoSize.width,
    logoSize.height
  )
  
  const [animationStage, setAnimationStage] = useState<
    "progress" | "progress-fade-out" | "precision" | "precision-fade-out" | "prioritech-text" | "prioritech-fade-out" | "logo-reveal" | "complete"
  >("progress")
  
  // Update logo size and position when component mounts or window resizes
  useEffect(() => {
    const updateLogoDimensions = () => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect()
        setLogoSize({ width: rect.width, height: rect.height })
      }
    }
    
    updateLogoDimensions()
    window.addEventListener("resize", updateLogoDimensions)
    
    // Also update after a short delay to ensure image is loaded
    const timeout = setTimeout(updateLogoDimensions, 100)
    
    return () => {
      window.removeEventListener("resize", updateLogoDimensions)
      clearTimeout(timeout)
    }
  }, [show])

  /**
   * Handle animation completion and trigger exit.
   * 
   * Called when all animations complete. Initiates fade-out transition.
   */
  const handleComplete = useCallback(() => {
    setTimeout(() => {
      setIsClosing(true)
      setTimeout(() => {
        onComplete()
      }, 800) // 800ms fade out
    }, 500) // Brief pause before exit
  }, [onComplete])

  /**
   * Reset animation state when component mounts or show changes.
   */
  useEffect(() => {
    if (show) {
      setIsClosing(false)
      setAnimationStage("progress")
      
      // Start animation sequence
      // Stage 1: "Progress" appears (600ms), then fades out (400ms)
      setTimeout(() => setAnimationStage("progress-fade-out"), 600)
      // 50ms gap after fade out completes
      setTimeout(() => setAnimationStage("precision"), 1050)
      // Stage 2: "Precision" appears (600ms), then fades out (400ms)
      setTimeout(() => setAnimationStage("precision-fade-out"), 1650)
      // 50ms gap after fade out completes
      setTimeout(() => setAnimationStage("prioritech-text"), 2100)
      // Stage 3: "Prioritech" (gold) appears (600ms), then fades out (400ms)
      setTimeout(() => setAnimationStage("prioritech-fade-out"), 2700)
      // 50ms gap after fade out completes
      setTimeout(() => setAnimationStage("logo-reveal"), 3150)
      // Stage 4: Logo fades in, background effects fade out, then complete
      setTimeout(() => {
        setAnimationStage("complete")
        handleComplete()
      }, 3950)
    }
  }, [show, handleComplete])

  if (!show) return null

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isClosing ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-main z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Background Grid - continues during text, fades out during logo reveal */}
          <motion.div
            animate={{
              opacity: animationStage === "logo-reveal" || animationStage === "complete" ? 0 : 0.1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {(animationStage === "progress" || animationStage === "progress-fade-out" || 
              animationStage === "precision" || animationStage === "precision-fade-out" || 
              animationStage === "prioritech-text" || animationStage === "prioritech-fade-out" || 
              animationStage === "logo-reveal") && (
              <GridBackground opacity={1} className="z-0" />
            )}
          </motion.div>

          {/* Data Stream Background - continues during text, fades out during logo reveal */}
          <motion.div
            animate={{
              opacity: animationStage === "logo-reveal" || animationStage === "complete" ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-0"
          >
            {(animationStage === "progress" || animationStage === "progress-fade-out" || 
              animationStage === "precision" || animationStage === "precision-fade-out" || 
              animationStage === "prioritech-text" || animationStage === "prioritech-fade-out" || 
              animationStage === "logo-reveal") && (
              <DataStream speed={0.8} />
            )}
          </motion.div>

          {/* Particle System - continues during text, fades out during logo reveal */}
          <motion.div
            animate={{
              opacity: animationStage === "logo-reveal" || animationStage === "complete" ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            {(animationStage === "progress" || animationStage === "progress-fade-out" || 
              animationStage === "precision" || animationStage === "precision-fade-out" || 
              animationStage === "prioritech-text" || animationStage === "prioritech-fade-out" || 
              animationStage === "logo-reveal") && (
              <ParticleSystem
                particleCount={isMobile ? 30 : 60}
                targetX="50%"
                targetY="50%"
                logoBounds={!boundsLoading && logoBounds ? logoBounds : null}
              />
            )}
          </motion.div>

          {/* Main Content Container */}
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            {/* Stage 1: "Progress" text */}
            <AnimatePresence mode="wait">
              {animationStage === "progress" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute text-center"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                    Progress
                  </h1>
                </motion.div>
              )}
              {animationStage === "progress-fade-out" && (
                <motion.div
                  key="progress-fade-out"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                  className="absolute text-center"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                    Progress
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage 2: "Precision" text */}
            <AnimatePresence mode="wait">
              {animationStage === "precision" && (
                <motion.div
                  key="precision"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute text-center"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                    Precision
                  </h1>
                </motion.div>
              )}
              {animationStage === "precision-fade-out" && (
                <motion.div
                  key="precision-fade-out"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                  className="absolute text-center"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                    Precision
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage 3: "Prioritech" text (gold) */}
            <AnimatePresence mode="wait">
              {animationStage === "prioritech-text" && (
                <motion.div
                  key="prioritech-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute text-center"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent">
                    Prioritech
                  </h1>
                </motion.div>
              )}
              {animationStage === "prioritech-fade-out" && (
                <motion.div
                  key="prioritech-fade-out"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                  className="absolute text-center"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent">
                    Prioritech
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stage 4: Logo with Smooth Entrance Animation */}
            {(animationStage === "logo-reveal" || animationStage === "complete") && (
              <motion.div
                ref={logoRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Logo Image - Using responsive images for optimal loading */}
                <Image
                  src={logoImageSrc}
                  alt="Prioritech Logo"
                  width={600}
                  height={300}
                  sizes="(max-width: 640px) 360px, (max-width: 768px) 440px, (max-width: 1024px) 560px, 600px"
                  className="w-[360px] sm:w-[440px] md:w-[560px] lg:w-[600px] h-auto"
                  priority
                  onLoad={() => {
                    // Update dimensions after image loads
                    if (logoRef.current) {
                      const rect = logoRef.current.getBoundingClientRect()
                      setLogoSize({ width: rect.width, height: rect.height })
                    }
                  }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
