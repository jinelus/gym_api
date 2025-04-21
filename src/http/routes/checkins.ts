import type { FastifyInstance } from "fastify";
import { verifyUserRole } from "../middlewares/verify-user-role";
import { verifyJWT } from "../middlewares/verify-jwt";
import { checkinController } from "../controllers/checkins/checkin";
import { validateCheckinController } from "../controllers/checkins/validate-checkin";

export const checkinRouter = async (app: FastifyInstance) => {

    app.addHook('onRequest', verifyJWT)

    app.post('/checkins/:gymId', checkinController)
    app.post('/checkins/validate', { onRequest: [verifyUserRole('ADMIN')] }, validateCheckinController)
}