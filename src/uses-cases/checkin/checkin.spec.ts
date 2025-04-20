import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository"
import { CheckinUseCase } from "./checkin";
import { CheckInAlreadyExistsError } from "../error/checkin-already-exists";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

describe('Checkin use case', () => {

    let inMemoryCheckinsRepository: InMemoryCheckInsRepository
    let inMemoryGymsRepository: InMemoryGymsRepository
    let sut: CheckinUseCase

    beforeEach(() => {
        inMemoryCheckinsRepository = new InMemoryCheckInsRepository()
        inMemoryGymsRepository = new InMemoryGymsRepository()
        sut = new CheckinUseCase(inMemoryCheckinsRepository, inMemoryGymsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to checkin', async () => {

        inMemoryGymsRepository.items.push({
            id: 'gym_01',
            name: 'Power Gym',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: new Decimal(-23.5505),
            longitude: new Decimal(-46.6333),
        })
        

        const response = await sut.execute({
            userId: 'user_01',
            gymId: 'gym_01'
        })

        expect(response).toEqual(expect.objectContaining({
            checkin: expect.objectContaining({
                id: expect.any(String)
            })
        }))
    })

    it('should be able to checkin twice in the same day', async () => {

        inMemoryGymsRepository.items.push({
            id: 'gym_01',
            name: 'Power Gym',
            description: 'A gym for powerlifters',
            phone: '123456789',
            latitude: new Decimal(-23.5505),
            longitude: new Decimal(-46.6333),
        })

        vi.setSystemTime(new Date(2025, 3, 19, 12, 0, 0))

        await sut.execute({
            userId: 'user_01',
            gymId: 'gym_01'
        })

        vi.setSystemTime(new Date(2025, 3, 19, 13, 0, 1))

        await expect(() => (
            sut.execute({
                userId: 'user_01',
                gymId: 'gym_01'
            })
        )).rejects.toBeInstanceOf(CheckInAlreadyExistsError)     
    })
})