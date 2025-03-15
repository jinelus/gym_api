import type { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/users/create-user-controller";
import { getUserByIdController } from "../controllers/users/get-user-by-id-controller";


export async function usersRouter(app: FastifyInstance) {

    app.post('/users', createUserController)
    app.get('/users/:userId', getUserByIdController)
    
}