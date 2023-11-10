import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function createPrompt(app: FastifyInstance) {
  app.post('/prompts', async (req, reply) => {
    try {
      const bodySchema = z.object({
        id: z.string().nullable(),
        title: z.string(),
        template: z.string(),
      })

      const { id, title, template } = bodySchema.parse(req.body)
    } catch (error) {
      console.log('API Error: ', error)
      return reply.status(400).send({ error })
    }
  })
}
