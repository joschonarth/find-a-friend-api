import request from 'supertest'

import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'

describe('Fetch Nearby Orgs (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby orgs', async () => {
    const nearbyOrg = makeOrg({
      latitude: -20.7400886,
      longitude: -47.753894,
    })

    const farOrg = makeOrg({
      latitude: -20.5933529,
      longitude: -47.588983,
    })

    await request(app.server).post('/orgs').send(nearbyOrg).expect(201)
    await request(app.server).post('/orgs').send(farOrg).expect(201)

    const response = await request(app.server)
      .get('/orgs/nearby')
      .query({ latitude: nearbyOrg.latitude, longitude: nearbyOrg.longitude })
      .expect(200)

    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs[0].name).toEqual(nearbyOrg.name)
  })
})
