"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme, ThemeToggle } from "./ThemeProvider"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handle, { passive: true })
    handle()
    return () => window.removeEventListener("scroll", handle)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousActive = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
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
    requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>("a, button")?.focus()
    })

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKey)
      previousActive?.focus()
    }
  }, [mobileMenuOpen])

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Divisions", href: "/divisions" },
    { name: "Projects", href: "/projects" },
    { name: "Tech", href: "/tech" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => pathname.startsWith(href)
  const logoSrc = theme === "dark" ? "/prioritech-logo-navbar.webp" : "/prioritech-logo-navbar-dark.webp"

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-12 lg:px-20 h-16">
          <Link href="/" className="flex items-center" aria-label="Prioritech — home">
            <img
              src={logoSrc}
              alt="Prioritech Indonesia Optima"
              className="h-9 md:h-11"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-mono" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-xs tracking-wide transition-colors ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden text-foreground/70 p-2"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-6 h-16">
              <img src={logoSrc} alt="Prioritech" className="h-8" />
              <button
                className="text-foreground/70 p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav
              aria-label="Mobile primary"
              className="flex flex-col items-center justify-center h-[calc(100vh-128px)] gap-8 font-mono"
            >
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`text-lg transition-colors ${
                      isActive(item.href) ? "text-accent" : "text-foreground/70"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
