"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface CursorState {
    isHovering: boolean;
    isOnProject: boolean;
    text: string;
}

const CURSOR_SIZE = 40;
const DOT_SIZE = 8;

export function CustomCursor() {
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        isOnProject: false,
        text: "",
    });
    const [isVisible, setIsVisible] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smoothed position for outer circle (lagging effect)
    const springConfig = { damping: 25, stiffness: 200 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Handle mouse move
    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    // Handle mouse enter/leave document
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Check if element is interactive
    const isInteractive = (element: HTMLElement): boolean => {
        const interactiveSelectors = [
            'a', 'button', '[role="button"]', 'input', 'textarea', 'select',
            '[data-cursor="pointer"]'
        ];
        return interactiveSelectors.some(selector => element.closest(selector));
    };

    // Check if element is a project card
    const isProjectCard = (element: HTMLElement): boolean => {
        return !!element.closest('[data-cursor="view"]');
    };

    // Handle hover states
    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (isProjectCard(target)) {
                setCursorState({
                    isHovering: true,
                    isOnProject: true,
                    text: "View"
                });
            } else if (isInteractive(target)) {
                setCursorState({
                    isHovering: true,
                    isOnProject: false,
                    text: ""
                });
            } else {
                setCursorState({
                    isHovering: false,
                    isOnProject: false,
                    text: ""
                });
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove]);

    // Don't render on mobile/touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            {/* Outer Circle (follows with lag) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
                animate={{
                    width: cursorState.isOnProject ? 100 : cursorState.isHovering ? 60 : CURSOR_SIZE,
                    height: cursorState.isOnProject ? 100 : cursorState.isHovering ? 60 : CURSOR_SIZE,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    width: { type: "spring", stiffness: 300, damping: 30 },
                    height: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
            >
                <div
                    className="absolute rounded-full border border-white flex items-center justify-center"
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <AnimatePresence>
                        {cursorState.isOnProject && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-white text-xs font-body uppercase tracking-[0.2em]"
                            >
                                {cursorState.text}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Inner Dot (follows instantly) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                animate={{
                    opacity: isVisible && !cursorState.isOnProject ? 1 : 0,
                    scale: cursorState.isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="absolute bg-white rounded-full"
                    style={{
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </motion.div>
        </>
    );
}
