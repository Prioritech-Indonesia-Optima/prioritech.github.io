import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { SplashScreenWrapper } from '@/components/common/SplashScreenWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prioritech Indonesia Optima - AI & Engineering Solutions',
  description: 'Indonesian AI and engineering company focused on creating production-grade systems. Intelligent automation, network defense, and applied quantitative analytics.',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/prioritech-favicon.svg', sizes: 'any' },
    ],
    apple: [
      { url: '/prioritech-favicon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <SplashScreenWrapper>
          {children}
          <Analytics />
        </SplashScreenWrapper>
      </body>
    </html>
  )
}
