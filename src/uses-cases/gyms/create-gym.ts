import { hash } from 'bcryptjs'
import type { Gym } from '@prisma/client'
import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { UserAlreadyExistsError } from '../error/user-already-exists-error'
import { GymsRepository } from '@/repositories/interfaces/gyms-repository'

interface CreateGymUseCaseProps {
    name: string
    description?: string
    phone?: string
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase{

    constructor(private gymsRepository: GymsRepository) {}

    async execute({ name, latitude, longitude, description, phone }: CreateGymUseCaseProps): Promise<CreateGymUseCaseResponse> {
        
        const gym = await this.gymsRepository.create({
            name,
            description: description || '',
            phone: phone || '',
            latitude,
            longitude
        })

        return { gym }
    
    }

}