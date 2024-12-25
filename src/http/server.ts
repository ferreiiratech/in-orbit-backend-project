import fastify from "fastify"
import { env } from "../env"

const app = fastify()

const PORT = env.PORT

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`listening on port ${PORT}`)
  })
