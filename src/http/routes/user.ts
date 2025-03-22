import type { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/users/create-user-controller";
import { getUserByIdController } from "../controllers/users/get-user-by-id-controller";
import { editUserController } from "../controllers/users/edit-user-controller";
import { verifyJWT } from "../middlewares/verify-jwt";


export async function usersRoutes(app: FastifyInstance) {

    app.post('/users', createUserController)
    app.get('/users/:userId', getUserByIdController)

    app.put('/users', { onRequest: [verifyJWT] } ,editUserController)
    
}