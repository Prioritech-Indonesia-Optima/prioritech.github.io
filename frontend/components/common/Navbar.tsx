"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ShimmerButton } from "@/components/shimmer-button"

/**
 * Responsive navigation component for Prioritech Indonesia Optima.
 * 
 * Features:
 * - Resizable navbar that changes width on scroll (Aceternity-style)
 * - Transparent-to-solid background transition
 * - Full-screen overlay mobile menu with animations
 * - Active state indicators for current page
 * - Smooth transitions and hover effects
 * - Consistent branding with Prioritech colors
 * 
 * @returns JSX element containing the navigation bar
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Scroll detection for navbar resize
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Divisions', href: '/divisions' },
    { name: 'Projects', href: '/projects' },
    { name: 'Tech', href: '/tech' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header 
        className={`sticky top-0 z-50 border-b border-secondary/10 shadow-lg ${
          isScrolled 
            ? 'bg-main/95 backdrop-blur-lg' 
            : 'bg-transparent'
        }`}
        animate={{
          paddingTop: isScrolled ? '0.5rem' : '1rem',
          paddingBottom: isScrolled ? '0.5rem' : '1rem',
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <motion.div 
          className={`mx-auto flex items-center justify-between px-4 ${
            isScrolled ? 'max-w-5xl' : 'max-w-7xl'
          }`}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Mobile: Overunder logo (compact) */}
            <img 
              src="/prioritech-overunder-logo.svg" 
              alt="Prioritech Logo" 
              className="h-[54px] md:hidden" 
            />
            {/* Tablet+: Sidebyside logo */}
            <motion.img 
              src="/prioritech-sidebyside-logo.svg" 
              alt="Prioritech Logo" 
              className="hidden md:block" 
              animate={{
                height: isScrolled ? '54px' : '72px'
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors text-sm lg:text-base ${
                  isActive(item.href)
                    ? 'text-accent font-medium'
                    : 'text-secondary/80 hover:text-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-secondary p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop CTA Button */}
          <Link href="/projects">
            <ShimmerButton className="hidden md:flex bg-accent hover:bg-accent/90 text-main px-4 py-2 rounded-lg text-sm font-medium">
              Get Started
            </ShimmerButton>
          </Link>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 bg-main/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Header with logo and close button */}
            <div className="flex items-center justify-between p-6" onClick={(e) => e.stopPropagation()}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <img 
                  src="/prioritech-overunder-logo.svg" 
                  alt="Prioritech Logo" 
                  className="h-[54px]" 
                />
              </Link>
              <button 
                className="text-secondary p-2 hover:text-accent transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Navigation links - centered */}
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-8" onClick={(e) => e.stopPropagation()}>
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-accent'
                        : 'text-secondary hover:text-accent'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button at bottom center */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>
                  <ShimmerButton className="bg-accent hover:bg-accent/90 text-main px-8 py-4 rounded-lg text-lg font-medium">
                    Get Started
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
