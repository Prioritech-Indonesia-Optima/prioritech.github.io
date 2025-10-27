"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SplashScreen } from "./SplashScreen"

/**
 * Wrapper component that manages splash screen display logic.
 * 
 * Shows splash screen on every page load. Pre-renders children in background
 * while splash plays, then seamlessly transitions when splash completes.
 * 
 * @param children - React children to render after splash completes
 * 
 * @returns JSX element with splash screen and children
 */
export function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true)
  const [isReady, setIsReady] = useState(false)

  // Start preparing home screen immediately (render in background)
  useEffect(() => {
    // Give a small delay for React to prepare the home screen
    setTimeout(() => setIsReady(true), 100)
  }, [])

  const handleSplashComplete = () => {
    // Only hide splash if home screen is ready
    if (isReady) {
      setShowSplash(false)
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" show={showSplash} onComplete={handleSplashComplete} />
        )}
        {!showSplash && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

