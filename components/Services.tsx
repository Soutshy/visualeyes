"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SERVICES = [
    {
        title: "Mode",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
        items: ["Campaigns", "Editorials", "Lookbooks", "Art Direction"],
        price: "Starting at 2500€"
    },
    {
        title: "Portrait",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop",
        items: ["Identity", "Headshots", "Casting", "Persona"],
        price: "Starting at 800€"
    },
    {
        title: "Sport",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=3270&auto=format&fit=crop",
        items: ["High Velocity", "Athlete Profiles", "Global Events", "Performance"],
        price: "Starting at 1500€"
    }
];

export function Services() {
    return (
        <section id="services" className="bg-rich-black relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[90vh] w-full">
                {SERVICES.map((service, index) => (
                    <ServiceCard key={service.title} service={service} index={index} />
                ))}
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
    return (
        <div className="group relative w-full h-[60vh] md:h-full overflow-hidden border-r border-white/5 last:border-r-0">

            {/* Background Image */}
            <div className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-700 ease-out grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            {/* Dark Overlay Gradient (Bottom) */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-24 px-6 text-center">

                {/* Title - Always Visible */}
                <h3 className="font-display text-4xl md:text-5xl text-off-white mb-6 transform group-hover:-translate-y-4 transition-transform duration-500 ease-out">
                    {service.title}
                </h3>

                {/* Hidden Content - Reveals on Hover */}
                <div className="flex flex-col items-center gap-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-75">

                    {/* Divider */}
                    <div className="w-px h-8 bg-gold/50" />

                    {/* List */}
                    {/* List */}
                    <div className="font-mono uppercase text-sm md:text-base text-off-white/90 max-w-[80%] text-center leading-relaxed tracking-wider">
                        {service.items.join(" • ")}
                    </div>

                    {/* Price */}
                    <span className="font-body text-xs text-gold/80 tracking-[0.2em] uppercase mt-4 block">
                        {service.price}
                    </span>
                </div>
            </div>
        </div>
    );
}
