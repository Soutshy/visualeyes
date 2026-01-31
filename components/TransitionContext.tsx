"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Premium easing curve (Awwwards signature)
const LUXURY_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Context to control the Exit Transition
interface TransitionContextType {
    startTransition: (href: string) => Promise<void>;
    isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
    startTransition: async () => { },
    isTransitioning: false,
});

export const useTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const startTransition = async (href: string) => {
        setIsTransitioning(true);
        // Wait for exit animation
        await new Promise((resolve) => setTimeout(resolve, 800));

        router.push(href);

        // Reset state after navigation
        setTimeout(() => {
            setIsTransitioning(false);
        }, 400);
    };

    return (
        <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
            {children}

            {/* GLOBAL EXIT CURTAIN - Framer Motion Version */}
            <AnimatePresence>
                {isTransitioning && (
                    <>
                        {/* First layer - slides up */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-100%" }}
                            transition={{
                                duration: 0.8,
                                ease: LUXURY_EASE
                            }}
                            className="fixed inset-0 bg-rich-black z-[9998] pointer-events-none"
                        />
                        {/* Second layer - slight delay for depth */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-100%" }}
                            transition={{
                                duration: 0.8,
                                ease: LUXURY_EASE,
                                delay: 0.05
                            }}
                            className="fixed inset-0 bg-gold/10 z-[9999] pointer-events-none"
                        />
                    </>
                )}
            </AnimatePresence>
        </TransitionContext.Provider>
    );
}

