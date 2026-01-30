import React from "react";
import { getLandingWorks } from "@/lib/sanity.queries";
import { ShowcaseGrid } from "./ShowcaseGrid";

export async function LandingShowcase() {
    const works = await getLandingWorks();

    // Fallback Data for Immediate Visualization
    const displayWorks = works && works.length > 0 ? works : [
        {
            _id: "1",
            title: "MIDNIGHT VOGUE",
            image: { asset: { _ref: "image-fb3b1b6e4b8f522851a0293776633659c25f385c-3500x2333-jpg" } },
            description: "NOIR AESTHETICS — TOKYO, 2024"
        },
        {
            _id: "2",
            title: "KINETIC SOUL",
            image: { asset: { _ref: "image-mock-2" } },
            description: "RAW VELOCITY — LONDON, 2023"
        },
        {
            _id: "3",
            title: "SILENT PORTRAITS",
            image: { asset: { _ref: "image-mock-3" } },
            description: "UNSEEN VULNERABILITY — PARIS, 2024"
        }
    ];

    // I need to update ShowcaseGrid to handle these mocks or use a different component?
    // Actually, urlFor() crashes if source is invalid. 
    // I should probably modify ShowcaseGrid to check for this or just rely on the user adding data in Sanity?
    // User explicitly asked for fallback code. I will provide it but I must update ShowcaseGrid to handle it safeley.

    if (!displayWorks || displayWorks.length === 0) return null;

    return (
        <section className="py-24 bg-rich-black">
            <div className="container mx-auto px-6 mb-12 text-center">
                <span className="text-gold text-xs tracking-[0.4em] uppercase">Selected Works</span>
            </div>

            <div className="max-w-7xl mx-auto">
                <ShowcaseGrid works={displayWorks as any} />
            </div>
        </section>
    );
}
