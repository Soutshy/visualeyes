"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/lib/sanity.client";
import { LandingWork } from "@/lib/sanity.queries";
import { cn } from "@/lib/utils";

export function ShowcaseGrid({ works }: { works: LandingWork[] }) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleInteraction = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {works.map((work) => (
                <div
                    key={work._id}
                    className="relative aspect-[3/4] overflow-hidden cursor-pointer group bg-white/5" // Added bg for placeholder
                    onClick={() => handleInteraction(work._id)}
                >
                    {work.image?.asset?._ref && !work.image.asset._ref.includes('mock') ? (
                        <Image
                            src={urlFor(work.image).width(800).height(1067).url()}
                            alt={work.title}
                            fill
                            className={cn(
                                "object-cover transition-all duration-700",
                                "grayscale hover:grayscale-0",
                                activeId === work._id ? "scale-105 grayscale-0" : "scale-100"
                            )}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    ) : (
                        // Fallback Placeholder if no real image
                        <div className="w-full h-full flex items-center justify-center text-white/10 font-display text-4xl">
                            {work.title[0]}
                        </div>
                    )}

                    {/* Overlay Description */}
                    <AnimatePresence>
                        {activeId === work._id && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-rich-black/80 flex items-center justify-center p-8 text-center"
                            >
                                <div>
                                    <h3 className="font-display text-2xl text-gold mb-4">{work.title}</h3>
                                    {work.description && (
                                        <p className="font-body text-off-white/90 text-sm leading-relaxed">
                                            {work.description}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
