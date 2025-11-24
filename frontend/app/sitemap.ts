/**
 * Dynamic sitemap generation for Prioritech Indonesia Optima.
 * 
 * This file generates sitemap.xml automatically during Next.js build.
 * Includes all main pages with proper priorities, change frequencies, and last modified dates.
 * 
 * URLs include trailing slashes to match Next.js trailingSlash configuration.
 */

import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/seo'

/**
 * Generates sitemap.xml for search engine discovery.
 * 
 * Includes all main pages of the website with:
 * - Proper URL formatting (with trailing slashes)
 * - Priority values (home page highest, others lower)
 * - Change frequency (how often pages are updated)
 * - Last modified dates
 * 
 * @returns Sitemap metadata route for Next.js
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const currentDate = new Date()

  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/divisions/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tech/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}

