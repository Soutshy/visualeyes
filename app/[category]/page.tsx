import React from "react";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { getProjects } from "@/lib/sanity.queries";

// Revalidate every 60s
export const revalidate = 60;

// Need to allow dynamic params for this page
// It will be a server component that fetches data
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    // Sanity expects lowercase usually, ensure we match value
    const { category } = await params;

    console.log(`[CategoryPage] Requested category: ${category}`);

    const projects = await getProjects(category);

    if (!projects || projects.length === 0) {
        return (
            <main className="min-h-screen bg-rich-black flex flex-col items-center justify-center text-center px-4">
                <h1 className="font-display text-4xl text-off-white mb-4">No projects found</h1>
                <p className="text-white/50">Category: <span className="text-gold capitalize">{category}</span></p>
                <a href="/" className="mt-8 text-xs tracking-widest uppercase border-b border-gold text-gold">Return Home</a>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-rich-black">
            {/* Category Header */}
            <div className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    {/* Back or Logo could go here, but Navbar handles it */}
                </div>
                <h1 className="font-display text-off-white/10 text-9xl absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 select-none">
                    {category.toUpperCase()}
                </h1>
            </div>

            <HorizontalGallery projects={projects} />
        </main>
    );
}
