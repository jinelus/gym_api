import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchGymsByNameUseCase } from './fetch-gyms-by-name'


describe('Create gym use case', () => {
    let inMemoryGymsRepository: InMemoryGymsRepository
    let sut: FetchGymsByNameUseCase

    beforeEach(() => {
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new FetchGymsByNameUseCase(inMemoryGymsRepository)
    })

    it('should be able to hash password', async () => {

        await inMemoryGymsRepository.create({
            name: 'Power Gym',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: -23.5505,
            longitude: -46.6333,
        })

        await inMemoryGymsRepository.create({
            name: 'Power Gym 2',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: -23.5505,
            longitude: -46.6333,
        })

        const response = await sut.execute({
            query: 'Power'
        })

        expect(response.gyms).toHaveLength(2)
    })

    it('should be able to fetch paginated gyms by name', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryGymsRepository.create({
                name: `Power Gym ${i}`,
                description: 'A gym for powerlifters',
                phone: '123456789',
                latitude: -23.5505,
                longitude: -46.6333,
            })
        }

        const response = await sut.execute({
            query: 'Power',
            page: 2,
        })

        expect(response.gyms).toHaveLength(2)
    })

})