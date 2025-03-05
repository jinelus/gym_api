import { PrismaClient } from "@prisma/client";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    gymId: z.string()
})

export async function usersRouter(app: FastifyInstance) {

    app.post('/users', async (request, reply) => {

        const prisma = new PrismaClient()

        const { name, email, password, gymId } = UserSchema.parse(request.body)

        await prisma.user.create({
            data: {
                name,
                email,
                password,
                gymId
            }
        })

        return reply.status(201).send()
    })
    
}