import { defineField, defineType } from 'sanity'

export const heroImage = defineType({
    name: 'heroImage',
    title: 'Hero Image',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'column',
            title: 'Column',
            type: 'number',
            description: 'Which column to display this image in (1, 2, or 3)',
            options: {
                list: [
                    { title: 'Column 1 (Fashion)', value: 1 },
                    { title: 'Column 2 (Sport)', value: 2 },
                    { title: 'Column 3 (Portrait)', value: 3 },
                ],
            },
            validation: (Rule) => Rule.required().min(1).max(3),
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Display order within the column (lower = higher)',
            initialValue: 0,
        }),
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Description for accessibility',
        }),
    ],
    orderings: [
        {
            title: 'Column, then Order',
            name: 'columnOrder',
            by: [
                { field: 'column', direction: 'asc' },
                { field: 'order', direction: 'asc' },
            ],
        },
    ],
    preview: {
        select: {
            media: 'image',
            column: 'column',
            order: 'order',
        },
        prepare({ media, column, order }) {
            return {
                title: `Column ${column} - Position ${order || 0}`,
                media,
            }
        },
    },
})
