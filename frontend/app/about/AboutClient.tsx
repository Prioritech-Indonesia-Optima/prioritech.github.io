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
    <div className="min-h-screen bg-main">
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
      <Suspense fallback={<footer className="py-8 bg-main border-t border-accent/20" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
