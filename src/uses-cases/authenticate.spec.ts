import { beforeEach, describe, expect, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './error/user-already-exists-error'
import { AuthenticateUseCase } from './authenticate'
import { CredentialError } from './error/credential-error'

describe('Authenticate use case', () => {
    let inMemoryUsersRepository: InMemoryUsersRepository
    let sut: AuthenticateUseCase

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(inMemoryUsersRepository)
    })

    it('should be ablhe to authenticate', async () => {

        const hashPassword = await hash('123456', 10)

        inMemoryUsersRepository.users.push({
            id: 'user_01',
            name: 'John Doe',
            email: 'a5o8o@example.com',
            password: hashPassword,
            gymId: 'gym_01',
            role: 'MEMBER',
            createdAt: new Date(),
            updatedAt: null,
        })

        const response = await sut.execute({
            email: 'a5o8o@example.com',
            password: '123456'
        })

        expect(response.user).toEqual(inMemoryUsersRepository.users[0])
    })

    it('should not be able to authenticate with wrong password', async () => {
        const hashPassword = await hash('123456', 10)

        inMemoryUsersRepository.users.push({
            id: 'user_01',
            name: 'John Doe',
            email: 'a5o8o@example.com',
            password: hashPassword,
            gymId: 'gym_01',
            role: 'MEMBER',
            createdAt: new Date(),
            updatedAt: null,
        })

        await expect(() => sut.execute({
            email: 'a5o8o@example.com',
            password: 'invalid-password'
        })).rejects.toBeInstanceOf(CredentialError)
    })
})