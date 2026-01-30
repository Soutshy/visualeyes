"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/Footer";

const IMAGES = {
    camera: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    studio: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=1000&auto=format&fit=crop",
    team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    backstage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop"
};

export default function AboutPage() {
    const scatterRef = useRef(null);

    // Parallax for Scatter Grid
    const { scrollYProgress } = useScroll({
        target: scatterRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);

    return (
        <main className="bg-rich-black min-h-screen text-off-white overflow-x-hidden selection:bg-gold selection:text-rich-black">

            {/* Header - Huge 'STUDIO' */}
            <section className="h-[90vh] flex items-end justify-center pb-12 md:pb-24 px-6 relative">
                {/* Background Noise/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rich-black pointer-events-none" />

                <motion.h1
                    className="font-display text-[18vw] leading-[0.8] uppercase text-off-white z-10"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    Studio
                </motion.h1>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid md:grid-cols-12 gap-12 md:gap-24">
                    <div className="md:col-span-4">
                        <div className="sticky top-32">
                            <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-4">Our Vision</span>
                            <h2 className="font-display text-4xl md:text-5xl text-off-white">The Unseen.</h2>
                        </div>
                    </div>
                    <div className="md:col-span-8 flex flex-col gap-12">
                        <p className="font-body text-2xl md:text-4xl font-light leading-tight text-off-white/90">
                            We don't just take photos. We capture the raw, the unseen, the moment before the moment.
                        </p>
                        <div className="w-full h-px bg-white/10" />
                        <div className="grid md:grid-cols-2 gap-12">
                            <p className="font-body text-lg font-light leading-relaxed text-off-white/60">
                                Based in Paris, Visual Eyes is an agency dedicated to the unseen. From editorial fashion
                                to high-speed sports, we bring a cinematic touch to every frame. We believe that true luxury lies in authenticity.
                            </p>
                            <p className="font-body text-lg font-light leading-relaxed text-off-white/60">
                                Founded in 2024, our studio merges technical precision with raw artistic expression.
                                Our team works with the world's most prestigious brands to tell stories that resonate.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team / Backstage - Scatter Grid */}
            <section ref={scatterRef} className="py-24 min-h-[120vh] relative max-w-[100vw] overflow-hidden">
                <div className="absolute top-12 left-6 md:left-24 text-xs tracking-[0.3em] uppercase text-gold z-20">Backstage</div>

                {/* Image 1 - Top Left */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-20 -left-[10%] md:left-[10%] w-[50vw] md:w-[25vw] aspect-[3/4] z-10 grayscale hover:grayscale-0 transition-all duration-700 hover:z-30 hover:scale-105"
                >
                    <Image src={IMAGES.team} fill alt="Team Working" className="object-cover" sizes="33vw" />
                </motion.div>

                {/* Image 2 - Top Right - Rotated */}
                <motion.div
                    style={{ y: y2, rotate: -6 }}
                    className="absolute top-40 right-[5%] md:right-[15%] w-[40vw] md:w-[20vw] aspect-square z-10 grayscale hover:grayscale-0 transition-all duration-700 hover:z-30 hover:scale-105 hover:rotate-0"
                >
                    <Image src={IMAGES.camera} fill alt="Camera Gear" className="object-cover" sizes="25vw" />
                </motion.div>

                {/* Image 3 - Center Bottom - Large */}
                <motion.div
                    style={{ y: y3, rotate: rotate1 }}
                    className="absolute top-[60vh] left-[15%] md:left-[35%] w-[60vw] md:w-[30vw] aspect-[4/5] z-0 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:z-30 hover:scale-105"
                >
                    <Image src={IMAGES.backstage} fill alt="Backstage Model" className="object-cover" sizes="33vw" />
                </motion.div>

                {/* Central Text */}
                <div className="absolute top-[50vh] w-full text-center pointer-events-none z-10 mix-blend-difference">
                    <h3 className="font-display text-[12vw] md:text-[10vw] italic text-off-white/20">The Team</h3>
                </div>
            </section>

            {/* Awards List */}
            <section className="py-24 md:py-40 px-6 border-t border-white/5 bg-rich-black z-20 relative">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase mb-16">Featured In</span>
                    {["VOGUE PARIS", "GQ MAGAZINE", "ELLE UK", "NUMÉRO", "PAPER MAGAZINE"].map((mag) => (
                        <div key={mag} className="w-full border-b border-white/5 py-8 group hover:border-gold/30 transition-colors cursor-default">
                            <h3 className="font-display text-4xl md:text-6xl text-off-white/20 group-hover:text-gold transition-colors duration-500 ease-out">
                                {mag}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
