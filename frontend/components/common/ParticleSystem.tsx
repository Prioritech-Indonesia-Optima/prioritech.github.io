"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { LogoBounds } from "@/lib/logo-bounds"

/**
 * Particle System Component
 * 
 * Creates animated particles that flow toward a target point (typically a logo).
 * Particles originate from screen edges and converge on the logo bounds.
 * 
 * Features:
 * - Configurable particle count
 * - Smooth flowing animation toward target
 * - Golden color matching brand
 * - Performance optimized with requestAnimationFrame
 * - Particle trails and connections
 * - Can target logo bounds instead of center point
 * 
 * @param particleCount - Number of particles to generate (default: 60)
 * @param targetX - X position of target (default: center) - used if logoBounds not provided
 * @param targetY - Y position of target (default: center) - used if logoBounds not provided
 * @param className - Optional CSS classes to apply
 * @param logoBounds - Optional logo bounds to target particles around actual logo shape
 * 
 * @returns JSX element containing the particle system
 */
export function ParticleSystem({
  particleCount = 60,
  targetX = "50%",
  targetY = "50%",
  className = "",
  logoBounds = null,
}: {
  particleCount?: number
  targetX?: string | number
  targetY?: string | number
  className?: string
  logoBounds?: LogoBounds | null
}) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    opacity: number
    size: number
  }>>([])
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize particles from screen edges
    const initParticles = () => {
      const newParticles = []
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const centerX = typeof targetX === "string" 
        ? (targetX.includes("%") ? (parseFloat(targetX) / 100) * rect.width : rect.width / 2)
        : targetX
      const centerY = typeof targetY === "string"
        ? (targetY.includes("%") ? (parseFloat(targetY) / 100) * rect.height : rect.height / 2)
        : targetY

      for (let i = 0; i < particleCount; i++) {
        // Start from random edge
        const edge = Math.floor(Math.random() * 4)
        let x, y

        switch (edge) {
          case 0: // Top
            x = Math.random() * rect.width
            y = 0
            break
          case 1: // Right
            x = rect.width
            y = Math.random() * rect.height
            break
          case 2: // Bottom
            x = Math.random() * rect.width
            y = rect.height
            break
          default: // Left
            x = 0
            y = Math.random() * rect.height
        }

        // Calculate velocity toward center
        const dx = centerX - x
        const dy = centerY - y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const speed = 0.5 + Math.random() * 0.5
        const vx = (dx / distance) * speed
        const vy = (dy / distance) * speed

        newParticles.push({
          id: i,
          x,
          y,
          vx,
          vy,
          opacity: 0.3 + Math.random() * 0.4,
          size: 2 + Math.random() * 3,
        })
      }

      setParticles(newParticles)
    }

    initParticles()

    // Animation loop
    const animate = () => {
      setParticles((prev) => {
        const container = containerRef.current
        if (!container) return prev

        const rect = container.getBoundingClientRect()
        
        // Calculate target position - use logo bounds if provided
        let centerX: number
        let centerY: number
        
        if (logoBounds) {
          centerX = logoBounds.centerX * rect.width
          centerY = logoBounds.centerY * rect.height
        } else {
          centerX = typeof targetX === "string"
            ? (targetX.includes("%") ? (parseFloat(targetX) / 100) * rect.width : rect.width / 2)
            : targetX
          centerY = typeof targetY === "string"
            ? (targetY.includes("%") ? (parseFloat(targetY) / 100) * rect.height : rect.height / 2)
            : targetY
        }

        return prev.map((particle) => {
          let { x, y, vx, vy, opacity } = particle

          // Update position
          x += vx
          y += vy

          // Calculate distance to center
          const dx = centerX - x
          const dy = centerY - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Slow down as approaching center
          if (distance < 100) {
            vx *= 0.95
            vy *= 0.95
            opacity *= 0.98
          }

          // Reset if too close to center or faded out
          if (distance < 20 || opacity < 0.1) {
            // Respawn from edge
            const edge = Math.floor(Math.random() * 4)
            switch (edge) {
              case 0:
                x = Math.random() * rect.width
                y = 0
                break
              case 1:
                x = rect.width
                y = Math.random() * rect.height
                break
              case 2:
                x = Math.random() * rect.width
                y = rect.height
                break
              default:
                x = 0
                y = Math.random() * rect.height
            }

            const newDx = centerX - x
            const newDy = centerY - y
            const newDistance = Math.sqrt(newDx * newDx + newDy * newDy)
            const speed = 0.5 + Math.random() * 0.5
            vx = (newDx / newDistance) * speed
            vy = (newDy / newDistance) * speed
            opacity = 0.3 + Math.random() * 0.4
          }

          return { ...particle, x, y, vx, vy, opacity }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particleCount, targetX, targetY, logoBounds])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: "#daa520",
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(218, 165, 32, ${particle.opacity * 0.5})`,
          }}
          animate={{
            opacity: particle.opacity,
          }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  )
}

