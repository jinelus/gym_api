import { hash } from 'bcryptjs'
import type { UsersRepository } from "../repositories/interfaces/users-repository"
import { UserAlreadyExistsError } from './error/user-already-exists-error'

interface CreateUserProps {
    name: string
    email: string
    password: string
    gymId: string
}

export class CreateUserUseCase {

    constructor(private userRepository: UsersRepository) {}

    async execute({ name, email, password, gymId }: CreateUserProps) {

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