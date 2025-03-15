import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository"
import { GetUserByIdUseCase } from "../../../uses-cases/get-user-by-id"
import { RessourceNotFoundError } from "../../../uses-cases/error/ressource-not-found-error"

const getUserSchema = z.object({
    userId: z.string()
})

export const getUserByIdController = async (request: FastifyRequest, reply: FastifyReply) => {

    const { userId } = getUserSchema.parse(request.params)

    const prismaUsersRepository = new PrismaUsersRepository()

    const getUserByIdUseCase = new GetUserByIdUseCase(prismaUsersRepository)

    try {
        const user = await getUserByIdUseCase.execute({ userId})

        return reply.status(200).send(user)
    }catch (error) {
        if(error instanceof RessourceNotFoundError){
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: error })
    }
}