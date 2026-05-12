"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect"
import { AnimatedThreadBackground } from "./AnimatedThreadBackground"
import { revealContainer, revealItem } from "@/lib/motion"

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
 * Unified hero with three backdrops (minimal, gradient, image). Headline gets a
 * one-time gold sweep on gradient variant. Content staggers via shared motion
 * variants from lib/motion.
 */
export function PageHero({
  title,
  subtitle,
  description,
  children,
  className = "",
  variant = "minimal",
  imageSrc,
  imageAlt = "",
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
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-main/70 via-transparent to-main/30" />
            </div>
            <div className="absolute inset-0 z-[1] opacity-25">
              <AnimatedThreadBackground showHeroBackground={false} threadCount={4} />
            </div>
          </>
        ) : null
      case "gradient":
        return (
          <>
            <div className="absolute inset-0 bg-main z-0" />
            {/* Aurora orbs — large blurred gradient bubbles */}
            <div
              className="aurora-orb aurora-orb--gold z-[1]"
              style={{ width: "70vw", height: "70vw", top: "-30vw", left: "-15vw", opacity: 0.4 }}
            />
            <div
              className="aurora-orb aurora-orb--silver z-[1]"
              style={{
                width: "55vw",
                height: "55vw",
                bottom: "-20vw",
                right: "-10vw",
                opacity: 0.25,
                animationDelay: "-12s",
              }}
            />
            <div className="absolute inset-0 z-[2] opacity-30">
              <AnimatedThreadBackground showHeroBackground={false} threadCount={4} />
            </div>
          </>
        )
      case "minimal":
      default:
        return (
          <>
            <div className="absolute inset-0 bg-main z-0" />
            <div
              className="aurora-orb aurora-orb--gold z-[1]"
              style={{
                width: "50vw",
                height: "50vw",
                top: "-20vw",
                right: "-10vw",
                opacity: 0.2,
              }}
            />
          </>
        )
    }
  }

  return (
    <section
      className={`relative py-20 sm:py-24 lg:py-32 overflow-hidden ${className}`}
      aria-labelledby="page-hero-title"
    >
      {renderBackground()}

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        animate="visible"
        variants={revealContainer(0.1, 0.12)}
      >
        {subtitle && (
          <motion.p
            variants={revealItem}
            className="text-accent font-medium text-sm sm:text-base mb-4 font-mono tracking-wider"
          >
            ${" "}{subtitle}
          </motion.p>
        )}

        <motion.h1
          id="page-hero-title"
          variants={revealItem}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-mono drop-shadow-lg ${
            variant === "gradient" ? "text-sweep" : "text-secondary"
          }`}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.div
            variants={revealItem}
            className="text-secondary/70 text-base sm:text-lg lg:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-mono"
          >
            <TextGenerateEffect words={description} delayMultiple={0.04} />
          </motion.div>
        )}

        {children && (
          <motion.div
            variants={revealItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
