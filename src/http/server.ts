import fastify from "fastify"

const app = fastify()

const PORT = 3000

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`listening on port ${PORT}`)
  })
