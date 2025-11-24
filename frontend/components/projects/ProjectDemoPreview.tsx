"use client"

import { useState, useMemo, lazy, Suspense } from "react"
import { useRandomData } from "@/hooks/use-random-data"
import { Play, Pause, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

// Lazy load the full VIPERAttackFlow component
const VIPERAttackFlow = lazy(() => 
  import("./demos/visualizations/VIPERAttackFlow").then(m => ({ default: m.VIPERAttackFlow }))
)

/**
 * Lightweight VIPER demo preview component for landing page.
 * 
 * Displays a simplified VIPER attack flow visualization with auto-play mode
 * and pause/play controls. Uses lazy loading for performance and provides
 * a link to the full demo experience.
 * 
 * @param autoPlay - Whether to start animation automatically (default: true)
 * @param className - Optional CSS classes
 * 
 * @returns JSX element containing the VIPER demo preview
 */
interface ProjectDemoPreviewProps {
  autoPlay?: boolean
  className?: string
}

export function VIPERDemoPreview({ 
  autoPlay = true, 
  className = "" 
}: ProjectDemoPreviewProps) {
  const randomData = useRandomData()
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  
  // Pre-compute demo data with fewer targets for preview
  const demoData = useMemo(() => {
    const IPs = randomData.generateIPs(3)
    
    // Generate fewer targets for preview (3 instead of 5)
    const targets = [
      { id: "target1", label: IPs[0], type: "server" as const },
      { id: "target2", label: IPs[1], type: "database" as const },
      { id: "target3", label: IPs[2] || "192.168.1.100", type: "workstation" as const },
    ]
    
    // Simplified attack sequence for preview
    const attackSequence = [
      { target: "target1", method: "Port Scan", status: "scanning" as const },
      { target: "target1", method: "Port Scan", status: "compromised" as const },
      { target: "target2", method: "SQL Injection", status: "scanning" as const },
      { target: "target2", method: "SQL Injection", status: "failed" as const, reason: "WAF blocked" },
      { target: "target2", method: "Exploit CVE-2024-1234", status: "compromised" as const },
      { target: "target3", method: "Brute Force", status: "scanning" as const },
      { target: "target3", method: "Brute Force", status: "compromised" as const },
    ]
    
    return { targets, attackSequence }
  }, [randomData])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={`bg-main/50 border border-accent/20 rounded-lg p-6 font-mono ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-accent text-xl font-bold mb-1">
            Virtual Penetration Framework
          </h3>
          <p className="text-secondary/70 text-sm">
            AI-driven autonomous pentesting system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={togglePlay}
            variant="outline"
            size="sm"
            className="border-accent/30 hover:border-accent text-secondary hover:text-accent"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="relative bg-main/30 rounded-lg overflow-hidden" style={{ minHeight: "400px" }}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-secondary/50 text-sm">Loading VIPER demo...</div>
            </div>
          }
        >
          {isPlaying ? (
            <VIPERAttackFlow
              targets={demoData.targets}
              attackSequence={demoData.attackSequence}
            />
          ) : (
            <div className="flex items-center justify-center h-[400px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-secondary/50 text-sm mb-4">Demo paused</p>
                <Button
                  onClick={togglePlay}
                  className="bg-accent hover:bg-accent/90 text-main"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </motion.div>
            </div>
          )}
        </Suspense>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-secondary/60 text-xs">
          Reduces manual security review time by over 70%
        </p>
        <Link href="/projects">
          <Button
            variant="outline"
            size="sm"
            className="border-accent/30 hover:border-accent text-accent hover:text-accent/80"
          >
            Try Full Demo
            <ExternalLink className="w-3 h-3 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

