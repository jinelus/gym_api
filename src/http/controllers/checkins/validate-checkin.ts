import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { RessourceNotFoundError } from "@/uses-cases/error/ressource-not-found-error";
import { ValidateCheckinUseCase } from "@/uses-cases/checkin/validate-checkin";
import { AlreadyValidateCheckinError } from "@/uses-cases/error/already-validate-checkin-error";
import { InvalidateCheckinError } from "@/uses-cases/error/invalidate-checkin-error";


const checkinsBodySchema = z.object({
    checkinId: z.string(),
})

export const validateCheckinController = async (request: FastifyRequest, reply: FastifyReply) => {


    const { checkinId } = checkinsBodySchema.parse(request.body)

    const prismaCheckinRepository = new PrismaCheckInsRepository()
    const validateCheckinUseCase = new ValidateCheckinUseCase(prismaCheckinRepository)

    try {
        await validateCheckinUseCase.execute({ 
            checkinId,
        })
    
        return reply.status(204).send()
    } catch (error) {

        if(error instanceof RessourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }

        if(error instanceof AlreadyValidateCheckinError) {
            return reply.status(409).send({ message: error.message })
        }

        if(error instanceof InvalidateCheckinError) {
            return reply.status(400).send({ message: error.message })
        }

        return reply.status(500).send({ message: error })
    }
}