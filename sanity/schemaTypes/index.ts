import { type SchemaTypeDefinition } from 'sanity'
import { team } from './team'
import { post } from './post'
import { home } from './home'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [team, post, home],
}