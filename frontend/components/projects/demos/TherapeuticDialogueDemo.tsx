"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DemoShell, StatusPill } from "./shared/DemoShell"
import { ChatBubble, Panel, LineChart } from "./shared/primitives"

/**
 * Therapeutic Dialogue AI — sentiment-aware conversation with privacy badges.
 */
export function TherapeuticDialogueDemo() {
  const transcript: { variant: "user" | "agent" | "system"; text: string; from?: string; meta?: string; sentiment?: number }[] = [
    { variant: "system", text: "End-to-end encrypted · on-device inference" },
    { variant: "user",  text: "I've been feeling overwhelmed at work lately.", meta: "14:02", sentiment: 0.32 },
    { variant: "agent", from: "companion", text: "Thank you for sharing that with me. Feeling overwhelmed is a heavy thing to carry. Can you tell me what's been weighing on you most?", meta: "14:02" },
    { variant: "user",  text: "Just too many deadlines, and I can't switch off when I get home.", meta: "14:03", sentiment: 0.28 },
    { variant: "agent", from: "companion", text: "That sounds exhausting — the inability to rest is often as hard as the work itself. Would it help if we explored small boundaries you could try this week?", meta: "14:03" },
  ]

  const [shown, setShown] = useState(1)
  useEffect(() => {
    if (shown >= transcript.length) {
      const t = setTimeout(() => setShown(1), 6000)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShown((s) => s + 1), 1500)
    return () => clearTimeout(t)
  }, [shown, transcript.length])

  const sentiment = transcript[shown - 1]?.sentiment ?? 0.5

  // Sentiment across the exchange — dips on user turns, lifts after companion responses
  const sentimentTrajectory = [0.46, 0.32, 0.4, 0.28, 0.42]

  return (
    <DemoShell
      title="Therapeutic Dialogue AI"
      subtitle="Secure, sentiment-aware conversational engine · sensitivity-first"
      status="secure"
      kpis={[
        { label: "Privacy", value: "on-device" },
        { label: "Sentiment", value: sentiment < 0.4 ? "low" : "balanced", trend: sentiment < 0.4 ? "down" : "flat" },
        { label: "Sessions", value: "1,840" },
        { label: "Safety", value: "100%", trend: "up", hint: "guardrails" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <Panel title="Conversation" className="lg:col-span-3"
          right={<div className="flex gap-2"><StatusPill label="HIPAA-aware" tone="info" /><StatusPill label="no logging" tone="success" /></div>}>
          <div className="max-h-[380px] overflow-y-auto scrollbar-hide pr-2">
            {transcript.slice(0, shown).map((m, i) => (
              <ChatBubble key={i} variant={m.variant} from={m.from} text={m.text} meta={m.meta} />
            ))}
            {shown < transcript.length && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-foreground/40 italic ml-2"
              >
                companion is composing…
              </motion.div>
            )}
          </div>
        </Panel>

        <div className="lg:col-span-2 space-y-4">
          <Panel title="Sentiment trajectory">
            <LineChart
              series={sentimentTrajectory}
              xLabels={["t1", "t2", "t3", "t4", "t5"]}
              yMin={0.2}
              yMax={0.55}
              yFormat={(v) => v.toFixed(2)}
              stroke="#daa520"
              height={120}
            />
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
              <span className="text-foreground/45">empathy threshold 0.40</span>
              <span className="text-foreground/45">escalate &lt; 0.20</span>
            </div>
            <p className="text-[11px] text-foreground/55 mt-3 leading-relaxed">
              Companion responds with empathy when sentiment dips below 0.4 — escalates to human review at 0.2.
            </p>
          </Panel>
          <Panel title="Privacy guarantees">
            <ul className="text-xs space-y-1.5 text-foreground/75 font-mono">
              <li>✓ no transcripts persisted</li>
              <li>✓ inference fully on-device</li>
              <li>✓ ephemeral context window</li>
              <li>✓ user-only key derivation</li>
            </ul>
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}
