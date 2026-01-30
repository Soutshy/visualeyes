"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const ParallaxImage = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Subtle parallax y shift for container or image?
    // Let's scale the image slightly? Or just simple reveal.
    // User asked for "fade-in + y-up". FadeInUp handles that.
    // But for Main Image, maybe a scale effect?
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]); // Zoom OUT effect as it enters/scrolls? Or Zoom IN?
    // Let's do simple reveal for now inside FadeInUp, but this component can be useful.

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
};
