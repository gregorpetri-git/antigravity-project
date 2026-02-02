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
    museum: 'displayed in a luxury car museum with white curved modern architecture, dramatic museum lighting, clean white floors, architectural spiral ramps in background, professional automotive photography, ultra realistic',
    showroom: 'in a premium car dealership showroom, polished concrete floor, soft professional lighting, clean modern interior, showroom display, professional automotive photography, ultra realistic',
  };

  const prompt = `A ${color} ${year} ${make} ${model}, ${styleDescriptions[style]}, high quality, 4k`;

  // Encode the prompt for URL
  const encodedPrompt = encodeURIComponent(prompt);

  // Use Pollinations.ai for free image generation
  // Adding dimensions and seed for consistency
  const seed = hashCode(`${make}${model}${year}${color}`);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=500&seed=${seed}&nologo=true`;
}

/**
 * Simple hash function to generate consistent seeds for the same car
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Preload an image to ensure it's generated before displaying
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}
