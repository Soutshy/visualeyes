export interface Project {
    id: string;
    title: string;
    category: "Editorial" | "Portrait" | "Luxury";
    imageUrl: string;
    size: "large" | "tall" | "small";
}

export const PROJECTS: Project[] = [
    {
        id: "1",
        title: "Midnight Vogue",
        category: "Editorial",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        size: "large",
    },
    {
        id: "2",
        title: "Gold & Skin",
        category: "Portrait",
        imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop",
        size: "tall",
    },
    {
        id: "3",
        title: "Noir Etude",
        category: "Editorial",
        imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop",
        size: "small",
    },
    {
        id: "4",
        title: "Velvet Shadows",
        category: "Luxury",
        imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070&auto=format&fit=crop",
        size: "small",
    },
    {
        id: "5",
        title: "Aurum Collection",
        category: "Luxury",
        imageUrl: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2070&auto=format&fit=crop",
        size: "tall",
    },
    {
        id: "6",
        title: "Silent Muse",
        category: "Portrait",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        size: "small",
    },
];
