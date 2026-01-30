"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mouse } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-rich-black overflow-hidden">
            {/* Background - Deep Radial Gradient & Noise */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gray-dark)_0%,_var(--color-rich-black)_80%)] opacity-90" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl">

                {/* Horizontal Lines - Mystic Connection */}
                <div className="absolute top-1/2 left-0 w-full flex items-center justify-between -translate-y-1/2 pointer-events-none">
                    {/* Left Line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent max-w-[30vw] md:max-w-[35vw] opacity-50" />
                    {/* Right Line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent max-w-[30vw] md:max-w-[35vw] opacity-50" />
                </div>

                {/* Golden Glow behind Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Logo Container with Breathing Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        opacity: { duration: 1.5, ease: "easeOut" },
                        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } // Slow breathing
                    }}
                    className="relative w-32 md:w-48 aspect-square mb-8 z-20"
                >
                    <Image
                        src="/logo.png"
                        alt="Visual Eyes Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                        priority
                    />
                </motion.div>

                {/* Text Below Logo - Refined & Elegant */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center z-20"
                >
                    <h1 className="font-display font-thin text-3xl md:text-5xl text-gold-gradient tracking-[0.3em] uppercase mb-4">
                        Visual Eyes
                    </h1>
                    <p className="font-body text-off-white/40 text-xs md:text-sm tracking-[0.4em] uppercase">
                        Capturing the unseen
                    </p>
                </motion.div>
            </div>

            {/* Decorative Vertical Line (Subtle) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent via-gold/10 to-transparent" />

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="animate-bounce">
                    <Mouse className="w-5 h-5 text-gold/50" />
                </div>
            </motion.div>
        </section>
    );
}
