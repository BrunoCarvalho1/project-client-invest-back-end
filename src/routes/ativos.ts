  import { FastifyInstance } from 'fastify'
  import { z } from 'zod'
  import { prisma } from '../lib/prisma'

  export async function ativosRoutes(app: FastifyInstance) {

    app.addHook('onRequest', (request, reply, done) => {
      reply.header('Access-Control-Allow-Origin', 'http://localhost:3000')
      reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      done()
    })

    app.post('/assets', async (request, reply) => {
      const schema = z.object({
        nome: z.string(),
        valor: z.number(),
      })
      const data = schema.parse(request.body)
      const ativo = await prisma.ativo.create({ data })
      return reply.code(201).send(ativo)
    })

    app.get('/assets', async () => {
      return prisma.ativo.findMany()
    })

    app.get('/assets/:id', async (request, reply) => {
      const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
      const ativo = await prisma.ativo.findUnique({ where: { id } })
      if (!ativo) return reply.code(404).send({ msg: 'Ativo não encontrado' })
      return ativo
    })

    app.put('/assets/:id', async (request, reply) => {
      const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
      const data = z.object({
        nome: z.string().optional(),
        valor: z.number().optional(),
      }).parse(request.body)

      const ativo = await prisma.ativo.update({ where: { id }, data })
      return ativo
    })
  }
