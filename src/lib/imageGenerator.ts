import { ImageStyle } from '@/types';

/**
 * Generates a car image - uses the styled placeholder which always works
 * The placeholder shows make, model, year, color with a nice gradient
 */
export function generateCarImageUrl(
  make: string,
  model: string,
  year: number,
  color: string,
  style: ImageStyle = 'showroom'
): string {
  // Use placeholder as primary - it always works and looks good
  return generatePlaceholderImage(make, model, year, color, style);
}

/**
 * Generates a styled placeholder image with car info
 * Uses a data URI SVG for instant display - no external dependencies
 */
export function generatePlaceholderImage(
  make: string,
  model: string,
  year: number,
  color: string,
  style: ImageStyle = 'showroom'
): string {
  const bgColor = getColorFromName(color);

  // Different styles for museum vs showroom
  const styles = {
    museum: {
      gradient1: '#1a1a2e',
      gradient2: '#16213e',
      accent: bgColor,
    },
    showroom: {
      gradient1: '#2d3436',
      gradient2: '#636e72',
      accent: bgColor,
    }
  };

  const s = styles[style];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${s.gradient1}"/>
      <stop offset="50%" stop-color="${s.gradient2}"/>
      <stop offset="100%" stop-color="${s.accent}"/>
    </linearGradient>
    <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="white" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg)"/>
  <rect width="800" height="250" fill="url(#shine)"/>
  <g transform="translate(400, 140)">
    <path d="M-120,60 L-100,60 L-85,30 L-30,30 L-10,0 L90,0 L110,30 L125,30 L140,60 L160,60 L160,90 L140,90 L140,75 L125,75 L125,90 L-105,90 L-105,75 L-120,75 L-120,90 L-140,90 L-140,60 Z" fill="white" opacity="0.15"/>
    <ellipse cx="-75" cy="90" rx="25" ry="25" fill="white" opacity="0.15"/>
    <ellipse cx="95" cy="90" rx="25" ry="25" fill="white" opacity="0.15"/>
    <ellipse cx="-75" cy="90" rx="15" ry="15" fill="white" opacity="0.1"/>
    <ellipse cx="95" cy="90" rx="15" ry="15" fill="white" opacity="0.1"/>
  </g>
  <text x="400" y="300" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="white" text-anchor="middle">${escapeXml(make)}</text>
  <text x="400" y="355" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="400" fill="white" text-anchor="middle" opacity="0.9">${escapeXml(model)}</text>
  <text x="400" y="410" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="white" text-anchor="middle" opacity="0.7">${year} · ${escapeXml(color)}</text>
  <rect x="340" y="440" width="120" height="28" rx="14" fill="white" opacity="0.15"/>
  <text x="400" y="460" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="white" text-anchor="middle" opacity="0.8">${style.toUpperCase()}</text>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getColorFromName(colorName: string): string {
  const colorMap: Record<string, string> = {
    'red': '#e74c3c',
    'ferrari red': '#ff2800',
    'blue': '#3498db',
    'dark blue': '#2c3e50',
    'navy': '#34495e',
    'green': '#27ae60',
    'black': '#1a1a2e',
    'white': '#bdc3c7',
    'silver': '#95a5a6',
    'grey': '#7f8c8d',
    'gray': '#7f8c8d',
    'dark grey': '#2c3e50',
    'dark gray': '#2c3e50',
    'saville grey': '#5d6d7e',
    'yellow': '#f1c40f',
    'orange': '#e67e22',
    'brown': '#795548',
    'beige': '#d7ccc8',
    'beach sand': '#d4a574',
    'gold': '#f39c12',
    'purple': '#9b59b6',
    'pink': '#e91e63',
  };

  const lowerColor = colorName.toLowerCase();

  if (colorMap[lowerColor]) return colorMap[lowerColor];

  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerColor.includes(key) || key.includes(lowerColor)) return value;
  }

  // Generate color from hash
  const hash = Math.abs(hashCode(colorName));
  const hue = hash % 360;
  return `hsl(${hue}, 45%, 45%)`;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash;
}
