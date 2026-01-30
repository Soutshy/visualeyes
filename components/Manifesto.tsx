"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const CONTENT = [
    { text: "We don't just take photos.", highlight: false },
    { text: "We capture", highlight: false },
    { text: "Souls.", highlight: true, serif: true }, // The Hook
    { text: "Based in Paris, Visual Eyes is dedicated to the", highlight: false },
    { text: "Unseen.", highlight: true, serif: true },
    { text: "From the chaos of", highlight: false },
    { text: "Sport", highlight: true },
    { text: "to the silence of", highlight: false },
    { text: "Fashion.", highlight: true },
    { text: "We bring a cinematic touch to every frame.", highlight: false },
];

export function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.8"]
    });

    return (
        <section ref={containerRef} className="py-32 md:py-48 bg-rich-black relative px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto text-center flex flex-col items-center"
                >
                    <span className="font-body text-sm md:text-base text-gold tracking-[0.3em] uppercase mb-6 block">
                        We don't capture moments
                    </span>

                    <h2 className="font-display text-7xl md:text-9xl text-off-white mb-16 leading-none tracking-tight uppercase mix-blend-difference">
                        We Capture <br />
                        <span className="text-white">Souls.</span>
                    </h2>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 border border-white/20 hover:border-gold/50 text-off-white/60 hover:text-gold text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-full backdrop-blur-sm"
                    >
                        Discover
                    </motion.button>
                </motion.div>
            </div>
            {/* Decorative line at the end */}
            <div className="w-px h-24 bg-gradient-to-b from-gold/50 to-transparent mx-auto mt-24 opacity-50" />
        </section>
    );
}

function Word({ children, range, progress, highlight, serif }: any) {
    const opacity = useTransform(progress, range, [0.1, 1]);
    const color = useTransform(progress, range, ["#ffffff20", highlight ? "#d4af37" : "#f5f5f0"]); // Dark grey to Gold or Off-White

    return (
        <motion.span
            style={{ opacity, color }}
            className={cn(
                "text-3xl md:text-5xl lg:text-7xl transition-colors duration-200",
                serif ? "font-display italic" : "font-body font-light uppercase tracking-wide"
            )}
        >
            {children}
        </motion.span>
    )
}
