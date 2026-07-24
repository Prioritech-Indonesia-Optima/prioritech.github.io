"use client"

import dynamic from "next/dynamic"

/** Client-only mount for the persistent engine canvas (no SSR, no hydration cost). */
export const EngineStageClient = dynamic(() => import("./EngineStage"), { ssr: false })
