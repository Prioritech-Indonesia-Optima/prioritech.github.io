import { cn } from "@/lib/utils"
import { MicroLabel } from "./MicroLabel"

/**
 * A section rendered as a bordered lattice cell with a mono micro-label header
 * rail. The header row spans the content width with a hairline underline —
 * the blueprint "sheet header" motif.
 */
export function LatticeSection({
  index,
  label,
  live = false,
  id,
  className,
  headerRight,
  children,
}: {
  index?: string
  label?: string
  live?: boolean
  id?: string
  className?: string
  headerRight?: React.ReactNode
  children: React.ReactNode
}): JSX.Element {
  return (
    <section id={id} className={cn("relative border-t border-line bg-canvas", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(label || index) && (
          <div className="flex items-center justify-between border-b border-line py-3">
            <MicroLabel index={index} live={live}>
              {label}
            </MicroLabel>
            {headerRight}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
