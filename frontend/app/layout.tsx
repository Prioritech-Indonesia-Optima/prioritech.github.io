import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { SplashScreenWrapper } from '@/components/common/SplashScreenWrapper'
import { StructuredData } from '@/components/common/StructuredData'
import { ResourceHints } from '@/components/common/ResourceHints'
import { generateMetadata as generateSEOMetadata, siteConfig, getCanonicalUrl } from '@/lib/seo'
import './globals.css'

/**
 * Root layout metadata with comprehensive SEO configuration.
 * 
 * Includes:
 * - Base metadata (title, description, keywords)
 * - Open Graph tags for social media sharing
 * - Twitter Card tags
 * - Canonical URLs
 * - Robots directives
 * - Viewport and other essential meta tags
 */
export const metadata: Metadata = {
  ...generateSEOMetadata(
    'AI & Engineering Solutions',
    siteConfig.description,
    '/',
    undefined,
    undefined,
    'website'
  ),
  generator: 'Next.js',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/prioritech-favicon.png', sizes: 'any' },
      { url: '/prioritech-favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/prioritech-favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'font-display': 'swap',
  },
}

/**
 * Viewport configuration for responsive design.
 * 
 * Exported separately as required by Next.js 14+.
 * Controls how the page is displayed on mobile devices.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/**
 * Root layout component for Prioritech Indonesia Optima landing page.
 * 
 * This file defines the root HTML structure and metadata for the entire application.
 * It includes:
 * - Global metadata (title, description, SEO tags)
 * - Font configuration (Geist Sans and Mono)
 * - Analytics integration (Vercel Analytics)
 * - Global CSS imports
 * 
 * The layout wraps all pages and provides consistent styling and functionality
 * across the entire application.
 * 
 * @param children - React children components to be rendered
 * @returns JSX element containing the root HTML structure
 */
/**
 * Organization structured data for search engines.
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization' as const,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/prioritech-logo-navbar.png`,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress' as const,
    streetAddress: 'NEO SOHO PODOMORO CITY UNIT 3106, Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan',
    addressLocality: 'Jakarta Barat',
    addressRegion: 'DKI Jakarta',
    postalCode: '11470',
    addressCountry: 'ID',
  },
  contactPoint: {
    '@type': 'ContactPoint' as const,
    email: 'business@prioritech.co.id',
    contactType: 'Business Inquiries',
  },
}

/**
 * WebSite structured data for search engines.
 */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite' as const,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction' as const,
    target: {
      '@type': 'EntryPoint' as const,
      urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

/**
 * Root layout component for Prioritech Indonesia Optima landing page.
 * 
 * This file defines the root HTML structure and metadata for the entire application.
 * It includes:
 * - Global metadata (title, description, SEO tags)
 * - Open Graph and Twitter Card tags
 * - Structured data (JSON-LD) for Organization and WebSite
 * - Font configuration (Geist Sans and Mono)
 * - Analytics integration (Vercel Analytics)
 * - Global CSS imports
 * 
 * The layout wraps all pages and provides consistent styling and functionality
 * across the entire application.
 * 
 * @param children - React children components to be rendered
 * @returns JSX element containing the root HTML structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ResourceHints />
        <StructuredData 
          organization={organizationSchema}
          website={websiteSchema}
        />
      </head>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <SplashScreenWrapper>
          {children}
          <Analytics />
        </SplashScreenWrapper>
      </body>
    </html>
  )
}
