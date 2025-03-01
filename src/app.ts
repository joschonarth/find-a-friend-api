import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { ZodError } from 'zod'
import { appRoutes } from './http/routes/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
