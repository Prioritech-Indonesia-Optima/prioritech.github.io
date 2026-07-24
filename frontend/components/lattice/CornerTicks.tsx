import { cn } from "@/lib/utils"

/**
 * Blueprint corner ticks — small L-marks pinned to the 4 corners of a
 * positioned parent. Purely decorative.
 */
export function CornerTicks({
  color = "accent-dim",
  size = 8,
  inset = 0,
  className,
}: {
  color?: "line" | "accent-dim"
  size?: number
  inset?: number
  className?: string
}): JSX.Element {
  const stroke = color === "accent-dim" ? "var(--accent-dim)" : "var(--line-strong)"
  const corners = [
    { top: inset, left: inset, bt: true, bl: true },
    { top: inset, right: inset, bt: true, br: true },
    { bottom: inset, left: inset, bb: true, bl: true },
    { bottom: inset, right: inset, bb: true, br: true },
  ] as const

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {corners.map((c, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "top" in c ? c.top : undefined,
            bottom: "bottom" in c ? c.bottom : undefined,
            left: "left" in c ? c.left : undefined,
            right: "right" in c ? c.right : undefined,
            width: size,
            height: size,
            borderTop: "bt" in c && c.bt ? `1px solid ${stroke}` : undefined,
            borderBottom: "bb" in c && c.bb ? `1px solid ${stroke}` : undefined,
            borderLeft: "bl" in c && c.bl ? `1px solid ${stroke}` : undefined,
            borderRight: "br" in c && c.br ? `1px solid ${stroke}` : undefined,
          }}
        />
      ))}
    </div>
  )
}
