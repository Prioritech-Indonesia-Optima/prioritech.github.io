"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { User, Bot, Lock, Shield } from "lucide-react"

/**
 * TherapeuticChat component for displaying messenger-style therapeutic conversation.
 * 
 * Messenger chat interface with user and AI message bubbles, timestamps,
 * sentiment indicators, and privacy indicators. Animated message appearance.
 * 
 * @param messages - Array of chat messages with role, content, timestamp, and sentiment
 * @param className - Optional CSS classes
 * 
 * @returns Messenger-style chat interface
 */
interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
  sentiment?: "positive" | "negative" | "stressed" | "calm" | "neutral"
}

interface TherapeuticChatProps {
  messages: ChatMessage[]
  className?: string
}

export function TherapeuticChat({
  messages,
  className = "",
}: TherapeuticChatProps) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([])
  const hasAnimatedRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [displayedMessages])

  useEffect(() => {
    if (hasAnimatedRef.current || messages.length === 0) return

    hasAnimatedRef.current = true

    // Animate messages appearing one by one
    messages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index])
        setDisplayedMessages((prev) => [...prev, messages[index]])
      }, index * 1500) // Delay between messages
    })
  }, []) // Only run once on mount

  const getSentimentColor = (sentiment?: string) => {
    if (!sentiment) return "text-secondary/50"
    switch (sentiment.toLowerCase()) {
      case "positive":
      case "calm":
        return "text-green-500"
      case "negative":
      case "stressed":
        return "text-yellow-500"
      case "neutral":
        return "text-secondary/50"
      default:
        return "text-secondary/50"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="bg-main/50 border border-accent/20 rounded-lg overflow-hidden font-mono">
        {/* Chat Header */}
        <div className="bg-main/80 border-b border-accent/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-secondary font-semibold text-sm">Therapeutic AI Assistant</h3>
              <div className="flex items-center gap-2 mt-1">
                <Lock className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">Encrypted</span>
                <Shield className="w-3 h-3 text-green-500 ml-2" />
                <span className="text-xs text-green-500">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-auto px-4 py-6 space-y-4">
          {displayedMessages.map((message, index) => {
            const isUser = message.role === "user"
            const isVisible = visibleMessages.includes(index)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 20,
                  scale: isVisible ? 1 : 0.95,
                }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${isUser ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUser
                      ? "bg-accent/20 text-accent"
                      : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {isUser ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`flex flex-col max-w-[75%] ${
                    isUser ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? "bg-accent/15 text-secondary border border-accent/30 rounded-tl-none"
                        : "bg-main/80 text-secondary border border-secondary/20 rounded-tr-none"
                    }`}
                  >
                    {message.content}
                  </div>

                  {/* Timestamp and Sentiment */}
                  <div className={`flex items-center gap-2 mt-1 text-xs ${isUser ? "flex-row" : "flex-row-reverse"}`}>
                    <span className="text-secondary/40">{message.timestamp}</span>
                    {message.sentiment && (
                      <span className={getSentimentColor(message.sentiment)}>
                        • {message.sentiment}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Session Summary (if all messages shown) */}
        {displayedMessages.length === messages.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-accent/10 bg-main/30 px-6 py-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500 font-semibold">Session Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-secondary/70">
              <div>Duration: 12 minutes</div>
              <div>Sentiment: Improved</div>
              <div>Topics: Work stress, expectations</div>
              <div>Status: Encrypted & stored locally</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
