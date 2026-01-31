import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'À Propos (About)',
    type: 'document',
    fields: [
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'Le texte principal de la philosophie (ex: "We don\'t just take photos...")',
        }),
        defineField({
            name: 'paragraph1',
            title: 'Paragraphe 1',
            type: 'text',
            description: 'Premier paragraphe de description',
        }),
        defineField({
            name: 'paragraph2',
            title: 'Paragraphe 2',
            type: 'text',
            description: 'Deuxième paragraphe de description',
        }),
        defineField({
            name: 'teamImage',
            title: 'Image Team',
            type: 'image',
            options: { hotspot: true },
            description: 'Image "Team Working" (gauche)',
        }),
        defineField({
            name: 'cameraImage',
            title: 'Image Camera',
            type: 'image',
            options: { hotspot: true },
            description: 'Image "Camera Gear" (droite, rotated)',
        }),
        defineField({
            name: 'backstageImage',
            title: 'Image Backstage',
            type: 'image',
            options: { hotspot: true },
            description: 'Image "Backstage" (centre, grande)',
        }),
        defineField({
            name: 'featuredIn',
            title: 'Featured In',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Liste des magazines/marques (ex: VOGUE PARIS, GQ MAGAZINE...)',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Page À Propos',
                subtitle: 'Configuration unique'
            }
        }
    }
})
