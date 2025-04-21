import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateGymUseCase } from "@/uses-cases/gyms/create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchGymsNearbyUseCase } from "@/uses-cases/gyms/fetch-gyms-nearby";

const fetchGymNearbyBodySchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
})

const fetchGymsNearbyQuerySchema = z.object({
    page: z.coerce.number().default(1),
})

export const fetchGymsNearbyController = async (request: FastifyRequest, reply: FastifyReply) => {
    const { latitude, longitude } = fetchGymNearbyBodySchema.parse(request.body)

    const { page } = fetchGymsNearbyQuerySchema.parse(request.query)

    const prismaGymsRepository = new PrismaGymsRepository()
    const fetchGymsNearbyUseCase = new FetchGymsNearbyUseCase(prismaGymsRepository)

    try {
        const gyms = await fetchGymsNearbyUseCase.execute({ 
            userLatitude: latitude,
            userLongitude: longitude,
            page,
         })
        
        return reply.status(200).send(gyms)
    } catch (error) {
        return reply.status(500).send({ message: error })
    }
}