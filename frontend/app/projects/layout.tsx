/**
 * Layout for Projects page with page-specific metadata.
 * 
 * Exports metadata for SEO since the page component is a client component.
 */

import type { Metadata } from 'next'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

/**
 * Projects page metadata for SEO.
 * 
 * Focused on portfolio showcase, case studies, and project examples.
 */
export const metadata: Metadata = generateSEOMetadata(
  'Projects & Portfolio',
  'Explore Prioritech\'s portfolio of production-grade systems. AI systems, cybersecurity solutions, quantitative analytics, industrial automation, and applied software engineering projects.',
  '/projects',
  ['portfolio', 'projects', 'case studies', 'AI projects', 'engineering projects', 'automation projects']
)

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

