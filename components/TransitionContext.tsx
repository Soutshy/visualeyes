"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

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
        // Timing must match the CSS transition duration of the "Exit Curtain"
        // Let's say 800ms for a slow luxury glide
        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push(href);

        // Reset state after navigation (though Template will take over visual blocking)
        // We add a small delay to ensure new page is mounted before we unblock potentially
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    return (
        <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
            {children}
            {/* GLOBAL EXIT CURTAIN */}
            {/* Slides from Bottom (100%) to Top (0%) when transitioning */}
            <div
                className={`fixed inset-0 bg-black z-[9999] pointer-events-none transition-transform duration-[1000ms] ease-in-out ${isTransitioning ? "translate-y-0" : "translate-y-full"
                    }`}
            />
        </TransitionContext.Provider>
    );
}
