"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"

/**
 * Robotic R&D Series demo component.
 * 
 * Simulates multi-pane terminal showing drone telemetry, AI CCTV tracking,
 * and ROS system logs using unified fade-in animation.
 */
export function RoboticsDemo() {
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const altitude = 25 + Math.random() * 15
    const battery = 75 + Math.random() * 20
    
    return { altitude, battery }
  }, [])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "Robotic R&D Series - Multi-System Monitor", color: "text-accent", instant: true },
    { prefix: ">", text: "DRONE TELEMETRY (Drone-01)", color: "text-accent", instant: true },
    { text: "Status: ACTIVE" },
    { text: "GPS: 40.7128°N, -74.0060°W" },
    { text: `Altitude: ${demoData.altitude.toFixed(1)}m` },
    { text: `Battery: ${demoData.battery.toFixed(0)}%` },
    { text: "Mission: Waypoint 3 of 8" },
    { prefix: ">", text: "AI CCTV SYSTEM (Camera-05)", color: "text-accent", instant: true },
    { text: "Status: TRACKING" },
    { text: "Detected: 3 persons, 2 vehicles" },
    { text: "Behavior: Normal" },
    { text: "Confidence: 92%" },
    { prefix: ">", text: "ROS NODES STATUS", color: "text-accent", instant: true },
    { text: "✓ navigation_node: RUNNING" },
    { text: "✓ sensor_node: RUNNING" },
    { text: "✓ control_node: RUNNING" },
    { text: "Topics: 12 active" },
    { prefix: ">", text: "Mission Progress:", color: "text-info", instant: true },
    { text: "Synchronized across 3 systems" },
    { text: "Waypoint 3/8 complete" },
    { text: "ETA: 12:45 (8 minutes remaining)" },
    { prefix: "✓", text: "All systems operational:", color: "text-green-500", instant: true },
    { text: "Drone: Navigational flight active" },
    { text: "CCTV: Real-time monitoring enabled" },
    { text: "ROS: All nodes synchronized" }
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 250,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="robotics-rnd">
      {visibleLines.map((line, i) => (
        <TerminalLine
          key={i}
          text={line.text}
          prefix={line.prefix}
          color={line.color}
          isAnimating={line.isAnimating}
        />
      ))}
      {showCursor && (
        <span className="animate-cursor-blink text-accent">▊</span>
      )}
    </TerminalWindow>
  )
}
