"use client";

import { useEffect } from "react";

export function RightClickProtector() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            // Option 1: Block everywhere (Strongest)
            // e.preventDefault();

            // Option 2: Block only on images (Recommended balance)
            const target = e.target as HTMLElement;
            if (target.tagName === 'IMG' || target.style.backgroundImage) {
                e.preventDefault();
            }
        };

        const handleDragStart = (e: DragEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'IMG') {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("dragstart", handleDragStart);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("dragstart", handleDragStart);
        };
    }, []);

    return null; // Headless component
}
