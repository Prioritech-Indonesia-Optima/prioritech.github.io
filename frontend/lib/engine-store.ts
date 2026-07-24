"use client"

/**
 * Global state for the persistent 3D rocket engine.
 *
 * The engine canvas lives once in the root layout; the home page's cinematic
 * track writes `phase` (0..1) as you scroll, the 3D rig reads it every frame
 * and writes back the screen-space `anchors` (projected part positions) that
 * drive the frame-tracked callout lines, plus the dark↔paper `blend`.
 * Everything is mutable + subscription-based — zero React re-renders per frame.
 */

import { motionValue } from "framer-motion"

export interface AnchorState {
  /** projected screen position, % of viewport */
  x: number
  y: number
  /** 0..1 — callout opacity */
  visible: number
  /** 0..1 — focused-part emphasis */
  emphasis: number
}

/** All callouts live on the RIGHT margin — the left column belongs to the
    content cards, so labels and cards can never overlap. */
export const DIVISION_PARTS = [
  { index: "001", part: "FEED MANIFOLD", name: "AI Systems & Orchestration", spec: "agents · retrieval · pipelines", side: "right" as const, href: "/divisions#ai-systems" },
  { index: "002", part: "TURBOPUMP", name: "Cybersecurity Intelligence", spec: "detection · pentesting · SOC", side: "right" as const, href: "/divisions#cybersecurity" },
  { index: "003", part: "INJECTOR PLATE", name: "Quantitative Engineering", spec: "models · forecasting · execution", side: "right" as const, href: "/divisions#quantitative" },
  { index: "004", part: "COMBUSTION CHAMBER", name: "Automation & Robotics", spec: "PLC · robotics · edge vision", side: "right" as const, href: "/divisions#automation" },
  { index: "005", part: "NOZZLE", name: "Applied Product Engineering", spec: "ERP · WMS · SCM · CRM", side: "right" as const, href: "/divisions#applied" },
]

type Listener = () => void

export const engineStore = {
  /** 0..1 scroll progress through the home cinematic track */
  phase: motionValue(0),
  /** dark(0) ↔ paper(1) — drives the page background cross-fade */
  blend: motionValue(0),
  /** projected part anchors, written by the rig each frame */
  anchors: Array.from({ length: 5 }, (): AnchorState => ({ x: 50, y: 50, visible: 0, emphasis: 0 })),
  webglFailed: false,
  listeners: new Set<Listener>(),
  subscribe(l: Listener): () => void {
    this.listeners.add(l)
    return () => this.listeners.delete(l)
  },
  notify(): void {
    this.listeners.forEach((l) => l())
  },
}
