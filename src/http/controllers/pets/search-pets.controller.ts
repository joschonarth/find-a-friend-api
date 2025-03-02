import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  species: z.string().optional(),
  environment: z.string().optional(),
  energy_level: z.string().optional(),
  independence_level: z.string().optional(),
})

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    city,
    age,
    size,
    species,
    environment,
    energy_level,
    independence_level,
  } = querySchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    city,
    age,
    size,
    species,
    environment,
    energy_level,
    independence_level,
  })

  return reply.status(200).send({ pets })
}
