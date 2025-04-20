import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateGymUseCase } from "@/uses-cases/gyms/create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchGymsByNameUseCase } from "@/uses-cases/gyms/fetch-gyms-by-name";

const gymSchema = z.object({
    query: z.string(),
    page: z.coerce.number().default(1),
})

export const fetchGymsByNameController = async (request: FastifyRequest, reply: FastifyReply) => {
    const { page, query } = gymSchema.parse(request.body)

    const prismaGymsRepository = new PrismaGymsRepository()
    const fetchGymsByNameUseCase = new FetchGymsByNameUseCase(prismaGymsRepository)

    try {
        const gyms = await fetchGymsByNameUseCase.execute({ query, page })
        
        return reply.status(200).send(gyms)
    } catch (error) {
        return reply.status(500).send({ message: error })
    }
}