"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [showLogo, setShowLogo] = useState(true);

    useEffect(() => {
        // Scroll Lock
        document.body.style.overflow = "hidden";
        // window.scrollTo(0, 0); // Optional: force top

        // Sequence
        // 1. Logo fades out after 1.2s (starts slightly before curtain opens)
        const logoTimer = setTimeout(() => {
            setShowLogo(false);
        }, 1200);

        // 2. Curtain opens at 1.5s (isLoading -> false triggers exit animation)
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = "default";
            document.body.style.overflow = "";
        }, 1500);

        return () => {
            clearTimeout(logoTimer);
            clearTimeout(loadingTimer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
                    {/* Top Shutter - Enters from nowhere (default), Exits upwards */}
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute top-0 w-full h-1/2 bg-rich-black z-10 border-b border-white/5"
                    />

                    {/* Bottom Shutter - Exits downwards */}
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute bottom-0 w-full h-1/2 bg-rich-black z-10 border-t border-white/5"
                    />

                    {/* Logo Logic */}
                    <AnimatePresence>
                        {showLogo && (
                            <motion.div
                                key="logo"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative z-20 flex flex-col items-center gap-4"
                            >
                                {/* Logo Image if available, or Stylized Text */}
                                {/* Using text as main identity based on 'Luxury' font preference */}
                                <h1 className="font-display text-4xl md:text-6xl text-off-white tracking-[0.3em] uppercase">
                                    Visual Eyes
                                </h1>
                                <div className="w-12 h-px bg-gold/50" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </AnimatePresence>
    );
}
