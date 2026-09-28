"use client"

import dynamic from "next/dynamic"

/** Client-only mount for the persistent graph canvas (no SSR, no hydration cost). */
export const GraphStageClient = dynamic(() => import("./GraphStage"), { ssr: false })
