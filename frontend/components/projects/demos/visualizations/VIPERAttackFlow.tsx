"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Server, Database, Monitor, Shield, Network } from "lucide-react"

/**
 * VIPERAttackFlow component for displaying VIPER attack visualization.
 * 
 * Shows VIPER as a central attacker node performing different attack methods
 * against multiple targets (network, server, client, etc.).
 * Animates attack flows with different methods and status indicators.
 * 
 * @param targets - Array of target nodes to attack
 * @param attacks - Array of attack methods with source (VIPER), target, and method type
 * @param className - Optional CSS classes
 * 
 * @returns Animated VIPER attack flow visualization
 */
interface AttackTarget {
  id: string
  label: string
  type: "firewall" | "server" | "database" | "workstation" | "network"
  x?: number
  y?: number
}

interface AttackAttempt {
  target: string
  method: string
  status: "scanning" | "exploiting" | "compromised" | "failed"
  reason?: string // Why it failed, if applicable
}

interface VIPERAttackFlowProps {
  targets: AttackTarget[]
  attackSequence: AttackAttempt[] // Sequential attack attempts
  className?: string
}

const targetColors: Record<string, { bg: string; border: string; text: string }> = {
  firewall: { bg: "#daa52020", border: "#daa520", text: "#daa520" },
  server: { bg: "#d9d9d920", border: "#d9d9d9", text: "#d9d9d9" },
  database: { bg: "#f59e0b20", border: "#f59e0b", text: "#f59e0b" },
  workstation: { bg: "#a0a0a020", border: "#a0a0a0", text: "#a0a0a0" },
  network: { bg: "#3a393920", border: "#4a4949", text: "#a0a0a0" },
}

const attackMethodStyles: Record<string, { color: string; dashArray: string }> = {
  scanning: { color: "#daa520", dashArray: "5,5" }, // gold, dashed
  exploiting: { color: "#f59e0b", dashArray: "3,3" }, // amber, dotted
  compromised: { color: "#ef4444", dashArray: "0" }, // red, solid
  failed: { color: "#4a4949", dashArray: "2,2" }, // gray, dashed
}

export function VIPERAttackFlow({
  targets,
  attackSequence,
  className = "",
}: VIPERAttackFlowProps) {
  const [visibleTargets, setVisibleTargets] = useState<string[]>([])
  const [visibleAttacks, setVisibleAttacks] = useState<string[]>([])
  const [activeAttackIndex, setActiveAttackIndex] = useState<number>(-1)
  const [completedAttackIndices, setCompletedAttackIndices] = useState<Set<number>>(new Set())
  // Initialize all targets as neutral (red) from the start
  const [targetStatuses, setTargetStatuses] = useState<Record<string, "neutral" | "compromised" | "failed">>(() => {
    const initial: Record<string, "neutral" | "compromised" | "failed"> = {}
    targets.forEach(target => {
      initial[target.id] = "neutral"
    })
    return initial
  })
  const [currentStatus, setCurrentStatus] = useState<string>("")
  const [layout, setLayout] = useState<Record<string, { x: number; y: number }>>({})
  const [animationKey, setAnimationKey] = useState(0) // Key to force re-animation
  const layoutGeneratedRef = useRef(false)
  const hasAnimatedRef = useRef(false)

  // Ensure all targets start as neutral (red) when targets change
  useEffect(() => {
    if (targets.length > 0) {
      setTargetStatuses(prev => {
        const updated: Record<string, "neutral" | "compromised" | "failed"> = {}
        let hasChanged = false
        targets.forEach(target => {
          if (!prev[target.id]) {
            updated[target.id] = "neutral"
            hasChanged = true
          } else {
            updated[target.id] = prev[target.id]
          }
        })
        // Only update if we added new targets
        return hasChanged ? { ...prev, ...updated } : prev
      })
    }
  }, [targets.map(t => t.id).join(',')]) // Only when target IDs change

  // Calculate layout with VIPER at center and targets in a circle
  useEffect(() => {
    if (targets.length === 0) {
      setLayout({})
      setVisibleTargets([])
      setVisibleAttacks([])
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

      // VIPER node at slightly off-center for more dynamic feel
      const viperOffsetX = (Math.random() - 0.5) * 40
      const viperOffsetY = (Math.random() - 0.5) * 40
      newLayout["viper"] = { 
        x: centerX + viperOffsetX, 
        y: centerY + viperOffsetY
      }

      // Targets arranged in abstract, scattered positions - use more space
      const margin = 80
      const minDistance = 150
      const existingPositions: Array<{ x: number; y: number }> = [newLayout["viper"]]
      
      targets.forEach((target) => {
        let attempts = 0
        let x: number, y: number
        let validPosition = false
        
        // Try to find a position that's not too close to existing nodes
        // Spread out more to use available space
        while (!validPosition && attempts < 100) {
          x = margin + Math.random() * (width - 2 * margin)
          y = margin + Math.random() * (height - 2 * margin)
          
          validPosition = existingPositions.every(existing => {
            const dx = x - existing.x
            const dy = y - existing.y
            return Math.sqrt(dx * dx + dy * dy) >= minDistance
          })
          attempts++
        }
        
        newLayout[target.id] = { x: x!, y: y! }
        existingPositions.push({ x: x!, y: y! })
      })

      setLayout(newLayout)
    }

    // Only animate on first render
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true

      // Ensure all target statuses are neutral (will appear red/locked)
      // This is already initialized in useState, but we ensure it's set here too
      setTargetStatuses(prev => {
        const updated: Record<string, "neutral" | "compromised" | "failed"> = {}
        targets.forEach(target => {
          updated[target.id] = prev[target.id] || "neutral" // All start as neutral (locked/red)
        })
        return updated
      })

      // Animate VIPER appearing first
      setTimeout(() => {
        setVisibleTargets((prev) => [...prev, "viper"])
        setCurrentStatus("Initializing VIPER... Scanning network...")
      }, 200)

      // Show all targets at once (all red initially)
      setTimeout(() => {
        targets.forEach((target) => {
          setVisibleTargets((prev) => [...prev, target.id])
        })
        setCurrentStatus("Network scan complete. All targets identified.")
      }, 800)

      // Group attacks by target ID to process targets sequentially
      const attacksByTarget: Record<string, Array<{ attack: AttackAttempt; index: number }>> = {}
      attackSequence.forEach((attack, index) => {
        if (!attacksByTarget[attack.target]) {
          attacksByTarget[attack.target] = []
        }
        attacksByTarget[attack.target].push({ attack, index })
      })

      // Process targets in order (target1, target2, target3, etc.)
      // Only process targets that actually exist in the targets array
      const targetOrder = targets.map(t => t.id).filter(id => attacksByTarget[id] && attacksByTarget[id].length > 0)
      
      let currentTime = 800 + 1500 // Start after all targets are visible
      
      targetOrder.forEach((targetId, targetIndex) => {
        const targetNode = targets.find(t => t.id === targetId)
        const targetType = targetNode?.type.toUpperCase() || "TARGET"
        const targetAttacks = attacksByTarget[targetId]
        
        // Find the first successful attack index to know when to stop
        const firstSuccessIndex = targetAttacks.findIndex(({ attack }) => attack.status === "compromised")
        const attacksToProcess = firstSuccessIndex >= 0 
          ? targetAttacks.slice(0, firstSuccessIndex + 1) // Process up to and including first success
          : targetAttacks // Process all if no success (shouldn't happen, but safety)
        
        // Process attack attempts for this target sequentially
        attacksToProcess.forEach(({ attack, index: attackIndex }, attemptIndex) => {
          const attackStartTime = currentTime
          const isSuccess = attack.status === "compromised"
          
          setTimeout(() => {
            // Check if this target is already compromised (skip if so)
            setTargetStatuses(prev => {
              if (prev[targetId] === "compromised") {
                return prev // Already compromised, skip this attack
              }
              
              // Set active attack
              setActiveAttackIndex(attackIndex)
              setVisibleAttacks((prev) => {
                if (!prev.includes(`attack-${attackIndex}`)) {
                  return [...prev, `attack-${attackIndex}`]
                }
                return prev
              })
              
              // Phase 1: Target identification
              setCurrentStatus(`Target: ${targetNode?.label || targetId} (${targetType})`)
              
              // Phase 2: Analyzing/Scanning
              setTimeout(() => {
                setCurrentStatus(`Scanning ${targetNode?.label || targetId}...`)
              }, 500)
              
              setTimeout(() => {
                setCurrentStatus(`Analyzing target defenses...`)
              }, 1000)
              
              setTimeout(() => {
                setCurrentStatus(`Attempting ${attack.method}...`)
              }, 1500)
              
              // Phase 3: Exploiting (if applicable)
              if (attack.status === "exploiting" || attack.status === "compromised") {
                setTimeout(() => {
                  setCurrentStatus(`Port detected. Attempting connection...`)
                }, 2500)
                
                setTimeout(() => {
                  if (attack.method.includes("CVE")) {
                    setCurrentStatus(`Vulnerability identified. Exploiting ${attack.method}...`)
                  } else {
                    setCurrentStatus(`Exploiting ${targetNode?.label || targetId}...`)
                  }
                }, 3500)
              }
              
              // Phase 4: Result
              setTimeout(() => {
                setTargetStatuses(prev => {
                  if (prev[targetId] === "compromised") {
                    return prev // Skip if already compromised
                  }
                  
                  if (attack.status === "compromised") {
                    // Success!
                    setCurrentStatus(`✓ Success! Access granted to ${targetNode?.label || targetId}`)
                    
                    setTimeout(() => {
                      setCurrentStatus(`Establishing persistence...`)
                    }, 500)
                    
                    setTimeout(() => {
                      setTargetStatuses(prevStatuses => {
                        const newStatuses = { ...prevStatuses, [targetId]: "compromised" }
                        
                        // Mark attack as completed and hide attack line
                        setActiveAttackIndex(-1)
                        setCompletedAttackIndices(prev => new Set([...prev, attackIndex]))
                        setVisibleAttacks(prev => prev.filter(id => id !== `attack-${attackIndex}`))
                        
                        // Check if all targets are now compromised
                        const allTargetIds = targets.map(t => t.id)
                        const allCompromised = allTargetIds.every(id => newStatuses[id] === "compromised")
                        
                        if (allCompromised) {
                          // Wait 2-3 seconds then reset
                          setTimeout(() => {
                            setCurrentStatus("All targets compromised. Resetting...")
                            setTimeout(() => {
                              // Reset all state - set all targets back to neutral (red)
                              const resetStatuses: Record<string, "neutral" | "compromised" | "failed"> = {}
                              targets.forEach(target => {
                                resetStatuses[target.id] = "neutral"
                              })
                              setTargetStatuses(resetStatuses)
                              setVisibleTargets([])
                              setVisibleAttacks([])
                              setActiveAttackIndex(-1)
                              setCompletedAttackIndices(new Set())
                              setCurrentStatus("")
                              hasAnimatedRef.current = false
                              layoutGeneratedRef.current = false
                              
                              // Restart animation by incrementing key to force effect re-run
                              setTimeout(() => {
                                setAnimationKey(prev => prev + 1)
                              }, 500)
                            }, 1000)
                          }, 2500)
                        } else {
                          // Move to next target after brief pause
                          const nextTargetId = targetOrder[targetIndex + 1]
                          if (nextTargetId) {
                            const nextTargetNode = targets.find(t => t.id === nextTargetId)
                            setTimeout(() => {
                              setCurrentStatus(`Analyzing next target: ${nextTargetNode?.label || nextTargetId}...`)
                            }, 2000)
                          }
                        }
                        
                        return newStatuses
                      })
                    }, 1200)
                    
                    return prev
                  } else if (attack.status === "failed") {
                    // Failure - next attempt will be tried
                    setCurrentStatus(`✗ Failed: ${attack.reason || "Method blocked"}`)
                    
                    setTimeout(() => {
                      setCurrentStatus(`Analyzing failure: ${attack.reason || "Security measure detected"}`)
                    }, 1000)
                    
                    setTimeout(() => {
                      setCurrentStatus("Switching to alternative method...")
                    }, 1800)
                    
                    // Mark attack as completed and hide
                    setTimeout(() => {
                      setActiveAttackIndex(-1)
                      setCompletedAttackIndices(prev => new Set([...prev, attackIndex]))
                      setVisibleAttacks(prev => prev.filter(id => id !== `attack-${attackIndex}`))
                    }, 2500)
                    
                    return prev
                  }
                  
                  return prev
                })
              }, 4500)
              
              return prev
            })
          }, attackStartTime)
          
          // Calculate next attack start time
          if (isSuccess) {
            // Success - next attack will be for next target
            currentTime += 7000 // 7 seconds total for successful attack sequence
          } else {
            // Failed - next attempt for same target (shorter delay before retry)
            currentTime += 5500 // 5.5 seconds for failed attempt before retry
          }
        })
      })
    } else {
      // If already animated (shouldn't happen on fresh start, but handle it)
      // Reset to initial state instead of showing final states
      // This ensures a clean restart
      const initialStatuses: Record<string, "neutral" | "compromised" | "failed"> = {}
      targets.forEach(target => {
        initialStatuses[target.id] = "neutral" // Reset to neutral (red)
      })
      setTargetStatuses(initialStatuses)
      setVisibleTargets([])
      setVisibleAttacks([])
      setActiveAttackIndex(-1)
      setCompletedAttackIndices(new Set())
      setCurrentStatus("")
      
      // Reset the refs so animation can run again
      hasAnimatedRef.current = false
      layoutGeneratedRef.current = false
      setTimeout(() => {
        setAnimationKey(prev => prev + 1)
      }, 100)
    }
  }, [targets, attackSequence, animationKey])

  const getTargetStyle = (target: AttackTarget, targetId: string) => {
    const status = targetStatuses[targetId] || "neutral"
    
    // All targets start red (locked/neutral), only turn green when compromised
    if (status === "compromised") {
      return { bg: "#22c55e20", border: "#22c55e", text: "#22c55e" } // green - access granted
    } else {
      // Neutral or failed - show as red (locked)
      return { bg: "#ef444420", border: "#ef4444", text: "#ef4444" } // red - locked
    }
  }

  const getAttackStyle = (attack: AttackAttempt) => {
    return attackMethodStyles[attack.status] || attackMethodStyles.scanning
  }

  const viperPos = layout["viper"] || { x: 0, y: 0 }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <div className="bg-main/50 border border-accent/20 rounded-lg p-6 font-mono">
        <h3 className="text-accent text-2xl font-bold mb-3 text-center">
          VIPER Attack Flow
        </h3>
        
        <div className="relative" style={{ width: "100%", height: "500px" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 900 600"
            className="overflow-visible"
          >
            {/* Background grid and definitions */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
              {/* Arrow marker definition */}
              <marker
                id="arrowhead"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 12 3, 0 6"
                  fill="#daa520"
                  opacity="0.8"
                />
              </marker>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Subtle background glow around VIPER when active */}
            {activeAttackIndex >= 0 && (
              <motion.circle
                cx={viperPos.x}
                cy={viperPos.y}
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
            {/* Attack lines from VIPER to targets - ONLY show when actively attacking */}
            {attackSequence.map((attack, index) => {
              const targetNode = targets.find((t) => t.id === attack.target)
              if (!targetNode) return null

              const targetPos = layout[attack.target] || { x: 0, y: 0 }
              const attackId = `attack-${index}`
              const isVisible = visibleAttacks.includes(attackId)
              const isActive = activeAttackIndex === index
              
              // Only show arrows when actively attacking
              if (!isActive || !isVisible) {
                return null
              }
              
              const style = getAttackStyle(attack)

              // Calculate position for method label (midpoint with offset)
              const midX = (viperPos.x + targetPos.x) / 2
              const midY = (viperPos.y + targetPos.y) / 2
              const angle = Math.atan2(targetPos.y - viperPos.y, targetPos.x - viperPos.x)
              const labelOffsetX = Math.sin(angle) * 20
              const labelOffsetY = -Math.cos(angle) * 20

              return (
                <g key={attackId}>
                  <motion.line
                    x1={viperPos.x}
                    y1={viperPos.y}
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
                    transition={{ duration: 0.6 }}
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Attack method label */}
                  <motion.text
                    x={midX + labelOffsetX}
                    y={midY + labelOffsetY}
                    textAnchor="middle"
                    fill={style.color}
                    fontSize="16"
                    fontWeight="700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {attack.method}
                  </motion.text>
                </g>
              )
            })}
            
            {/* Status text above VIPER node */}
            {currentStatus && (
              <motion.g
                initial={{ opacity: 0, y: viperPos.y - 110 }}
                animate={{ opacity: 1, y: viperPos.y - 115 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background for text */}
                <rect
                  x={viperPos.x - 140}
                  y={viperPos.y - 130}
                  width="280"
                  height="28"
                  fill="#1a1a1a"
                  fillOpacity="0.9"
                  rx="4"
                />
                <text
                  x={viperPos.x}
                  y={viperPos.y - 113}
                  textAnchor="middle"
                  fill="#daa520"
                  fontSize="16"
                  fontWeight="500"
                  className="font-mono"
                >
                  {currentStatus.length > 60 ? currentStatus.substring(0, 57) + '...' : currentStatus}
                </text>
              </motion.g>
            )}


            {/* Target nodes */}
            {targets.map((target) => {
              const pos = layout[target.id] || { x: 0, y: 0 }
              const isVisible = visibleTargets.includes(target.id)
              const status = targetStatuses[target.id] || "neutral"
              const style = getTargetStyle(target, target.id)

              return (
                <motion.g
                  key={target.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isVisible ? 1 : 0,
                    opacity: isVisible ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  {/* Target circle with status indicator */}
                  {status === "compromised" && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={45}
                      fill="#22c55e"
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
                    strokeWidth={status === "compromised" ? 3.5 : 3}
                  />
                  {/* Status indicator icon */}
                  {status === "compromised" && (
                    <foreignObject x={pos.x - 16} y={pos.y - 16} width="32" height="32">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </foreignObject>
                  )}
                  {/* Show type icon for neutral/failed (red/locked state) */}
                  {status !== "compromised" && (
                    <foreignObject x={pos.x - 16} y={pos.y - 16} width="32" height="32">
                      {target.type === "server" && <Server className="w-8 h-8" style={{ color: "#ef4444" }} />}
                      {target.type === "database" && <Database className="w-8 h-8" style={{ color: "#ef4444" }} />}
                      {target.type === "workstation" && <Monitor className="w-8 h-8" style={{ color: "#ef4444" }} />}
                      {target.type === "firewall" && <Shield className="w-8 h-8" style={{ color: "#ef4444" }} />}
                      {target.type === "network" && <Network className="w-8 h-8" style={{ color: "#ef4444" }} />}
                    </foreignObject>
                  )}
                  {/* Target label */}
                  <text
                    x={pos.x}
                    y={pos.y + 60}
                    textAnchor="middle"
                    fill={style.text}
                    fontSize="16"
                    fontWeight="600"
                  >
                    {target.label}
                  </text>
                  {/* Target type */}
                  <text
                    x={pos.x}
                    y={pos.y - 55}
                    textAnchor="middle"
                    fill="#a0a0a0"
                    fontSize="14"
                    fontWeight="500"
                  >
                    {target.type.toUpperCase()}
                  </text>
                </motion.g>
              )
            })}

            {/* VIPER node (central attacker) */}
            {visibleTargets.includes("viper") && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {/* Outer pulse effect */}
                <motion.circle
                  cx={viperPos.x}
                  cy={viperPos.y}
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
                {/* VIPER circle */}
                <circle
                  cx={viperPos.x}
                  cy={viperPos.y}
                  r={45}
                  fill="#daa52020"
                  stroke="#daa520"
                  strokeWidth={4}
                />
                {/* VIPER label */}
                <text
                  x={viperPos.x}
                  y={viperPos.y - 65}
                  textAnchor="middle"
                  fill="#daa520"
                  fontSize="20"
                  fontWeight="bold"
                >
                  VIPER
                </text>
                {/* VIPER serpent icon - custom SVG path */}
                <g transform={`translate(${viperPos.x}, ${viperPos.y})`}>
                  {/* Serpent body - curved S shape */}
                  <path
                    d="M -25,5 Q -15,-5 -5,5 Q 5,15 15,5 Q 25,-5 35,5"
                    stroke="#daa520"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Serpent head (triangle/arrow shape) */}
                  <path
                    d="M -30,5 L -25,0 L -25,10 Z"
                    fill="#daa520"
                  />
                  {/* Eye */}
                  <circle cx="-27" cy="3" r="2" fill="#fff" />
                  {/* Body segments/pattern */}
                  <circle cx="-10" cy="8" r="3" fill="#daa520" opacity="0.7" />
                  <circle cx="10" cy="2" r="3" fill="#daa520" opacity="0.7" />
                </g>
              </motion.g>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-accent/10">
          <div className="grid grid-cols-2 gap-4">
            {/* Target statuses */}
            <div>
              <div className="text-sm text-secondary/70 mb-2 font-semibold">Target Status:</div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-secondary/50 bg-main/50" />
                  <span className="text-secondary/70 text-xs">Neutral (Locked)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-green-500 bg-green-500/20" />
                  <span className="text-secondary/70 text-xs">Compromised (Access Granted)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-red-500 bg-red-500/20" />
                  <span className="text-secondary/70 text-xs">Failed</span>
                </div>
              </div>
            </div>
            {/* Attack statuses */}
            <div>
              <div className="text-sm text-secondary/70 mb-2 font-semibold">Attack Status:</div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(attackMethodStyles).map(([status, style]) => (
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
          </div>
        </div>
      </div>
    </motion.div>
  )
}
