import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateGymUseCase } from "@/uses-cases/gyms/create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

const gymSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    phone: z.string().optional(),
    latitude: z.number(),
    longitude: z.number()
})

export const createGymController = async (request: FastifyRequest, reply: FastifyReply) => {
    const { latitude, longitude, name, description, phone } = gymSchema.parse(request.body)

    const prismaGymsRepository = new PrismaGymsRepository()
    const createGymUseCase = new CreateGymUseCase(prismaGymsRepository)

    try {
        await createGymUseCase.execute({ name, latitude, longitude, description, phone })
    
        return reply.status(201).send()
    } catch (error) {
        return reply.status(500).send({ message: error })
    }
}