import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/uses-cases/error/user-already-exists-error";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/uses-cases/authenticate";

const UserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const authenticateController = async (request: FastifyRequest, reply: FastifyReply) => {

        const { email, password } = UserSchema.parse(request.body)

        const prismaUsersRepository = new PrismaUsersRepository()

        const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

        try {
            const { user } = await authenticateUseCase.execute({ email, password })

            const token = await reply.jwtSign({}, {
                sign: {
                    sub: user.id,
                }
            })

            const refreshToken = await reply.jwtSign({}, {
                sign: {
                    sub: user.id,
                    expiresIn: '1d'
                }
            })

            return reply.setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            }).status(201).send({ token })
            
        }catch (error) {

            if(error instanceof UserAlreadyExistsError){
                return reply.status(409).send({ message: error.message })
            }

            return reply.status(500).send({ message: error })
        }

}
