import sharp from "sharp";
import fs from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");

// 1. Favicon SVG
const faviconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#ECE8DF" />
  <!-- Red top accent rule -->
  <rect x="0" y="0" width="512" height="24" fill="#E10600" />
  <!-- Border -->
  <rect x="0" y="0" width="512" height="512" fill="none" stroke="#141210" stroke-width="28" />
  <!-- PG Monogram -->
  <text x="64" y="350" font-family="'Space Grotesk', 'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="280" fill="#141210" letter-spacing="-12">PG</text>
  <!-- Red accent square dot -->
  <rect x="400" y="284" width="48" height="48" fill="#E10600" />
</svg>`;

fs.writeFileSync(path.join(publicDir, "favicon.svg"), faviconSvg);
console.log("Saved favicon.svg");

// Render icon.png (32x32), apple-touch-icon.png (180x180), and icon-512.png
await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, "favicon.ico"));

await sharp(Buffer.from(faviconSvg))
  .resize(192, 192)
  .png()
  .toFile(path.join(publicDir, "icon.png"));

await sharp(Buffer.from(faviconSvg))
  .resize(180, 180)
  .png()
  .toFile(path.join(publicDir, "apple-touch-icon.png"));

console.log("Saved favicon.ico, icon.png, apple-touch-icon.png");

// 2. OpenGraph Image (1200x630)
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Off-white background -->
  <rect width="1200" height="630" fill="#ECE8DF" />
  
  <!-- Red top rule -->
  <rect x="0" y="0" width="1200" height="12" fill="#E10600" />
  
  <!-- Grid overlay lines -->
  <line x1="100" y1="0" x2="100" y2="630" stroke="rgba(20,18,16,0.08)" stroke-width="1" />
  <line x1="350" y1="0" x2="350" y2="630" stroke="rgba(20,18,16,0.08)" stroke-width="1" />
  <line x1="600" y1="0" x2="600" y2="630" stroke="rgba(20,18,16,0.08)" stroke-width="1" />
  <line x1="850" y1="0" x2="850" y2="630" stroke="rgba(20,18,16,0.08)" stroke-width="1" />
  <line x1="1100" y1="0" x2="1100" y2="630" stroke="rgba(20,18,16,0.08)" stroke-width="1" />
  
  <line x1="0" y1="80" x2="1200" y2="80" stroke="rgba(20,18,16,0.15)" stroke-width="2" />
  <line x1="0" y1="550" x2="1200" y2="550" stroke="rgba(20,18,16,0.15)" stroke-width="2" />

  <!-- Top label -->
  <text x="100" y="52" font-family="'IBM Plex Mono', monospace" font-size="18" font-weight="600" fill="#76705F" letter-spacing="4">01 / PEDRO GUILHERME® — PORTFOLIO 2026</text>
  <text x="850" y="52" font-family="'IBM Plex Mono', monospace" font-size="18" font-weight="600" fill="#E10600" letter-spacing="2">[ BRASIL / WORLDWIDE ]</text>

  <!-- Hero Name -->
  <text x="95" y="240" font-family="'Impact', 'Arial Black', sans-serif" font-size="124" font-weight="900" fill="#141210" letter-spacing="-2">PEDRO GUILHERME</text>
  
  <!-- Red accent square on name -->
  <rect x="1090" y="150" width="28" height="28" fill="#E10600" />

  <!-- Role Subtitle -->
  <rect x="100" y="275" width="16" height="40" fill="#E10600" />
  <text x="132" y="306" font-family="'Space Grotesk', sans-serif" font-size="34" font-weight="800" fill="#141210" letter-spacing="2">GRAPHIC DESIGNER &amp; ART DIRECTOR</text>

  <!-- Description -->
  <text x="100" y="375" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="500" fill="#76705F">Design Editorial / Identidade Visual / Peças Gráficas / Motion</text>

  <!-- Key Specs / Tags -->
  <g fill="#141210" font-family="'IBM Plex Mono', monospace" font-size="16" font-weight="500">
    <rect x="100" y="440" width="180" height="44" fill="none" stroke="#141210" stroke-width="2" />
    <text x="120" y="468">EDITORIAL</text>
    
    <rect x="300" y="440" width="180" height="44" fill="none" stroke="#141210" stroke-width="2" />
    <text x="320" y="468">BRANDING</text>
    
    <rect x="500" y="440" width="180" height="44" fill="#141210" />
    <text x="520" y="468" fill="#ECE8DF">MOTION-LED</text>
  </g>

  <!-- Bottom Footer Info -->
  <text x="100" y="590" font-family="'IBM Plex Mono', monospace" font-size="16" fill="#76705F">SÃO PAULO, BRASIL — DISPONÍVEL PARA PROJETOS</text>
  <text x="850" y="590" font-family="'IBM Plex Mono', monospace" font-size="16" fill="#141210" font-weight="600">PEDROGUI48@GMAIL.COM</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .jpeg({ quality: 95 })
  .toFile(path.join(publicDir, "og.jpg"));

console.log("Saved og.jpg");
