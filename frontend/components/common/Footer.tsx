"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { scrollToTop } from "@/lib/animations"
import { MicroLabel } from "@/components/lattice/MicroLabel"
import { MonoTimer } from "@/components/lattice/MonoTimer"
import { CornerTicks } from "@/components/lattice/CornerTicks"

/**
 * Footer as a full lattice block: giant dimmed wordmark, mono link columns,
 * Jakarta coordinates, and a live WIB wall-clock. Keeps content static for SEO;
 * back-to-top and the clock are the only live elements.
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
    <footer className="relative bg-canvas border-t border-line font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header rail */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
          <MicroLabel index="//" >PT PRIORITECH INDONESIA OPTIMA</MicroLabel>
          <div className="flex items-center gap-5">
            <MicroLabel>LAT -6.2088 · LNG 106.8456</MicroLabel>
            <MicroLabel live>
              WIB&nbsp;<MonoTimer mode="wallclock" timeZone="Asia/Jakarta" className="text-accent" />
            </MicroLabel>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Brand + address */}
          <div className="lg:col-span-2">
            <img
              src="/prioritech-logo-footer.png"
              alt="Prioritech Indonesia Optima logo"
              className="mb-5 h-16"
            />
            <p className="mb-6 max-w-md text-sm leading-relaxed text-secondary/65">
              Engineering systems that make intelligence practical. An Indonesian AI and
              engineering company focused on production-grade systems for enterprise scale.
            </p>
            <address className="not-italic space-y-1 text-[13px] leading-relaxed text-secondary/60">
              <div>NEO SOHO PODOMORO CITY UNIT 3106</div>
              <div>Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan</div>
              <div>Jakarta Barat, DKI Jakarta 11470</div>
              <a
                href="mailto:ivan.aurelius@prioritech.co.id"
                className="mt-2 inline-block text-accent transition-colors hover:text-accent/80"
              >
                ivan.aurelius@prioritech.co.id
              </a>
            </address>
          </div>

          {/* Company */}
          <div>
            <MicroLabel className="mb-4 block">01 / COMPANY</MicroLabel>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary/70 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <MicroLabel className="mb-4 block">02 / SOLUTIONS</MicroLabel>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary/70 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
            >
              $ Start a build →
            </Link>
          </div>
        </div>

        {/* Giant dimmed wordmark */}
        <div className="relative overflow-hidden border-t border-line py-6">
          <CornerTicks color="line" />
          <div className="select-none whitespace-nowrap text-center text-[13vw] font-bold uppercase leading-none tracking-tighter text-secondary/[0.04]">
            PRIORITECH
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 sm:flex-row">
          <p className="text-center text-xs text-secondary/50 sm:text-left">
            © {currentYear} PT Prioritech Indonesia Optima — Progress. Precision. Prioritech.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 border border-line px-4 py-2 text-xs uppercase tracking-[0.12em] text-secondary/60 transition-colors hover:border-accent/50 hover:text-accent"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
