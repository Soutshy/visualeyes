"use client";

import { motion } from "framer-motion";

/**
 * Film Grain Overlay
 * Adds a subtle noise texture that "grésille" to create an organic, cinematic feel.
 * The noise is generated via an SVG filter embedded as a data URL.
 */
export function FilmGrain() {
    return (
        <div
            className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] overflow-hidden"
            aria-hidden="true"
        >
            {/* Animated noise layer - Extended beyond viewport to hide edge movement */}
            <div
                className="absolute -inset-[10%] animate-grain"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />
        </div>
    );
}

/**
 * Vignette Overlay
 * Subtle dark edges for a cinematic frame effect
 */
export function Vignette() {
    return (
        <div
            className="fixed inset-0 z-40 pointer-events-none"
            aria-hidden="true"
            style={{
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
            }}
        />
    );
}

/**
 * Combined Cinematic Overlays
 * Wrap your layout with this for the full cinematic effect
 */
export function CinematicOverlays() {
    return (
        <>
            <FilmGrain />
            <Vignette />
        </>
    );
}
