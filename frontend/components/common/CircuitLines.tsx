"use client"

import { motion } from "framer-motion"
import { LogoBounds } from "@/lib/logo-bounds"

/**
 * Circuit Board Lines Component
 * 
 * Creates animated circuit-like lines that draw toward a central point or logo bounds.
 * Uses SVG path animations with stroke-dasharray for drawing effect.
 * 
 * Features:
 * - Multiple circuit paths at different angles
 * - Animated path drawing effect
 * - Gold accent color matching brand
 * - Configurable number of paths
 * - Can connect to logo bounds edges instead of center
 * 
 * @param pathCount - Number of circuit paths (default: 6)
 * @param centerX - X position of center point (default: 50%) - used if logoBounds not provided
 * @param centerY - Y position of center point (default: 50%) - used if logoBounds not provided
 * @param length - Length of circuit paths (default: 200)
 * @param className - Optional CSS classes to apply
 * @param logoBounds - Optional logo bounds to connect lines to logo edges
 * 
 * @returns JSX element containing the circuit lines
 */
export function CircuitLines({
  pathCount = 6,
  centerX = "50%",
  centerY = "50%",
  length = 200,
  className = "",
  logoBounds = null,
}: {
  pathCount?: number
  centerX?: string | number
  centerY?: string | number
  length?: number
  className?: string
  logoBounds?: LogoBounds | null
}) {
  // Generate circuit paths
  const generatePaths = () => {
    const paths = []
    const angleStep = (Math.PI * 2) / pathCount

    // Adjust length based on logo bounds if provided
    const effectiveLength = logoBounds
      ? Math.max(logoBounds.width, logoBounds.height) * 1.2
      : length

    for (let i = 0; i < pathCount; i++) {
      const angle = angleStep * i
      
      if (logoBounds) {
        // Calculate endpoint on logo bounds perimeter
        const logoWidth = logoBounds.width
        const logoHeight = logoBounds.height
        const centerX_rel = logoBounds.centerX
        const centerY_rel = logoBounds.centerY
        
        // Find intersection point with logo bounds rectangle
        const halfWidth = logoWidth / 2
        const halfHeight = logoHeight / 2
        
        // Calculate point on logo edge
        let edgeX = 0
        let edgeY = 0
        
        // Find which edge the line intersects
        const tan = Math.tan(angle)
        const absTan = Math.abs(tan)
        
        if (absTan <= logoHeight / logoWidth) {
          // Intersects left or right edge
          edgeX = angle < Math.PI / 2 || angle > (3 * Math.PI) / 2 ? halfWidth : -halfWidth
          edgeY = edgeX * tan
          if (Math.abs(edgeY) > halfHeight) {
            edgeY = edgeY > 0 ? halfHeight : -halfHeight
            edgeX = edgeY / tan
          }
        } else {
          // Intersects top or bottom edge
          edgeY = angle < Math.PI ? halfHeight : -halfHeight
          edgeX = edgeY / tan
          if (Math.abs(edgeX) > halfWidth) {
            edgeX = edgeX > 0 ? halfWidth : -halfWidth
            edgeY = edgeX * tan
          }
        }
        
        const x1 = Math.cos(angle) * effectiveLength
        const y1 = Math.sin(angle) * effectiveLength
        const x2 = edgeX
        const y2 = edgeY

        paths.push({
          id: i,
          d: `M ${x1} ${y1} L ${x2} ${y2}`,
          angle: angle * (180 / Math.PI),
          delay: i * 0.1,
        })
      } else {
        const x1 = Math.cos(angle) * effectiveLength
        const y1 = Math.sin(angle) * effectiveLength
        const x2 = Math.cos(angle) * (effectiveLength * 0.3)
        const y2 = Math.sin(angle) * (effectiveLength * 0.3)

        paths.push({
          id: i,
          d: `M ${x1} ${y1} L ${x2} ${y2}`,
          angle: angle * (180 / Math.PI),
          delay: i * 0.1,
        })
      }
    }

    return paths
  }

  const paths = generatePaths()

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        left: logoBounds ? `${logoBounds.centerX * 100}%` : centerX,
        top: logoBounds ? `${logoBounds.centerY * 100}%` : centerY,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#daa520" stopOpacity="0" />
            <stop offset="50%" stopColor="#daa520" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#daa520" stopOpacity="1" />
          </linearGradient>
        </defs>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.8, delay: path.delay, ease: "easeInOut" },
              opacity: { duration: 0.3, delay: path.delay },
            }}
            style={{
              filter: "drop-shadow(0 0 3px rgba(218, 165, 32, 0.5))",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

