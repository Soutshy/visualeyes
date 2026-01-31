"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/Footer";

interface AboutPageClientProps {
    images: {
        team: string;
        camera: string;
        backstage: string;
    };
    content: {
        tagline: string;
        paragraph1: string;
        paragraph2: string;
        featuredIn: string[];
    };
}

export function AboutPageClient({ images, content }: AboutPageClientProps) {
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
            <section className="h-[90vh] flex flex-col items-center justify-end pb-12 md:pb-24 px-6 relative">
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
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="font-body text-gold text-xs tracking-[0.4em] uppercase mt-8 z-10"
                >
                    Paris • Est. 2024
                </motion.span>
            </section>

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
                            {content.tagline}
                        </p>
                        <div className="w-full h-px bg-white/10" />
                        <div className="grid md:grid-cols-2 gap-12">
                            <p className="font-body text-lg font-light leading-relaxed text-off-white/60">
                                {content.paragraph1}
                            </p>
                            <p className="font-body text-lg font-light leading-relaxed text-off-white/60">
                                {content.paragraph2}
                            </p>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-8 mt-12 border-t border-white/10 pt-12">
                            {[
                                { label: "Years", value: "15+" },
                                { label: "Projects", value: "200+" },
                                { label: "Clients", value: "50+" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <span className="font-display text-4xl md:text-5xl text-off-white block mb-2">{stat.value}</span>
                                    <span className="text-xs text-white/40 tracking-[0.2em] uppercase">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Atmosphere (Scatter Grid) removed text 'The Team' */}
            <section ref={scatterRef} className="py-24 min-h-[120vh] relative max-w-[100vw] overflow-hidden">
                <div className="absolute top-12 left-6 md:left-24 text-xs tracking-[0.3em] uppercase text-gold z-20">Atmosphere</div>

                {/* Image 1 - Top Left */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-20 -left-[10%] md:left-[10%] w-[50vw] md:w-[25vw] aspect-[3/4] z-10 grayscale hover:grayscale-0 transition-all duration-700 hover:z-30 hover:scale-105"
                >
                    <Image src={images.team} fill alt="Team Working" className="object-cover" sizes="33vw" />
                </motion.div>

                {/* Image 2 - Top Right - Rotated */}
                <motion.div
                    style={{ y: y2, rotate: -6 }}
                    className="absolute top-40 right-[5%] md:right-[15%] w-[40vw] md:w-[20vw] aspect-square z-10 grayscale hover:grayscale-0 transition-all duration-700 hover:z-30 hover:scale-105 hover:rotate-0"
                >
                    <Image src={images.camera} fill alt="Camera Gear" className="object-cover" sizes="25vw" />
                </motion.div>

                {/* Image 3 - Center Bottom - Large */}
                <motion.div
                    style={{ y: y3, rotate: rotate1 }}
                    className="absolute top-[60vh] left-[15%] md:left-[35%] w-[60vw] md:w-[30vw] aspect-[4/5] z-0 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:z-30 hover:scale-105"
                >
                    <Image src={images.backstage} fill alt="Backstage Model" className="object-cover" sizes="33vw" />
                </motion.div>

                {/* Central Text */}
                <div className="absolute top-[50vh] w-full text-center pointer-events-none z-10 mix-blend-difference">
                    <h3 className="font-display text-[12vw] md:text-[10vw] italic text-off-white/20">Studio Life</h3>
                </div>
            </section>

            {/* Team Grid (New) */}
            <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <div>
                        <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-4">The Collective</span>
                        <h2 className="font-display text-4xl md:text-6xl text-off-white">Meet the Team</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                    {[
                        { name: "Joseph Sp.", role: "Founder & Creative Director", image: images.team },
                        { name: "Sarah M.", role: "Art Director", image: images.camera },
                        { name: "Marc D.", role: "Lead Photographer", image: images.backstage },
                    ].map((member, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={member.image}
                                    fill
                                    alt={member.name}
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <h3 className="font-display text-2xl text-off-white mb-2">{member.name}</h3>
                            <span className="text-xs text-gold tracking-[0.2em] uppercase">{member.role}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Expertise List (Replaces Featured In) */}
            <section className="py-24 md:py-40 px-6 border-t border-white/5 bg-rich-black z-20 relative">
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <span className="text-gold text-xs tracking-[0.3em] uppercase mb-16">Our Expertise</span>
                    {["Editorial Photography", "Brand Campaigns", "Art Direction", "Motion & Video", "Post-Production"].map((service) => (
                        <div key={service} className="w-full border-b border-white/5 py-8 group hover:border-gold/30 transition-colors cursor-default">
                            <h3 className="font-display text-3xl md:text-5xl text-off-white/40 group-hover:text-gold transition-colors duration-500 ease-out">
                                {service}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 bg-rich-black relative overflow-hidden text-center">
                <div className="relative z-10 flex flex-col items-center gap-8">
                    <h2 className="font-display text-5xl md:text-7xl text-off-white">Ready to create?</h2>
                    <a
                        href="mailto:hello@visualeyes.com"
                        className="inline-block border border-gold/30 px-12 py-4 rounded-full text-gold uppercase tracking-[0.2em] text-sm hover:bg-gold hover:text-rich-black transition-all duration-300"
                    >
                        Let's Work Together
                    </a>
                </div>
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
            </section>

            <Footer />
        </main>
    );
}
