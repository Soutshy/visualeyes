"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "-100%" }}
                // Match the duration of the Exit curtain (1s) to feel continuous
                transition={{ duration: 1, ease: "easeInOut" }}
                className="fixed inset-0 bg-black z-[9999] pointer-events-none"
            />
            {children}
        </>
    );
}
