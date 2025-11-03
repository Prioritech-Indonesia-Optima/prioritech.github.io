"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { User, Bot, TrendingDown, DollarSign } from "lucide-react"

/**
 * FinanceChat component for displaying messenger-style finance conversation.
 * 
 * Messenger chat interface for finance assistant with user and AI message bubbles,
 * financial insights, spending analysis, and actionable recommendations.
 * Animated message appearance with financial data visualization.
 * 
 * @param messages - Array of chat messages with role, content, timestamp, and optional insights
 * @param className - Optional CSS classes
 * 
 * @returns Messenger-style finance chat interface
 */
interface FinanceMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
  insights?: {
    categories?: Array<{ name: string; percentage: number }>
    recommendations?: Array<{ action: string; savings: string }>
    metrics?: { totalSpending: string; savingsPotential: string }
  }
}

interface FinanceChatProps {
  messages: FinanceMessage[]
  className?: string
}

export function FinanceChat({
  messages,
  className = "",
}: FinanceChatProps) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const [displayedMessages, setDisplayedMessages] = useState<FinanceMessage[]>([])
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
      }, index * 1200) // Delay between messages
    })
  }, []) // Only run once on mount

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
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-secondary font-semibold text-sm">Finance AI Assistant</h3>
              <p className="text-xs text-secondary/60 mt-0.5">Analyzing spending & providing insights</p>
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
                    
                    {/* Financial Insights */}
                    {message.insights && (
                      <div className="mt-3 pt-3 border-t border-secondary/10 space-y-2">
                        {/* Spending Categories */}
                        {message.insights.categories && (
                          <div>
                            <div className="text-xs text-secondary/70 mb-2 font-semibold">Top Categories:</div>
                            {message.insights.categories.map((cat, i) => (
                              <div key={i} className="flex items-center justify-between gap-3 mb-1">
                                <span className="text-xs text-secondary/80">{cat.name}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-1.5 bg-main/50 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-accent"
                                      style={{ width: `${cat.percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-xs text-accent font-semibold">{cat.percentage}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Recommendations */}
                        {message.insights.recommendations && (
                          <div className="mt-3">
                            <div className="text-xs text-secondary/70 mb-2 font-semibold flex items-center gap-1">
                              <TrendingDown className="w-3 h-3 text-green-500" />
                              Recommendations:
                            </div>
                            {message.insights.recommendations.map((rec, i) => (
                              <div key={i} className="text-xs text-secondary/90 mb-1.5 flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                <span>
                                  {rec.action} <span className="text-green-500 font-semibold">→ Save {rec.savings}</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Metrics */}
                        {message.insights.metrics && (
                          <div className="mt-3 pt-2 border-t border-secondary/10 grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-xs text-secondary/60">Total Spending</div>
                              <div className="text-sm text-secondary font-semibold">{message.insights.metrics.totalSpending}</div>
                            </div>
                            <div>
                              <div className="text-xs text-secondary/60">Savings Potential</div>
                              <div className="text-sm text-green-500 font-semibold">{message.insights.metrics.savingsPotential}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className={`flex items-center gap-2 mt-1 text-xs ${isUser ? "flex-row" : "flex-row-reverse"}`}>
                    <span className="text-secondary/40">{message.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </motion.div>
  )
}
