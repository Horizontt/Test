import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Strategy', value: 'Strategy' },
          { title: 'Insights', value: 'Insights' },
          { title: 'Case Study', value: 'Case Study' },
          { title: 'Compliance', value: 'Compliance' },
        ]
      }
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text' }),
    defineField({ name: 'timeToRead', title: 'Read Time (e.g., 8 min)', type: 'string' }),
    defineField({ name: 'date', title: 'Published Date', type: 'date' }),
    defineField({ name: 'featured', title: 'Featured Post?', type: 'boolean', initialValue: false }),
    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Intro (highlighted)', value: 'blockquote' },
          ],
        }
      ]
    })
  ]
})
