import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'
import { getAllGptModelsRoute } from './routes/get-all-gpt-models'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPromptsRoute)
app.register(getAllGptModelsRoute)
app.register(generateAiCompletionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
