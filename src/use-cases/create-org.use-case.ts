import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org } from '@prisma/client'
import { hash } from 'bcrypt'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'

interface CreateOrgUseCaseRequest {
  name: string
  owner: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    owner,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const existingOrg = await this.orgsRepository.findByEmail(email)

    if (existingOrg) throw new OrgAlreadyExistsError()

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      owner,
      email,
      whatsapp,
      password: passwordHash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return { org }
  }
}
