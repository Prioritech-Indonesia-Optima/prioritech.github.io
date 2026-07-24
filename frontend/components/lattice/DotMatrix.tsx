import { cn } from "@/lib/utils"

/**
 * Dot-matrix graph-paper backdrop. Absolutely-positioned decorative layer —
 * drop it inside a `relative` parent. Replaces the retired `.aurora-orb` blur.
 */
export function DotMatrix({
  fade = "radial",
  wide = false,
  className,
}: {
  fade?: "radial" | "top" | "none"
  wide?: boolean
  className?: string
}): JSX.Element {
  const mask =
    fade === "radial"
      ? "radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 78%)"
      : fade === "top"
        ? "linear-gradient(to bottom, black 0%, transparent 85%)"
        : undefined

  return (
    <div
      aria-hidden="true"
      className={cn("dot-matrix pointer-events-none absolute inset-0", wide && "dot-matrix--wide", className)}
      style={mask ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
    />
  )
}
