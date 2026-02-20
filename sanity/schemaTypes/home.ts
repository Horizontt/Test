import { defineField, defineType } from 'sanity'

export const home = defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    // --- HERO SECTION ---
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'heading', title: 'Main Heading (Line 1)', type: 'string' },
        { name: 'headingHighlight', title: 'Highlighted Text (Line 2, gradient)', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        { name: 'primaryCta', title: 'Primary Button Text', type: 'string' },
        { name: 'secondaryCta', title: 'Secondary Button Text', type: 'string' },
        {
          name: 'heroStats',
          title: 'Hero Stats (animated counters)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'targetNumber', title: 'Target Number (integer)', type: 'number' },
              { name: 'suffix', title: 'Suffix (e.g. %, x)', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ]
          }]
        }
      ]
    }),

    // --- PROBLEM SECTION ---
    defineField({
      name: 'problemSection',
      title: 'Problem Section Header',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
      ]
    }),
    defineField({
      name: 'problems',
      title: 'Problem Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Emoji Icon', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' },
          { name: 'stat', title: 'Statistic (e.g., 23 hrs/wk)', type: 'string' },
          { name: 'statLabel', title: 'Statistic Label', type: 'string' },
        ]
      }]
    }),

    // --- SOLUTION SECTION ---
    defineField({
      name: 'solutionSection',
      title: 'Solution Section Header',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
      ]
    }),
    defineField({
      name: 'solutions',
      title: 'Solution Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Emoji Icon', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' },
          { name: 'features', title: 'Feature Tags', type: 'array', of: [{ type: 'string' }] },
        ]
      }]
    }),

    // --- PROCESS SECTION ---
    defineField({
      name: 'processSection',
      title: 'Process Section Header',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
      ]
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Step Number (e.g., 01)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' },
          { name: 'timeframe', title: 'Timeframe (e.g., Day 1)', type: 'string' },
          { name: 'deliverable', title: 'Deliverable (e.g., Free)', type: 'string' },
        ]
      }]
    }),

    // --- RESULTS SECTION ---
    defineField({
      name: 'resultsSection',
      title: 'Results Section Header',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
      ]
    }),
    defineField({
      name: 'stats',
      title: 'Statistics Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'icon', title: 'Emoji Icon', type: 'string' },
          { name: 'value', title: 'Value (e.g., 47%)', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ]
      }]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Full Name', type: 'string' },
          { name: 'role', title: 'Role & Company', type: 'string' },
          { name: 'location', title: 'Location', type: 'string' },
          { name: 'text', title: 'Testimonial Text', type: 'text' },
          { name: 'stat', title: 'Key Stat (e.g., $180K)', type: 'string' },
          { name: 'statLabel', title: 'Stat Label', type: 'string' },
          { name: 'initials', title: 'Initials (for avatar)', type: 'string' },
        ]
      }]
    }),

    // --- ABOUT SECTION ---
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        { name: 'badge', title: 'Badge Text', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body1', title: 'Body Paragraph 1', type: 'text' },
        { name: 'body2', title: 'Body Paragraph 2', type: 'text' },
        { name: 'quoteLabel', title: 'Code Label (e.g., // our_philosophy.js)', type: 'string' },
        { name: 'quote', title: 'Philosophy Quote', type: 'text' },
        {
          name: 'creds',
          title: 'Credential Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'icon', title: 'Emoji Icon', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ]
          }]
        },
        {
          name: 'aboutStats',
          title: 'Stats Grid (in quote card)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', title: 'Value', type: 'string' },
              { name: 'label', title: 'Label', type: 'string' },
            ]
          }]
        }
      ]
    }),

    // --- CTA SECTION ---
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonUrl', title: 'Button URL (booking link)', type: 'url' },
        {
          name: 'trustItems',
          title: 'Trust Badges (below button)',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    }),
  ]
})
