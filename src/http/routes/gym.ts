import type { FastifyInstance } from "fastify";
import { verifyUserRole } from "../middlewares/verify-user-role";
import { verifyJWT } from "../middlewares/verify-jwt";
import { createGymController } from "../controllers/gyms/gym";

export const gymRouter = async (app: FastifyInstance) => {

    app.addHook('onRequest', verifyJWT)

    app.post('/gyms', { preHandler: [verifyUserRole('ADMIN')]} ,createGymController)
}