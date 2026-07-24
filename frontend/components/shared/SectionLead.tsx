"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { easing } from "@/lib/motion"
import { MicroLabel } from "@/components/lattice/MicroLabel"

/**
 * Consistent section header in the instrument-panel language: mono index/eyebrow
 * micro-label + uppercase headline + optional subhead.
 */
export function SectionLead({
  eyebrow,
  index,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow?: string
  index?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: "left" | "center"
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: easing.outExpo }}
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {(eyebrow || index) && (
        <MicroLabel index={index} live className={`mb-4 ${align === "center" ? "inline-flex" : "flex"}`}>
          {eyebrow?.toUpperCase()}
        </MicroLabel>
      )}
      <h2 className="mb-5 font-sans text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-secondary/65 sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  )
}
