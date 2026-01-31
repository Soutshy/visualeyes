"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Premium easing curve
const LUXURY_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Lock scroll during preloader
        document.body.style.overflow = "hidden";

        // Simulate loading progress (0 to 100)
        const duration = 2000; // 2 seconds total
        const interval = 20; // Update every 20ms
        const steps = duration / interval;
        let currentStep = 0;

        const progressTimer = setInterval(() => {
            currentStep++;
            // Ease-out curve for more realistic loading feel
            const t = currentStep / steps;
            const easedProgress = 1 - Math.pow(1 - t, 3); // Cubic ease-out
            setProgress(Math.min(Math.round(easedProgress * 100), 100));

            if (currentStep >= steps) {
                clearInterval(progressTimer);
            }
        }, interval);

        // Exit preloader after loading complete
        const exitTimer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, duration + 300); // Small delay after 100%

        return () => {
            clearInterval(progressTimer);
            clearTimeout(exitTimer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1, ease: LUXURY_EASE }}
                    className="fixed inset-0 z-[9999] bg-rich-black flex flex-col items-center justify-center"
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center gap-8"
                    >
                        <h1 className="font-display text-4xl md:text-6xl text-off-white tracking-[0.3em] uppercase">
                            Visual Eyes
                        </h1>

                        {/* Progress Container */}
                        <div className="flex flex-col items-center gap-4 w-48 md:w-64">
                            {/* Progress Bar */}
                            <div className="w-full h-px bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gold"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                />
                            </div>

                            {/* Progress Counter */}
                            <motion.span
                                className="font-body text-xs text-white/40 tracking-[0.3em] font-mono"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {progress.toString().padStart(3, '0')}%
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Decorative Lines */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: LUXURY_EASE, delay: 0.2 }}
                        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

