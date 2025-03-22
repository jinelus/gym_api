import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RessourceNotFoundError } from "./error/ressource-not-found-error";
import { EditUserUseCase } from "./edit-user";

describe('Edit user use case', () => {

    let inMemoryUsersRepository: InMemoryUsersRepository
    let sut: EditUserUseCase

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new EditUserUseCase(inMemoryUsersRepository)
    })

    it('should be able to edit a user', async () => {
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
            userId: 'user_01',
            email: 'aaab@gmail.com',
            gymId: 'gym_01',
            name: 'Johnattan Gilbert',
        })

        expect(response).toEqual({
            user: expect.objectContaining({
                email: 'aaab@gmail.com',
                name: 'Johnattan Gilbert',
            })
        })
    })
})