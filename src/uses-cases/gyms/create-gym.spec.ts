import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../error/user-already-exists-error'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

describe('Create gym use case', () => {
    let inMemoryGymsRepository: InMemoryGymsRepository
    let sut: CreateGymUseCase

    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(inMemoryGymsRepository)
    })

    it('should be able to hash password', async () => {

        const response = await sut.execute({
            name: 'Power Gym',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: -23.5505,
            longitude: -46.6333,
        })

        expect(response.gym).toEqual(inMemoryGymsRepository.items[0])
    })

})