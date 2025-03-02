import request from 'supertest'

import { app } from '@/app'
import { makeOrg } from '@/tests/factories/make-org.factory'
import { makePet } from '@/tests/factories/make-pet.factory'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/auth')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it.each([
    [{ age: 'puppyhood' }, 1],
    [{ size: 'small' }, 1],
    [{ species: 'dog' }, 1],
    [{ environment: 'indoor' }, 1],
    [{ energy_level: 'low' }, 1],
    [{ independence_level: 'low' }, 1],
  ])('should filter pets by %o', async (filter, expectedCount) => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/auth')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet(filter))

    const response = await request(app.server)
      .get('/orgs/pets')
      .query({ city: org.city, ...filter })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(expectedCount)
  })

  it('should be able to search pets by city and all filters', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server)
      .post('/orgs/auth')
      .send({ email: org.email, password: org.password })

    const pets = [
      makePet({
        age: 'puppyhood',
        size: 'small',
        energy_level: 'low',
        environment: 'indoor',
        species: 'dog',
        independence_level: 'low',
      }),
      makePet({
        age: 'young',
        size: 'medium',
        energy_level: 'medium',
        environment: 'outdoor',
        species: 'cat',
        independence_level: 'high',
      }),
      makePet({
        age: 'adult',
        size: 'large',
        energy_level: 'high',
        environment: 'indoor',
        species: 'dog',
        independence_level: 'medium',
      }),
      makePet({
        age: 'senior',
        size: 'low',
        energy_level: 'high',
        environment: 'indoor',
        species: 'rabbit',
        independence_level: 'medium',
      }),
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/orgs/pets')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    )

    let response = await request(app.server).get('/orgs/pets').query({
      city: org.city,
      age: 'puppyhood',
      size: 'small',
      energy_level: 'low',
      environment: 'indoor',
      species: 'dog',
      independence_level: 'low',
    })

    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/orgs/pets').query({
      city: org.city,
      species: 'rabbit',
    })

    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/orgs/pets').query({
      city: org.city,
      independence_level: 'medium',
    })

    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/orgs/pets')

    expect(response.status).toBe(400)
  })
})
