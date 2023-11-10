import { PrismaClient } from '@prisma/client'
import { openai } from '../src/lib/openai'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()
  await prisma.gptModel.deleteMany()

  const modelsPage = await openai.models.list();
  const models = modelsPage.data;

  const createModelsPromises = models.map(async model => await prisma.gptModel.create({data: {name: model.id}}))

  await Promise.allSettled(createModelsPromises)

  await prisma.prompt.create({
    data: {
      title: 'Copy do produto',
      template: `

Seja um expert em copy de produtos, siga as seguintes instruções e me dê a copy de um {produto}. Nas instruções vão ter alguns textos prévios sobre tópico para usar como base:
{Problema

Agitação do Problema: 
Trazer para a realidade
Comparação do Antes x Depois
Comparação Com ou Sem

Promessa
	
Apresentação da Solução
Citação dos Benefícios ou Transformação
Distanciamento das Soluções Tradicionais


Causa

Por que o problema existe?
Como se deu a sua solução?

Prova

Provas Sociais
Dados ou Estatísticas
Pontos de Ancoragem 
}
Seja persuasivo, mas sem exagero. Use markdown, comece com um headline que chame a atenção do cliente, evidencie o problema e gere interesse pra que ele continue a ler a descrição. Depois apresente o problema que é enfrentado por não ter o produto, faça comparações de antes e depois. Depois apresente a solução e quais os seus benefícios, apontando qual a inovação e o porquê de ser necessário adquirir o produto. Ao final, indique o que vem junto com o produto.
Use palavras chamativas e que cativam a atenção de quem está lendo.
Seu papel é gerar três títulos e uma descrição para um produto de um ecommerce.

Abaixo você receberá uma descrição como exemplo, use como base para gerar a resposta.
Abaixo você também receberá uma lista de tópicos, use essa lista como referência para os assuntos a serem gerados.

Você deve gerar 3 opções de headlines.
As headlines devem ser chamativas e atrativas para maximizar as vendas.

Retorne os três títulos e a descrição em formato de lista como no exemplo abaixo:
'''
- Título 1
- Título 2
- Título 3

- Descrição
'''
`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
      title: 'Script para criativo',
      template: `Seu papel é gerar uma descrição sucinta para um vídeo do YouTube.
  
Abaixo você receberá uma transcrição desse vídeo, use essa transcrição para gerar a descrição.

A descrição deve possuir no máximo 80 palavras em primeira pessoa contendo os pontos principais do vídeo.

Use palavras chamativas e que cativam a atenção de quem está lendo.

Além disso, no final da descrição inclua uma lista de 3 até 10 hashtags em letra minúscula contendo palavras-chave do vídeo.

O retorno deve seguir o seguinte formato:
'''
Descrição.

#hashtag1 #hashtag2 #hashtag3 ...
'''

Transcrição:
'''
{transcription}
'''`.trim()
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
