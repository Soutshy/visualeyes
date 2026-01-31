import { groq } from 'next-sanity'
import { client } from './sanity.client'
import { type Image } from 'sanity'

export interface Project {
    _id: string
    title: string
    slug: string
    mainImage: Image & {
        alt?: string
        asset: {
            _ref: string
            url: string
            metadata: {
                lqip: string
                dimensions: {
                    aspectRatio: number
                    width: number
                    height: number
                }
            }
        }
    }
    category: string
    gallery?: Image[]
    description?: string
    credits?: string
    date?: string
}

export const getProjects = async (category?: string): Promise<Project[]> => {
    // If category is provided, filter by it (case-insensitive)
    // Otherwise fetch all projects
    const query = category
        ? groq`*[_type == "project" && lower(category) == lower($category)] | order(_createdAt desc) {
            _id,
            title,
            "slug": slug.current,
            mainImage {
                ...,
                asset->{ ..., metadata }
            },
            category,
            gallery
          }`
        : groq`*[_type == "project"] | order(_createdAt desc) {
            _id,
            title,
            "slug": slug.current,
            mainImage {
                ...,
                asset->{ ..., metadata }
            },
            category,
            gallery
          }`;

    const params = category ? { category } : {};
    return client.fetch(query, params);
};

export const getProject = async (slug: string): Promise<Project> => {
    return client.fetch(
        groq`*[_type == "project" && slug.current == $slug][0]{
            _id,
            title,
            "slug": slug.current,
            mainImage {
                ...,
                asset->{ ..., metadata }
            },
            category,
            gallery,
            description,
            credits,
            date
        }`,
        { slug }
    );
};

export interface LandingWork {
    _id: string;
    title: string;
    image: any;
    description?: string;
}

export async function getLandingWorks(): Promise<LandingWork[]> {
    return client.fetch(
        groq`*[_type == "landingWork"] {
      _id,
      title,
      image,
      description
    }`
    );
}

export interface FounderNote {
    _id: string;
    quote: string;
    name: string;
    image: any;
    signature?: any;
}

export async function getFounderNote(): Promise<FounderNote | null> {
    return client.fetch(
        groq`*[_type == "founderNote"][0] {
      _id,
      quote,
      name,
      image,
      signature
    }`
    );
}

// Hero Images for the landing page wall
export interface HeroImage {
    _id: string;
    image: any;
    column: number;
    order: number;
    alt?: string;
}

export interface HeroImagesGrouped {
    column1: HeroImage[];
    column2: HeroImage[];
    column3: HeroImage[];
}

export async function getHeroImages(): Promise<HeroImagesGrouped> {
    const images = await client.fetch<HeroImage[]>(
        groq`*[_type == "heroImage"] | order(column asc, order asc) {
            _id,
            image,
            column,
            order,
            alt
        }`
    );

    // Group by column
    return {
        column1: images.filter(img => img.column === 1),
        column2: images.filter(img => img.column === 2),
        column3: images.filter(img => img.column === 3),
    };
}

// About Page content
export interface AboutPageData {
    _id: string;
    tagline?: string;
    paragraph1?: string;
    paragraph2?: string;
    teamImage?: any;
    cameraImage?: any;
    backstageImage?: any;
    featuredIn?: string[];
}

export async function getAboutPage(): Promise<AboutPageData | null> {
    return client.fetch(
        groq`*[_type == "aboutPage"][0] {
            _id,
            tagline,
            paragraph1,
            paragraph2,
            teamImage,
            cameraImage,
            backstageImage,
            featuredIn
        }`
    );
}


