import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'landingWork',
    title: 'Landing Page Gallery',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            description: 'Short description (2-3 sentences) displayed on click overlay.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})
