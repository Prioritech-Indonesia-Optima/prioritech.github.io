"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  Network, 
  Server, 
  Database, 
  Monitor, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle 
} from "lucide-react"

/**
 * ThreatGraphFirewallFlow component for displaying firewall threat detection visualization.
 * 
 * Shows firewall as a central monitoring node detecting and responding to suspicious network activity.
 * Displays traffic flows (incoming, outgoing, internal) with threat analysis, connection termination,
 * and blacklisting capabilities. Animates threat detection workflow with clear status indicators.
 * 
 * @param networkComponents - Array of network component nodes (external network, servers, etc.)
 * @param trafficSequence - Array of traffic flow events with source, target, type, and status
 * @param className - Optional CSS classes
 * 
 * @returns Animated firewall threat detection visualization
 */
interface NetworkComponent {
  id: string
  label: string
  type: "external" | "server" | "database" | "workstation" | "auth"
  ip?: string
  x?: number
  y?: number
}

interface TrafficEvent {
  source: string
  target: string
  type: "incoming" | "outgoing" | "internal"
  status: "normal" | "suspicious" | "blocked"
  threatLevel?: number
  reason?: string // Why it was blocked/flagged
}

interface ThreatGraphFirewallFlowProps {
  networkComponents: NetworkComponent[]
  trafficSequence: TrafficEvent[]
  className?: string
}

const componentColors: Record<string, { bg: string; border: string; text: string }> = {
  external: { bg: "#3b82f620", border: "#3b82f6", text: "#3b82f6" },
  server: { bg: "#d9d9d920", border: "#d9d9d9", text: "#d9d9d9" },
  database: { bg: "#f59e0b20", border: "#f59e0b", text: "#f59e0b" },
  workstation: { bg: "#a0a0a020", border: "#a0a0a0", text: "#a0a0a0" },
  auth: { bg: "#6366f120", border: "#6366f1", text: "#6366f1" },
}

const trafficStyles: Record<string, { color: string; dashArray: string }> = {
  normal: { color: "#22c55e", dashArray: "0" }, // green, solid
  suspicious: { color: "#f59e0b", dashArray: "5,5" }, // amber, dashed
  blocked: { color: "#ef4444", dashArray: "2,2" }, // red, dashed
}

export function ThreatGraphFirewallFlow({
  networkComponents,
  trafficSequence,
  className = "",
}: ThreatGraphFirewallFlowProps) {
  const [visibleComponents, setVisibleComponents] = useState<string[]>([])
  const [visibleTraffic, setVisibleTraffic] = useState<string[]>([])
  const [activeTrafficIndex, setActiveTrafficIndex] = useState<number>(-1)
  const [completedTrafficIndices, setCompletedTrafficIndices] = useState<Set<number>>(new Set())
  const [componentStatuses, setComponentStatuses] = useState<Record<string, "normal" | "threat" | "blocked">>(() => {
    const initial: Record<string, "normal" | "threat" | "blocked"> = {}
    networkComponents.forEach(comp => {
      initial[comp.id] = "normal"
    })
    return initial
  })
  const [blacklistedIPs, setBlacklistedIPs] = useState<Set<string>>(new Set())
  const [currentStatus, setCurrentStatus] = useState<string>("")
  const [layout, setLayout] = useState<Record<string, { x: number; y: number }>>({})
  const [animationKey, setAnimationKey] = useState(0)
  const layoutGeneratedRef = useRef(false)
  const hasAnimatedRef = useRef(false)

  // Initialize component statuses when components change
  useEffect(() => {
    if (networkComponents.length > 0) {
      setComponentStatuses(prev => {
        const updated: Record<string, "normal" | "threat" | "blocked"> = {}
        let hasChanged = false
        networkComponents.forEach(comp => {
          if (!prev[comp.id]) {
            updated[comp.id] = "normal"
            hasChanged = true
          } else {
            updated[comp.id] = prev[comp.id]
          }
        })
        return hasChanged ? { ...prev, ...updated } : prev
      })
    }
  }, [networkComponents.map(c => c.id).join(',')])

  // Calculate layout with firewall at center and components around it
  useEffect(() => {
    if (networkComponents.length === 0) {
      setLayout({})
      setVisibleComponents([])
      setVisibleTraffic([])
      return
    }

    const width = 900
    const height = 600
    const centerX = width / 2
    const centerY = height / 2

    // Only generate layout once to keep positions stable
    if (!layoutGeneratedRef.current) {
      layoutGeneratedRef.current = true
      
      const newLayout: Record<string, { x: number; y: number }> = {}

      // Firewall node at center (acts as gateway between external and internal)
      newLayout["firewall"] = { 
        x: centerX, 
        y: centerY
      }

      // Separate external and internal zones
      const margin = 80
      const firewallZoneWidth = 100 // Buffer zone around firewall
      const externalZoneWidth = (centerX - margin - firewallZoneWidth) // Left side for external
      const internalZoneWidth = (width - centerX - margin - firewallZoneWidth) // Right side for internal
      
      const existingPositions: Array<{ x: number; y: number }> = [newLayout["firewall"]]
      
      // Separate components into external and internal
      const externalNetwork = networkComponents.find(c => c.type === "external")
      const internalComponents = networkComponents.filter(c => c.type !== "external")
      
      // Place external network on LEFT side (external zone)
      if (externalNetwork) {
        // Place external network on left side, vertically centered
        const externalX = margin + externalZoneWidth / 2
        newLayout[externalNetwork.id] = { x: externalX, y: centerY }
        existingPositions.push({ x: externalX, y: centerY })
      }
      
       // Place internal components on RIGHT side (internal zone)
       // Arrange them with more spacing between elements (treating name+IP as a group)
       const internalStartX = centerX + firewallZoneWidth + internalZoneWidth / 2
       const topMargin = 100 // Space at top
       const bottomMargin = 100 // Space at bottom
       const minElementSpacing = 200 // Minimum spacing between element centers (icon positions)
       const totalSpacingNeeded = (internalComponents.length - 1) * minElementSpacing
       const availableHeight = height - topMargin - bottomMargin
       
       // Use minimum spacing or distribute evenly if more space available
       const uniformSpacing = totalSpacingNeeded <= availableHeight
         ? minElementSpacing
         : availableHeight / (internalComponents.length - 1)
       
       // Center the group vertically if using minimum spacing
       const startY = totalSpacingNeeded <= availableHeight
         ? (height - totalSpacingNeeded) / 2
         : topMargin
      
      internalComponents.forEach((comp, index) => {
        // Distribute with uniform spacing between element centers
        const yPos = startY + (index * uniformSpacing)
        newLayout[comp.id] = { x: internalStartX, y: yPos }
        existingPositions.push({ x: internalStartX, y: yPos })
      })

      setLayout(newLayout)
    }

    // Only animate on first render
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true

      // Initialize all component statuses as normal
      setComponentStatuses(prev => {
        const updated: Record<string, "normal" | "threat" | "blocked"> = {}
        networkComponents.forEach(comp => {
          updated[comp.id] = prev[comp.id] || "normal"
        })
        return updated
      })
      setBlacklistedIPs(new Set())

      // Animate firewall appearing first
      setTimeout(() => {
        setVisibleComponents((prev) => [...prev, "firewall"])
        setCurrentStatus("Initializing firewall... Monitoring network traffic...")
      }, 200)

      // Show all network components
      setTimeout(() => {
        networkComponents.forEach((comp) => {
          setVisibleComponents((prev) => [...prev, comp.id])
        })
        setCurrentStatus("Network topology established. All systems online.")
      }, 800)

      // Process traffic events sequentially
      let currentTime = 800 + 2500 // Start after all components are visible (slower)
      
      trafficSequence.forEach((traffic, index) => {
        const trafficStartTime = currentTime
        const sourceComponent = networkComponents.find(c => c.id === traffic.source)
        const targetComponent = networkComponents.find(c => c.id === traffic.target)
        const sourceIP = sourceComponent?.ip || traffic.source
        const isBlocked = traffic.status === "blocked"
        const isSuspicious = traffic.status === "suspicious"
        
        setTimeout(() => {
          // Set active traffic
          setActiveTrafficIndex(index)
          setVisibleTraffic((prev) => {
            if (!prev.includes(`traffic-${index}`)) {
              return [...prev, `traffic-${index}`]
            }
            return prev
          })
          
          // Phase 1: Traffic detection
          const trafficTypeLabel = traffic.type === "incoming" ? "Incoming" : traffic.type === "outgoing" ? "Outgoing" : "Internal"
          const sourceIsExternal = sourceComponent?.type === "external"
          const targetIsExternal = targetComponent?.type === "external"
          const needsFirewallRouting = sourceIsExternal || targetIsExternal
          
          if (needsFirewallRouting && !(sourceIsExternal && targetIsExternal)) {
            // Traffic going through firewall
            if (sourceIsExternal) {
              setCurrentStatus(`${trafficTypeLabel} traffic from ${sourceComponent?.label || traffic.source} → Firewall`)
            } else {
              setCurrentStatus(`${trafficTypeLabel} traffic from ${sourceComponent?.label || traffic.source} → Firewall → ${targetComponent?.label || traffic.target}`)
            }
          } else {
            // Internal to internal - direct
            setCurrentStatus(`${trafficTypeLabel} traffic detected: ${sourceComponent?.label || traffic.source} → ${targetComponent?.label || traffic.target}`)
          }
          
          // Phase 2: Firewall analysis (only if routing through firewall) - slower for readability
          if (needsFirewallRouting && !(sourceIsExternal && targetIsExternal)) {
            setTimeout(() => {
              setCurrentStatus("Traffic intercepted at firewall. Analyzing...")
            }, 2000)
          } else {
            setTimeout(() => {
              setCurrentStatus("Analyzing traffic pattern...")
            }, 2000)
          }
          
          setTimeout(() => {
            if (traffic.threatLevel) {
              setCurrentStatus(`Threat assessment: Level ${traffic.threatLevel}/10`)
            } else {
              setCurrentStatus("Scanning for anomalies...")
            }
          }, 3500)
          
          // Phase 3: Decision
          setTimeout(() => {
            if (isBlocked) {
              setCurrentStatus("⚠ Suspicious activity detected at firewall!")
              
              setTimeout(() => {
                setCurrentStatus(`Firewall: Connection terminated. Traffic blocked.`)
                
                // Don't mark target as threatened if blocked at firewall (never reached it)
                // Only mark if it's internal-to-internal and blocked
                if (!needsFirewallRouting || !sourceIsExternal) {
                  setComponentStatuses(prev => {
                    const updated = { ...prev }
                    if (targetComponent) {
                      updated[targetComponent.id] = "threat"
                    }
                    return updated
                  })
                }
                
                // Add to blacklist
                setTimeout(() => {
                  setBlacklistedIPs(prev => new Set([...prev, sourceIP]))
                  setCurrentStatus(`✓ ${sourceIP} added to blacklist. Firewall protection active.`)
                  
                  // Mark source as blocked
                  if (sourceComponent) {
                    setComponentStatuses(prev => {
                      const updated = { ...prev }
                      updated[sourceComponent.id] = "blocked"
                      return updated
                    })
                  }
                }, 2000)
              }, 1800)
              
            } else if (isSuspicious) {
              setCurrentStatus("⚠ Potential threat detected at firewall - monitoring...")
              
              setTimeout(() => {
                if (needsFirewallRouting) {
                  setCurrentStatus("Firewall: Activity logged. Allowing with caution.")
                } else {
                  setCurrentStatus("Activity logged. Allowing with caution.")
                }
                
                // Mark target as threatened
                setComponentStatuses(prev => {
                  const updated = { ...prev }
                  if (targetComponent) {
                    updated[targetComponent.id] = "threat"
                  }
                  return updated
                })
              }, 2000)
              
            } else {
              if (needsFirewallRouting) {
                setCurrentStatus("✓ Firewall: Normal traffic - allowed through")
                
                setTimeout(() => {
                  setCurrentStatus(`Connection established: ${sourceComponent?.label || traffic.source} → Firewall → ${targetComponent?.label || traffic.target}`)
                }, 1800)
              } else {
                setCurrentStatus("✓ Normal traffic - allowed")
                
                setTimeout(() => {
                  setCurrentStatus("Connection established successfully")
                }, 1800)
              }
            }
          }, 5500)
          
          // Phase 4: Complete and hide traffic
          setTimeout(() => {
            setActiveTrafficIndex(-1)
            setCompletedTrafficIndices(prev => new Set([...prev, index]))
            setVisibleTraffic(prev => prev.filter(id => id !== `traffic-${index}`))
            
            // Check if all traffic processed
            if (index === trafficSequence.length - 1) {
              setTimeout(() => {
                setCurrentStatus("All traffic processed. Resetting...")
                setTimeout(() => {
                  // Reset all state
                  const resetStatuses: Record<string, "normal" | "threat" | "blocked"> = {}
                  networkComponents.forEach(comp => {
                    resetStatuses[comp.id] = "normal"
                  })
                  setComponentStatuses(resetStatuses)
                  setBlacklistedIPs(new Set())
                  setVisibleComponents([])
                  setVisibleTraffic([])
                  setActiveTrafficIndex(-1)
                  setCompletedTrafficIndices(new Set())
                  setCurrentStatus("")
                  hasAnimatedRef.current = false
                  layoutGeneratedRef.current = false
                  
                  // Restart animation
                  setTimeout(() => {
                    setAnimationKey(prev => prev + 1)
                  }, 1000)
                }, 2000)
              }, 3000)
            }
          }, isBlocked ? 10000 : isSuspicious ? 9500 : 9000)
        }, trafficStartTime)
        
        // Calculate next traffic start time (increased delays between traffic events)
        currentTime += isBlocked ? 11500 : isSuspicious ? 11000 : 10500
      })
    } else {
      // Reset to initial state if already animated
      const initialStatuses: Record<string, "normal" | "threat" | "blocked"> = {}
      networkComponents.forEach(comp => {
        initialStatuses[comp.id] = "normal"
      })
      setComponentStatuses(initialStatuses)
      setBlacklistedIPs(new Set())
      setVisibleComponents([])
      setVisibleTraffic([])
      setActiveTrafficIndex(-1)
      setCompletedTrafficIndices(new Set())
      setCurrentStatus("")
      
      hasAnimatedRef.current = false
      layoutGeneratedRef.current = false
      setTimeout(() => {
        setAnimationKey(prev => prev + 1)
      }, 100)
    }
  }, [networkComponents, trafficSequence, animationKey])

  const getComponentStyle = (component: NetworkComponent) => {
    const status = componentStatuses[component.id] || "normal"
    
    if (status === "blocked") {
      return { bg: "#ef444420", border: "#ef4444", text: "#ef4444" } // red - blocked
    } else if (status === "threat") {
      return { bg: "#f59e0b20", border: "#f59e0b", text: "#f59e0b" } // amber - threatened
    } else {
      return componentColors[component.type] || { bg: "#d9d9d920", border: "#d9d9d9", text: "#d9d9d9" }
    }
  }

  const getTrafficStyle = (traffic: TrafficEvent) => {
    return trafficStyles[traffic.status] || trafficStyles.normal
  }

  const firewallPos = layout["firewall"] || { x: 0, y: 0 }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono">
        <h3 className="text-accent text-2xl font-bold mb-3 text-center">
          Firewall Threat Detection
        </h3>
        
        {/* Status text at top - below title */}
        {currentStatus && (
          <div className="mb-4 px-4 py-2 bg-main/80 border border-accent/20 rounded-md">
            <p className="text-accent text-xs font-mono text-center whitespace-nowrap overflow-hidden text-ellipsis">
              {currentStatus.length > 120 ? currentStatus.substring(0, 117) + '...' : currentStatus}
            </p>
          </div>
        )}
        
        <div className="relative" style={{ width: "100%", height: "500px" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 900 600"
            className="overflow-visible"
          >
            {/* Background grid and definitions */}
            <defs>
              <pattern id="firewall-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
              {/* Arrow marker for traffic */}
              <marker
                id="traffic-arrowhead"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 12 3, 0 6"
                  fill="#22c55e"
                  opacity="0.8"
                />
              </marker>
              {/* Blocked/terminated marker */}
              <marker
                id="blocked-marker"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
              >
                <circle cx="6" cy="6" r="5" fill="#ef4444" />
                <path d="M 4 6 L 8 6 M 6 4 L 6 8" stroke="#fff" strokeWidth="2" />
              </marker>
            </defs>
            <rect width="100%" height="100%" fill="url(#firewall-grid)" />
            
            {/* Zone separation backgrounds */}
            <rect
              x="0"
              y="0"
              width={firewallPos.x - 50}
              height="100%"
              fill="#1e3a5f"
              fillOpacity="0.1"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="5,5"
              strokeOpacity="0.3"
            />
            <rect
              x={firewallPos.x + 50}
              y="0"
              width={900 - firewallPos.x - 50}
              height="100%"
              fill="#1f3d1f"
              fillOpacity="0.1"
              stroke="#22c55e"
              strokeWidth="2"
              strokeDasharray="5,5"
              strokeOpacity="0.3"
            />
            
            {/* Zone labels */}
            <text
              x={firewallPos.x / 2}
              y={30}
              textAnchor="middle"
              fill="#3b82f6"
              fontSize="14"
              fontWeight="bold"
            >
              EXTERNAL NETWORK
            </text>
            <text
              x={(firewallPos.x + 900) / 2}
              y={30}
              textAnchor="middle"
              fill="#22c55e"
              fontSize="14"
              fontWeight="bold"
            >
              INTERNAL NETWORK
            </text>
            
            {/* Vertical divider line through firewall */}
            <line
              x1={firewallPos.x}
              y1="0"
              x2={firewallPos.x}
              y2="100%"
              stroke="#daa520"
              strokeWidth="2"
              strokeDasharray="8,4"
              opacity="0.5"
            />
            
            {/* Firewall activity glow when analyzing */}
            {activeTrafficIndex >= 0 && (
              <motion.circle
                cx={firewallPos.x}
                cy={firewallPos.y}
                r={200}
                fill="none"
                stroke="#daa520"
                strokeWidth="1"
                opacity={0.1}
                animate={{
                  r: [200, 250, 200],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            
            {/* Traffic flow lines - route through firewall for external/internal traffic */}
            {trafficSequence.map((traffic, index) => {
              const sourceComponent = networkComponents.find(c => c.id === traffic.source)
              const targetComponent = networkComponents.find(c => c.id === traffic.target)
              const sourceIsExternal = sourceComponent?.type === "external"
              const targetIsExternal = targetComponent?.type === "external"
              const isInternalToInternal = !sourceIsExternal && !targetIsExternal
              
              const sourcePos = layout[traffic.source] || { x: 0, y: 0 }
              const targetPos = layout[traffic.target] || { x: 0, y: 0 }
              const trafficId = `traffic-${index}`
              const isVisible = visibleTraffic.includes(trafficId)
              const isActive = activeTrafficIndex === index
              
              if (!isActive || !isVisible) {
                return null
              }
              
              const style = getTrafficStyle(traffic)
              const isBlocked = traffic.status === "blocked"

              // Route through firewall if crossing external/internal boundary
              const needsFirewallRouting = sourceIsExternal || targetIsExternal

              if (needsFirewallRouting && !isInternalToInternal) {
                // Traffic must go through firewall: Source → Firewall → Target
                // Or stop at firewall if blocked
                const stopAtFirewall = isBlocked && (sourceIsExternal || traffic.type === "incoming")
                
                return (
                  <g key={trafficId}>
                    {/* First segment: Source → Firewall */}
                    <motion.line
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={firewallPos.x}
                      y2={firewallPos.y}
                      stroke={style.color}
                      strokeWidth={3}
                      strokeDasharray={style.dashArray}
                      opacity={1.0}
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 1.0,
                      }}
                      transition={{ duration: 0.6 }}
                      markerEnd={stopAtFirewall ? "url(#blocked-marker)" : undefined}
                    />
                    {/* Second segment: Firewall → Target (only if not blocked) */}
                    {!stopAtFirewall && (
                      <motion.line
                        x1={firewallPos.x}
                        y1={firewallPos.y}
                        x2={targetPos.x}
                        y2={targetPos.y}
                        stroke={style.color}
                        strokeWidth={3}
                        strokeDasharray={style.dashArray}
                        opacity={1.0}
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: 1.0,
                        }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        markerEnd="url(#traffic-arrowhead)"
                      />
                    )}
                    {/* Traffic type label at firewall - positioned to avoid overlap with shield icon */}
                    <motion.text
                      x={firewallPos.x + 70}
                      y={firewallPos.y + 5}
                      textAnchor="middle"
                      fill={style.color}
                      fontSize="14"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {traffic.type.toUpperCase()}
                    </motion.text>
                  </g>
                )
              } else {
                // Internal to internal - angled path: Start → RIGHT → UP/DOWN → LEFT → Target
                const horizontalOffset = 100 // Space to extend right before turning
                
                // Path points: source center → go RIGHT → go UP/DOWN → go LEFT to target
                const turnPoint1X = sourcePos.x + horizontalOffset // Go RIGHT
                const turnPoint1Y = sourcePos.y // Same Y as source
                const turnPoint2X = turnPoint1X // Same X
                const turnPoint2Y = targetPos.y // Go UP/DOWN to target Y
                
                // Build SVG path: M (start) → L (right) → L (up/down) → L (left to target)
                const pathData = `M ${sourcePos.x} ${sourcePos.y} L ${turnPoint1X} ${turnPoint1Y} L ${turnPoint2X} ${turnPoint2Y} L ${targetPos.x} ${targetPos.y}`
                
                // Label position at the vertical segment - offset to avoid node overlap
                const labelX = turnPoint2X + 25
                const labelY = (sourcePos.y + targetPos.y) / 2
                
                // Check if label would overlap with source or target nodes (40px radius + buffer)
                const nodeRadius = 40
                const buffer = 20
                let adjustedLabelY = labelY
                const distToSource = Math.abs(labelY - sourcePos.y)
                const distToTarget = Math.abs(labelY - targetPos.y)
                
                if (distToSource < nodeRadius + buffer) {
                  adjustedLabelY = sourcePos.y + (sourcePos.y < targetPos.y ? -nodeRadius - buffer : nodeRadius + buffer)
                } else if (distToTarget < nodeRadius + buffer) {
                  adjustedLabelY = targetPos.y + (sourcePos.y < targetPos.y ? nodeRadius + buffer : -nodeRadius - buffer)
                }

                return (
                  <g key={trafficId}>
                    <motion.path
                      d={pathData}
                      stroke={style.color}
                      strokeWidth={3}
                      strokeDasharray={style.dashArray}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="miter"
                      opacity={1.0}
                      initial={{ pathLength: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 1.0,
                      }}
                      transition={{ duration: 0.5 }}
                      markerEnd={isBlocked ? "url(#blocked-marker)" : "url(#traffic-arrowhead)"}
                    />
                    {/* Traffic type label at the vertical segment */}
                    <motion.text
                      x={labelX}
                      y={adjustedLabelY}
                      textAnchor="start"
                      fill={style.color}
                      fontSize="14"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {traffic.type.toUpperCase()}
                    </motion.text>
                  </g>
                )
              }
            })}
            
             {/* Network component nodes */}
            {networkComponents.map((component) => {
              const pos = layout[component.id] || { x: 0, y: 0 }
              const isVisible = visibleComponents.includes(component.id)
              const status = componentStatuses[component.id] || "normal"
              const style = getComponentStyle(component)

              return (
                <motion.g
                  key={component.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isVisible ? 1 : 0,
                    opacity: isVisible ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  {/* Status indicator glow */}
                  {status === "threat" && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={45}
                      fill="#f59e0b"
                      opacity={0.2}
                      animate={{
                        r: [45, 55, 45],
                        opacity: [0.2, 0.35, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  {status === "blocked" && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={45}
                      fill="#ef4444"
                      opacity={0.2}
                      animate={{
                        r: [45, 55, 45],
                        opacity: [0.2, 0.35, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={40}
                    fill={style.bg}
                    stroke={style.border}
                    strokeWidth={status !== "normal" ? 3.5 : 3}
                  />
                  {/* Status indicator icon */}
                  {status === "threat" && (
                    <foreignObject x={pos.x - 16} y={pos.y - 16} width="32" height="32">
                      <AlertTriangle className="w-8 h-8 text-amber-500" />
                    </foreignObject>
                  )}
                  {status === "blocked" && (
                    <foreignObject x={pos.x - 16} y={pos.y - 16} width="32" height="32">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </foreignObject>
                  )}
                  {/* Component icon for normal state */}
                  {status === "normal" && (
                    <foreignObject x={pos.x - 16} y={pos.y - 16} width="32" height="32">
                      {component.type === "external" && <Network className="w-8 h-8" style={{ color: style.text }} />}
                      {component.type === "server" && <Server className="w-8 h-8" style={{ color: style.text }} />}
                      {component.type === "database" && <Database className="w-8 h-8" style={{ color: style.text }} />}
                      {component.type === "workstation" && <Monitor className="w-8 h-8" style={{ color: style.text }} />}
                      {component.type === "auth" && <Lock className="w-8 h-8" style={{ color: style.text }} />}
                    </foreignObject>
                  )}
                  {/* Component label (name) - below icon, grouped with IP */}
                  <text
                    x={pos.x}
                    y={pos.y + 65}
                    textAnchor="middle"
                    fill={style.text}
                    fontSize="16"
                    fontWeight="600"
                  >
                    {component.label}
                  </text>
                  {/* Component IP - below name, close spacing to keep as group */}
                  <text
                    x={pos.x}
                    y={pos.y + 85}
                    textAnchor="middle"
                    fill="#a0a0a0"
                    fontSize="12"
                    fontWeight="500"
                  >
                    {component.ip || component.type.toUpperCase()}
                  </text>
                </motion.g>
              )
            })}

            {/* Firewall node (central) */}
            {visibleComponents.includes("firewall") && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {/* Outer pulse effect */}
                <motion.circle
                  cx={firewallPos.x}
                  cy={firewallPos.y}
                  r={45}
                  fill="#daa520"
                  opacity={0.2}
                  animate={{
                    r: [45, 60, 45],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Firewall circle */}
                <circle
                  cx={firewallPos.x}
                  cy={firewallPos.y}
                  r={45}
                  fill="#daa52020"
                  stroke="#daa520"
                  strokeWidth={4}
                />
                {/* Firewall label - positioned above shield with more spacing */}
                <text
                  x={firewallPos.x}
                  y={firewallPos.y - 75}
                  textAnchor="middle"
                  fill="#daa520"
                  fontSize="20"
                  fontWeight="bold"
                >
                  FIREWALL
                </text>
                {/* Shield icon */}
                <foreignObject x={firewallPos.x - 20} y={firewallPos.y - 20} width="40" height="40">
                  <Shield className="w-10 h-10" style={{ color: "#daa520" }} />
                </foreignObject>
              </motion.g>
            )}
          </svg>
        </div>

        {/* Legend and blacklist */}
        <div className="mt-6 pt-4 border-t border-accent/10">
          <div className="grid grid-cols-2 gap-4">
            {/* Traffic statuses */}
            <div>
              <div className="text-sm text-secondary/70 mb-2 font-semibold">Traffic Status:</div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(trafficStyles).map(([status, style]) => (
                  <div key={status} className="flex items-center gap-2">
                    <div
                      className="h-0.5"
                      style={{
                        width: "20px",
                        backgroundColor: style.color,
                        borderTop: `2px ${style.dashArray !== "0" ? "dashed" : "solid"} ${style.color}`,
                      }}
                    />
                    <span className="text-secondary/70 text-xs capitalize">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Component statuses */}
            <div>
              <div className="text-sm text-secondary/70 mb-2 font-semibold">Component Status:</div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-secondary/50 bg-main/50" />
                  <span className="text-secondary/70 text-xs">Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-amber-500 bg-amber-500/20" />
                  <span className="text-secondary/70 text-xs">Threat Detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-red-500 bg-red-500/20" />
                  <span className="text-secondary/70 text-xs">Blocked</span>
                </div>
              </div>
            </div>
          </div>
          {/* Blacklist display */}
          {blacklistedIPs.size > 0 && (
            <div className="mt-4 pt-4 border-t border-accent/10">
              <div className="text-sm text-secondary/70 mb-2 font-semibold">Blacklisted IPs:</div>
              <div className="flex flex-wrap gap-2">
                {Array.from(blacklistedIPs).map((ip) => (
                  <span
                    key={ip}
                    className="text-xs px-2 py-1 rounded bg-red-500/20 border border-red-500/50 text-red-400"
                  >
                    {ip}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
