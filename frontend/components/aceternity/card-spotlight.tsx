"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Card Spotlight Component
 * 
 * Creates a spotlight effect on cards that follows the mouse pointer.
 * Perfect for project cards, division cards, and featured content.
 * 
 * @param children - Child content to wrap with spotlight effect
 * @param className - Optional CSS classes to apply
 * @returns JSX element containing children with card spotlight
 */
export function CardSpotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(218, 165, 32, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative">{children}</div>
    </motion.div>
  );
}

