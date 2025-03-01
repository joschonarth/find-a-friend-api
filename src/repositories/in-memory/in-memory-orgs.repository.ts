import {
  FindManyNearbyParams,
  OrgsRepository,
} from '@/repositories/orgs.repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import crypto from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string): Promise<Org | null> {
    return this.items.find((org) => org.id === id) || null
  }

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const MAX_DISTANCE_KM = 10

    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < MAX_DISTANCE_KM
    })
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }
}
