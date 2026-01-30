import { getProjects } from "@/lib/sanity.queries";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { PROJECTS } from "@/data/portfolio";
import { urlFor } from "@/lib/sanity.client";

export async function GallerySection() {
    const sanityProjects = await getProjects();
    const hasSanityData = sanityProjects && sanityProjects.length > 0;

    return (
        <section id="portfolio" className="py-20 bg-rich-black relative">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="font-display text-4xl md:text-5xl text-gold mb-4">Selected Works</h2>
                <div className="w-24 h-px bg-gold/30 mx-auto" />
            </div>

            <BentoGrid>
                {hasSanityData ? (
                    // Map Sanity data to BentoItemProps
                    sanityProjects.map((project, i) => (
                        <BentoGridItem
                            key={project.slug || i}
                            item={{
                                title: project.title,
                                category: project.category,
                                imageUrl: project.mainImage ? urlFor(project.mainImage).url() : "",
                                size: i === 0 || i === 3 ? "large" : "small", // Dynamic sizing logic for sanity data
                                blurDataUrl: project.mainImage?.asset?.metadata?.lqip
                            }}
                        />
                    ))
                ) : (
                    // Use Fallback Mock Data
                    PROJECTS.map((project) => (
                        <BentoGridItem
                            key={project.id}
                            item={{
                                title: project.title,
                                category: project.category,
                                imageUrl: project.imageUrl,
                                size: project.size,
                            }}
                        />
                    ))
                )}
            </BentoGrid>

            {/* Decorative Gold Dust */}
            <div className="absolute top-0 right-0 -translate-y-1/2 w-64 h-64 bg-gold/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 w-64 h-64 bg-gold/5 blur-[100px] pointer-events-none" />
        </section>
    );
}
