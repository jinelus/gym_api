import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";
import { FetchAllCheckins } from "./fetch-all-checkins";

describe('Fetch all checkins use case', () => {

    let inMemoryCheckinsRepository: InMemoryCheckInsRepository
    let sut: FetchAllCheckins

    beforeEach(() => {
        inMemoryCheckinsRepository = new InMemoryCheckInsRepository()
        sut = new FetchAllCheckins(inMemoryCheckinsRepository)

    })


    it('should be able to checkin', async () => {

        await inMemoryCheckinsRepository.create('user_01', 'gym_01')
        await inMemoryCheckinsRepository.create('user_01', 'gym_02')

        const response = await sut.execute({
            userId: 'user_01',
        })

        expect(response.checkins).toHaveLength(2)
        expect(response.checkins).toEqual([
            expect.objectContaining({ gymId: 'gym_01' }),
            expect.objectContaining({ gymId: 'gym_02' }),
        ])
    })

    it('should be able to fetch paginated checkins', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryCheckinsRepository.create(`user_01`, `gym_${i}`)
        }

        const response = await sut.execute({
            userId: 'user_01',
            page: 2,
        })

        expect(response.checkins).toHaveLength(2)
    })

})