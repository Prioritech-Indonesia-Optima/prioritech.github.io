/**
 * Layout for About page with page-specific metadata.
 * 
 * Exports metadata for SEO since the page component is a client component.
 */

import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

/**
 * About page metadata for SEO.
 * 
 * Focused on company identity, engineering ethos, and principles.
 */
export const metadata: Metadata = generateSEOMetadata(
  'About Us',
  'Learn about Prioritech Indonesia Optima - our engineering philosophy, focus areas, and commitment to building production-grade systems. Precision, elegance, and systems that perform.',
  '/about',
  ['company', 'engineering philosophy', 'about prioritech', 'engineering approach', 'production systems']
)

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

