"use client"

import { useMemo } from "react"
import { FinanceChat } from "./visualizations/FinanceChat"

/**
 * Agentic Finance Tracker demo component.
 * 
 * Displays messenger-style chat interface for finance assistant with spending analysis,
 * category breakdowns, and actionable savings recommendations.
 * Demonstrates conversational AI capabilities for financial management.
 */
export function AgenticFinanceDemo() {
  // Build chat messages with financial insights
  const chatMessages = useMemo(() => [
    {
      role: "user" as const,
      content: "Where is my budget going this month?",
      timestamp: "10:15 AM",
    },
    {
      role: "assistant" as const,
      content: "Based on your spending this month, here's where your budget is allocated:",
      timestamp: "10:15 AM",
      insights: {
        categories: [
          { name: "Entertainment", percentage: 28 },
          { name: "Dining", percentage: 23 },
          { name: "Shopping", percentage: 20 },
          { name: "Transportation", percentage: 15 },
          { name: "Utilities", percentage: 14 },
        ],
        metrics: {
          totalSpending: "$3,245",
          savingsPotential: "$217/mo",
        },
      },
    },
    {
      role: "user" as const,
      content: "What can I do to save more?",
      timestamp: "10:16 AM",
    },
    {
      role: "assistant" as const,
      content: "Here are personalized recommendations to help you save more:",
      timestamp: "10:16 AM",
      insights: {
        recommendations: [
          { action: "Reduce dining out by 40%", savings: "$152/month" },
          { action: "Cancel unused subscriptions", savings: "$65/month" },
          { action: "Optimize entertainment spending", savings: "$45/month" },
        ],
        metrics: {
          totalSpending: "$3,245",
          savingsPotential: "$262/month",
        },
      },
    },
  ], [])

  return <FinanceChat messages={chatMessages} />
}
