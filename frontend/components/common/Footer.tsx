import Link from "next/link"
import { Mail, MapPin, Building2 } from "lucide-react"

/**
 * Footer component for Prioritech Indonesia Optima.
 * 
 * Displays company information, contact details, and navigation links.
 * Features responsive design and consistent branding with Prioritech colors.
 * 
 * @returns JSX element containing the footer section
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Divisions', href: '/divisions' },
      { name: 'Projects', href: '/projects' },
      { name: 'Technology', href: '/tech' },
    ],
    contact: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Get Started', href: '/contact' },
    ],
  }

  return (
    <footer className="bg-main border-t border-secondary/10 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/prioritech-logo-footer.png" alt="Prioritech Indonesia Optima Logo" className="h-20" />
            </div>
            <p className="text-secondary/70 text-sm mb-6 max-w-md">
              Engineering systems that make intelligence practical. We're an Indonesian AI and engineering 
              company focused on creating production-grade systems for enterprise scale.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-secondary/70">
                <Building2 className="w-4 h-4 text-accent" />
                <span className="text-sm">PT PRIORITECH INDONESIA OPTIMA</span>
              </div>
              <div className="flex items-center space-x-3 text-secondary/70">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm">
                  NEO SOHO PODOMORO CITY UNIT 3106<br />
                  Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan<br />
                  Jakarta Barat, DKI Jakarta 11470
                </span>
              </div>
              {/*
              <div className="flex items-center space-x-3 text-secondary/70">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:business@prioritech.co.id" className="text-sm hover:text-accent transition-colors">
                  business@prioritech.co.id
                </a>
              </div>
              */}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-secondary font-semibold text-sm mb-4">Company</h3>
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

          {/* Contact Links */}
          <div>
            <h3 className="text-secondary font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/10 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-secondary/50 text-sm">
              © 2025 PT Prioritech Indonesia Optima — Progress. Precision. Prioritech.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
