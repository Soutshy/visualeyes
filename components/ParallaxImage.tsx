"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
}

export function ParallaxImage({ src, alt, className = "" }: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Move the image slightly against the scroll direction to create depth
    // The image is taller (120%) so we move it from -10% to +10% within its container
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-[60vh] md:h-[80vh] overflow-hidden ${className}`}
        >
            <motion.div
                style={{ y }}
                className="relative w-full h-[120%] -top-[10%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                />
            </motion.div>
        </div>
    );
}
