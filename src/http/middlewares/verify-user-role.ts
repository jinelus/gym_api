import type { FastifyReply, FastifyRequest } from "fastify";


export const verifyUserRole = (userRole: 'ADMIN' | 'MEMBER') => {

    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role } = request.user

        if(role !== userRole) {
            return reply.status(403).send({ message: "Unauthorized" })
        }
    }
}