"use client"

/**
 * Splash → content handoff signal.
 *
 * A module-singleton flag plus a CustomEvent. The hero's entrance animation
 * subscribes via `useSplashHandoff`; the flag check handles the two races:
 *   (a) hero mounts AFTER the splash already finished (flag already true → fire now)
 *   (b) splash was skipped entirely (revisit / deep-link → skip branch fires it)
 */

import { useEffect } from "react"

const EVENT = "prioritech:splash-done"
let done = false

/** Called by SplashScreenWrapper on both the complete and skip paths. */
export function signalSplashDone(): void {
  if (done) return
  done = true
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT))
  }
}

/** True once the splash has handed off (or was skipped). */
export function isSplashDone(): boolean {
  return done
}

/**
 * Run `cb` once the splash hands off. Fires immediately if handoff already
 * happened, otherwise waits for the event. Safe against unmount.
 */
export function useSplashHandoff(cb: () => void): void {
  useEffect(() => {
    if (done) {
      cb()
      return
    }
    let fired = false
    const handler = () => {
      if (fired) return
      fired = true
      cb()
    }
    window.addEventListener(EVENT, handler)
    return () => window.removeEventListener(EVENT, handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
