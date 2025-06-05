import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function alocacoesRoutes(app: FastifyInstance) {

  app.addHook('onRequest', (request, reply, done) => {
    reply.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    done()
  })

  app.get('/allocations', async () => {
    return prisma.alocacao.findMany({
      include: {
        cliente: true,
        ativo: true
      }
    })
  })

  app.post('/allocations', async (request, reply) => {
    const schema = z.object({
      clienteId: z.number(),
      ativoId: z.number(),
      quantidade: z.number()
    })
    const data = schema.parse(request.body)
    const alocacao = await prisma.alocacao.create({ data })
    return reply.code(201).send(alocacao)
  })

  app.delete('/allocations/:id', async (request, reply) => {
    const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
    await prisma.alocacao.delete({ where: { id } })
    return reply.code(204).send()
  })
}
