import type { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/interfaces/gyms-repository'

interface FetchGymsByNameUseCaseProps {
    query: string
    page?: number
}

interface FetchGymsByNameUseCaseResponse {
    gyms: Gym[]
}

export class FetchGymsByNameUseCase{

    constructor(private gymsRepository: GymsRepository) {}

    async execute({ page = 1, query }: FetchGymsByNameUseCaseProps): Promise<FetchGymsByNameUseCaseResponse> {
        
        const gyms = await this.gymsRepository.findByName(query, page)

        return { gyms }
    }

}