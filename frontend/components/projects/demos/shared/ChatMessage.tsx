"use client"

import { useEffect, useState } from "react"
import { User, Bot } from "lucide-react"

/**
 * ChatMessage component for conversational demos.
 * 
 * Displays chat message bubbles with user/AI distinction, timestamps,
 * sentiment indicators, and smooth slide-in animations.
 * 
 * @param role - Message sender (user or assistant)
 * @param content - Message text content
 * @param timestamp - Optional timestamp string
 * @param sentiment - Optional sentiment indicator
 * @param typingSpeed - Speed for animated typing effect
 * @param delay - Delay before message appears
 * 
 * @returns Chat bubble with appropriate styling and animation
 */
interface ChatMessageProps {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
  sentiment?: string
  typingSpeed?: number
  delay?: number
}

export function ChatMessage({
  role,
  content,
  timestamp,
  sentiment,
  typingSpeed = 30,
  delay = 0
}: ChatMessageProps) {
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    let currentLength = 0
    const interval = setInterval(() => {
      if (currentLength <= content.length) {
        setDisplayText(content.slice(0, currentLength))
        currentLength++
      } else {
        clearInterval(interval)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [content, typingSpeed, isVisible])

  const getSentimentColor = () => {
    if (!sentiment) return ""
    switch (sentiment.toLowerCase()) {
      case "positive": return "text-green-500"
      case "negative": return "text-red-500"
      case "neutral": return "text-secondary/60"
      default: return ""
    }
  }

  return (
    <div
      className={`flex gap-3 mb-4 ${
        role === "user" ? "flex-row" : "flex-row-reverse"
      } transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          role === "user"
            ? "bg-accent/20 text-accent"
            : "bg-secondary/10 text-secondary"
        }`}
      >
        {role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div
        className={`flex flex-col max-w-[80%] ${
          role === "user" ? "items-start" : "items-end"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-lg font-mono text-sm ${
            role === "user"
              ? "bg-accent/10 text-secondary border border-accent/20"
              : "bg-main/50 text-secondary border border-secondary/20"
          }`}
        >
          {displayText}
          {displayText.length < content.length && (
            <span className="animate-cursor-blink text-accent">▊</span>
          )}
        </div>

        {/* Timestamp and Sentiment */}
        {(timestamp || sentiment) && (
          <div className={`flex items-center gap-2 mt-1 text-xs ${getSentimentColor()}`}>
            {timestamp && <span className="text-secondary/40">{timestamp}</span>}
            {sentiment && (
              <span className={`${getSentimentColor()}`}>
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

