"use client"

import { motion } from "framer-motion"

/**
 * Glitch Effect Component
 * 
 * Creates RGB channel split and digital noise effects for techy glitch aesthetic.
 * Used during logo reveal animations.
 * 
 * Features:
 * - RGB channel offset (chromatic aberration)
 * - Digital noise overlay
 * - Scan line effect
 * - Configurable intensity and duration
 * 
 * @param children - Content to apply glitch effect to
 * @param isActive - Whether glitch effect is active
 * @param intensity - Glitch intensity (default: 1)
 * @param className - Optional CSS classes to apply
 * 
 * @returns JSX element with glitch effects applied
 */
export function GlitchEffect({
  children,
  isActive,
  intensity = 1,
  className = "",
}: {
  children: React.ReactNode
  isActive: boolean
  intensity?: number
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Original content */}
      <div className="relative z-10">{children}</div>

      {/* RGB channel split layers */}
      {isActive && (
        <>
          {/* Red channel */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              filter: "blur(0.5px)",
              mixBlendMode: "screen",
            }}
            animate={{
              x: [-2 * intensity, 2 * intensity, -2 * intensity],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: isActive ? Infinity : 0,
              repeatDelay: 0.1,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                filter: "sepia(100%) saturate(200%) hue-rotate(0deg)",
                opacity: 0.5,
              }}
            >
              {children}
            </div>
          </motion.div>

          {/* Blue channel */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              filter: "blur(0.5px)",
              mixBlendMode: "screen",
            }}
            animate={{
              x: [2 * intensity, -2 * intensity, 2 * intensity],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: isActive ? Infinity : 0,
              repeatDelay: 0.15,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                filter: "sepia(100%) saturate(200%) hue-rotate(240deg)",
                opacity: 0.5,
              }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}

      {/* Scan line overlay */}
      {isActive && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(transparent 50%, rgba(218, 165, 32, 0.03) 50%)",
            backgroundSize: "100% 4px",
          }}
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Digital noise overlay */}
      {isActive && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />
      )}
    </div>
  )
}

