"use client"

import { Suspense, lazy } from "react"
import { Navbar } from "@/components/common/Navbar"
import { ScrollProgress } from "@/components/common/ScrollProgress"
import { TimelineScrubber } from "@/components/common/TimelineScrubber"
import { Cinematic } from "@/components/home/Cinematic"

const MetricsPanel = lazy(() =>
  import("@/components/home/metrics/MetricsPanel").then((m) => ({ default: m.MetricsPanel })),
)
const Footer = lazy(() => import("@/components/common/Footer").then((m) => ({ default: m.Footer })))

/**
 * Home — one continuous cinematic around the persistent rocket engine
 * (mounted in the root layout): assembled hero → blueprint dissection with
 * frame-tracked callouts → ignition CTA, then the operational tail sections
 * with the engine docked as an emblem.
 */
export default function HomePage(): JSX.Element {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas">
      <ScrollProgress />
      <TimelineScrubber />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <Cinematic />

        {/* Operational tail — engine docks to emblem mode here */}
        <div className="relative bg-canvas">
          <Suspense fallback={<div className="h-[420px] border-b border-line bg-canvas" />}>
            <MetricsPanel />
          </Suspense>
          <ProjectsRailLazy />
        </div>
      </main>

      <Suspense fallback={<footer className="h-64 border-t border-line bg-canvas" />}>
        <Footer />
      </Suspense>
    </div>
  )
}

const ProjectsRail = lazy(() =>
  import("@/components/home/ProjectsRail").then((m) => ({ default: m.ProjectsRail })),
)

function ProjectsRailLazy(): JSX.Element {
  return (
    <Suspense fallback={<div className="h-[420px] bg-canvas" />}>
      <ProjectsRail />
    </Suspense>
  )
}
