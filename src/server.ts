import fastify from "fastify";
import { usersRoutes } from "./http/routes/user";
import fastifyJwt from "@fastify/jwt";
import { authenticateRoutes } from "./http/routes/authenticate.route";
import fastifyCookie from "@fastify/cookie";
import { env } from "./config/env";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.SECRET_JWT_KEY,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: { expiresIn: '10m' }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(authenticateRoutes)

app.listen({
    port: env.PORT
})
.then(() => {
    console.log("✅ HTTP server running on http://localhost:3333")
})
.catch(() => {
    console.log("❌ Error on running server")
})