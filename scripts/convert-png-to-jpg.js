// scripts/convert-png-to-jpg.js
// Run with: node scripts/convert-png-to-jpg.js
// Requires 'sharp' library. Install with: npm i sharp --save-dev

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.resolve(__dirname, '..', 'public');

function isPng(file) {
  return file.toLowerCase().endsWith('.png');
}

fs.readdirSync(publicDir).forEach(file => {
  if (isPng(file)) {
    const pngPath = path.join(publicDir, file);
    const jpgName = file.replace(/\.png$/i, '.jpg');
    const jpgPath = path.join(publicDir, jpgName);
    sharp(pngPath)
      .jpeg({ quality: 90 })
      .toFile(jpgPath)
      .then(() => {
        console.log(`Converted ${file} -> ${jpgName}`);
        // Delete original PNG
        fs.unlinkSync(pngPath);
        console.log(`Deleted original PNG ${file}`);
      })
      .catch(err => {
        console.error(`Error converting ${file}:`, err);
      });
  }
});
