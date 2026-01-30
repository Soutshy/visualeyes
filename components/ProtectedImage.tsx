"use client";

import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ProtectedImageProps extends ImageProps {
    className?: string;
    containerClassName?: string;
}

export function ProtectedImage({ className, containerClassName, alt, ...props }: ProtectedImageProps) {
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
