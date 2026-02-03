"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ImageSectionProps {
  src: string
  alt: string
  title?: string
  description?: string
  height?: "sm" | "md" | "lg" | "full"
  textPosition?: "center" | "bottom-left" | "bottom-right"
  overlay?: boolean
  className?: string
  priority?: boolean
}

/**
 * Reusable image section component with standardized overlay for text readability.
 *
 * Uses the same overlay standard as PageHero:
 * - backdrop-blur-sm bg-black/40 (medium blur + 40% darkness)
 * - Gradient vignette for depth
 * - Optional text overlay with positioning
 *
 * @param src - Image source URL
 * @param alt - Alt text for image
 * @param title - Optional title text overlay
 * @param description - Optional description text overlay
 * @param height - Section height (sm: 30vh, md: 40vh, lg: 50vh, full: 100vh)
 * @param textPosition - Position of text overlay
 * @param overlay - Whether to show overlay (default: true)
 * @param className - Optional additional CSS classes
 * @param priority - Whether to prioritize image loading
 */
export function ImageSection({
  src,
  alt,
  title,
  description,
  height = "md",
  textPosition = "center",
  overlay = true,
  className = "",
  priority = false,
}: ImageSectionProps) {
  const heightClasses = {
    sm: "h-[30vh] min-h-[200px]",
    md: "h-[40vh] min-h-[280px]",
    lg: "h-[50vh] min-h-[360px]",
    full: "h-screen",
  }

  const textPositionClasses = {
    center: "items-center justify-center text-center",
    "bottom-left": "items-end justify-start text-left pb-12 pl-8",
    "bottom-right": "items-end justify-end text-right pb-12 pr-8",
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-xl ${heightClasses[height]} ${className}`}
    >
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay Layers */}
      {overlay && (
        <>
          {/* Dark overlay for text readability - no blur */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Vignette gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </>
      )}

      {/* Text Content */}
      {(title || description) && (
        <div
          className={`relative z-10 h-full flex flex-col px-8 ${textPositionClasses[textPosition]}`}
        >
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-secondary text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-mono drop-shadow-lg"
            >
              {title}
            </motion.h2>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-secondary/80 text-sm sm:text-base lg:text-lg max-w-2xl font-mono drop-shadow-md"
            >
              {description}
            </motion.p>
          )}
        </div>
      )}
    </motion.section>
  )
}
