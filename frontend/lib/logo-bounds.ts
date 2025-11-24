/**
 * Logo Bounds Detection Utility
 * 
 * Detects the actual bounding box of non-transparent pixels in a PNG image.
 * Used to position effects around the actual logo shape rather than the full image dimensions.
 * 
 * This utility first checks for pre-computed bounds (from build-time computation)
 * to avoid expensive runtime canvas operations. Falls back to runtime detection if needed.
 * 
 * @param imageSrc - Path to the image file
 * @returns Promise resolving to bounding box { x, y, width, height } relative to image dimensions, or null if detection fails
 */

export interface LogoBounds {
  x: number
  y: number
  width: number
  height: number
  centerX: number
  centerY: number
}

/**
 * Pre-computed logo bounds data structure.
 */
interface PrecomputedBoundsData {
  imagePath: string
  imageWidth: number
  imageHeight: number
  bounds: LogoBounds
}

/**
 * Cache for pre-computed bounds (loaded once).
 */
let precomputedBoundsCache: PrecomputedBoundsData | null = null

/**
 * Loads pre-computed logo bounds from JSON file.
 * 
 * @returns Pre-computed bounds data or null if not available
 */
async function loadPrecomputedBounds(): Promise<PrecomputedBoundsData | null> {
  if (precomputedBoundsCache !== null) {
    return precomputedBoundsCache
  }

  try {
    const response = await fetch('/logos/new/logo-bounds.json')
    if (!response.ok) {
      return null
    }
    const data: PrecomputedBoundsData = await response.json()
    precomputedBoundsCache = data
    return data
  } catch (error) {
    // Pre-computed bounds not available, will fall back to runtime detection
    return null
  }
}

/**
 * Detects the bounding box of non-transparent pixels in an image.
 * 
 * First attempts to use pre-computed bounds (from build-time) to avoid
 * expensive canvas operations. Falls back to runtime detection if pre-computed
 * bounds are not available.
 * 
 * @param imageSrc - Path to the image file (e.g., "/logos/new/Asset 10.png")
 * @returns Promise resolving to LogoBounds or null if detection fails
 */
export async function detectLogoBounds(imageSrc: string): Promise<LogoBounds | null> {
  // Try to load pre-computed bounds first
  const precomputed = await loadPrecomputedBounds()
  if (precomputed && precomputed.imagePath === imageSrc) {
    return precomputed.bounds
  }

  // Fall back to runtime detection if pre-computed bounds not available
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    
    img.onload = () => {
      try {
        // Create canvas to analyze image
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        
        if (!ctx) {
          resolve(null)
          return
        }
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0)
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
        // Find bounds of non-transparent pixels
        let minX = canvas.width
        let minY = canvas.height
        let maxX = 0
        let maxY = 0
        
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4
            const alpha = data[index + 3] // Alpha channel
            
            // If pixel is not transparent
            if (alpha > 0) {
              minX = Math.min(minX, x)
              minY = Math.min(minY, y)
              maxX = Math.max(maxX, x)
              maxY = Math.max(maxY, y)
            }
          }
        }
        
        // Calculate bounds
        const width = maxX - minX + 1
        const height = maxY - minY + 1
        
        // Return bounds relative to image dimensions (0-1 range)
        const bounds: LogoBounds = {
          x: minX / canvas.width,
          y: minY / canvas.height,
          width: width / canvas.width,
          height: height / canvas.height,
          centerX: (minX + maxX) / 2 / canvas.width,
          centerY: (minY + maxY) / 2 / canvas.height,
        }
        
        resolve(bounds)
      } catch (error) {
        console.error("Error detecting logo bounds:", error)
        resolve(null)
      }
    }
    
    img.onerror = () => {
      resolve(null)
    }
    
    img.src = imageSrc
  })
}

