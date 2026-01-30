"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { MenuOverlay } from "@/components/MenuOverlay";

export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150 && !isOpen) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={cn(
                    "fixed top-0 inset-x-0 z-[60] px-6 md:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none",
                    isOpen && "mix-blend-difference" // Ensures visibility over overlay
                )}
            >
                {/* Logo */}
                <Link href="/" className="pointer-events-auto">
                    <span className="font-display text-2xl md:text-3xl text-off-white tracking-[0.2em] font-bold uppercase relative z-50">
                        Visual Eyes
                    </span>
                </Link>

                {/* Menu Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto group flex items-center gap-3 text-off-white hover:text-gold transition-colors duration-300"
                >
                    <span className="text-xs font-bold tracking-[0.2em] uppercase hidden md:block">
                        {isOpen ? "Close" : "Menu"}
                    </span>

                    {/* Burger Icon / Close X */}
                    <div className="w-8 h-8 flex flex-col items-end justify-center gap-1.5 relative overflow-hidden">
                        {/* Line 1 */}
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-8 h-[1px] bg-current block origin-center transition-transform duration-300"
                        />
                        {/* Line 2 */}
                        <motion.span
                            animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                            className="w-5 h-[1px] bg-current block transition-all duration-300 group-hover:w-8"
                        />
                        {/* Line 3 */}
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-8 h-[1px] bg-current block origin-center transition-transform duration-300"
                        />
                    </div>
                </button>
            </motion.nav>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && <MenuOverlay onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </>
    );
}
