"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { lazy, Suspense, useEffect } from "react"

// Lazy-load demo components so the modal shell is cheap
const IntelligentQueryDemo = lazy(() => import("./demos/IntelligentQueryDemo").then(m => ({ default: m.IntelligentQueryDemo })))
const ContextAwareDemo = lazy(() => import("./demos/ContextAwareDemo").then(m => ({ default: m.ContextAwareDemo })))
const VIPERDemo = lazy(() => import("./demos/VIPERDemo").then(m => ({ default: m.VIPERDemo })))
const ThreatGraphDemo = lazy(() => import("./demos/ThreatGraphDemo").then(m => ({ default: m.ThreatGraphDemo })))
const MarketForecastDemo = lazy(() => import("./demos/MarketForecastDemo").then(m => ({ default: m.MarketForecastDemo })))
const BreakoutProbabilityDemo = lazy(() => import("./demos/BreakoutProbabilityDemo").then(m => ({ default: m.BreakoutProbabilityDemo })))
const AgenticFinanceDemo = lazy(() => import("./demos/AgenticFinanceDemo").then(m => ({ default: m.AgenticFinanceDemo })))
const EdgeVisionDemo = lazy(() => import("./demos/EdgeVisionDemo").then(m => ({ default: m.EdgeVisionDemo })))
const PLCAutomationDemo = lazy(() => import("./demos/PLCAutomationDemo").then(m => ({ default: m.PLCAutomationDemo })))
const RoboticsDemo = lazy(() => import("./demos/RoboticsDemo").then(m => ({ default: m.RoboticsDemo })))
const TherapeuticDialogueDemo = lazy(() => import("./demos/TherapeuticDialogueDemo").then(m => ({ default: m.TherapeuticDialogueDemo })))
const OfflineTranscriberDemo = lazy(() => import("./demos/OfflineTranscriberDemo").then(m => ({ default: m.OfflineTranscriberDemo })))
const ERPDemo = lazy(() => import("./demos/ERPDemo").then(m => ({ default: m.ERPDemo })))
const WMSDemo = lazy(() => import("./demos/WMSDemo").then(m => ({ default: m.WMSDemo })))
const SCMDemo = lazy(() => import("./demos/SCMDemo").then(m => ({ default: m.SCMDemo })))
const CRMDemo = lazy(() => import("./demos/CRMDemo").then(m => ({ default: m.CRMDemo })))
const HRISDemo = lazy(() => import("./demos/HRISDemo").then(m => ({ default: m.HRISDemo })))
const MESDemo = lazy(() => import("./demos/MESDemo").then(m => ({ default: m.MESDemo })))
const TMSDemo = lazy(() => import("./demos/TMSDemo").then(m => ({ default: m.TMSDemo })))
const POSDemo = lazy(() => import("./demos/POSDemo").then(m => ({ default: m.POSDemo })))

interface ProjectDemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectTitle: string
}

const demoMap: Record<string, React.ComponentType> = {
  "Intelligent Query Assistant": IntelligentQueryDemo,
  "Context-Aware Data Engine": ContextAwareDemo,
  "Virtual Penetration Framework": VIPERDemo,
  "Threat Graph Correlator": ThreatGraphDemo,
  "Market Forecast Engine": MarketForecastDemo,
  "Breakout Probability Model": BreakoutProbabilityDemo,
  "Agentic Finance Tracker": AgenticFinanceDemo,
  "Edge-Vision Analytics": EdgeVisionDemo,
  "PLC Automation Suite": PLCAutomationDemo,
  "Robotic R&D Series": RoboticsDemo,
  "Therapeutic Dialogue AI": TherapeuticDialogueDemo,
  "Offline Transcriber": OfflineTranscriberDemo,
  "ERP Suite": ERPDemo,
  "Warehouse Management System": WMSDemo,
  "Supply Chain Management": SCMDemo,
  "Customer Relationship Management": CRMDemo,
  "HRIS / HCM Platform": HRISDemo,
  "Manufacturing Execution System": MESDemo,
  "Transportation Management": TMSDemo,
  "Point of Sale Platform": POSDemo,
}

/**
 * Demo modal — full-screen on mobile, capped at lg+ for desktop. Sticky terminal-
 * styled header with traffic-light dots and large tap target close. Auto-scrolls
 * within content area; Escape closes via radix Dialog.
 */
export function ProjectDemoModal({ open, onOpenChange, projectTitle }: ProjectDemoModalProps) {
  const DemoComponent = demoMap[projectTitle]

  const handleClose = () => onOpenChange(false)

  // Belt-and-suspenders Escape close (radix already does this; preserve behavior)
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          bg-[#2d2c2c] border-accent/20 p-0 overflow-hidden gap-0
          w-screen h-[100dvh] max-w-none max-h-none rounded-none
          sm:w-[95vw] sm:h-auto sm:max-w-[640px] sm:max-h-[90vh] sm:rounded-xl
          md:max-w-[860px] lg:max-w-[1100px] xl:max-w-[1280px]
          flex flex-col
        "
        showCloseButton={false}
      >
        {/* Sticky terminal-style header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-accent/20 bg-[#2d2c2c]/95 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex gap-1.5 flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            <DialogTitle className="sr-only">Demo: {projectTitle}</DialogTitle>
            <h2 className="text-secondary text-sm sm:text-base lg:text-lg font-semibold font-mono truncate">
              <span className="text-accent">$</span> demo: <span className="text-accent">{projectTitle}</span>
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="
              p-2 -m-2 rounded-md
              text-secondary/70 hover:text-accent hover:bg-accent/10
              transition-colors flex-shrink-0
              focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
            "
            aria-label="Close demo"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-4 sm:p-6 scrollbar-hide">
          {DemoComponent ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[40vh]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                    <div className="text-secondary/60 font-mono text-sm">Loading demo…</div>
                  </div>
                </div>
              }
            >
              <DemoComponent />
            </Suspense>
          ) : (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="text-secondary/60 font-mono">Demo not available for this project</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
