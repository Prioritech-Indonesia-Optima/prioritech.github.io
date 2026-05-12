"use client"

import Link from "next/link"
import { Mail, MapPin, Building2, ArrowUp } from "lucide-react"
import { scrollToTop } from "@/lib/animations"

/**
 * Footer with 4-column grid at lg, signature gold rail, and back-to-top control.
 * Keeps content static for SEO; only the back-to-top is interactive.
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Divisions", href: "/divisions" },
      { name: "Projects", href: "/projects" },
      { name: "Technology", href: "/tech" },
    ],
    solutions: [
      { name: "AI Systems", href: "/divisions#ai-systems" },
      { name: "Cybersecurity", href: "/divisions#cybersecurity" },
      { name: "Quantitative", href: "/divisions#quantitative" },
      { name: "Automation", href: "/divisions#automation" },
    ],
  }

  return (
    <footer className="relative bg-main border-t border-secondary/10 font-mono overflow-hidden">
      {/* Gold rail */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + blurb */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/prioritech-logo-footer.png"
                alt="Prioritech Indonesia Optima logo"
                className="h-20"
              />
            </div>
            <p className="text-secondary/70 text-sm mb-6 max-w-md leading-relaxed">
              Engineering systems that make intelligence practical. An Indonesian AI and
              engineering company focused on production-grade systems for enterprise scale.
            </p>

            <address className="not-italic space-y-3">
              <div className="flex items-center gap-3 text-secondary/70">
                <Building2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">PT PRIORITECH INDONESIA OPTIMA</span>
              </div>
              <div className="flex items-start gap-3 text-secondary/70">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  NEO SOHO PODOMORO CITY UNIT 3106
                  <br />
                  Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan
                  <br />
                  Jakarta Barat, DKI Jakarta 11470
                </span>
              </div>
              <div className="flex items-center gap-3 text-secondary/70">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:ivan.aurelius@prioritech.co.id"
                  className="text-sm hover:text-accent transition-colors"
                >
                  ivan.aurelius@prioritech.co.id
                </a>
              </div>
            </address>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-secondary font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-secondary font-semibold text-sm mb-4 uppercase tracking-wider">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                $ Start a build →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-secondary/50 text-sm text-center sm:text-left">
            © {currentYear} PT Prioritech Indonesia Optima — Progress. Precision. Prioritech.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-secondary/60 hover:text-accent text-sm transition-colors rounded-full border border-accent/20 hover:border-accent/60 px-4 py-2"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
