import { makeFetchNearbyOrgsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

export async function fetchNearbyOrgsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { latitude, longitude } = querySchema.parse(request.query)

  const fetchNearbyUseCase = makeFetchNearbyOrgsUseCase()

  const { orgs } = await fetchNearbyUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ orgs })
}
