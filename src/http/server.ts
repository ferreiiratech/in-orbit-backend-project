import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { env } from "../env"
import { createGoal } from "../use-cases/create-goal"
import z from "zod"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const validatorCompilerBody = {
  schema: {
    body: z.object({
      title: z.string(),
      desiredWeeklyFrequency: z.number().int().min(1).max(7),
    }),
  },
}

app.post("/goals", validatorCompilerBody, async (req, res) => {
  const { title, desiredWeeklyFrequency } = req.body

  await createGoal({
    title,
    desiredWeeklyFrequency,
  })
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`listening on port ${env.PORT}`)
  })
