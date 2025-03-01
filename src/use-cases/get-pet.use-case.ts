import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found.error'

interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) throw new PetNotFoundError()

    return { pet }
  }
}
