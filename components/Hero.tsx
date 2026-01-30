"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// --- Mock Data (Unsplash) ---
const COLUMN_1 = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop", // Fashion
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2560&auto=format&fit=crop", // Model
    "https://images.unsplash.com/photo-1529139574466-a302c27e365b?q=80&w=2560&auto=format&fit=crop", // Urban fashion
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop", // Dress
];

const COLUMN_2 = [
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=3270&auto=format&fit=crop", // Sport
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2560&auto=format&fit=crop", // Gym
    "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=2000&auto=format&fit=crop", // Silhouette
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop", // Runner
];

const COLUMN_3 = [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop", // Portrait
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop", // Male Portrait
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop", // Female Portrait
    "https://images.unsplash.com/photo-1534030347209-567816b9eb3c?q=80&w=2000&auto=format&fit=crop", // Raw
];


export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-rich-black">

            {/* The Wall (Columns) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[120vh] -mt-[10vh] w-full px-4 md:px-8 relative opacity-80">
                <ParallaxColumn images={[...COLUMN_1, ...COLUMN_1]} speed={-20} className="hidden md:flex" />
                <ParallaxColumn images={[...COLUMN_2, ...COLUMN_2]} speed={15} />
                <ParallaxColumn images={[...COLUMN_3, ...COLUMN_3]} speed={-25} />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Branding Center */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none mix-blend-overlay">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <h1 className="font-display text-7xl md:text-9xl text-white text-center leading-none tracking-tighter drop-shadow-2xl">
                        VISUAL <br /> EYES
                    </h1>
                    <span className="mt-6 font-body text-xs md:text-sm text-gold tracking-[0.5em] uppercase font-bold">
                        Capturing the Unseen
                    </span>
                </motion.div>
            </div>

            {/* Gradient Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-rich-black to-transparent z-20" />

        </section>
    );
}

function ParallaxColumn({ images, speed, className }: { images: string[], speed: number, className?: string }) {
    const yToken = speed > 0 ? ["-50%", "0%"] : ["0%", "-50%"];

    return (
        <div className={cn("relative h-[200%] overflow-hidden", className)}>
            <motion.div
                className="flex flex-col gap-4 w-full"
                animate={{ y: yToken }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                }}
            >
                {images.concat(images).map((src, i) => (
                    <div key={i} className="relative w-full aspect-[2/3] md:aspect-[3/4] rounded-sm overflow-hidden flex-shrink-0 grayscale-[50%] hover:grayscale-0 transition-all duration-700">
                        <Image
                            src={src}
                            alt="Visual Eyes Work"
                            fill
                            className="object-cover"
                            sizes="33vw"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
