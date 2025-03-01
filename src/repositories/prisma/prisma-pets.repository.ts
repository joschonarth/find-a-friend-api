import { prisma } from '@/lib/prisma'
import { FindAllParams, PetsRepository } from '@/repositories/pets.repository'
import { Pet, Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        species: params.species,
        environment: params.environment,
        energy_level: params.energy_level,
        independence_level: params.independence_level,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
