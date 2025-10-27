"use client";

import { ReactNode } from "react";

/**
 * Moving Border Component
 * 
 * Creates an animated border that moves around a container on hover.
 * Perfect for buttons, cards, and interactive elements.
 * 
 * @param children - Child content to wrap with moving border
 * @param className - Optional CSS classes to apply
 * @param borderRadius - Border radius value (default: "12px")
 * @returns JSX element containing children with moving border
 */
export function MovingBorder({
  children,
  className = "",
  borderRadius = "12px",
}: {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
}) {
  return (
    <div
      style={
        {
          "--borderRadius": borderRadius,
        } as React.CSSProperties
      }
      className={`relative inline-block overflow-hidden rounded-[calc(var(--borderRadius))] p-[1px] ${className}`}
    >
      <div
        className="absolute inset-0 opacity-100 transition-opacity group-hover:opacity-50"
        style={{
          borderRadius: "inherit",
        }}
      >
        {/* Gradient border */}
        <div
          className="absolute inset-0 rotate-180"
          style={{
            background: `linear-gradient(90deg, rgba(218, 165, 32, 0.5), transparent, rgba(218, 165, 32, 0.5))`,
          }}
        />
      </div>

      <div
        className="relative z-10 h-full w-full"
        style={{
          borderRadius: "inherit",
        }}
      >
        {children}
      </div>
    </div>
  );
}

