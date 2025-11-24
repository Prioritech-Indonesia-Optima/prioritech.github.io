/**
 * Layout for Divisions page with page-specific metadata.
 * 
 * Exports metadata for SEO since the page component is a client component.
 */

import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

/**
 * Divisions page metadata for SEO.
 * 
 * Focused on engineering divisions breakdown and specialized expertise.
 */
export const metadata: Metadata = generateSEOMetadata(
  'Engineering Divisions',
  'Explore Prioritech\'s five core engineering divisions: AI Systems & Orchestration, Cybersecurity & Intelligence, Quantitative & Financial Systems, Industrial & Edge Automation, and Applied Software Engineering.',
  '/divisions',
  ['engineering divisions', 'AI systems', 'cybersecurity', 'quantitative systems', 'automation', 'software engineering']
)

export default function DivisionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

