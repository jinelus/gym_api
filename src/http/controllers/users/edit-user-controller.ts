import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/uses-cases/error/user-already-exists-error";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { EditUserUseCase } from "@/uses-cases/edit-user";

const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    gymId: z.string()
})

export const editUserController = async (request: FastifyRequest, reply: FastifyReply) => {

        const id = request.user.sub

        const { name, email, gymId } = UserSchema.parse(request.body)

        const prismaUsersRepository = new PrismaUsersRepository()

        const editUserUseCase = new EditUserUseCase(prismaUsersRepository)

        try {
            await editUserUseCase.execute({ name, email, gymId, userId: id })

            return reply.status(201).send()
        }catch (error) {

            if(error instanceof UserAlreadyExistsError){
                return reply.status(409).send({ message: error.message })
            }

            return reply.status(500).send({ message: error })
        }

}
