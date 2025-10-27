"use client";

import { ReactNode } from "react";

/**
 * Glowing Border Component
 * 
 * Creates a border with glowing effect that adapts to hover and focus states.
 * Mimics terminal cursor selection and terminal window borders.
 * 
 * @param children - Child content to wrap with glowing border
 * @param className - Optional CSS classes to apply
 * @param glowColor - Color of the glow effect (default: accent color)
 * @returns JSX element containing children with glowing border
 */
export function GlowingBorder({
  children,
  className = "",
  glowColor = "rgba(218, 165, 32, 0.5)",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`group relative ${className}`}
      style={{
        "--glow-color": glowColor,
      } as React.CSSProperties}
    >
      {/* Glowing gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-[var(--glow-color)] to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
      
      {/* Inner content container */}
      <div className="relative bg-main/50 backdrop-blur-sm">{children}</div>
    </div>
  );
}

