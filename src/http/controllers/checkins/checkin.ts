import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckinUseCase } from "@/uses-cases/checkin/checkin";
import { z } from "zod";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { RessourceNotFoundError } from "@/uses-cases/error/ressource-not-found-error";
import { CheckInAlreadyExistsError } from "@/uses-cases/error/checkin-already-exists";
import { TooFarDistanceError } from "@/uses-cases/error/too-far-distance-error";

const checkinParamsSchema = z.object({
    gymId: z.string()
})

const checkinsBodySchema = z.object({
    latitude: z.number(),
    longitude: z.number()
})

export const checkinController = async (request: FastifyRequest, reply: FastifyReply) => {

    const { gymId } = checkinParamsSchema.parse(request.params)

    const { latitude, longitude} = checkinsBodySchema.parse(request.body)

    const { sub: userId } = request.user

    const prismaCheckinRepository = new PrismaCheckInsRepository()
    const prismaGymsRepository = new PrismaGymsRepository()
    const checkinUseCase = new CheckinUseCase(prismaCheckinRepository, prismaGymsRepository)

    try {
        await checkinUseCase.execute({ 
            gymId,
            userId,
            userLatitude: latitude,
            userLongitude: longitude
        })
    
        return reply.status(201).send()
    } catch (error) {

        if(error instanceof RessourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        if(error instanceof CheckInAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }

        if(error instanceof TooFarDistanceError) {
            return reply.status(422).send({ message: error.message })
        }

        return reply.status(500).send({ message: error })
    }
}