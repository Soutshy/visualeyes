"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";

// Utility to wrap number range
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: string;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Transform scroll velocity to acceleration
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Add scroll velocity to base velocity
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax overflow-hidden flex flex-nowrap whitespace-nowrap">
            <motion.div className="scroller flex flex-nowrap gap-12 md:gap-24" style={{ x }}>
                {/* Repeat enough times to fill huge screens */}
                <span className="block mr-12 md:mr-24">{children}</span>
                <span className="block mr-12 md:mr-24">{children}</span>
                <span className="block mr-12 md:mr-24">{children}</span>
                <span className="block mr-12 md:mr-24">{children}</span>
            </motion.div>
        </div>
    );
}

export function Marquee() {
    return (
        <section className="py-24 bg-rich-black overflow-hidden border-t border-white/5 border-b border-white/5 relative z-10">
            <div className="font-body font-bold uppercase text-[5rem] md:text-[8rem] lg:text-[10rem] leading-none text-transparent opacity-30 select-none pointer-events-none antialiased"
                style={{ WebkitTextStroke: "1px #d4af37" }}>
                <ParallaxText baseVelocity={1}>
                    ART DIRECTION — PHOTOGRAPHY — EDITORIAL — RETOUCHING — ART DIRECTION — PHOTOGRAPHY — EDITORIAL — RETOUCHING —
                </ParallaxText>
            </div>

            {/* Reverse direction (Optional second line or just one?) - User asked for ONE list. */}
            {/* But for "wow" effect, maybe just one robust line. */}
        </section>
    );
}
