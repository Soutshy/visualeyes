import { Hero } from "@/components/Hero";
import CircularGallery from "@/components/CircularGallery";
import { urlFor } from "@/lib/sanity.client";
import { Manifesto } from "@/components/Manifesto";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { LandingShowcase } from "@/components/LandingShowcase";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getProjects, getFounderNote } from "@/lib/sanity.queries";
import { FounderNote } from "@/components/FounderNote";

// Revalidate every 60 seconds (or 0 for on-demand/instant dev feedback)
export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  const founderData = await getFounderNote();

  return (
    <main className="min-h-screen bg-rich-black">
      <Hero />
      <Manifesto />
      <section className="relative w-full bg-rich-black overflow-hidden">
        {/* Title Block */}
        <div className="relative z-10 w-full text-center pt-24 uppercase pointer-events-none mb-[-50px]">
          <span className="text-xs md:text-sm tracking-[0.3em] text-gold block mb-4">Explore Our World</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-off-white italic opacity-90">
            Visual Archive
          </h2>
        </div>

        {/* Gallery Container */}
        <div className="h-[90vh] w-full cursor-grab active:cursor-grabbing relative z-0">
          <CircularGallery
            items={projects.map((p) => ({
              image: urlFor(p.mainImage).width(800).height(600).url(),
              text: p.title
            }))}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
          />
        </div>
      </section>
      <Marquee />
      <Services />
      <LandingShowcase />
      <FounderNote data={founderData} />
      <Contact />
      <Footer />
    </main>
  );
}
