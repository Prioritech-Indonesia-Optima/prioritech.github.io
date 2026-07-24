"use client"

import { Suspense, lazy } from "react"
import { Navbar } from "@/components/common/Navbar"
import {
  AboutHero,
  PrincipleManifest,
  CompanyStats,
  AntiFeatures,
  CompanyTimeline,
  LocationBand,
  AboutCTA,
} from "@/components/about/sections"

const Footer = lazy(() =>
  import("@/components/common/Footer").then((m) => ({ default: m.Footer }))
)

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main-content">
        <AboutHero />
        <PrincipleManifest />
        <CompanyStats />
        <AntiFeatures />
        <CompanyTimeline />
        <LocationBand />
        <AboutCTA />
      </main>
      <Suspense fallback={<footer className="py-8 bg-canvas border-t border-line" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
