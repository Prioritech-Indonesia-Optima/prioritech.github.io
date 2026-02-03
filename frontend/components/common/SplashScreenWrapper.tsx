"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "./SplashScreen"

/**
 * Wrapper component that manages splash screen display logic.
 * 
 * Shows splash screen only once per session using sessionStorage.
 * Pre-renders children in background while splash plays.
 * 
 * @param children - React children to render after splash completes
 */
export function SplashScreenWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    // Check if splash has been shown this session
    const hasShownSplash = typeof window !== 'undefined' && sessionStorage.getItem('prioritech-splash-shown')
    
    // For development, always show splash (remove this line for production)
    const forceShow = process.env.NODE_ENV === 'development'
    
    if (!hasShownSplash || forceShow) {
      setShowSplash(true)
      if (!forceShow) {
        sessionStorage.setItem('prioritech-splash-shown', 'true')
      }
    } else {
      // Skip splash, show content immediately
      setContentVisible(true)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setContentVisible(true)
  }

  return (
    <>
      {showSplash && (
        <SplashScreen show={showSplash} onComplete={handleSplashComplete} />
      )}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {children}
      </div>
    </>
  )
}

