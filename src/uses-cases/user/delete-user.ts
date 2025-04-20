import { UsersRepository } from "@/repositories/interfaces/users-repository"
import { RessourceNotFoundError } from "../error/ressource-not-found-error"

export interface DeleteUserUseCaseProps {
    userId: string
}


export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({ userId }: DeleteUserUseCaseProps) {
        const userFound = await this.usersRepository.findById(userId)

        if(!userFound) {
            throw new RessourceNotFoundError()
        }

        await this.usersRepository.delete(userId)
    }
}