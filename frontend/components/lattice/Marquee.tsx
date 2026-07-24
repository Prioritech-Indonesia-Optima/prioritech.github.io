"use client"

import { cn } from "@/lib/utils"

/**
 * Infinite marquee band. The animated flex row holds the item list twice and
 * translates by -50%, so one full copy scrolls past seamlessly (matches the
 * `marquee` keyframe in globals.css). Pauses on hover.
 */
export function Marquee({
  items,
  reverse = false,
  speed = "base",
  separator,
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  items: React.ReactNode[]
  reverse?: boolean
  speed?: "base" | "slow"
  separator?: React.ReactNode
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
}): JSX.Element {
  const sep = separator ?? <span className="px-10 text-accent/70">✦</span>

  const sequence = items.map((item, i) => (
    <span key={i} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
      {item}
      {sep}
    </span>
  ))

  return (
    <div className={cn("group flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
          reverse && "marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {/* two identical copies → -50% translate loops seamlessly */}
        <div className="flex items-center">{sequence}</div>
        <div className="flex items-center" aria-hidden="true">
          {sequence}
        </div>
      </div>
    </div>
  )
}
