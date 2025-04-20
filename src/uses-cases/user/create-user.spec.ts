import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../error/user-already-exists-error'

describe('Create user use case', () => {
    let inMemoryUsersRepository: InMemoryUsersRepository
    let sut: CreateUserUseCase

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new CreateUserUseCase(inMemoryUsersRepository)
    })

    it('should be able to hash password', async () => {

        const response = await sut.execute({
            name: 'John Doe',
            email: 'a5o8o@example.com',
            password: '123456',
            gymId: 'gym_01'
        })

        const passwordHash = await compare('123456', response.user.password)

        expect(passwordHash).toBe(true)
    })
    it('should be able to create user', async () => {
        
        const response = await sut.execute({
            name: 'John Doe',
            email: 'a5o8o@example.com',
            password: '123456',
            gymId: 'gym_01'
        })

        expect(response.user).toEqual(inMemoryUsersRepository.users[0])
    })
    it('should not be able to create user with same email', async () => {
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
            name: 'Johnattan Gilbert',
            email: 'a5o8o@example.com',
            password: '123456454',
            gymId: 'gym_01'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})