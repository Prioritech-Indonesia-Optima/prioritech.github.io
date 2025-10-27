"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"

/**
 * Offline Transcriber demo component.
 * 
 * Simulates audio file processing, speech-to-text transcription, and
 * summarization using unified fade-in animation.
 */
export function OfflineTranscriberDemo() {
  // Build lines array
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Offline Transcriber - Local Processing", color: "text-accent", instant: true },
    { prefix: ">", text: "Scanning for audio files...", color: "text-info", instant: true },
    { prefix: ">", text: "Processing: meeting_recording.mp3", color: "text-info", instant: true },
    { text: "Format: MP3, 16kHz, Mono" },
    { text: "Duration: 2:34" },
    { prefix: ">", text: "Transcribing speech...", color: "text-info", instant: true },
    { text: "Model: Whisper-Small (Offline)" },
    { text: "Progress: Processing audio chunks (1/3)..." },
    { prefix: "✓", text: "Transcription complete:", color: "text-green-500", instant: true },
    { text: "Good morning everyone. Today we'll be discussing our quarterly" },
    { text: "results. Sales are up twenty percent compared to last quarter." },
    { text: "Our new product line has been performing exceptionally well." },
    { prefix: ">", text: "Generating summary...", color: "text-info", instant: true },
    { text: "Summary:", instant: true },
    { text: "Meeting discusses Q4 results: +20% sales growth, new product success," },
    { text: "positive customer feedback, optimistic outlook." },
    { text: "Word count: 87 • Accuracy: 96% • Processing time: 8s" },
    { prefix: "✓", text: "All processing done locally, no cloud dependency", color: "text-green-500", instant: true }
  ], [])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="offline-transcriber">
      {visibleLines.map((line, i) => (
        <TerminalLine
          key={i}
          text={line.text}
          prefix={line.prefix}
          color={line.color}
          isAnimating={line.isAnimating}
        />
      ))}
      {showCursor && (
        <span className="animate-cursor-blink text-accent">▊</span>
      )}
    </TerminalWindow>
  )
}
