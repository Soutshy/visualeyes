import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'founderNote',
    title: 'Founder Note',
    type: 'document',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Founder Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Portrait',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'signature',
            title: 'Signature (PNG Transparent)',
            type: 'image',
        }),
    ],
})
