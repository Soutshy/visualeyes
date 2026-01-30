"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { urlFor } from "@/lib/sanity.client";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/sanity.queries";

interface WorkIndexProps {
    projects: Project[];
}

export function WorkIndex({ projects }: WorkIndexProps) {
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    // Mouse tracking for floating image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <section
            className="min-h-screen bg-rich-black py-32 px-6 md:px-12 relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="mb-24 flex flex-col md:flex-row items-end justify-between border-b border-white/10 pb-8">
                    <h1 className="font-display text-5xl md:text-8xl text-off-white tracking-tight">
                        Selected Works
                    </h1>
                    <div className="mt-4 md:mt-0 max-w-sm text-right">
                        <p className="font-body text-sm md:text-base text-off-white/40 leading-relaxed">
                            A collection of visual narratives crafted for the bold.
                        </p>
                    </div>
                </div>

                {/* List Header (Technical) */}
                <div className="grid grid-cols-12 text-xs tracking-[0.2em] text-white/20 mb-8 px-4 uppercase font-body">
                    <div className="col-span-1">No.</div>
                    <div className="col-span-6 md:col-span-8">Client / Project</div>
                    <div className="col-span-3 md:col-span-2 text-right">Service</div>
                    <div className="col-span-2 md:col-span-1 text-right">Year</div>
                </div>

                {/* List Container */}
                <div className="flex flex-col group/list hover:*:opacity-30">
                    {/* The hover:*:opacity-30 trick dimms ALL children when one is hovered, but we override op-100 on the hovered one */}

                    {projects.map((project, index) => (
                        <Link
                            key={project._id}
                            href={`/projects/${project.slug}`}
                            className="group/item relative border-b border-white/10 py-12 px-4 grid grid-cols-12 items-baseline transition-all duration-500 hover:!opacity-100 hover:border-white/30"
                            onMouseEnter={() => setActiveProject(project)}
                            onMouseLeave={() => setActiveProject(null)}
                        >
                            {/* Col 1: Index */}
                            <div className="col-span-1 font-body text-xs text-white/30 font-light">
                                {(index + 1).toString().padStart(2, "0")}
                            </div>

                            {/* Col 2-6+: Title */}
                            <div className="col-span-6 md:col-span-8">
                                <h2 className={cn(
                                    "font-display text-4xl md:text-6xl lg:text-7xl transition-all duration-500 ease-out",
                                    activeProject?._id === project._id ? "text-gold italic translate-x-4" : "text-off-white"
                                )}>
                                    {project.title}
                                </h2>
                            </div>

                            {/* Col 7-9: Service (Category) */}
                            <div className="col-span-3 md:col-span-2 text-right">
                                <span className="font-body text-xs md:text-sm text-white/40 uppercase tracking-widest group-hover/item:text-white transition-colors duration-300">
                                    {project.category || "Art Direction"}
                                </span>
                            </div>

                            {/* Col 10-12: Year/Loc */}
                            <div className="col-span-2 md:col-span-1 text-right">
                                <span className="font-body text-xs text-white/30 font-mono">
                                    {project.date?.split('-')[0] || "2024"}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Counter */}
                <div className="mt-12 text-right border-t border-white/10 pt-4">
                    <span className="font-body text-xs text-white/20 tracking-[0.2em]">
                        TOTAL PROJECTS: {projects.length.toString().padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Floating Image Portal */}
            <div className="pointer-events-none fixed inset-0 z-20 hidden md:block mix-blend-difference">
                {/* Mix-blend difference creates cool effect over text */}
                <AnimatePresence mode="wait">
                    {activeProject && activeProject.mainImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 4 }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            style={{
                                x: springX,
                                y: springY,
                                translateX: "-50%",
                                translateY: "-50%",
                                pointerEvents: "none"
                            }}
                            className="absolute top-0 left-0 w-[500px] h-[650px] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={urlFor(activeProject.mainImage).width(1000).height(1300).url()}
                                alt={activeProject.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Optional: Add Overlay Text on Image */}
                            <div className="absolute bottom-6 left-6 z-10">
                                <span className="text-white text-xs tracking-[0.3em] uppercase bg-black/50 px-2 py-1 backdrop-blur-md">
                                    Preview
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </section>
    );
}
