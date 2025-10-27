"use client"

import { useMemo } from "react"
import { TerminalWindow } from "./shared/TerminalWindow"
import { TerminalLine } from "./shared/TerminalLine"
import { useUnifiedDemo, DemoLine } from "@/hooks/use-unified-demo"

/**
 * PLC Automation Suite demo component.
 * 
 * Simulates PLC connection, sensor data streams, control logic execution,
 * actuator commands, and system status using unified fade-in animation.
 */
export function PLCAutomationDemo() {
  // Pre-compute demo data
  const demoData = useMemo(() => {
    const temp = 20 + Math.random() * 10
    const pressure = 1.2 + Math.random() * 0.5
    const flow = 45 + Math.random() * 20
    
    return { temp, pressure, flow }
  }, [])
  
  // Build lines array with pre-computed data
  const lines: DemoLine[] = useMemo(() => [
    { prefix: "$", text: "PLC Automation Suite v3.2", color: "text-accent", instant: true },
    { prefix: ">", text: "Connecting to PLC...", color: "text-info", instant: true },
    { text: "Status: Connected (IP: 192.168.1.100)" },
    { prefix: ">", text: "Sensor Data Stream:", color: "text-info", instant: true },
    { text: `Temperature: ${demoData.temp.toFixed(1)}°C (Target: 25°C)` },
    { text: `Pressure: ${demoData.pressure.toFixed(2)} bar (Target: 1.5 bar)` },
    { text: `Flow Rate: ${demoData.flow.toFixed(1)} L/min (Target: 50 L/min)` },
    { prefix: ">", text: "Executing Control Logic:", color: "text-info", instant: true },
    { text: "IF temperature > 28°C THEN start_cooling" },
    { text: "IF pressure < 1.0 bar THEN open_valve_12" },
    { text: "IF flow > 60 L/min THEN reduce_pump_speed" },
    { prefix: "✓", text: "Actuator Commands:", color: "text-green-500", instant: true },
    { text: "Valve_12: OPEN" },
    { text: "Cooling_Fan: ON (Speed: 75%)" },
    { text: "Pump_3: Speed reduced to 80%" },
    { prefix: ">", text: "Safety Interlocks Checked:", color: "text-info", instant: true },
    { text: "Emergency stop: ENGAGED" },
    { text: "Overpressure protection: ACTIVE" },
    { text: "Temperature alarm: OK" },
    { color: "text-green-500", text: "System Status: ALL OPERATIONAL", instant: true }
  ], [demoData])
  
  const { visibleLines, showCursor } = useUnifiedDemo(lines, {
    lineDelay: 300,
    shouldLoop: true,
    freezeDuration: 5000
  })

  return (
    <TerminalWindow title="plc-automation">
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
