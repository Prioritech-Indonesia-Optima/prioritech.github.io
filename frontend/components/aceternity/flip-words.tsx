"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Flip Words Component
 * 
 * Creates a word rotation animation where words flip through a list.
 * Perfect for dynamic key terms and changing text.
 * 
 * @param words - Array of words to rotate through
 * @param duration - Time between word changes in seconds (default: 3)
 * @param className - Optional CSS classes to apply
 * @returns JSX element containing the flip words effect
 */
export function FlipWords({
  words,
  duration = 3,
  className = "",
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let startTime = Date.now();

    const updateWord = () => {
      setCurrentWord((prev) => {
        const currentIndex = words.indexOf(prev);
        return words[(currentIndex + 1) % words.length];
      });
    };

    interval = setInterval(() => {
      startTime = Date.now();
      updateWord();
    }, duration * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [words, duration]);

  return (
    <div className={`inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

