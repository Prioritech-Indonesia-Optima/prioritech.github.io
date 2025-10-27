"use client"

import { ReactNode } from "react"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { Spotlight } from "@/components/aceternity/spotlight"

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  children?: ReactNode
  className?: string
}

/**
 * Reusable hero section component for page headers with CLI theme.
 * 
 * Provides consistent styling and layout for page hero sections across the site.
 * Features responsive typography, text generation effects, and spotlight animation.
 * 
 * @param title - Main heading text
 * @param subtitle - Optional subtitle text (will get $ prefix)
 * @param description - Optional description paragraph (uses TextGenerateEffect)
 * @param children - Optional additional content (buttons, badges, etc.)
 * @param className - Optional additional CSS classes
 * @returns JSX element containing the hero section
 */
export function PageHero({ 
  title, 
  subtitle, 
  description, 
  children, 
  className = "" 
}: PageHeroProps) {
  return (
    <section className={`relative py-12 sm:py-16 lg:py-20 overflow-hidden ${className}`}>
      {/* Spotlight effect that follows cursor */}
      <Spotlight />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {subtitle && (
          <p className="text-accent font-medium text-sm sm:text-base mb-4 font-mono">
            ${" "}{subtitle}
          </p>
        )}
        
        <h1 className="text-secondary text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-mono">
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
