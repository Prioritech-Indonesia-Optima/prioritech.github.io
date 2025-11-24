/**
 * SEO utility functions for generating consistent metadata across the application.
 * 
 * This file provides centralized SEO configuration and utility functions for:
 * - Generating metadata objects with Open Graph and Twitter Cards
 * - Creating canonical URLs
 * - Managing site-wide SEO constants
 * 
 * All functions follow Next.js App Router metadata conventions.
 */

/**
 * Site-wide SEO configuration constants.
 */
export const siteConfig = {
  name: 'Prioritech Indonesia Optima',
  shortName: 'Prioritech',
  description: 'Indonesian AI and engineering company focused on creating production-grade systems. Intelligent automation, network defense, and applied quantitative analytics.',
  url: 'https://prioritech.co.id',
  ogImage: '/prioritech-logo-navbar.png',
  twitterHandle: '@prioritech',
  author: 'Prioritech Indonesia Optima',
  keywords: [
    'AI systems',
    'engineering solutions',
    'automation',
    'cybersecurity',
    'quantitative analytics',
    'industrial automation',
    'robotics',
    'machine learning',
    'production-grade systems',
    'Indonesia',
    'Jakarta'
  ],
  locale: 'en_US',
  type: 'website',
} as const

/**
 * Generates a canonical URL for a given path.
 * 
 * @param path - The path relative to the site root (e.g., '/about', '/contact')
 * @returns Full canonical URL with trailing slash
 * 
 * @example
 * getCanonicalUrl('/about') // Returns 'https://prioritech.co.id/about/'
 */
export function getCanonicalUrl(path: string = '/'): string {
  const cleanPath = path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`
  return `${siteConfig.url}${cleanPath}`
}

/**
 * Generates Open Graph metadata object.
 * 
 * @param title - Page title
 * @param description - Page description
 * @param path - Page path for canonical URL
 * @param image - Optional OG image path (defaults to site default)
 * @param type - Optional OG type (defaults to 'website')
 * @returns Open Graph metadata object
 */
export function generateOpenGraph(
  title: string,
  description: string,
  path: string = '/',
  image?: string,
  type: string = 'website'
) {
  const ogImage = image || siteConfig.ogImage
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`
  
  return {
    title,
    description,
    url: getCanonicalUrl(path),
    siteName: siteConfig.name,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: siteConfig.locale,
    type,
  }
}

/**
 * Generates Twitter Card metadata object.
 * 
 * @param title - Page title
 * @param description - Page description
 * @param image - Optional Twitter image path (defaults to site default)
 * @returns Twitter Card metadata object
 */
export function generateTwitterCard(
  title: string,
  description: string,
  image?: string
) {
  const twitterImage = image || siteConfig.ogImage
  const twitterImageUrl = twitterImage.startsWith('http') ? twitterImage : `${siteConfig.url}${twitterImage}`
  
  return {
    card: 'summary_large_image',
    title,
    description,
    images: [twitterImageUrl],
    creator: siteConfig.twitterHandle,
  }
}

/**
 * Generates comprehensive metadata object for a page.
 * 
 * Combines title, description, canonical URL, Open Graph, and Twitter Cards
 * into a single metadata object compatible with Next.js App Router.
 * 
 * @param title - Page title (will be combined with site name)
 * @param description - Page description
 * @param path - Page path for canonical URL
 * @param keywords - Optional page-specific keywords (merged with site keywords)
 * @param image - Optional OG/Twitter image path
 * @param type - Optional OG type
 * @returns Complete metadata object for Next.js
 * 
 * @example
 * generateMetadata('About Us', 'Learn about our company', '/about')
 */
export function generateMetadata(
  title: string,
  description: string,
  path: string = '/',
  keywords?: string[],
  image?: string,
  type?: string
) {
  const fullTitle = path === '/' 
    ? `${siteConfig.name} - ${title}`
    : `${title} | ${siteConfig.name}`
  
  const allKeywords = keywords 
    ? [...siteConfig.keywords, ...keywords] as string[]
    : [...siteConfig.keywords] as string[]

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    openGraph: generateOpenGraph(fullTitle, description, path, image, type),
    twitter: generateTwitterCard(fullTitle, description, image),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

