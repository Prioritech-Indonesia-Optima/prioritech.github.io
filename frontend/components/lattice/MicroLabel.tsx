import { cn } from "@/lib/utils"

/**
 * Mono micro-label — the connective tissue of the instrument-panel language.
 * e.g. `001 / AI SYSTEMS & ORCHESTRATION`. `live` adds a pulsing gold dot.
 */
export function MicroLabel({
  index,
  live = false,
  className,
  children,
}: {
  index?: string
  live?: boolean
  className?: string
  children?: React.ReactNode
}): JSX.Element {
  return (
    <span className={cn("micro-label inline-flex items-center gap-2", className)}>
      {live && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {index && <span className="text-accent">{index}</span>}
      {index && children && <span className="opacity-40">/</span>}
      {children}
    </span>
  )
}
