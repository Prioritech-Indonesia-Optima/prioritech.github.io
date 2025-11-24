/**
 * Script to generate responsive image versions from source images.
 * 
 * This script generates optimized image sizes for the logo to reduce
 * download size and improve LCP (Largest Contentful Paint).
 * 
 * Usage: node scripts/generate-responsive-images.js
 * 
 * Requirements: sharp package (npm install sharp --save-dev)
 * 
 * Generates:
 * - Asset-10-450w.png (450x153) - for mobile
 * - Asset-10-900w.png (900x306) - for tablet
 * - Asset-10-1481w.png (1481x504) - for desktop (original size)
 * - WebP versions for better compression
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

const sourceImage = path.join(__dirname, '../public/logos/new/Asset 10.png');
const outputDir = path.join(__dirname, '../public/logos/new');

// Target sizes based on display dimensions
const sizes = [
  { width: 450, height: 153, suffix: '450w' },
  { width: 900, height: 306, suffix: '900w' },
  { width: 1481, height: 504, suffix: '1481w' },
];

/**
 * Generates optimized PNG and WebP versions of the source image.
 * 
 * @param {string} inputPath - Path to source image
 * @param {string} outputPath - Path for output image
 * @param {number} width - Target width
 * @param {number} height - Target height
 * @param {boolean} isWebP - Whether to generate WebP format
 */
async function generateImage(inputPath, outputPath, width, height, isWebP = false) {
  try {
    const format = isWebP ? 'webp' : 'png';
    const finalPath = outputPath.replace(/\.(png|webp)$/, `.${format}`);
    
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toFormat(format, {
        quality: isWebP ? 85 : 90,
        compressionLevel: 9,
      })
      .toFile(finalPath);
    
    const stats = fs.statSync(finalPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✓ Generated ${path.basename(finalPath)} (${width}x${height}, ${sizeKB} KB)`);
  } catch (error) {
    console.error(`✗ Error generating ${outputPath}:`, error.message);
  }
}

/**
 * Main function to generate all responsive image sizes.
 */
async function main() {
  console.log('Generating responsive image sizes...\n');
  
  if (!fs.existsSync(sourceImage)) {
    console.error(`Error: Source image not found at ${sourceImage}`);
    process.exit(1);
  }

  // Generate PNG and WebP versions for each size
  for (const size of sizes) {
    const baseName = `Asset-10-${size.suffix}`;
    const outputPath = path.join(outputDir, `${baseName}.png`);
    
    // Generate PNG
    await generateImage(sourceImage, outputPath, size.width, size.height, false);
    
    // Generate WebP
    await generateImage(sourceImage, outputPath, size.width, size.height, true);
  }
  
  console.log('\n✓ All responsive images generated successfully!');
}

// Run the script
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

