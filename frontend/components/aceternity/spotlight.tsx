"use client";

import { ReactNode } from "react";
import { useEffect, useState } from "react";

/**
 * Spotlight Effect Component
 * 
 * Creates a spotlight effect that follows the cursor or highlights specific areas.
 * Perfect for hero sections and interactive elements.
 * 
 * @param className - Optional CSS classes to apply
 * @param fill - Optional spotlight color (default: accent with transparency)
 * @returns JSX element containing the spotlight effect
 */
export function Spotlight({ 
  className = "",
  fill = "rgba(218, 165, 32, 0.1)"
}: {
  className?: string;
  fill?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 transition duration-300 ${className}`}
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${fill}, transparent 70%)`,
      }}
    />
  );
}

