import type { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/interfaces/gyms-repository'

interface FetchGymsNearbyUseCaseProps {
    userLatitude: number
    userLongitude: number
    page?: number
}

interface FetchGymsNearbyUseCaseResponse {
    gyms: Gym[]
}

export class FetchGymsNearbyUseCase{

    constructor(private gymsRepository: GymsRepository) {}

    async execute({ userLatitude, userLongitude, page }: FetchGymsNearbyUseCaseProps): Promise<FetchGymsNearbyUseCaseResponse> {
        
        const gyms = await this.gymsRepository.findManyNearby({
            latitude: userLatitude,
            longitude: userLongitude,
            page: page || 1,
        })

        return { gyms }
    }

}