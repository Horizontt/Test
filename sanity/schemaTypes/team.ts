import { defineField, defineType } from 'sanity'

export const team = defineType({
  name: 'team',
  title: 'Team Members',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({ name: 'initials', title: 'Initials (for avatar, e.g. LH)', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text' }),
    defineField({ name: 'quote', title: 'Personal Quote', type: 'text' }),
    defineField({
      name: 'specialities',
      title: 'Specialities',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value (e.g., 80+)', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' }
        ]
      }]
    }),
    defineField({ name: 'accentColor', title: 'Accent Colour (hex)', type: 'string', initialValue: '#34d399' }),
    defineField({ name: 'gradientFrom', title: 'Avatar Gradient From (hex)', type: 'string', initialValue: '#34d399' }),
    defineField({ name: 'gradientTo', title: 'Avatar Gradient To (hex)', type: 'string', initialValue: '#059669' }),
    defineField({ name: 'order', title: 'Display Order (1, 2, 3...)', type: 'number', initialValue: 1 }),
  ]
})
