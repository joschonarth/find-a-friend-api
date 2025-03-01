import { FastifyInstance } from 'fastify'

import { orgsRoutes } from './orgs.routes'
import { petsRoutes } from './pets.routes'

export async function appRoutes(app: FastifyInstance) {
  await app.register(orgsRoutes)
  await app.register(petsRoutes)
}
