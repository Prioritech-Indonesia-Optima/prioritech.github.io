/**
 * Lightweight animation utilities to replace Framer Motion.
 * 
 * Provides hooks and helpers for common animations using Intersection Observer
 * and CSS transforms. GPU-accelerated and performant.
 */

import { useEffect, useRef, useState, useCallback, RefObject } from 'react'

/**
 * Hook to detect when an element is in viewport.
 * Uses Intersection Observer for efficient visibility detection.
 * 
 * @param options - Intersection Observer options
 * @returns [ref, isInView] - Ref to attach to element and visibility state
 */
export function useInView(options?: IntersectionObserverInit): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref, isInView]
}

/**
 * Hook for parallax scrolling effect.
 * Returns a transform value based on scroll position.
 * 
 * @param speed - Parallax speed multiplier (default: 0.5)
 * @returns Transform Y value
 */
export function useParallax(speed: number = 0.5): string {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed)
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return `translateY(${offsetY}px)`
}

/**
 * Hook for scroll progress (0-1).
 * Useful for progress bars and scroll-based animations.
 * 
 * @returns Scroll progress as a number between 0 and 1
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      const scrollProgress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0

      setProgress(Math.min(Math.max(scrollProgress, 0), 1))
    }

    // Throttle scroll event to every 16ms (60fps)
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  return progress
}

/**
 * CSS class names for common animations.
 * Use these with Tailwind or custom CSS.
 */
export const animationClasses = {
  fadeIn: 'animate-fade-in',
  fadeUp: 'animate-fade-up',
  scaleIn: 'animate-scale-in',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
} as const

/**
 * Helper to generate reveal animation style.
 * Apply to elements that should animate when in view.
 * 
 * @param isInView - Whether element is in viewport
 * @param delay - Animation delay in milliseconds
 * @returns Style object for reveal animation
 */
export function getRevealStyle(isInView: boolean, delay: number = 0) {
  return {
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  }
}

/**
 * Hook for scroll-based navbar behavior.
 * Returns whether navbar should be in "scrolled" state.
 * 
 * @param threshold - Scroll threshold in pixels (default: 50)
 * @returns Whether scrolled past threshold
 */
export function useScrolled(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    // Debounce for performance
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 16) // ~60fps
    }

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [threshold])

  return isScrolled
}

/**
 * Hook for typewriter effect.
 * Reveals text character by character.
 * 
 * @param text - Full text to reveal
 * @param speed - Characters per second (default: 20)
 * @returns Current displayed text
 */
/**
 * Magnetic hover effect — element gently follows the cursor when near it.
 * Returns a ref to attach and a style object with the current translate.
 *
 * @param strength - Pull strength (0-1). 0.3 is subtle, 0.6 noticeable.
 * @param radius - Activation radius in pixels.
 */
export function useMagneticHover<T extends HTMLElement = HTMLDivElement>(
  strength: number = 0.3,
  radius: number = 120
): {
  ref: RefObject<T>
  style: React.CSSProperties
} {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on touch devices (no hover) and reduced motion users
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (window.matchMedia('(hover: none)').matches) return
    }

    let frame = 0
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > radius) {
        if (offset.x !== 0 || offset.y !== 0) setOffset({ x: 0, y: 0 })
        return
      }
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setOffset({ x: dx * strength, y: dy * strength })
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(frame)
      setOffset({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(frame)
    }
  }, [strength, radius, offset.x, offset.y])

  return {
    ref,
    style: {
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform',
    },
  }
}

/**
 * Smooth scroll to top with reduced-motion fallback.
 */
export function scrollToTop(): void {
  if (typeof window === 'undefined') return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

export function useTypewriter(text: string, speed: number = 20): string {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let currentIndex = 0
    const intervalMs = 1000 / speed

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, intervalMs)

    return () => {
      clearInterval(interval)
    }
  }, [text, speed])

  return displayedText
}
