"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Premium easing curve
const LUXURY_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Template({ children }: { children: React.ReactNode }) {
    const [curtainVisible, setCurtainVisible] = useState(true);

    return (
        <>
            {/* Reveal Curtain - Slides up on page enter, then unmounts */}
            {curtainVisible && (
                <motion.div
                    initial={{ y: "0%" }}
                    animate={{ y: "-100%" }}
                    transition={{
                        duration: 0.8,
                        ease: LUXURY_EASE,
                        delay: 0.1
                    }}
                    onAnimationComplete={() => setCurtainVisible(false)}
                    className="fixed inset-0 bg-rich-black z-[9999] pointer-events-none"
                />
            )}

            {/* Page Content - Fades in with slight Y translation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: LUXURY_EASE,
                    delay: 0.4
                }}
            >
                {children}
            </motion.div>
        </>
    );
}


