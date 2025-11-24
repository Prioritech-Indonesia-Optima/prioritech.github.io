/**
 * Build script to pre-compute logo bounds at build time.
 * 
 * This script detects the actual bounding box of non-transparent pixels
 * in the logo image and saves the results to a JSON file. This eliminates
 * the need for expensive runtime canvas operations (saves ~325ms CPU time).
 * 
 * Usage: node scripts/precompute-logo-bounds.js
 * 
 * Requirements: sharp package (npm install sharp --save-dev)
 * 
 * Generates: public/logos/new/logo-bounds.json
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('Error: sharp module not found.');
  console.error('Please install dependencies by running: npm install');
  console.error('Or install sharp directly: npm install --save-dev sharp');
  process.exit(1);
}

const logoImagePath = path.join(__dirname, '../public/logos/new/Asset 10.png');
const outputPath = path.join(__dirname, '../public/logos/new/logo-bounds.json');

/**
 * Detects the bounding box of non-transparent pixels in an image.
 * 
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<Object|null>} Bounding box data or null if detection fails
 */
async function detectLogoBounds(imagePath) {
  try {
    // Load image metadata
    const metadata = await sharp(imagePath).metadata();
    const { width, height } = metadata;

    // Get raw pixel data (RGBA)
    const { data, info } = await sharp(imagePath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Find bounds of non-transparent pixels
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3]; // Alpha channel

        // If pixel is not transparent
        if (alpha > 0) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    // Calculate bounds relative to image dimensions (0-1 range)
    const bounds = {
      x: minX / width,
      y: minY / height,
      width: (maxX - minX + 1) / width,
      height: (maxY - minY + 1) / height,
      centerX: (minX + maxX) / 2 / width,
      centerY: (minY + maxY) / 2 / height,
    };

    return {
      imagePath: '/logos/new/Asset 10.png',
      imageWidth: width,
      imageHeight: height,
      bounds,
    };
  } catch (error) {
    console.error(`Error detecting bounds for ${imagePath}:`, error.message);
    return null;
  }
}

/**
 * Main function to pre-compute logo bounds.
 */
async function main() {
  console.log('Pre-computing logo bounds...\n');

  if (!fs.existsSync(logoImagePath)) {
    console.error(`Error: Logo image not found at ${logoImagePath}`);
    console.log('Skipping logo bounds pre-computation.');
    process.exit(0); // Don't fail build if image doesn't exist
  }

  const boundsData = await detectLogoBounds(logoImagePath);

  if (!boundsData) {
    console.error('Failed to detect logo bounds.');
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write bounds to JSON file
  fs.writeFileSync(
    outputPath,
    JSON.stringify(boundsData, null, 2),
    'utf-8'
  );

  console.log(`✓ Logo bounds pre-computed successfully!`);
  console.log(`  Saved to: ${outputPath}`);
  console.log(`  Bounds: x=${boundsData.bounds.x.toFixed(3)}, y=${boundsData.bounds.y.toFixed(3)}, width=${boundsData.bounds.width.toFixed(3)}, height=${boundsData.bounds.height.toFixed(3)}`);
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

