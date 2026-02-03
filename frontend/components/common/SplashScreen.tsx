"use client"

import { useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
  show: boolean
}

/**
 * Lightweight CSS-only splash screen with iris reveal effect.
 * 
 * Features:
 * - Pure CSS animations (no Framer Motion)
 * - 1.5s total duration (fast and captivating)
 * - Iris open effect from center
 * - GPU-accelerated transforms
 * - <50KB overhead
 * 
 * Animation sequence:
 * 1. Iris opens from center (0-0.5s)
 * 2. Logo fades in with subtle glow (0.3-1s)
 * 3. Brief hold (1-1.3s)
 * 4. Fade out (1.3-1.5s)
 * 
 * @param onComplete - Callback when animation completes
 * @param show - Whether to display the splash screen
 */
export function SplashScreen({ onComplete, show }: SplashScreenProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete()
      }, 1500) // 1.5s total duration
      
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="splash-screen-container">
      {/* Iris reveal overlay */}
      <div className="splash-iris" />
      
      {/* Background with subtle gradient */}
      <div className="splash-background">
        <div className="splash-gradient" />
      </div>
      
      {/* Logo container */}
      <div className="splash-content">
        <div className="splash-logo-wrapper">
          <Image
            src="/logos/new/Asset 10.png"
            alt="Prioritech Logo"
            width={600}
            height={300}
            sizes="(max-width: 640px) 360px, (max-width: 768px) 440px, 600px"
            className="splash-logo"
            priority
          />
        </div>
      </div>
      
      <style jsx>{`
        .splash-screen-container {
          position: fixed;
          inset: 0;
          z-index: 50;
          overflow: hidden;
          pointer-events: none;
        }
        
        .splash-background {
          position: absolute;
          inset: 0;
          background-color: #2d2c2c;
          animation: splash-fade-out 0.3s ease-in 1.2s forwards;
        }
        
        .splash-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(218, 165, 32, 0.12) 0%,
            rgba(218, 165, 32, 0.06) 30%,
            rgba(45, 44, 44, 0) 70%
          );
          animation: splash-pulse 2s ease-in-out infinite;
        }
        
        .splash-iris {
          position: absolute;
          inset: 0;
          background-color: #2d2c2c;
          clip-path: circle(0% at center);
          animation: iris-open 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: clip-path;
        }
        
        .splash-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: splash-fade-out 0.2s ease-in 1.3s forwards;
        }
        
        .splash-logo-wrapper {
          position: relative;
          opacity: 0;
          transform: scale(0.95);
          animation: logo-reveal 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
          will-change: opacity, transform;
        }
        
        .splash-logo {
          width: 360px;
          height: auto;
          filter: drop-shadow(0 0 20px rgba(218, 165, 32, 0.3));
        }
        
        @media (min-width: 640px) {
          .splash-logo {
            width: 440px;
          }
        }
        
        @media (min-width: 1024px) {
          .splash-logo {
            width: 600px;
          }
        }
        
        @keyframes iris-open {
          0% {
            clip-path: circle(0% at center);
          }
          100% {
            clip-path: circle(150% at center);
          }
        }
        
        @keyframes logo-reveal {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes splash-fade-out {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        @keyframes splash-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .splash-iris,
          .splash-logo-wrapper,
          .splash-background,
          .splash-content,
          .splash-gradient {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}
