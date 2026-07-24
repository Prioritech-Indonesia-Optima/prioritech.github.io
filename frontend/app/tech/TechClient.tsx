"use client"

import { Suspense, lazy } from "react"
import { Navbar } from "@/components/common/Navbar"
import {
  TechHero,
  TechStackLayers,
  EngineeringPrinciples,
  SecurityHardwareSplit,
  DevelopmentApproach,
  TechCTA,
} from "@/components/tech/sections"

const Footer = lazy(() =>
  import("@/components/common/Footer").then((m) => ({ default: m.Footer }))
)

export default function TechClient() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main-content">
        <TechHero />
        <TechStackLayers />
        <EngineeringPrinciples />
        <SecurityHardwareSplit />
        <DevelopmentApproach />
        <TechCTA />
      </main>
      <Suspense fallback={<footer className="py-8 bg-canvas border-t border-line" />}>
        <Footer />
      </Suspense>
    </div>
  )
}
