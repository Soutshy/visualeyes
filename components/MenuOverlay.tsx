"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Unsplash IDs for section previews
const PREVIEWS = {
    HOME: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=2560&auto=format&fit=crop", // Dark textured
    WORK: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2560&auto=format&fit=crop", // Fashion
    STUDIO: "https://images.unsplash.com/photo-1558470598-a5dda9640f6b?q=80&w=2560&auto=format&fit=crop", // Studio equipment
    CONTACT: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2560&auto=format&fit=crop" // Abstract light
};

const LINKS = [
    { title: "Home", href: "/", image: PREVIEWS.HOME },
    { title: "Work", href: "/work", image: PREVIEWS.WORK },
    { title: "Studio", href: "/about", image: PREVIEWS.STUDIO },
    { title: "Contact", href: "/#contact", image: PREVIEWS.CONTACT }
];

export function MenuOverlay({ onClose }: { onClose: () => void }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] bg-rich-black flex flex-col md:flex-row overflow-hidden"
            style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'fixed' }}
        >

            {/* Left: Links - Use h-screen instead of h-full to ensure viewport height */}
            <div className="flex-1 flex flex-col justify-center items-start px-8 md:px-24 gap-6 md:gap-8 relative z-10 min-h-screen">
                {LINKS.map((link, i) => (
                    <motion.div
                        key={link.title}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.08), duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Link
                            href={link.href}
                            onClick={onClose}
                            className="group flex items-center w-fit"
                        >
                            <span
                                className={cn(
                                    "font-display text-5xl md:text-8xl lg:text-9xl uppercase transition-all duration-500 ease-out",
                                    // Dim others logic
                                    hoveredIndex !== null && hoveredIndex !== i ? "text-white/20 blur-[1px]" : "text-off-white",
                                    // Active Logic
                                    hoveredIndex === i ? "text-gold translate-x-8 italic" : ""
                                )}
                            >
                                {link.title}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Right: Preview Image (Desktop) */}
            <div className="hidden md:block flex-1 relative h-full bg-rich-black border-l border-white/5">
                <AnimatePresence mode="wait">
                    {hoveredIndex !== null ? (
                        <motion.div
                            key={LINKS[hoveredIndex].image}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={LINKS[hoveredIndex].image}
                                fill
                                className="object-cover opacity-60 mix-blend-lighten"
                                alt="Menu Preview"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-80" />
                        </motion.div>
                    ) : (
                        // Default ambient state
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
