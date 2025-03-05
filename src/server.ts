import fastify from "fastify";
import { usersRouter } from "./routes/user";

const app = fastify()

app.register(usersRouter)

app.listen({
    port: 3333
})
.then(() => {
    console.log("✅ HTTP server running on http://localhost:3333")
})
.catch(() => {
    console.log("❌ Error on running server")
})