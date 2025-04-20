import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteUserUseCase } from "./delete-user";

describe('Delete user use case', () => {

    let inMemoryUsersRepository: InMemoryUsersRepository
    let sut: DeleteUserUseCase

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new DeleteUserUseCase(inMemoryUsersRepository)
    })

    it('should be able to delete a user', async () => {
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

        await sut.execute({
            userId: 'user_01',
        })

        expect(inMemoryUsersRepository.users).toHaveLength(0)
    })
})