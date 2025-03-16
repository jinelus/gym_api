import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserByIdUseCase } from "./get-user-by-id";
import { RessourceNotFoundError } from "./error/ressource-not-found-error";

describe('Get user by id use case', () => {

    let inMemoryUsersRepository: InMemoryUsersRepository
    let sut: GetUserByIdUseCase

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new GetUserByIdUseCase(inMemoryUsersRepository)
    })

    it('should be able to get a user by id', async () => {
        inMemoryUsersRepository.users.push({
            id: 'user_01',
            name: 'John Doe',
            email: 'a5o8o@example.com',
            password: '123456',
            gymId: 'gym_01',
            role: 'MEMBER',
            createdAt: new Date(),
            updatedAt: null,
        })

        const response = await sut.execute({
            userId: 'user_01'
        })

        expect(response.user).toEqual(inMemoryUsersRepository.users[0])
    })

    it('should not be able to get a user with a inexistent id', async () => {
        inMemoryUsersRepository.users.push({
            id: 'user_01',
            name: 'John Doe',
            email: 'a5o8o@example.com',
            password: '123456',
            gymId: 'gym_01',
            role: 'MEMBER',
            createdAt: new Date(),
            updatedAt: null,
        })

        await expect(() => sut.execute({
            userId: 'inextistent_id'
        })).rejects.toBeInstanceOf(RessourceNotFoundError)
    })
});