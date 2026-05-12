"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { ShimmerButton } from "@/components/shimmer-button"
import { spring, duration as motionDuration, easing } from "@/lib/motion"

/**
 * Responsive navigation with animated active-route indicator (shared layoutId),
 * accessible mobile overlay (Escape to close, focus trap, aria-current), and a
 * shimmering CTA. Respects prefers-reduced-motion via Framer Motion defaults.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Scroll detection
  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handle, { passive: true })
    handle()
    return () => window.removeEventListener("scroll", handle)
  }, [])

  // Close on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Escape to close + focus trap + body scroll lock
  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousActive = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
        return
      }
      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusables = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKey)

    // Focus first link
    requestAnimationFrame(() => {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>("a, button")
      firstLink?.focus()
    })

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKey)
      previousActive?.focus()
    }
  }, [mobileMenuOpen])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Divisions", href: "/divisions" },
    { name: "Projects", href: "/projects" },
    { name: "Tech", href: "/tech" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 border-b transition-colors ${
          isScrolled
            ? "bg-main/95 backdrop-blur-lg border-accent/15 shadow-lg shadow-accent/5"
            : "bg-transparent border-transparent"
        }`}
        animate={{
          paddingTop: isScrolled ? "0.5rem" : "1rem",
          paddingBottom: isScrolled ? "0.5rem" : "1rem",
        }}
        transition={spring.soft}
      >
        <motion.div
          className={`mx-auto flex items-center justify-between px-4 ${
            isScrolled ? "max-w-5xl" : "max-w-7xl"
          }`}
          transition={spring.soft}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Prioritech — home">
            <img
              src="/prioritech-logo-mobile.png"
              alt="Prioritech logo"
              className="h-[54px] md:hidden"
            />
            <motion.img
              src="/prioritech-logo-navbar.png"
              alt="Prioritech logo"
              className="hidden md:block"
              animate={{ height: isScrolled ? "54px" : "72px" }}
              transition={spring.soft}
            />
          </Link>

          {/* Desktop nav */}
          <LayoutGroup id="navbar-active">
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 font-mono" aria-label="Primary">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-3 py-2 text-sm lg:text-base rounded-md transition-colors ${
                      active
                        ? "text-accent"
                        : "text-secondary/80 hover:text-secondary hover:bg-secondary/5"
                    }`}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-1 h-[2px] rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </LayoutGroup>

          {/* Desktop CTA */}
          <Link href="/contact" className="hidden md:block">
            <ShimmerButton className="bg-accent hover:bg-accent/90 text-main px-4 py-2 rounded-lg text-sm font-medium font-mono">
              Get in touch
            </ShimmerButton>
          </Link>

          {/* Mobile menu trigger */}
          <button
            ref={triggerRef}
            className="md:hidden text-secondary p-2 rounded-md hover:bg-secondary/5"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <Menu className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="md:hidden fixed inset-0 z-50 bg-main/95 backdrop-blur-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionDuration.base, ease: easing.outQuart }}
          >
            <div className="aurora-orb aurora-orb--gold" style={{ width: 560, height: 560, top: -180, left: -120, opacity: 0.35 }} />
            <div className="aurora-orb aurora-orb--silver" style={{ width: 460, height: 460, bottom: -160, right: -120, opacity: 0.25, animationDelay: "-12s" }} />

            <div
              className="relative flex items-center justify-between p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <Link href="/" onClick={() => setMobileMenuOpen(false)} aria-label="Prioritech — home">
                <img
                  src="/prioritech-logo-mobile.png"
                  alt="Prioritech logo"
                  className="h-[54px]"
                />
              </Link>
              <button
                className="text-secondary p-2 hover:text-accent transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <nav
              aria-label="Mobile primary"
              className="relative flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-6"
            >
              {navigation.map((item, index) => {
                const active = isActive(item.href)
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: motionDuration.base,
                      ease: easing.outExpo,
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-2xl font-medium transition-colors font-mono ${
                        active ? "text-accent" : "text-secondary hover:text-accent"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: motionDuration.base, ease: easing.outExpo }}
              >
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <ShimmerButton className="bg-accent hover:bg-accent/90 text-main px-8 py-4 rounded-lg text-lg font-medium font-mono">
                    Get in touch
                  </ShimmerButton>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
