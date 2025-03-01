import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password?: string
  latitude?: number
  longitude?: number
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.company.name(),
    owner: faker.person.fullName(),
    email: faker.internet.email(),
    whatsapp: faker.phone.number(),
    password: overwrite?.password ?? faker.internet.password(),

    cep: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),

    latitude: overwrite?.latitude ?? faker.location.latitude(),
    longitude: overwrite?.longitude ?? faker.location.longitude(),
  }
}
