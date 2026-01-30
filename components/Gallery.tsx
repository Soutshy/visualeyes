import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";

interface GalleryProps {
    projects?: Project[];
}

export function Gallery({ projects = [] }: GalleryProps) {
    const displayProjects = projects.length > 0
        ? projects.map(p => ({
            id: p._id || p.slug,
            title: p.title,
            category: p.category,
            imageUrl: p.mainImage ? urlFor(p.mainImage).url() : "",
            size: "small" // Placeholder, logic below handles sizes
        }))
        : PROJECTS;

    const getProjectSize = (index: number) => {
        if (projects.length > 0) {
            if (index === 0) return "large";
            if (index === 3) return "tall";
            return "small";
        }
        return (displayProjects[index] as any).size;
    };

    return (
        <section id="gallery" className="bg-rich-black py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5">
                    {displayProjects.map((project, index) => {
                        const size = getProjectSize(index);
                        return (
                            <div
                                key={project.id}
                                className={cn(
                                    "group relative overflow-hidden bg-rich-black cursor-pointer md:border-[0.5px] border-gold/20",
                                    "aspect-square md:aspect-auto", // Force square on mobile for better grid visual
                                    size === "large" && "md:col-span-2 md:row-span-2 md:h-[600px]",
                                    size === "tall" && "md:row-span-2 md:h-[600px]",
                                    size === "small" && "col-span-1 md:h-[300px]"
                                )}
                            >
                                {/* Image */}
                                {project.imageUrl && (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-all duration-700 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                )}

                                {/* Inner Gold Border on Hover */}
                                <div className="absolute inset-4 border border-gold/0 transition-all duration-500 scale-95 opacity-0 group-hover:border-gold/60 group-hover:scale-100 group-hover:opacity-100 z-20 pointer-events-none" />

                                {/* Overlay Text */}
                                <div className="absolute inset-x-0 bottom-0 z-20 p-8 flex flex-col justify-end opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                    <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2 font-medium">
                                        {project.category}
                                    </span>
                                    <h3 className="text-off-white font-display text-2xl font-normal tracking-wide">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Dark Vignette Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none z-10" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
