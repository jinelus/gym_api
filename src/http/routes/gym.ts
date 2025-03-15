import type { FastifyInstance } from "fastify";
import { gymController } from "../controllers/gyms/gym";

export const gymRouter = async (app: FastifyInstance) => {
    app.post('/gyms', gymController)
}