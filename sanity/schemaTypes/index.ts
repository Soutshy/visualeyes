import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import landingWork from './landingWork'
import founderNote from './founderNote'
import { heroImage } from './heroImage'
import aboutPage from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, landingWork, founderNote, heroImage, aboutPage],
}


