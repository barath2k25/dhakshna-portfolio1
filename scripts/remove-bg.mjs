// remove-bg.mjs — strips pure-black background from profile.jpg → profile_cutout.png
import sharp from 'sharp';

const INPUT  = './public/profile.jpg';
const OUTPUT = './public/profile_cutout.png';

// Threshold: pixels with luminance below this become transparent
const BLACK_THRESHOLD = 40;
// Edge feather: pixels up to this brightness get partial transparency
const FEATHER_RANGE   = 40;

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const rgba = Buffer.from(data); // already RGBA

for (let i = 0; i < width * height; i++) {
  const base = i * 4;
  const r = rgba[base];
  const g = rgba[base + 1];
  const b = rgba[base + 2];

  // Luminance (perceived brightness)
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  if (lum <= BLACK_THRESHOLD) {
    rgba[base + 3] = 0; // fully transparent
  } else if (lum <= BLACK_THRESHOLD + FEATHER_RANGE) {
    // smooth feather edge
    const alpha = Math.round(((lum - BLACK_THRESHOLD) / FEATHER_RANGE) * 255);
    rgba[base + 3] = alpha;
  }
  // else: leave alpha = 255 (opaque)
}

await sharp(rgba, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

console.log(`✅  Saved transparent cutout → ${OUTPUT}`);
