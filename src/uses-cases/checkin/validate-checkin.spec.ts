import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";
import { ValidateCheckinUseCase } from "./validate-checkin";
import { InvalidateCheckinError } from "../error/invalidate-checkin-error";
import { AlreadyValidateCheckinError } from "../error/already-validate-checkin-error";

describe('ValidateCheckin use case', () => {

    let inMemoryCheckinsRepository: InMemoryCheckInsRepository
    let sut: ValidateCheckinUseCase

    beforeEach(() => {
        inMemoryCheckinsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckinUseCase(inMemoryCheckinsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to validate a checkin', async () => {
        
        vi.setSystemTime(new Date(2025, 3, 19, 12, 0, 0))

        inMemoryCheckinsRepository.items.push({
            id: 'checkin_01',
            userId: 'user_01',
            gymId: 'gym_01',
            createdAt: new Date(),
            validateAt: null,
        })

        vi.setSystemTime(new Date(2025, 3, 19, 12, 15, 0))
        

        const response = await sut.execute({
            checkinId: 'checkin_01',
        })

        expect(response.checkin.validateAt).toEqual(expect.any(Date))
    })

    it('should not be able to validate a checkin after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2025, 3, 19, 12, 0, 0))

        inMemoryCheckinsRepository.items.push({
            id: 'checkin_01',
            userId: 'user_01',
            gymId: 'gym_01',
            createdAt: new Date(),
            validateAt: null,
        })

        vi.setSystemTime(new Date(2025, 3, 19, 12, 25, 0))

        await expect(() => {
            return sut.execute({
                checkinId: 'checkin_01',
            })
        }).rejects.toBeInstanceOf(InvalidateCheckinError)
    })

    it('should not be able to validate a checkin that is already validated', async () => {
        vi.setSystemTime(new Date(2025, 3, 19, 12, 0, 0))

        inMemoryCheckinsRepository.items.push({
            id: 'checkin_01',
            userId: 'user_01',
            gymId: 'gym_01',
            createdAt: new Date(),
            validateAt: new Date(),

        })

        vi.setSystemTime(new Date(2025, 3, 19, 12, 10, 0))

        await expect(() => {
            return sut.execute({
                checkinId: 'checkin_01',
            })
        }).rejects.toBeInstanceOf(AlreadyValidateCheckinError)
    })

})