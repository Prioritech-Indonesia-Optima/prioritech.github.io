"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface PrimaryButtonProps {
  href: string
  children: ReactNode
  icon?: boolean
  className?: string
}

export function PrimaryButton({ href, children, icon = true, className = "" }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`
        group relative inline-flex items-center justify-center gap-2 
        bg-accent hover:bg-accent/90 text-main 
        px-6 py-3 rounded-lg font-semibold font-mono
        transition-all duration-300 ease-out
        hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02]
        active:scale-[0.98]
        ${className}
      `}
    >
      <span>{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  )
}

interface SecondaryButtonProps {
  href: string
  children: ReactNode
  icon?: boolean
  className?: string
}

export function SecondaryButton({ href, children, icon = false, className = "" }: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      className={`
        group relative inline-flex items-center justify-center gap-2 
        bg-main/60 backdrop-blur-sm border border-accent/30 
        hover:border-accent hover:bg-main/80
        text-secondary hover:text-accent
        px-6 py-3 rounded-lg font-semibold font-mono
        transition-all duration-300 ease-out
        hover:shadow-lg active:scale-[0.98]
        ${className}
      `}
    >
      <span>{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  )
}

interface ButtonProps {
  onClick?: () => void
  children: ReactNode
  variant?: "primary" | "secondary"
  type?: "button" | "submit"
  className?: string
  disabled?: boolean
}

export function Button({ 
  onClick, 
  children, 
  variant = "primary", 
  type = "button",
  className = "",
  disabled = false
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold font-mono transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantStyles = {
    primary: "bg-accent hover:bg-accent/90 text-main hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.02]",
    secondary: "bg-main/60 backdrop-blur-sm border border-accent/30 hover:border-accent hover:bg-main/80 text-secondary hover:text-accent hover:shadow-lg"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
