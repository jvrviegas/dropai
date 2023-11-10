import { FastifyInstance } from "fastify";
import { z } from "zod";
import { streamToResponse, OpenAIStream } from 'ai'
import { openai } from "../lib/openai";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (req, reply) => {
    try {
      
    const bodySchema = z.object({
      prompt: z.string(),
      gptModel: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    const { prompt, temperature, gptModel } = bodySchema.parse(req.body)

    const response = await openai.chat.completions.create({
      model: gptModel,
      temperature,
      messages: [
        { role: 'user', content: prompt }
      ],
      stream: true,
    })

    const stream = OpenAIStream(response)

    streamToResponse(stream, reply.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      }
    })

    } catch (error) {
      
      console.log("API Error: ", error)
      return reply.status(400).send({error})
    }
  })
}
