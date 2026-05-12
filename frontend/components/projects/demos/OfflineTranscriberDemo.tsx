"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { AnimatedTerminal, Panel, PulseDot, TermLine } from "./shared/primitives"

/**
 * Offline Transcriber — waveform + live transcript + summary.
 */
export function OfflineTranscriberDemo() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 90)
    return () => clearInterval(id)
  }, [])

  const transcript = [
    "Okay, so what we discovered last week is that the inference latency",
    "is dominated by tokenizer overhead, not the model itself.",
    "We can shave roughly 38 milliseconds by switching to the fast tokenizer.",
    "Action item: ship that to staging by Friday.",
    "Risk: bigger memory footprint, around 12 megabytes more per worker.",
  ]
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [renderedLines, setRenderedLines] = useState<string[]>([])

  useEffect(() => {
    if (textIndex >= transcript.length) {
      const t = setTimeout(() => {
        setRenderedLines([])
        setTextIndex(0)
        setCharIndex(0)
      }, 4500)
      return () => clearTimeout(t)
    }
    const current = transcript[textIndex]
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28 + Math.random() * 30)
      return () => clearTimeout(t)
    } else {
      setRenderedLines((prev) => [...prev, current])
      setTextIndex((t) => t + 1)
      setCharIndex(0)
    }
  }, [textIndex, charIndex])

  // Waveform: 48 bars, sinusoidal + jitter
  const bars = Array.from({ length: 48 }, (_, i) => {
    const h = (Math.sin(i * 0.4 + tick * 0.4) + 1) * 0.4 + 0.2 + Math.random() * 0.18
    return Math.max(0.08, Math.min(1, h))
  })

  const term: TermLine[] = [
    { kind: "cmd", text: "transcribe --model whisper.cpp/tiny.q5 --offline" },
    { kind: "info", text: "Loaded · 75MB · CPU-only · no network" },
    { kind: "ok", text: "Vad detector: speech segments=12 · avg confidence 0.91" },
    { kind: "info", text: "Streaming partials @ 24Hz" },
    { kind: "ok", text: "Summarizer (local LLM 1.1B) · 2 action items extracted" },
  ]

  return (
    <DemoShell
      title="Offline Transcriber"
      subtitle="On-device transcription + summarization · zero cloud dependency"
      status="secure"
      kpis={[
        { label: "Latency", value: "180ms", trend: "down" },
        { label: "WER", value: "4.1%", trend: "down" },
        { label: "Model", value: "75MB", hint: "quantized" },
        { label: "Network", value: "OFF", hint: "offline" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Audio · meeting capture"
          right={<div className="flex items-center gap-2"><PulseDot color="bg-rose-400" /><span className="text-[10px] uppercase tracking-wider text-rose-300">REC</span></div>}
          className="lg:col-span-3">
          <div className="rounded bg-main/40 border border-accent/15 p-4">
            <div className="flex items-end gap-[2px] h-20">
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: `${h * 100}%` }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex-1 bg-gradient-to-t from-accent/40 to-accent rounded-sm"
                  style={{ minHeight: 2 }}
                />
              ))}
            </div>
            <div className="mt-3 text-[10px] text-secondary/50 font-mono flex items-center justify-between">
              <span>16kHz · mono · float32 · 24Hz partials</span>
              <span>04:{(18 + Math.floor(tick / 10)).toString().padStart(2, "0")}</span>
            </div>
          </div>

          <div className="mt-4 rounded bg-main/40 border border-accent/15 p-4 max-h-[180px] overflow-y-auto scrollbar-hide">
            {renderedLines.map((l, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="text-sm text-secondary/85 font-mono leading-relaxed mb-1.5">
                <span className="text-accent">›</span> {l}
              </motion.div>
            ))}
            {textIndex < transcript.length && (
              <div className="text-sm text-secondary/85 font-mono leading-relaxed">
                <span className="text-accent">›</span> {transcript[textIndex].slice(0, charIndex)}
                <span className="inline-block w-2 h-3 align-middle bg-accent ml-0.5 animate-pulse" />
              </div>
            )}
          </div>
        </Panel>

        <div className="lg:col-span-2 space-y-4">
          <AnimatedTerminal lines={term} height={220} />
          <Panel title="Auto-summary">
            <p className="text-xs text-secondary/80 leading-relaxed mb-3">
              Tokenizer overhead dominates inference latency. Switching to fast tokenizer recovers ~38ms.
            </p>
            <div className="text-[10px] uppercase tracking-wider text-secondary/55 mb-1">Action items</div>
            <ul className="text-xs space-y-1 text-secondary/85">
              <li>• Ship fast tokenizer to staging — <span className="text-accent">Fri</span></li>
              <li>• Audit per-worker memory budget — <span className="text-accent">+12MB</span></li>
            </ul>
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}
