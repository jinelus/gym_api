import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/uses-cases/error/user-already-exists-error";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "@/uses-cases/user/create-user";

const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    gymId: z.string()
})

export const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {

        const { name, email, password, gymId } = UserSchema.parse(request.body)

        const prismaUsersRepository = new PrismaUsersRepository()

        const createUserUseCase = new CreateUserUseCase(prismaUsersRepository)

        try {
            await createUserUseCase.execute({ name, email, password, gymId })

            return reply.status(201).send()
        }catch (error) {

            if(error instanceof UserAlreadyExistsError){
                return reply.status(409).send({ message: error.message })
            }

            return reply.status(500).send({ message: error })
        }

}
