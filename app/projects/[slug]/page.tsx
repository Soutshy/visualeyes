import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import * as Motion from "@/components/MotionClient";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ProtectedGalleryImage } from "@/components/ProtectedGalleryImage";

// Force dynamic/revalidate
export const revalidate = 60;

// Since we are using "use client" for standard exports, we might need a separate server file for generateStaticParams strictly speaking if we weren't mixing. 
// But actually, this file is marked 'use client' at the top which conflicts with async component and generateStaticParams in the same file in App Router usually if it was a server component.
// Wait, the previous file didn't have "use client" at the top? 
// Checking previous file content... It started with `import React from "react";`. It did NOT have "use client".
// However, it imported `MotionClient`. 
// My previous read showed: `export default async function ProjectPage` -> This is a SERVER COMPONENT.
// So I must NOT add "use client" at the top. I will keep it as Server Component.

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    const allProjects = await getProjects();
    const currentIndex = allProjects.findIndex(p => p.slug === slug);
    const nextProject = allProjects[currentIndex + 1] || allProjects[0];

    const galleryImages = project.gallery || [];

    return (
        <main className="min-h-screen bg-rich-black text-off-white">

            {/* Sticky Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                {/* Left Column: Sticky Infos */}
                <aside className="lg:col-span-4 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center px-6 py-12 lg:px-12 z-10 relative">
                    {/* Back Home */}
                    <div className="absolute top-8 left-6 lg:left-12">
                        <Link href="/" className="text-xs uppercase tracking-[0.3em] hover:text-gold transition-colors duration-300 border-b border-transparent hover:border-gold pb-1 text-white/50">
                            ← Home
                        </Link>
                    </div>

                    <Motion.FadeInUp>
                        <div className="flex flex-col gap-8">
                            {/* Category & Date */}
                            <span className="text-gold text-xs tracking-[0.4em] uppercase">
                                {project.category}{project.date && ` — ${new Date(project.date).getFullYear()}`}
                            </span>

                            {/* Title */}
                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-off-white leading-[0.9]">
                                {project.title}
                            </h1>

                            {/* Separator */}
                            <div className="w-12 h-px bg-white/20" />

                            {/* Description */}
                            {project.description && (
                                <p className="font-body text-base md:text-lg text-off-white/60 font-light leading-relaxed max-w-md text-justify">
                                    {project.description}
                                </p>
                            )}

                            {/* Credits */}
                            {project.credits && (
                                <div className="mt-8">
                                    <span className="text-xs text-white/30 tracking-[0.2em] uppercase block mb-2">Credits</span>
                                    <p className="font-body text-sm text-off-white/80 font-light whitespace-pre-line">
                                        {project.credits}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Motion.FadeInUp>
                </aside>

                {/* Right Column: Vertical Gallery (Museum Style) */}
                <div className="lg:col-span-8 px-6 lg:px-12 pb-40 pt-32 w-full">

                    {/* Inner Container for Restricted Width */}
                    <div className="max-w-2xl mx-auto flex flex-col gap-40">
                        {/* Main Image */}
                        {project.mainImage && (
                            <Motion.FadeInUp className="w-full">
                                <ProtectedGalleryImage
                                    src={urlFor(project.mainImage).width(1200).quality(95).url()}
                                    alt={project.mainImage.alt || project.title}
                                />
                            </Motion.FadeInUp>
                        )}

                        {/* Gallery Stream */}
                        {galleryImages.map((image, i) => (
                            <Motion.FadeInUp key={image?.asset?._ref || i} className="w-full" delay={0.2}>
                                <ProtectedGalleryImage
                                    src={urlFor(image).width(1200).quality(90).url()}
                                    alt={image.alt || `Gallery Image ${i}`}
                                />
                                {image.alt && (
                                    <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase mt-6 text-center">
                                        {image.alt}
                                    </p>
                                )}
                            </Motion.FadeInUp>
                        ))}

                        {/* Next Project (Inline) */}
                        <div className="border-t border-white/5 pt-20 text-center">
                            <span className="text-xs text-white/20 tracking-[0.3em] uppercase mb-8 block">Next Project</span>
                            <Link href={`/projects/${nextProject.slug}`} className="group inline-block">
                                <h2 className="font-display text-4xl md:text-5xl text-off-white group-hover:text-gold transition-colors duration-500">
                                    {nextProject.title}
                                </h2>
                                <span className="block mt-4 text-xs text-gold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 uppercase tracking-widest">
                                    View Case Study
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
