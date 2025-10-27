"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Text Generate Effect Component
 * 
 * Fades in text word by word with optional stagger animation.
 * Perfect for terminal-style output where text appears progressively.
 * 
 * @param words - Text to split into words and animate
 * @param className - Optional CSS classes to apply to the container
 * @param delayMultiple - Delay multiplier between words (default: 0.1)
 * @param duration - Duration for each word fade-in (default: 0.5)
 * @returns JSX element containing the text generate effect
 */
export function TextGenerateEffect({
  words,
  className = "",
  delayMultiple = 0.1,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  delayMultiple?: number;
  duration?: number;
}) {
  const [splittedWords, setSplittedWords] = useState<string[]>([]);

  useEffect(() => {
    setSplittedWords(words.split(" "));
  }, [words]);

  return (
    <div className="flex flex-wrap">
      {splittedWords.map((word, idx) => (
        <motion.span
          key={word + idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: duration,
            delay: idx * delayMultiple,
          }}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

