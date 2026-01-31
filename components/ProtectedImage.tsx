"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ProtectedImageProps extends Omit<ImageProps, 'src'> {
    src: string;
    className?: string;
    containerClassName?: string;
    /** If true, applies a watermark overlay via API */
    watermark?: boolean;
}

/**
 * Generate watermarked image URL
 */
function getWatermarkedUrl(originalUrl: string): string {
    // Only watermark external URLs (Sanity/Unsplash)
    if (originalUrl.startsWith('http')) {
        return `/api/image?url=${encodeURIComponent(originalUrl)}`;
    }
    return originalUrl;
}

export function ProtectedImage({
    src,
    className,
    containerClassName,
    alt,
    watermark = false,
    ...props
}: ProtectedImageProps) {
    const imageSrc = watermark ? getWatermarkedUrl(src) : src;

    return (
        <div
            className={cn("relative select-none", containerClassName)}
            onContextMenu={(e) => {
                e.preventDefault();
                return false;
            }}
        >
            {/* Ghost Overlay - Intercepts direct clicks/drags */}
            <div className="absolute inset-0 z-10 bg-transparent" />

            <Image
                {...props}
                src={imageSrc}
                alt={alt}
                draggable={false}
                className={cn("pointer-events-none select-none", className)}
                style={{
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    ...props.style
                }}
            />
        </div>
    );
}

