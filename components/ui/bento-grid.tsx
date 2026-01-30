"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Image from "next/image";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6",
                className
            )}
        >
            {children}
        </div>
    );
};

export interface BentoItemProps {
    title: string;
    category: string;
    imageUrl: string;
    size?: "large" | "tall" | "small";
    blurDataUrl?: string; // Optional LQIP
}

export const BentoGridItem = ({
    className,
    item,
}: {
    className?: string;
    item: BentoItemProps;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // Calculate spans based on size prop
    const spanClass = {
        large: "md:col-span-2 md:row-span-2",
        tall: "md:col-span-1 md:row-span-2",
        small: "md:col-span-1 md:row-span-1",
    }[item.size || "small"];

    return (
        <div
            className={cn(
                "rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input bg-rich-black border border-white/[0.1] relative overflow-hidden flex flex-col space-y-4",
                spanClass,
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Border Beam Effect */}
            <div
                className={cn(
                    "absolute inset-0 rounded-xl z-0 transition-opacity duration-500 opacity-0",
                    isHovered ? "opacity-100" : "opacity-0"
                )}
                style={{
                    background: `
            linear-gradient(90deg, transparent 50%, #d4af37 50%, transparent 50.5%) 0 0 / 200% 100%,
            linear-gradient(0deg, transparent 50%, #d4af37 50%, transparent 50.5%) 0 0 / 100% 200%
          `,
                    animation: isHovered ? "borderBeam 4s linear infinite" : "none",
                }}
            />
            <style jsx>{`
        @keyframes borderBeam {
          0% { background-position: 100% 0, 0 100%; }
          100% { background-position: 0 0, 0 0; }
        }
      `}</style>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-4 min-h-[16rem]">
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className={cn(
                            "object-cover transition-all duration-700 grayscale",
                            isHovered ? "grayscale-0 scale-105" : "grayscale"
                        )}
                        placeholder={item.blurDataUrl ? "blur" : "empty"}
                        blurDataURL={item.blurDataUrl}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black/90 to-transparent" />
                </div>

                <div className="relative z-10 transition duration-200 translate-y-2 group-hover/bento:translate-y-0">
                    <div className="font-display font-medium text-gold mb-1 text-xs uppercase tracking-widest">
                        {item.category}
                    </div>
                    <h3 className="font-display font-bold text-off-white text-xl md:text-2xl mb-2">
                        {item.title}
                    </h3>
                </div>
            </div>
        </div>
    );
};
