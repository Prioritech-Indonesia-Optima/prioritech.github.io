/**
 * StructuredData component for rendering JSON-LD structured data.
 * 
 * This component provides JSON-LD structured data for search engines to better
 * understand the website content. Supports Organization, WebSite, and LocalBusiness schemas.
 * 
 * Structured data helps enable rich snippets in search results and improves
 * search engine understanding of the business.
 */

import React from 'react'

/**
 * Organization schema properties.
 */
export interface OrganizationSchema {
  '@context': string
  '@type': 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
  address?: {
    '@type': 'PostalAddress'
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  contactPoint?: {
    '@type': 'ContactPoint'
    email?: string
    contactType?: string
  }
  sameAs?: string[]
}

/**
 * WebSite schema properties.
 */
export interface WebSiteSchema {
  '@context': string
  '@type': 'WebSite'
  name: string
  url: string
  description?: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

/**
 * LocalBusiness schema properties.
 */
export interface LocalBusinessSchema {
  '@context': string
  '@type': 'LocalBusiness'
  name: string
  url: string
  description?: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion?: string
    postalCode: string
    addressCountry: string
  }
  contactPoint?: {
    '@type': 'ContactPoint'
    email?: string
    contactType?: string
  }
}

/**
 * Props for StructuredData component.
 */
interface StructuredDataProps {
  /**
   * Organization schema data.
   * Used for company information on all pages.
   */
  organization?: OrganizationSchema
  
  /**
   * WebSite schema data.
   * Used for website-level information, typically on home page.
   */
  website?: WebSiteSchema
  
  /**
   * LocalBusiness schema data.
   * Used for business location information, typically on contact page.
   */
  localBusiness?: LocalBusinessSchema
}

/**
 * StructuredData component for rendering JSON-LD structured data.
 * 
 * Renders JSON-LD script tags in the document head for search engine
 * consumption. Supports multiple schema types simultaneously.
 * 
 * @param props - Component props containing schema data
 * @returns Array of script elements with JSON-LD data
 * 
 * @example
 * <StructuredData
 *   organization={{
 *     '@context': 'https://schema.org',
 *     '@type': 'Organization',
 *     name: 'Prioritech Indonesia Optima',
 *     url: 'https://prioritech.co.id',
 *   }}
 * />
 */
export function StructuredData({ 
  organization, 
  website, 
  localBusiness 
}: StructuredDataProps): JSX.Element[] {
  const scripts: JSX.Element[] = []

  if (organization) {
    scripts.push(
      <script
        key="organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization, null, 0),
        }}
      />
    )
  }

  if (website) {
    scripts.push(
      <script
        key="website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(website, null, 0),
        }}
      />
    )
  }

  if (localBusiness) {
    scripts.push(
      <script
        key="localBusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusiness, null, 0),
        }}
      />
    )
  }

  return <>{scripts}</>
}

