"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ShimmerButton } from "@/components/shimmer-button"

/**
 * Responsive navigation component for Prioritech Indonesia Optima.
 * 
 * Features:
 * - Mobile-first responsive design with hamburger menu
 * - Active state indicators for current page
 * - Smooth transitions and hover effects
 * - Consistent branding with Prioritech colors
 * 
 * @returns JSX element containing the navigation bar
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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
    <header className="sticky top-0 z-50 bg-main/95 backdrop-blur-sm border-b border-secondary/10 flex items-center justify-between px-4 py-2">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        {/* Mobile: Overunder logo (compact) */}
        <img 
          src="/prioritech-overunder-logo.svg" 
          alt="Prioritech Logo" 
          className="h-9 md:hidden" 
        />
        {/* Tablet+: Sidebyside logo */}
        <img 
          src="/prioritech-sidebyside-logo.svg" 
          alt="Prioritech Logo" 
          className="hidden md:block h-9 lg:h-12" 
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
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop CTA Button */}
      <ShimmerButton className="hidden md:flex bg-accent hover:bg-accent/90 text-main px-4 py-2 rounded-lg text-sm font-medium">
        Get Started
      </ShimmerButton>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-main/95 backdrop-blur-sm border-b border-secondary/10 z-20">
          <nav className="flex flex-col space-y-4 px-6 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? 'text-accent font-medium'
                    : 'text-secondary/80 hover:text-secondary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <ShimmerButton className="bg-accent hover:bg-accent/90 text-main px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg w-fit mt-4">
              Get Started
            </ShimmerButton>
          </nav>
        </div>
      )}
    </header>
  )
}
