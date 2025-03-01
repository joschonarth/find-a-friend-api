import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  age?: string
  size?: string
  species?: string
  environment?: string
  energy_level?: string
  independence_level?: string
  org_id?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    species:
      overwrite?.species ??
      faker.helpers.arrayElement(['dog', 'cat', 'bird', 'rabbit']),
    environment: faker.helpers.arrayElement(['indoor', 'outdoor']),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    independence_level:
      overwrite?.independence_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    org_id: overwrite?.org_id ?? crypto.randomUUID(),
  }
}
