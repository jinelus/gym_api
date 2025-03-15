import type { UsersRepository } from "../repositories/interfaces/users-repository";
import { RessourceNotFoundError } from "./error/ressource-not-found-error";

interface GetUserByIdUseCaseProps {
    userId: string
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({ userId }: GetUserByIdUseCaseProps) {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new RessourceNotFoundError()
        }

        return user
    }
}