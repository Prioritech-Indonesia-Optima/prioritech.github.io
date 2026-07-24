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

      {/* Background — canvas + dot-matrix + crosshair */}
      <div className="splash-background">
        <div className="splash-dots" />
        <div className="splash-crosshair-v" />
        <div className="splash-crosshair-h" />
      </div>

      {/* Logo + boot label */}
      <div className="splash-content">
        <div className="splash-logo-wrapper">
          <Image
            src="/logos/new/Asset 10.png"
            alt="Prioritech Logo"
            width={600}
            height={300}
            sizes="(max-width: 360px) 80vw, (max-width: 640px) 70vw, (max-width: 1024px) 50vw, 600px"
            className="splash-logo"
            priority
          />
          <div className="splash-boot">INITIALIZING · SYSTEMS ONLINE · v2026.07</div>
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
          background-color: #161515;
          animation: splash-fade-out 0.3s ease-in 1.2s forwards;
        }

        .splash-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(217, 217, 217, 0.08) 1px, transparent 1px);
          background-size: 22px 22px;
          -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 75%);
          mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 75%);
        }

        .splash-crosshair-v,
        .splash-crosshair-h {
          position: absolute;
          background: rgba(218, 165, 32, 0.25);
        }
        .splash-crosshair-v {
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          transform: scaleY(0);
          transform-origin: center;
          animation: line-grow-v 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
        .splash-crosshair-h {
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: center;
          animation: line-grow-h 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        .splash-iris {
          position: absolute;
          inset: 0;
          background-color: #161515;
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
          padding: 1.5rem;
          animation: splash-fade-out 0.2s ease-in 1.3s forwards;
        }

        .splash-logo-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          max-width: 600px;
          opacity: 0;
          transform: scale(0.97);
          animation: logo-reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          will-change: opacity, transform;
        }

        .splash-logo {
          width: clamp(220px, 70vw, 600px);
          max-width: 100%;
          height: auto;
        }

        .splash-boot {
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(217, 217, 217, 0.55);
          opacity: 0;
          animation: boot-in 0.5s ease-out 0.7s forwards;
        }

        @media (orientation: landscape) and (max-height: 500px) {
          .splash-logo {
            width: clamp(180px, 38vh, 360px);
          }
        }

        @keyframes iris-open {
          0% { clip-path: circle(0% at center); }
          100% { clip-path: circle(150% at center); }
        }
        @keyframes logo-reveal {
          0% { opacity: 0; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes boot-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes line-grow-v {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @keyframes line-grow-h {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes splash-fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-iris,
          .splash-logo-wrapper,
          .splash-background,
          .splash-content,
          .splash-boot,
          .splash-crosshair-v,
          .splash-crosshair-h {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}
