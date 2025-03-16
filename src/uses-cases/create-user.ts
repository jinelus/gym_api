import { hash } from 'bcryptjs'
import type { UsersRepository } from "../repositories/interfaces/users-repository"
import { UserAlreadyExistsError } from './error/user-already-exists-error'
import type { User } from '@prisma/client'

interface CreateUserProps {
    name: string
    email: string
    password: string
    gymId: string
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase {

    constructor(private userRepository: UsersRepository) {}

    async execute({ name, email, password, gymId }: CreateUserProps): Promise<CreateUserUseCaseResponse> {

        const user = await this.userRepository.findUserByEmail(email)

        if(user) {
            throw new UserAlreadyExistsError()
        }

        const password_hash = await hash(password, 10)

        const userCreated = await this.userRepository.create({ name, email, password: password_hash, gymId })

        return {
            user: userCreated
        }
    }

}