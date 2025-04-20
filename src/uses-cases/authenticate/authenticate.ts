import { compare } from 'bcryptjs'
import type { UsersRepository } from "../../repositories/interfaces/users-repository"
import type { User } from '@prisma/client'
import { CredentialError } from '../error/credential-error'

interface AuthenticateProps {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {

    constructor(private userRepository: UsersRepository) {}

    async execute({ email, password }: AuthenticateProps): Promise<AuthenticateUseCaseResponse> {

        const user = await this.userRepository.findUserByEmail(email)

        if(!user) {
            throw new CredentialError()
        }
        
        const isPasswordCorrect = await compare(password, user.password)

        if(!isPasswordCorrect) {
            throw new CredentialError()
        }

        return { user }
    }

}