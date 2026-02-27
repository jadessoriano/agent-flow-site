import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const svgBuffer = readFileSync(join(PUBLIC, "app-icon.svg"));

// Standard icon sizes for desktop apps
const sizes = [16, 32, 48, 64, 128, 256, 512, 1024];

async function generateIcons() {
  console.log("Generating app icons from app-icon.svg...\n");

  // Generate PNGs at all sizes
  for (const size of sizes) {
    const filename = `app-icon-${size}.png`;
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(PUBLIC, filename));
    console.log(`  ${filename}`);
  }

  // Generate favicon.ico (32x32 PNG, saved as .ico format via sharp)
  // Browsers accept PNG-in-ICO, but for max compat we'll create a 32x32 PNG as favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(join(PUBLIC, "favicon.png"));

  // Create a multi-size ICO file manually
  // ICO format: header + directory entries + image data
  const ico16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  const images = [ico16, ico32, ico48];
  const numImages = images.length;

  // ICO Header: 6 bytes
  const headerSize = 6;
  // Directory entry: 16 bytes each
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;
  const dataOffset = headerSize + dirSize;

  // Calculate total size
  let totalDataSize = 0;
  for (const img of images) totalDataSize += img.length;
  const totalSize = dataOffset + totalDataSize;

  const ico = Buffer.alloc(totalSize);

  // Header
  ico.writeUInt16LE(0, 0);       // Reserved
  ico.writeUInt16LE(1, 2);       // Type: 1 = ICO
  ico.writeUInt16LE(numImages, 4); // Number of images

  const imageSizes = [16, 32, 48];
  let currentDataOffset = dataOffset;

  // Directory entries
  for (let i = 0; i < numImages; i++) {
    const offset = headerSize + i * dirEntrySize;
    const size = imageSizes[i];
    ico.writeUInt8(size === 256 ? 0 : size, offset);     // Width
    ico.writeUInt8(size === 256 ? 0 : size, offset + 1);  // Height
    ico.writeUInt8(0, offset + 2);                         // Color palette
    ico.writeUInt8(0, offset + 3);                         // Reserved
    ico.writeUInt16LE(1, offset + 4);                      // Color planes
    ico.writeUInt16LE(32, offset + 6);                     // Bits per pixel
    ico.writeUInt32LE(images[i].length, offset + 8);       // Image data size
    ico.writeUInt32LE(currentDataOffset, offset + 12);     // Image data offset
    currentDataOffset += images[i].length;
  }

  // Image data
  currentDataOffset = dataOffset;
  for (const img of images) {
    img.copy(ico, currentDataOffset);
    currentDataOffset += img.length;
  }

  writeFileSync(join(PUBLIC, "favicon.ico"), ico);
  console.log("\n  favicon.ico (16+32+48)");

  // Also generate og-image (1200x630 for social sharing)
  const ogWidth = 1200;
  const ogHeight = 630;

  // Create OG image: gradient background with centered icon and text
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ogWidth}" height="${ogHeight}" fill="none">
    <defs>
      <linearGradient id="ogbg" x1="0" y1="0" x2="${ogWidth}" y2="${ogHeight}" gradientUnits="userSpaceOnUse">
        <stop stop-color="#09090b"/>
        <stop offset="1" stop-color="#18181b"/>
      </linearGradient>
      <linearGradient id="ogaccent" x1="0" y1="0" x2="${ogWidth}" y2="${ogHeight}" gradientUnits="userSpaceOnUse">
        <stop stop-color="#6366f1"/>
        <stop offset="1" stop-color="#22d3ee"/>
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${ogWidth}" height="${ogHeight}" fill="url(#ogbg)"/>

    <!-- Subtle gradient border -->
    <rect x="2" y="2" width="${ogWidth - 4}" height="${ogHeight - 4}" rx="16" fill="none" stroke="url(#ogaccent)" stroke-width="2" opacity="0.3"/>

    <!-- Icon (centered, left area) -->
    <g transform="translate(160, 195) scale(7.5) translate(-18, -16)" stroke="url(#ogaccent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M6 16C6 9.373 11.373 4 18 4"/>
      <path d="M18 4C18 4 14 8 14 16s4 12 4 12"/>
      <path d="M18 28C24.627 28 30 22.627 30 16S24.627 4 18 4"/>
      <path d="M8 10h20"/>
      <path d="M8 22h20"/>
    </g>

    <!-- Title -->
    <text x="380" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="800" fill="white">AgentFlow</text>

    <!-- Subtitle -->
    <text x="380" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#a1a1aa">Visual AI Agent Pipeline Builder</text>

    <!-- URL -->
    <text x="380" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#6366f1">agentflow.dev</text>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .resize(ogWidth, ogHeight)
    .png()
    .toFile(join(PUBLIC, "og-image.png"));
  console.log(`\n  og-image.png (${ogWidth}x${ogHeight})`);

  console.log("\nDone! All icons generated in public/");
}

generateIcons().catch(console.error);
