/**
 * Image optimization script for GitHub Pages deployment.
 * 
 * Converts PNGs to WebP format with multiple sizes for responsive images.
 * Maintains PNG fallbacks for older browsers.
 * 
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SIZES = [450, 900, 1800]; // Responsive image sizes
const QUALITY = 85; // WebP quality (1-100)

/**
 * Get all PNG files recursively from a directory
 */
function getPngFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getPngFiles(filePath, fileList);
    } else if (file.toLowerCase().endsWith('.png')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Convert PNG to WebP with multiple sizes
 */
async function convertToWebP(pngPath) {
  const relativePath = path.relative(PUBLIC_DIR, pngPath);
  const dir = path.dirname(pngPath);
  const filename = path.basename(pngPath, '.png');

  console.log(`Processing: ${relativePath}`);

  try {
    const image = sharp(pngPath);
    const metadata = await image.metadata();

    // Skip if image is too small
    if (metadata.width < 100 || metadata.height < 100) {
      console.log(`  Skipped (too small): ${metadata.width}x${metadata.height}`);
      return;
    }

    // Generate WebP versions at different sizes
    for (const size of SIZES) {
      if (size > metadata.width) continue;

      const outputPath = path.join(dir, `${filename}-${size}w.webp`);
      
      await sharp(pngPath)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`  Created: ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(1)}KB)`);
    }

    // Create full-size WebP
    const fullSizeWebP = path.join(dir, `${filename}.webp`);
    await sharp(pngPath)
      .webp({ quality: QUALITY })
      .toFile(fullSizeWebP);

    const originalSize = fs.statSync(pngPath).size;
    const webpSize = fs.statSync(fullSizeWebP).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`  Full-size WebP: ${(webpSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
  } catch (error) {
    console.error(`  Error processing ${relativePath}:`, error.message);
  }
}

/**
 * Optimize existing PNGs (lossless compression)
 */
async function optimizePng(pngPath) {
  try {
    const tempPath = pngPath + '.tmp';
    await sharp(pngPath)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tempPath);

    const originalSize = fs.statSync(pngPath).size;
    const optimizedSize = fs.statSync(tempPath).size;

    // Only replace if optimized version is smaller
    if (optimizedSize < originalSize) {
      fs.renameSync(tempPath, pngPath);
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      console.log(`  Optimized PNG: ${savings}% smaller`);
    } else {
      fs.unlinkSync(tempPath);
    }
  } catch (error) {
    console.error(`  Error optimizing PNG:`, error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Starting image optimization...\n');

  const pngFiles = getPngFiles(PUBLIC_DIR);
  console.log(`Found ${pngFiles.length} PNG files\n`);

  let processed = 0;
  for (const pngPath of pngFiles) {
    await convertToWebP(pngPath);
    await optimizePng(pngPath);
    processed++;
    console.log(`Progress: ${processed}/${pngFiles.length}\n`);
  }

  console.log('✅ Image optimization complete!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { convertToWebP, optimizePng };
