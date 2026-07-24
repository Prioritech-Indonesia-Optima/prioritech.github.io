"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { revealContainer, revealItem } from "@/lib/motion"
import { SplitTextHeading } from "@/components/lattice/SplitTextHeading"
import { DotMatrix } from "@/components/lattice/DotMatrix"
import { MicroLabel } from "@/components/lattice/MicroLabel"
import { CornerTicks } from "@/components/lattice/CornerTicks"

interface PageHeroProps {
  title: string
  subtitle?: string
  description?: string
  /** Blueprint index, e.g. "030" — rendered in the header micro-label. */
  index?: string
  children?: ReactNode
  className?: string
  variant?: "minimal" | "gradient" | "image"
  imageSrc?: string
  imageAlt?: string
}

/**
 * Unified page hero as a lattice header cell: mono index/label rail, dot-matrix
 * (or image) backdrop, split-text title entrance, corner ticks. Content
 * staggers via shared motion variants.
 */
export function PageHero({
  title,
  subtitle,
  description,
  index,
  children,
  className = "",
  variant = "minimal",
  imageSrc,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden border-b border-line bg-canvas py-20 sm:py-24 lg:py-28 ${className}`}
      aria-label={title}
    >
      {/* Backdrop */}
      {variant === "image" && imageSrc ? (
        <div className="absolute inset-0 z-0">
          <Image src={imageSrc} alt={imageAlt} fill priority className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-canvas/70" />
        </div>
      ) : (
        <DotMatrix fade="radial" />
      )}
      <CornerTicks color="line" inset={16} />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={revealContainer(0.05, 0.1)}
      >
        <motion.div variants={revealItem} className="mb-6 flex justify-center">
          <MicroLabel index={index} live>
            {subtitle ?? "PRIORITECH"}
          </MicroLabel>
        </motion.div>

        <SplitTextHeading
          as="h1"
          trigger="immediate"
          className="mb-6 font-mono text-3xl font-bold uppercase leading-tight tracking-tight text-secondary sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {title}
        </SplitTextHeading>

        {description && (
          <motion.p
            variants={revealItem}
            className="mx-auto mb-8 max-w-3xl font-mono text-base leading-relaxed text-secondary/65 sm:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            variants={revealItem}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
