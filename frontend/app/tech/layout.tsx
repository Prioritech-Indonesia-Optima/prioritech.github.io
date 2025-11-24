/**
 * Layout for Tech page with page-specific metadata.
 * 
 * Exports metadata for SEO since the page component is a client component.
 */

import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

/**
 * Tech page metadata for SEO.
 * 
 * Focused on technology stack, methodology, and development approach.
 */
export const metadata: Metadata = generateSEOMetadata(
  'Technology Stack',
  'Explore Prioritech\'s comprehensive technology stack: backend languages, AI/ML frameworks, frontend tools, infrastructure, and development methodology. Production-first engineering approach.',
  '/tech',
  ['technology stack', 'tech stack', 'programming languages', 'AI frameworks', 'development methodology', 'engineering tools']
)

export default function TechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

