"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { createDraggable, useAnimeScope } from "@/lib/anime"

/**
 * A draggable "toy" chip — the animejs.com signature. Throw it and it settles
 * against the container walls with a springy release. Static (non-draggable)
 * under reduced motion. Render it inside a `relative` parent that defines the
 * drag bounds.
 */
export function DraggableChip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element {
  const container = useRef<HTMLDivElement>(null)
  const chip = useRef<HTMLDivElement>(null)

  useAnimeScope(
    container,
    () => {
      if (!chip.current || !container.current) return
      createDraggable(chip.current, {
        container: container.current,
        containerPadding: 8,
        releaseStiffness: 120,
        releaseDamping: 16,
        cursor: false,
      })
    },
    [],
  )

  return (
    <div ref={container} className="pointer-events-none absolute inset-0">
      <div
        ref={chip}
        className={cn(
          "pointer-events-auto absolute cursor-grab touch-none select-none active:cursor-grabbing",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
