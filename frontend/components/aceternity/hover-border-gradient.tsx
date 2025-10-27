"use client";

import { ReactNode } from "react";

/**
 * Hover Border Gradient Component
 * 
 * Creates a button or element with a gradient border that animates on hover.
 * The gradient border expands to fill the entire element on interaction.
 * 
 * @param children - Child content to wrap with gradient border
 * @param className - Optional CSS classes to apply
 * @param containerClassName - Optional CSS classes for the container
 * @param borderClassName - Optional CSS classes for the border
 * @returns JSX element containing children with hover border gradient
 */
export function HoverBorderGradient({
  children,
  className = "",
  containerClassName = "",
  borderClassName = "",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      {/* Gradient border */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm ${borderClassName}`}
      />

      {/* Inner content */}
      <div className={`relative ${containerClassName}`}>{children}</div>
    </div>
  );
}

