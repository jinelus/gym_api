import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/interfaces/users-repository";
import { RessourceNotFoundError } from "./error/ressource-not-found-error";

export interface EditUserUseCaseProps {
    userId: string
    name: string
    email: string
    gymId: string
}

interface EditUserUseCaseResponse {
    user: User
}

export class EditUserUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({ userId, email, gymId, name }: EditUserUseCaseProps): Promise<EditUserUseCaseResponse> {
        const userFound = await this.usersRepository.findById(userId)

        if(!userFound) {
            throw new RessourceNotFoundError()
        }

        const user = await this.usersRepository.update({ userId, email, gymId, name })

        return {
            user
        }
    }
}