"use client";

import { useEffect, useState } from "react";

interface WordConfig {
  text: string;
  className?: string;
}

/**
 * Typewriter Effect Component
 * 
 * Creates a typewriter effect that types out text character by character,
 * perfect for terminal/CLI aesthetics. Features a blinking cursor.
 * Supports custom styling for individual words.
 * 
 * @param words - Array of strings or word config objects to type out sequentially
 * @param className - Optional CSS classes to apply to the container
 * @param cursorClassName - Optional CSS classes for the cursor element
 * @returns JSX element containing the typewriter effect
 */
export function TypewriterEffect({
  words,
  className = "",
  cursorClassName = "",
}: {
  words: string[] | WordConfig[];
  className?: string;
  cursorClassName?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Convert strings to WordConfig objects
  const wordConfigs: WordConfig[] = words.map(word => 
    typeof word === 'string' ? { text: word } : word
  );

  useEffect(() => {
    const currentWord = wordConfigs[currentWordIndex];
    const currentWordText = currentWord.text;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < currentWordText.length) {
        // Typing
        setDisplayedText(currentWordText.substring(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      } else if (!isDeleting && currentIndex === currentWordText.length) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentIndex > 0) {
        // Deleting
        setDisplayedText(currentWordText.substring(0, currentIndex - 1));
        setCurrentIndex((prev) => prev - 1);
      } else if (isDeleting && currentIndex === 0) {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % wordConfigs.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, currentWordIndex, isDeleting, wordConfigs]);

  const currentWordConfig = wordConfigs[currentWordIndex];
  const wordClassName = currentWordConfig.className || className;

  return (
    <span className={`${wordClassName}`}>
      {displayedText}
      <span className={`animate-pulse ${cursorClassName}`}>|</span>
    </span>
  );
}

