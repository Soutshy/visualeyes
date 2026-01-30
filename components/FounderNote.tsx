"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { urlFor } from "@/lib/sanity.client";
import { FounderNote as FounderNoteType } from "@/lib/sanity.queries";
import { cn } from "@/lib/utils";

export function FounderNote({ data }: { data: FounderNoteType | null }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // Parallax effect

    // Fallback Data
    const quote = data?.quote || "Photography is not about what we see, but how we feel. At Visual Eyes, we chase the raw, the unscripted, and the timeless.";
    const name = data?.name || "THE FOUNDER";
    const imageUrl = data?.image ? urlFor(data.image).width(800).url() : "/assets/founder.png";

    return (
        <section ref={containerRef} className="py-32 md:py-48 bg-rich-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">

                    {/* Left Column: Quote (60% roughly -> 7/12) */}
                    <div className="md:col-span-7 relative z-10 order-2 md:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Decorative Quote Mark */}
                            <span className="font-display text-9xl text-gold/20 absolute -top-20 -left-12 pointer-events-none">
                                “
                            </span>

                            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-off-white italic leading-[0.9] mb-12 relative z-10 mix-blend-difference">
                                {quote}
                            </h2>

                            <div className="relative">
                                <span className="font-body text-xs text-gold tracking-[0.3em] uppercase block">
                                    {name}
                                </span>
                                {data?.signature && (
                                    <div className="absolute -top-8 left-0 w-48 h-24 opacity-80 pointer-events-none mix-blend-screen">
                                        <Image
                                            src={urlFor(data.signature).url()}
                                            alt="Signature"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Portrait (40% roughly -> 5/12) */}
                    <div className="md:col-span-5 relative h-[500px] md:h-[700px] order-1 md:order-2 overflow-hidden">
                        <div className="absolute inset-0 bg-gray-900 animate-pulse" /> {/* Loading skeleton if needed */}

                        <motion.div
                            style={{ y }}
                            className="relative w-full h-[120%] -top-[10%]" // Taller for parallax
                        >
                            <Image
                                src={imageUrl}
                                alt="Founder Portrait"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />

                            {/* Frame overlay */}
                            <div className="absolute inset-0 border-[1px] border-white/10 m-4 md:m-8 pointer-events-none" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
