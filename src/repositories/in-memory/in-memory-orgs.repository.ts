import { OrgsRepository } from '@/repositories/orgs.repository'

import { Org, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import crypto from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string): Promise<Org | null> {
    return this.items.find((org) => org.email === email) || null
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
