"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="px-6 sm:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-foreground">PRIORITECH</span>
            <span className="text-[9px] font-mono text-foreground/30 tracking-wider">
              INDONESIA OPTIMA
            </span>
          </div>

          <nav className="flex items-center gap-6 font-mono" aria-label="Footer">
            <Link href="/about" className="text-xs text-foreground/40 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/divisions" className="text-xs text-foreground/40 hover:text-foreground transition-colors">
              Divisions
            </Link>
            <Link href="/projects" className="text-xs text-foreground/40 hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/tech" className="text-xs text-foreground/40 hover:text-foreground transition-colors">
              Tech
            </Link>
            <Link href="/contact" className="text-xs text-foreground/40 hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-foreground/40 hover:text-accent text-xs font-mono transition-colors"
            aria-label="Scroll to top"
          >
            TOP
            <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[10px] font-mono text-foreground/25">
            © {currentYear} PT Prioritech Indonesia Optima
          </p>
          <p className="text-[10px] font-mono text-foreground/25">
            Jakarta, Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
