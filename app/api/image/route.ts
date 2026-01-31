import { NextRequest, NextResponse } from 'next/server';
import { applyWatermark, isAllowedImageSource } from '@/lib/watermark';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

// Cache watermarked images for 1 hour
const CACHE_MAX_AGE = 3600;

export async function GET(request: NextRequest) {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`image:${clientIP}`, {
        limit: 30,
        windowSeconds: 60
    });

    if (!rateLimit.success) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
                status: 429,
                headers: {
                    'Retry-After': String(rateLimit.resetIn),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': String(rateLimit.resetIn)
                }
            }
        );
    }

    // Get image URL from query params
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return NextResponse.json(
            { error: 'Missing "url" query parameter' },
            { status: 400 }
        );
    }

    // Validate URL is from allowed source
    if (!isAllowedImageSource(imageUrl)) {
        return NextResponse.json(
            { error: 'Image source not allowed' },
            { status: 403 }
        );
    }

    try {
        // Fetch the original image
        const imageResponse = await fetch(imageUrl, {
            headers: {
                'Accept': 'image/*'
            }
        });

        if (!imageResponse.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch image' },
                { status: 502 }
            );
        }

        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

        // Apply watermark
        const watermarkedBuffer = await applyWatermark(imageBuffer, {
            text: 'VISUAL EYES',
            opacity: 0.12
        });

        // Return watermarked image
        return new NextResponse(new Uint8Array(watermarkedBuffer), {
            status: 200,
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}`,
                'X-RateLimit-Remaining': String(rateLimit.remaining),
                'X-RateLimit-Reset': String(rateLimit.resetIn)
            }
        });
    } catch (error) {
        console.error('[Watermark API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to process image' },
            { status: 500 }
        );
    }
}
