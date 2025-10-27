"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Tracing Beam Component
 * 
 * Creates an animated beam that follows an SVG path as the user scrolls.
 * Perfect for timelines, processes, and connecting elements.
 * 
 * @param children - Child elements to render
 * @param className - Optional CSS classes to apply
 * @returns JSX element containing the tracing beam effect
 */
export function TracingBeam({ 
  children, 
  className = "" 
}: { 
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      setSvgHeight(rect.height);
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [50, svgHeight + 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, svgHeight + 100]);

  return (
    <motion.div ref={ref} className={`relative w-full ${className}`}>
      <div className="absolute left-0 top-0 h-full w-full">
        <svg className="absolute left-0 top-0 h-full w-full" width="2" height={svgHeight}>
          <motion.line
            x1="1"
            y1={y1}
            x2="1"
            y2={y2}
            stroke="url(#linearGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
          <defs>
            <linearGradient id="linearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(218, 165, 32, 0.8)" />
              <stop offset="100%" stopColor="rgba(218, 165, 32, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </motion.div>
  );
}

