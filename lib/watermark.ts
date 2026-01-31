import sharp from 'sharp';

interface WatermarkOptions {
    text?: string;
    opacity?: number;
    fontSize?: number;
}

/**
 * Generates an SVG watermark with diagonal text pattern
 */
function generateWatermarkSVG(
    width: number,
    height: number,
    options: WatermarkOptions = {}
): Buffer {
    const {
        text = 'VISUAL EYES',
        opacity = 0.15,
        fontSize = Math.max(24, Math.min(width, height) / 12)
    } = options;

    // Create a repeating diagonal pattern
    const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="watermark" patternUnits="userSpaceOnUse" width="${fontSize * 10}" height="${fontSize * 4}" patternTransform="rotate(-30)">
          <text 
            x="0" 
            y="${fontSize}" 
            font-family="Arial, sans-serif" 
            font-size="${fontSize}px" 
            font-weight="bold"
            fill="white" 
            fill-opacity="${opacity}"
            letter-spacing="0.2em"
          >
            ${text}
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark)" />
    </svg>
  `;

    return Buffer.from(svg);
}

/**
 * Applies a watermark overlay to an image buffer
 */
export async function applyWatermark(
    imageBuffer: Buffer,
    options: WatermarkOptions = {}
): Promise<Buffer> {
    // Get image metadata to match watermark size
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 600;

    // Generate watermark SVG
    const watermarkSVG = generateWatermarkSVG(width, height, options);

    // Composite the watermark over the image
    const watermarkedImage = await sharp(imageBuffer)
        .composite([
            {
                input: watermarkSVG,
                top: 0,
                left: 0,
                blend: 'over'
            }
        ])
        .jpeg({ quality: 85 })
        .toBuffer();

    return watermarkedImage;
}

/**
 * Validates that a URL is from an allowed source (Sanity CDN or Unsplash)
 */
export function isAllowedImageSource(url: string): boolean {
    try {
        const parsed = new URL(url);
        const allowedHosts = ['cdn.sanity.io', 'images.unsplash.com'];
        return allowedHosts.includes(parsed.hostname);
    } catch {
        return false;
    }
}
