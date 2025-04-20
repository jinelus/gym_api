import { UsersRepository } from "@/repositories/interfaces/users-repository";
import type { User } from "@prisma/client";
import { RessourceNotFoundError } from "../error/ressource-not-found-error";

interface GetUserByIdUseCaseProps {
    userId: string
}

interface GetUserByIdUseCaseResponse {
    user: User
}

export class GetUserByIdUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({ userId }: GetUserByIdUseCaseProps): Promise<GetUserByIdUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new RessourceNotFoundError()
        }

        return {
            user
        }
    }
}