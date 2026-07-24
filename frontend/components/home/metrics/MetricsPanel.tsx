"use client"

import { LiveTelemetry } from "./LiveTelemetry"
import { MonoGauge } from "./MonoGauge"
import { MicroLabel } from "@/components/lattice/MicroLabel"
import { CornerTicks } from "@/components/lattice/CornerTicks"
import { OdometerNumber } from "@/components/lattice/OdometerNumber"

const STATS = [
  { value: 3, suffix: "", label: "SYSTEMS LIVE IN PRODUCTION" },
  { value: 5, suffix: "", label: "ENGINEERING DIVISIONS" },
  { value: 0, suffix: "", label: "SUBCONTRACTORS · EVER" },
  { value: 1, suffix: "", label: "JAKARTA HQ" },
]

/**
 * OPERATIONS / LIVE — a metrics instrument panel: streaming telemetry line,
 * a coverage gauge, and odometer stat tiles. The evolution of the old hero
 * control panel and company-stats strip.
 */
export function MetricsPanel(): JSX.Element {
  return (
    <section className="relative border-b border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-line py-3">
          <MicroLabel index="004" live>
            OPERATIONS / LIVE
          </MicroLabel>
          <MicroLabel>TELEMETRY · SYNTHETIC FEED</MicroLabel>
        </div>

        <div className="grid gap-px bg-line py-px lg:grid-cols-[1.6fr_1fr]">
          {/* Live telemetry */}
          <div className="relative bg-canvas p-5 sm:p-6">
            <CornerTicks color="line" />
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-sm font-semibold text-secondary">Throughput</div>
              <MicroLabel live>REQ/S</MicroLabel>
            </div>
            <div className="h-52 w-full">
              <LiveTelemetry />
            </div>
          </div>

          {/* Gauge */}
          <div className="relative flex items-center justify-center bg-canvas p-5 sm:p-6">
            <CornerTicks color="line" />
            <MonoGauge value={94} label="AUTOMATION COVERAGE" />
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-canvas p-5 sm:p-6">
              <OdometerNumber
                value={s.value}
                suffix={s.suffix}
                className="text-4xl font-bold text-accent sm:text-5xl"
              />
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
