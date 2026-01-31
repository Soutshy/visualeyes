"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Marquee content - repeated for seamless loop
    const marqueeText = "VISUAL EYES • PHOTOGRAPHY AGENCY • PARIS • ";

    return (
        <footer className="bg-rich-black pt-32 pb-10 px-6 md:px-12 border-t border-white/10 relative overflow-hidden">

            <div className="max-w-[95vw] mx-auto flex flex-col justify-between min-h-[60vh]">

                {/* Top Section: Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-24">

                    {/* Brand / Info */}
                    <div className="md:col-span-4 flex flex-col gap-8">
                        <div>
                            <span className="text-xs text-white/40 tracking-[0.2em] uppercase block mb-4">Location</span>
                            <p className="font-body text-lg text-off-white font-light">
                                12 Rue du Faubourg Saint-Honoré<br />
                                75008 Paris, France
                            </p>
                        </div>
                        <div>
                            <span className="text-xs text-white/40 tracking-[0.2em] uppercase block mb-4">Contact</span>
                            <a href="mailto:hello@visualeyes.com" className="font-body text-lg text-off-white font-light hover:text-gold transition-colors">
                                hello@visualeyes.com
                            </a>
                            <p className="font-body text-lg text-off-white font-light mt-1">+33 1 42 68 53 00</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-4 flex flex-col gap-4">
                        <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">Sitemap</span>
                        {["Home", "Work", "Studio", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="font-display text-3xl md:text-4xl text-off-white hover:text-gold transition-colors w-fit"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Socials & Back to Top */}
                    <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end">
                        <div className="flex flex-col gap-4 items-start md:items-end">
                            <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 md:text-right w-full">Socials</span>
                            {["Instagram", "LinkedIn", "Twitter", "Behance"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="group relative font-body text-lg text-off-white font-light hover:text-gold transition-colors"
                                >
                                    {social}
                                    <span className="absolute -bottom-1 right-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="group mt-12 md:mt-0 flex items-center gap-2 text-xs text-white/40 uppercase tracking-[0.2em] hover:text-gold transition-colors"
                        >
                            Back to Top
                            <span className="p-2 border border-white/20 rounded-full group-hover:border-gold transition-colors">
                                ↑
                            </span>
                        </button>
                    </div>
                </div>

                {/* Bottom Section: MARQUEE */}
                <div className="relative mt-auto border-t border-white/5 pt-8 -mx-6 md:-mx-12 overflow-hidden">
                    {/* Infinite Marquee */}
                    <div className="flex whitespace-nowrap">
                        <motion.div
                            className="flex gap-4"
                            animate={{ x: [0, "-50%"] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 20,
                                    ease: "linear",
                                },
                            }}
                        >
                            {/* Repeat text multiple times for seamless loop */}
                            {[...Array(4)].map((_, i) => (
                                <span
                                    key={i}
                                    className="font-display text-[10vw] md:text-[8vw] text-transparent bg-clip-text bg-gradient-to-r from-white/10 via-white/20 to-white/10 uppercase tracking-tight select-none"
                                >
                                    {marqueeText}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <div className="absolute bottom-2 w-full flex justify-between text-[10px] text-white/20 uppercase tracking-widest px-6 md:px-12">
                        <span>© 2024 Visual Eyes Agency</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

