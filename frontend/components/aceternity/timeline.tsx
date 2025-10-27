"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

/**
 * Timeline Component
 * 
 * Creates a terminal-style timeline with animated beam that connects items.
 * Perfect for processes, methodologies, and sequential steps.
 * 
 * @param items - Array of timeline items
 * @param orientation - Timeline orientation: "vertical" or "horizontal" (default: "vertical")
 * @param className - Optional CSS classes to apply
 * @returns JSX element containing the timeline
 */
export function Timeline({
  items,
  orientation = "vertical",
  className = "",
}: {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: orientation === "vertical" ? -20 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="relative flex items-start space-x-4 mb-8"
        >
          {/* Timeline line */}
          {index < items.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-full bg-accent/20" />
          )}
          
          {/* Icon/Number */}
          <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full border-2 border-accent/30">
            {item.icon || (
              <span className="text-accent font-bold">{index + 1}</span>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 pt-1">
            <h3 className="text-secondary font-semibold text-base mb-2 font-mono">
              {item.title}
            </h3>
            <p className="text-secondary/70 text-sm font-mono">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

