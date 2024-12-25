import z from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333).transform(port => port === 0 ? 3333 : port),
})

export const env = envSchema.parse(process.env)
