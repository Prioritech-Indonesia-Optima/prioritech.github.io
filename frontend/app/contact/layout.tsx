/**
 * Layout for Contact page with page-specific metadata.
 * 
 * Exports metadata for SEO since the page component is a client component.
 */

import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

/**
 * Contact page metadata for SEO.
 * 
 * Focused on business contact information and location.
 */
export const metadata: Metadata = generateSEOMetadata(
  'Contact Us',
  'Get in touch with Prioritech Indonesia Optima. Located in Jakarta, Indonesia. Contact us for AI systems, engineering solutions, and production-grade automation.',
  '/contact',
  ['contact', 'business inquiries', 'jakarta', 'indonesia', 'office location']
)

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

