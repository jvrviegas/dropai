import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getAllGptModelsRoute(app: FastifyInstance) {
  app.get('/gpt-models', async () => {
    const models = await prisma.gptModel.findMany({ 
      where: {
        name: {
          contains: 'gpt'
        }
      },
      orderBy: {name: 'asc'}
    })

    return models
  })
}
