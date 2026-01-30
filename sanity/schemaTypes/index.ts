import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import landingWork from './landingWork'
import founderNote from './founderNote'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, landingWork, founderNote],
}
