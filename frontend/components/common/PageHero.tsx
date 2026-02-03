"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { AnimatedThreadBackground } from "./AnimatedThreadBackground"

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  children?: ReactNode
  className?: string
  variant?: "minimal" | "gradient" | "image"
  imageSrc?: string
  imageAlt?: string
}

/**
 * Reusable hero section component for page headers with space theme.
 * 
 * Supports three variants:
 * - minimal: Clean dark background
 * - gradient: Animated gradient with subtle threads
 * - image: Full background image with overlay
 * 
 * @param title - Main heading text
 * @param subtitle - Optional subtitle text (will get $ prefix)
 * @param description - Optional description paragraph (uses TextGenerateEffect)
 * @param children - Optional additional content (buttons, badges, etc.)
 * @param className - Optional additional CSS classes
 * @param variant - Hero style variant (minimal, gradient, image)
 * @param imageSrc - Background image URL (for image variant)
 * @param imageAlt - Alt text for background image
 * @returns JSX element containing the hero section
 */
export function PageHero({ 
  title, 
  subtitle, 
  description, 
  children, 
  className = "",
  variant = "minimal",
  imageSrc,
  imageAlt = ""
}: PageHeroProps) {
  const renderBackground = () => {
    switch (variant) {
      case "image":
        return imageSrc ? (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              {/* Dark overlay for text readability - no blur */}
              <div className="absolute inset-0 bg-black/50" />
              {/* Vignette gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>
            <div className="absolute inset-0 z-[1] opacity-30">
              <AnimatedThreadBackground showHeroBackground={false} threadCount={5} />
            </div>
          </>
        ) : null
      case "gradient":
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-main to-main z-0" />
            <div className="absolute inset-0 z-[1] opacity-40">
              <AnimatedThreadBackground showHeroBackground={false} threadCount={5} />
            </div>
            {/* Ambient gradient animation */}
            <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-transparent blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/5 via-transparent to-transparent blur-3xl animate-pulse-slow delay-1000" />
            </div>
          </>
        )
      case "minimal":
      default:
        return (
          <div className="absolute inset-0 bg-main z-0" />
        )
    }
  }

  return (
    <section className={`relative py-16 sm:py-20 lg:py-24 overflow-hidden ${className}`}>
      {renderBackground()}
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {subtitle && (
          <p className="text-accent font-medium text-sm sm:text-base mb-4 font-mono">
            ${" "}{subtitle}
          </p>
        )}
        
        <h1 className="text-secondary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-mono drop-shadow-lg">
          {title}
        </h1>
        
        {description && (
          <div className="text-secondary/70 text-base sm:text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-mono">
            <TextGenerateEffect 
              words={description}
              delayMultiple={0.04}
            />
          </div>
        )}
        
        {children && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
