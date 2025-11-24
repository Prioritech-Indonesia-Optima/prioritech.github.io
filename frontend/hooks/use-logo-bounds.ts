"use client"

import { useEffect, useState, useCallback } from "react"
import { detectLogoBounds, LogoBounds } from "@/lib/logo-bounds"

/**
 * React hook for detecting logo bounds from an image.
 * 
 * Handles image loading, bounds detection, and responsive updates.
 * Returns the detected bounds, loading state, and any errors.
 * 
 * @param imageSrc - Path to the logo image (e.g., "/logos/new/Asset 10.png")
 * @param imageWidth - Display width of the image in pixels (for responsive calculations)
 * @param imageHeight - Display height of the image in pixels (for responsive calculations)
 * 
 * @returns Object containing:
 *   - bounds: LogoBounds | null - Detected bounds or null if not loaded/detected
 *   - isLoading: boolean - Whether bounds detection is in progress
 *   - error: Error | null - Any error that occurred during detection
 *   - absoluteBounds: LogoBounds | null - Bounds in absolute pixels (for positioning effects)
 */
export function useLogoBounds(
  imageSrc: string,
  imageWidth?: number,
  imageHeight?: number
): {
  bounds: LogoBounds | null
  isLoading: boolean
  error: Error | null
  absoluteBounds: LogoBounds | null
} {
  const [bounds, setBounds] = useState<LogoBounds | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const detectBounds = useCallback(async () => {
    if (!imageSrc) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const detectedBounds = await detectLogoBounds(imageSrc)
      
      if (detectedBounds) {
        setBounds(detectedBounds)
      } else {
        setError(new Error("Failed to detect logo bounds"))
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"))
    } finally {
      setIsLoading(false)
    }
  }, [imageSrc])

  useEffect(() => {
    detectBounds()
  }, [detectBounds])

  // Calculate absolute bounds if image dimensions are provided
  const absoluteBounds: LogoBounds | null = bounds && imageWidth && imageHeight
    ? {
        x: bounds.x * imageWidth,
        y: bounds.y * imageHeight,
        width: bounds.width * imageWidth,
        height: bounds.height * imageHeight,
        centerX: bounds.centerX * imageWidth,
        centerY: bounds.centerY * imageHeight,
      }
    : null

  return {
    bounds,
    isLoading,
    error,
    absoluteBounds,
  }
}

