/**
 * Dynamic robots.txt generation for Prioritech Indonesia Optima.
 * 
 * This file generates robots.txt automatically during Next.js build.
 * Allows all search engine crawlers and references the sitemap location.
 * 
 * Properly formatted for static export mode.
 */

import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

/**
 * Generates robots.txt for search engine crawler directives.
 * 
 * Configuration:
 * - Allows all user agents to crawl all pages
 * - References sitemap location for search engine discovery
 * - No disallowed paths (all content is public)
 * 
 * @returns Robots metadata route for Next.js
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

