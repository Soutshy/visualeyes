import Image from "next/image";
import { Footer } from "@/components/Footer";
import { getAboutPage } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { AboutPageClient } from "./AboutPageClient";

// Fallback images (Unsplash)
const FALLBACK_IMAGES = {
    team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    camera: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    backstage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop"
};

const DEFAULT_FEATURED = ["VOGUE PARIS", "GQ MAGAZINE", "ELLE UK", "NUMÉRO", "PAPER MAGAZINE"];

export const revalidate = 60;

export default async function AboutPage() {
    const data = await getAboutPage();

    // Build images with fallback
    const images = {
        team: data?.teamImage ? urlFor(data.teamImage).width(800).height(1000).url() : FALLBACK_IMAGES.team,
        camera: data?.cameraImage ? urlFor(data.cameraImage).width(600).height(600).url() : FALLBACK_IMAGES.camera,
        backstage: data?.backstageImage ? urlFor(data.backstageImage).width(900).height(1100).url() : FALLBACK_IMAGES.backstage,
    };

    const content = {
        tagline: data?.tagline || "We don't just take photos. We capture the raw, the unseen, the moment before the moment.",
        paragraph1: data?.paragraph1 || "Based in Paris, Visual Eyes is an agency dedicated to the unseen. From editorial fashion to high-speed sports, we bring a cinematic touch to every frame. We believe that true luxury lies in authenticity.",
        paragraph2: data?.paragraph2 || "Founded in 2024, our studio merges technical precision with raw artistic expression. Our team works with the world's most prestigious brands to tell stories that resonate.",
        featuredIn: data?.featuredIn?.length ? data.featuredIn : DEFAULT_FEATURED,
    };

    return <AboutPageClient images={images} content={content} />;
}

