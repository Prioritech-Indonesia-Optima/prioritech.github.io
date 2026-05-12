"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { easing } from "@/lib/motion"

/**
 * Consistent section header: eyebrow + headline + optional subhead.
 * Use across all pages for visual rhythm.
 */
export function SectionLead({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow?: string
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
      className={`${align === "center" ? "text-center mx-auto" : ""} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <p className="text-accent font-mono text-sm tracking-wider mb-3">$ {eyebrow}</p>
      )}
      <h2 className="text-secondary text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-[1.1] tracking-tight mb-5">
        {title}
      </h2>
      {subtitle && (
        <p className="text-secondary/65 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
