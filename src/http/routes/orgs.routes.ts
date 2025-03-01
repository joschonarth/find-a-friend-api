import { FastifyInstance } from 'fastify'

import { createOrgController } from '../controllers/orgs/create-org.controller'
import { authenticateOrgController } from '../controllers/orgs/authenticate-org.controller'
import { fetchNearbyOrgsController } from '../controllers/orgs/fetch-nearby-orgs.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/orgs/auth', authenticateOrgController)
  app.get('/orgs/nearby', fetchNearbyOrgsController)
}
