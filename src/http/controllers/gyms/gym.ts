import { PrismaClient } from "@prisma/client";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

const gymSchema = z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number()
})

export const gymController = async (request: FastifyRequest, reply: FastifyReply) => {
    const { latitude, longitude, name} = gymSchema.parse(request.body)

    await prisma.gym.create({
        data: {
            name,
            latitude,
            longitude
        }
    })

    return reply.status(201).send()
}