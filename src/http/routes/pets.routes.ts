import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../middlewares/verify-jwt'

import { createPetController } from '../controllers/pets/create-pet.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/orgs/pets', { onRequest: [verifyJwt] }, createPetController)
}
