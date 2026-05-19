// scripts/convert-png-to-jpg.mjs
// Run with: node scripts/convert-png-to-jpg.mjs
// Requires 'sharp' - already installed as a devDependency

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const files = fs.readdirSync(publicDir);
const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

if (pngFiles.length === 0) {
  console.log('No .png files found in public/ – nothing to convert.');
  process.exit(0);
}

console.log(`Found ${pngFiles.length} PNG file(s) to convert...\n`);

const conversions = pngFiles.map(file => {
  const pngPath = path.join(publicDir, file);
  const jpgName = file.replace(/\.png$/i, '.jpg');
  const jpgPath = path.join(publicDir, jpgName);

  return sharp(pngPath)
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // fill transparency with white
    .jpeg({ quality: 90 })
    .toFile(jpgPath)
    .then(() => {
      console.log(`✅  Converted: ${file}  →  ${jpgName}`);
      fs.unlinkSync(pngPath);
      console.log(`🗑️   Deleted original PNG: ${file}`);
    })
    .catch(err => {
      console.error(`❌  Error converting ${file}:`, err.message);
    });
});

await Promise.all(conversions);
console.log('\n✨ Done! All PNGs have been converted to JPG.');
