"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { lazy, Suspense, useEffect } from "react"

// Lazy load demo components
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

/**
 * ProjectDemoModal component for displaying project demonstrations.
 * 
 * Full-screen modal dialog that routes to appropriate demo component based on
 * project title. Includes backdrop blur, ESC key handling, and loading states.
 * 
 * @param open - Whether modal is open
 * @param onOpenChange - Handler for open state changes
 * @param projectTitle - Title of the project to demo
 * 
 * @returns Modal dialog with appropriate demo component
 */
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
  "Offline Transcriber": OfflineTranscriberDemo
}

export function ProjectDemoModal({ open, onOpenChange, projectTitle }: ProjectDemoModalProps) {
  const DemoComponent = demoMap[projectTitle]

  const handleClose = () => {
    onOpenChange(false)
  }

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-6xl max-h-[90vh] overflow-hidden bg-[#2d2c2c] border-accent/20 p-0"
        showCloseButton={false}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-accent/20 bg-[#2d2c2c]">
          <DialogTitle className="text-secondary text-xl font-semibold font-mono sr-only">
            Demo: {projectTitle}
          </DialogTitle>
          <h2 className="text-secondary text-xl font-semibold font-mono">
            Demo: {projectTitle}
          </h2>
          <button
            onClick={handleClose}
            className="text-secondary/60 hover:text-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)] p-6">
          {DemoComponent ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="text-secondary/60 font-mono">Loading demo...</div>
                </div>
              }
            >
              <DemoComponent />
            </Suspense>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-secondary/60 font-mono">
                Demo not available for this project
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

