"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface ModernCardProps {
  title: string
  description?: string
  icon?: ReactNode
  children?: ReactNode
  variant?: "default" | "glass" | "elevated"
  hover?: boolean
  className?: string
  delay?: number
}

export function ModernCard({
  title,
  description,
  icon,
  children,
  variant = "default",
  hover = true,
  className = "",
  delay = 0,
}: ModernCardProps) {
  const baseStyles = "relative rounded-xl overflow-hidden font-mono transition-all duration-300 ease-out group"
  
  const variantStyles = {
    default: "bg-main/60 backdrop-blur-md border border-accent/20",
    glass: "bg-main/40 backdrop-blur-xl border border-accent/10",
    elevated: "bg-main/70 backdrop-blur-md border border-accent/20 shadow-lg shadow-accent/5",
  }
  
  const hoverStyles = hover
    ? "hover:bg-main/80 hover:border-accent/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
    : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10 p-6">
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 flex-shrink-0 group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-300">
            <div className="text-accent">{icon}</div>
          </div>
        )}
        
        <h3 className="text-secondary font-semibold text-base sm:text-lg mb-3 group-hover:text-accent/90 transition-colors duration-300">
          {title}
        </h3>
        
        {description && (
          <p className="text-secondary/60 text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        )}
        
        {children && <div className="mt-4">{children}</div>}
      </div>
    </motion.div>
  )
}
