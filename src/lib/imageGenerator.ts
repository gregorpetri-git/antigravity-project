import { ImageStyle } from '@/types';

/**
 * Generates a car image URL using Pollinations.ai (free, no API key needed)
 * The image is generated based on the car's details and selected style
 */
export function generateCarImageUrl(
  make: string,
  model: string,
  year: number,
  color: string,
  style: ImageStyle = 'showroom'
): string {
  // Build the prompt based on the style
  const styleDescriptions: Record<ImageStyle, string> = {
    museum: 'displayed in a luxury car museum with white curved modern architecture, dramatic museum lighting, clean white floors, professional automotive photography',
    showroom: 'in a premium car dealership showroom, polished floor, soft professional lighting, clean modern interior, professional automotive photography',
  };

  const prompt = `${color} ${year} ${make} ${model} car, ${styleDescriptions[style]}, photorealistic, high quality`;

  // Encode the prompt for URL
  const encodedPrompt = encodeURIComponent(prompt);

  // Use Pollinations.ai for free image generation
  const seed = hashCode(`${make}${model}${year}${color}`);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=500&seed=${seed}&nologo=true`;
}

/**
 * Generates a fallback placeholder image URL with car info
 * Uses a data URI SVG for instant display
 */
export function generatePlaceholderImage(
  make: string,
  model: string,
  year: number,
  color: string,
  style: ImageStyle = 'showroom'
): string {
  // Generate a color based on the car color name
  const bgColor = getColorFromName(color);
  const bgGradient = style === 'museum' ? '#1a1a2e' : '#2d3436';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgGradient}"/>
          <stop offset="100%" style="stop-color:${bgColor}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg)"/>
      <text x="400" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle" opacity="0.9">${make}</text>
      <text x="400" y="260" font-family="Arial, sans-serif" font-size="36" fill="white" text-anchor="middle" opacity="0.8">${model}</text>
      <text x="400" y="320" font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle" opacity="0.6">${year} • ${color}</text>
      <text x="400" y="420" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" opacity="0.4">${style.toUpperCase()} STYLE</text>
      <!-- Simple car silhouette -->
      <g transform="translate(300, 360)" opacity="0.2">
        <path d="M0,40 L20,40 L30,20 L70,20 L90,0 L150,0 L170,20 L180,20 L190,40 L200,40 L200,60 L180,60 L180,50 L170,50 L170,60 L30,60 L30,50 L20,50 L20,60 L0,60 Z" fill="white"/>
        <circle cx="45" cy="60" r="15" fill="white"/>
        <circle cx="155" cy="60" r="15" fill="white"/>
      </g>
    </svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Get a hex color from a color name
 */
function getColorFromName(colorName: string): string {
  const colorMap: Record<string, string> = {
    'red': '#c0392b',
    'ferrari red': '#ff2800',
    'blue': '#2980b9',
    'dark blue': '#1a237e',
    'navy': '#1a237e',
    'green': '#27ae60',
    'black': '#2c3e50',
    'white': '#7f8c8d',
    'silver': '#95a5a6',
    'grey': '#7f8c8d',
    'gray': '#7f8c8d',
    'dark grey': '#34495e',
    'dark gray': '#34495e',
    'saville grey': '#5d6d7e',
    'yellow': '#f1c40f',
    'orange': '#e67e22',
    'brown': '#795548',
    'beige': '#d7ccc8',
    'beach sand': '#c4a35a',
    'gold': '#d4ac0d',
    'purple': '#8e44ad',
    'pink': '#e91e63',
  };

  const lowerColor = colorName.toLowerCase();

  // Check for exact match first
  if (colorMap[lowerColor]) {
    return colorMap[lowerColor];
  }

  // Check for partial match
  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerColor.includes(key) || key.includes(lowerColor)) {
      return value;
    }
  }

  // Default color based on hash
  const hash = hashCode(colorName);
  const hue = hash % 360;
  return `hsl(${hue}, 50%, 40%)`;
}

/**
 * Simple hash function to generate consistent seeds for the same car
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
