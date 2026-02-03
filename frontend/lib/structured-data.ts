/**
 * Enhanced structured data (Schema.org) helpers for SEO.
 * 
 * Provides functions to generate rich JSON-LD markup for better
 * search engine understanding and rich snippets.
 */

import { siteConfig } from './seo'

/**
 * Generate BreadcrumbList schema for navigation hierarchy.
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate Service schema for division pages.
 */
export function generateServiceSchema(service: {
  name: string
  description: string
  provider: string
  areaServed?: string
  serviceType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider,
    },
    areaServed: service.areaServed || 'ID',
    serviceType: service.serviceType || 'Professional Service',
  }
}

/**
 * Generate FAQPage schema.
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Product schema for project showcases.
 */
export function generateProductSchema(product: {
  name: string
  description: string
  image?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? `${siteConfig.url}${product.image}` : undefined,
    category: product.category || 'Software',
    brand: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}

/**
 * Generate LocalBusiness schema with complete company info.
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: `${siteConfig.url}/prioritech-logo-navbar.png`,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: '+62-21-XXXXXXX', // Update with real phone
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'NEO SOHO PODOMORO CITY UNIT 3106, Jl. Letjen S. Parman Kav. 28, Tanjung Duren Selatan',
      addressLocality: 'Jakarta Barat',
      addressRegion: 'DKI Jakarta',
      postalCode: '11470',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.178306,
      longitude: 106.791336,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      // Add social media profiles here when available
    ],
  }
}

/**
 * Generate Article schema for blog posts or detailed pages.
 */
export function generateArticleSchema(article: {
  headline: string
  description: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image ? `${siteConfig.url}${article.image}` : undefined,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/prioritech-logo-navbar.png`,
      },
    },
  }
}
