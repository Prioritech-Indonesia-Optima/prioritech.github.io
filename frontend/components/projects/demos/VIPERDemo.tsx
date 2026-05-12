"use client"

import { useState, useEffect } from "react"
import { DemoShell, StatusPill, Bar } from "./shared/DemoShell"
import { AnimatedTerminal, Panel, StepFlow, TermLine, PulseDot } from "./shared/primitives"

/**
 * VIPER — Virtual Penetration Framework. Animated attack chain.
 */
export function VIPERDemo() {
  const baseSteps = [
    "Recon · subdomain enumeration",
    "Port scan · top 1000 services",
    "Vuln chain · CVE correlation",
    "Exploit · sandboxed payload",
    "Privilege escalation",
    "Report · evidence + remediation",
  ]
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % baseSteps.length), 1500)
    return () => clearInterval(id)
  }, [])
  const live = baseSteps.map((label, i) => ({
    label,
    status: (i < phase ? "done" : i === phase ? "active" : "pending") as "done" | "active" | "pending",
  }))

  const lines: TermLine[] = [
    { kind: "cmd", text: "viper run --target acme.example.com --scope external" },
    { kind: "info", text: "Loading 142 modules · auth=mTLS · sandbox=isolated" },
    { kind: "ok", text: "Recon: 23 subdomains, 4 cloud assets, 1 leaked S3 bucket" },
    { kind: "warn", text: "Port 8080 · unauth admin API · CVSS 9.1" },
    { kind: "info", text: "Chain attempt: CVE-2024-2155 → CVE-2024-3088 → RCE" },
    { kind: "ok", text: "Verified in sandbox · isolated, no impact on prod" },
    { kind: "err", text: "Critical: persistence vector via systemd timer" },
    { kind: "info", text: "Drafting remediation report..." },
  ]

  return (
    <DemoShell
      title="Virtual Penetration Framework"
      subtitle="Autonomous AI pentest · maps, analyzes, exploits — safely"
      status="alert"
      kpis={[
        { label: "Vulns found", value: "37", trend: "up" },
        { label: "Critical", value: "4", trend: "up" },
        { label: "Coverage", value: "94%" },
        { label: "Time saved", value: "−72%", hint: "vs manual" },
      ]}
    >
      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <AnimatedTerminal lines={lines} height={360} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Panel
            title="Attack chain"
            right={
              <div className="flex items-center gap-2">
                <PulseDot color="bg-amber-400" />
                <span className="text-[10px] uppercase tracking-wider text-amber-300">running</span>
              </div>
            }
          >
            <StepFlow steps={live} />
          </Panel>
          <Panel title="Risk profile">
            <div className="space-y-2">
              <Bar pct={92} label="Critical exposure" value="9.1" tone="danger" />
              <Bar pct={68} label="Authentication"    value="6.8" tone="warn" />
              <Bar pct={42} label="Data integrity"    value="4.2" tone="warn" />
              <Bar pct={14} label="Network posture"   value="1.4" tone="success" />
            </div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <StatusPill label="CVE-2024-2155" tone="danger" />
              <StatusPill label="OWASP A01"      tone="warn" />
              <StatusPill label="MITRE T1078"    tone="warn" />
            </div>
          </Panel>
        </div>
      </div>
    </DemoShell>
  )
}
