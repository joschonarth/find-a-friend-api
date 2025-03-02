import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  owner: z.string(),
  email: z.string(),
  whatsapp: z.string(),
  password: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    await createOrgUseCase.execute(body)

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
