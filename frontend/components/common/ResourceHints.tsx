/**
 * Resource hints component for performance optimization.
 * 
 * Provides preconnect, dns-prefetch, and preload hints to browsers
 * for faster resource loading.
 */

export function ResourceHints() {
  return (
    <>
      {/* Preconnect to Vercel Analytics */}
      <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      
      {/* Preload critical logo for splash screen */}
      <link
        rel="preload"
        href="/logos/new/Asset%2010.png"
        as="image"
        type="image/png"
      />
    </>
  )
}
