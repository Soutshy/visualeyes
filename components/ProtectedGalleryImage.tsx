"use client";

import React from "react";

interface ProtectedGalleryImageProps {
    src: string;
    alt: string;
    className?: string;
}

export function ProtectedGalleryImage({ src, alt, className = "" }: ProtectedGalleryImageProps) {
    return (
        <div
            className="relative w-full h-auto select-none"
            onContextMenu={(e) => {
                e.preventDefault();
                return false;
            }}
        >
            {/* Ghost Overlay */}
            <div className="absolute inset-0 z-10 bg-transparent" />

            <img
                src={src}
                alt={alt}
                className={`w-full h-auto object-contain pointer-events-none select-none ${className}`}
                draggable={false}
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }}
            />
        </div>
    );
}
