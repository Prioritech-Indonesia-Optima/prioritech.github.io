"use client";

import { ReactNode } from "react";

/**
 * Lamp Effect Component
 * 
 * Creates a lamp-like effect for section headers as seen on Linear.
 * Adds an elegant illumination to important headings.
 * 
 * @param children - Text content for the lamp effect
 * @param className - Optional CSS classes to apply
 * @returns JSX element containing the lamp effect
 */
export function LampEffect({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Lamp glow effect */}
      <div className="absolute inset-0 -z-10 blur-xl bg-accent/20 rounded-xl opacity-50" />
      
      {/* Lamp beam */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
      
      {/* Content */}
      <span className="relative">{children}</span>
    </div>
  );
}

