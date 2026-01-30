import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Portrait', value: 'portrait' },
                    { title: 'Mode', value: 'mode' },
                    { title: 'Sport', value: 'sport' },
                    { title: 'Événementiel', value: 'evenementiel' },
                ],
                layout: 'radio'
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
    ],
})
