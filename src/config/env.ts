import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    DATABASE_URL: z.string(),
    SECRET_JWT_KEY: z.string(),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.log(" Invalid environment variables", _env.error.format())

    throw new Error("Invalid environment variables")
}

export const env = _env.data