import { FastifyInstance } from 'fastify'

import { createPetController } from '../controllers/pets/create-pet.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', createPetController)
}
