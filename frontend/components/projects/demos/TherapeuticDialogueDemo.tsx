"use client"

import { useMemo } from "react"
import { TherapeuticChat } from "./visualizations/TherapeuticChat"

/**
 * Therapeutic Dialogue AI demo component.
 * 
 * Displays messenger-style chat interface with therapeutic conversation,
 * sentiment analysis, privacy indicators, and session summaries.
 * Demonstrates secure, empathetic AI dialogue for sensitive applications.
 */
export function TherapeuticDialogueDemo() {
  // Build chat messages
  const chatMessages = useMemo(() => [
    {
      role: "user" as const,
      content: "I've been feeling really overwhelmed with work lately.",
      timestamp: "10:15 AM",
      sentiment: "stressed" as const,
    },
    {
      role: "assistant" as const,
      content: "I understand. That sounds difficult. Can you tell me more about what's making you feel overwhelmed?",
      timestamp: "10:15 AM",
      sentiment: "positive" as const,
    },
    {
      role: "user" as const,
      content: "There's just so much pressure and expectations. I feel like I can't keep up.",
      timestamp: "10:16 AM",
      sentiment: "stressed" as const,
    },
    {
      role: "assistant" as const,
      content: "It sounds like you're carrying a lot of responsibility. That must be really challenging. What strategies have you tried to manage this pressure?",
      timestamp: "10:17 AM",
      sentiment: "calm" as const,
    },
    {
      role: "user" as const,
      content: "I haven't really tried much. I guess I've just been pushing through, but it's not working anymore.",
      timestamp: "10:18 AM",
      sentiment: "stressed" as const,
    },
    {
      role: "assistant" as const,
      content: "Acknowledging that pushing through isn't working is an important first step. Let's explore some practical approaches that might help you find more balance.",
      timestamp: "10:19 AM",
      sentiment: "positive" as const,
    },
  ], [])

  return <TherapeuticChat messages={chatMessages} />
}
