import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchGymsNearbyUseCase } from './fetch-gyms-nearby'


describe('Fetch gyms nearby use case', () => {
    let inMemoryGymsRepository: InMemoryGymsRepository
    let sut: FetchGymsNearbyUseCase

    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new FetchGymsNearbyUseCase(inMemoryGymsRepository)
    })

    it('should be able to hash password', async () => {

        await inMemoryGymsRepository.create({
            name: 'Power Gym',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: -27.646011381853505,
            longitude: -52.25755031796802,
        })

        await inMemoryGymsRepository.create({
            name: 'Power Gym 2',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: -27.64661963219459,
            longitude: -52.26132686826201,
        })

        await inMemoryGymsRepository.create({
            name: 'Power Gym 3',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: 19.726064051926475,
            longitude: -72.22416403576194,
        })

        const response = await sut.execute({
            userLatitude: 19.727147225917506,
            userLongitude: -72.22624205032177,
        })

        expect(response.gyms).toHaveLength(1)
    })

})