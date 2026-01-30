"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/data/portfolio";
import { Project } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/TransitionLink";

interface GalleryProps {
    projects?: Project[];
}

export function HorizontalGallery({ projects = [] }: GalleryProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    // useMediaQuery equivalent to avoid hydration mismatch
    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    // Use Sanity projects or fallback to MOCKS
    const displayProjects = projects.length > 0
        ? projects.map(p => ({
            id: p._id || p.slug,
            slug: p.slug,
            title: p.title,
            category: p.category,
            // Optimization: Resize image to max needed height (1080p is enough for 80vh usually) and use WebP
            imageUrl: p.mainImage
                ? urlFor(p.mainImage).height(1080).quality(80).auto('format').url()
                : "",
        }))
        : PROJECTS;

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal Scroll Logic (Desktop Only)
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);
    const springX = useSpring(x, { stiffness: 50, damping: 15, mass: 1.2 });

    return (
        <section
            ref={targetRef}
            className={cn(
                "relative bg-rich-black",
                // Mobile: Auto height. Desktop: 400vh to drive scroll
                "h-auto md:h-[400vh]"
            )}
        >
            <div
                className={cn(
                    "flex overflow-hidden",
                    // Mobile: Relative, vertical stack. Desktop: Sticky, horizontal, h-screen
                    "relative flex-col h-auto pt-20 pb-20 px-6 gap-20",
                    "md:sticky md:top-0 md:flex-row md:h-screen md:items-center md:pt-0 md:pb-0 md:px-0 md:gap-0"
                )}
            >
                <motion.div
                    // Only apply horizontal transform on Desktop
                    style={{ x: isDesktop ? springX : 0 }}
                    className={cn(
                        "flex",
                        "flex-col gap-24", // Mobile: Vertical stack with large gaps
                        "md:flex-row md:gap-16 md:px-24", // Desktop: Horizontal with standard gaps
                        "will-change-transform"
                    )}
                >

                    {/* Intro Text / Collection Title */}
                    <div className="flex flex-col justify-center min-w-[30vw] md:min-w-[20vw] h-auto md:h-[70vh]">
                        <span className="text-gold text-xs tracking-[0.4em] mb-4 uppercase">Collection</span>
                        <h2 className="font-display text-5xl md:text-7xl text-off-white leading-tight">
                            Selected <br /> <span className="text-gold-gradient italic">Works</span>
                        </h2>
                        <div className="w-24 h-px bg-gold/50 mt-8" />
                    </div>

                    {displayProjects.map((project, index) => {
                        return (
                            <GalleryItem key={project.id} project={project} index={index} />
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

function GalleryItem({ project, index }: { project: any; index: number }) {
    // Priority for first 2 images
    const isPriority = index < 2;

    // Parallax effect for image
    // Note: This needs a ref to the item itself relative to viewport to be perfect,
    // but we can simulate a subtle global parallax or just simple hover effects for now
    // as nested scroll parallax is complex without specific hook for each item.
    // However, "Cyrille Martini" style implies the image moves INSIDE the container as it swipes.

    // We can just do a simple scale/move on hover for interactivity, 
    // AND a static "reveal" effect.
    // For true parallax per item during horizontal scroll, we'd need useScroll on the horizontal container 
    // but that's driven by parent. 
    // Let's implement the requested Design specs: LARGE Height, Typography.

    return (
        <div className="group relative h-[60vh] md:h-[75vh] min-w-[80vw] md:min-w-[50vh] flex flex-col justify-end">
            {/* Number */}
            <span className="absolute -top-12 -left-4 font-display text-[8rem] md:text-[10rem] text-white/5 font-thin leading-none select-none z-0">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Image Container */}
            <TransitionLink
                href={`/projects/${project.slug}`}
                className="block relative w-full h-full"
            >
                <div className="relative w-full h-full overflow-hidden bg-gray-dark border border-white/10 z-10 transition-colors duration-500 group-hover:border-gold/50">
                    {project.imageUrl && (
                        <motion.div
                            className="w-full h-full relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                priority={isPriority}
                                className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    )}
                </div>
            </TransitionLink>

            {/* Title Below */}
            <div className="absolute -bottom-12 md:-bottom-20 left-0">
                <h3 className="font-display text-3xl md:text-5xl text-off-white tracking-wide group-hover:text-gold transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-off-white/40 tracking-[0.2em] uppercase mt-2">
                    {project.category}
                </p>
            </div>
        </div>
    )
}
