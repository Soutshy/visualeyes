"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
    className?: string;
    fill?: string;
}

export function Spotlight({ className, fill = "#d4af37" }: SpotlightProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!divRef.current) return;

            const rect = divRef.current.getBoundingClientRect();
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        },
        []
    );

    const handleMouseEnter = useCallback(() => {
        setOpacity(1);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setOpacity(0);
    }, []);

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative overflow-hidden",
                className
            )}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
                style={{
                    opacity,
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${fill}20, transparent 40%)`,
                }}
            />
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${fill}40, transparent 30%)`,
                }}
            />
        </div>
    );
}

export function SpotlightCard({
    children,
    className,
    spotlightColor = "#d4af37",
}: {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!divRef.current) return;

            const rect = divRef.current.getBoundingClientRect();
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        },
        []
    );

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={cn("relative overflow-hidden", className)}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}15, transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}
