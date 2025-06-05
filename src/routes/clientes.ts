import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { clienteSchema } from '../schemas/clienteSchema'

export async function clienteRoutes(app: FastifyInstance) {

  app.addHook('onRequest', (request, reply, done) => {
    reply.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    done()
  })

  app.options('*', (request, reply) => {
    reply.send()
  })

  app.post('/clients', async (request, reply) => {
    try {
      const data = clienteSchema.parse(request.body)
      const cliente = await prisma.cliente.create({ data })
      return reply.code(201).send(cliente)
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      reply.status(500).send({ error: 'Erro ao criar     cliente' })
    }
  });

  app.get('/clients', async (request, reply) => {
    try {
      const clients = await prisma.cliente.findMany();
      reply
        .header('Access-Control-Allow-Origin', 'http://localhost:3000')
        .send(clients);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar clientes' });
    }
  });

  app.get('/clients/:id', async (request, reply) => {
    const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
    const cliente = await prisma.cliente.findUnique({ where: { id } })
    if (!cliente) return reply.code(404).send({ msg: 'Cliente não encontrado' })
    return cliente
  })

  app.put('/clients/:id', async (request, reply) => {
    const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
    const data = clienteSchema.partial().parse(request.body)
    const updated = await prisma.cliente.update({ where: { id }, data })
    return updated
  })

  app.patch('/clients/:id/status', async (request, reply) => {
    const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
    const { status } = z.object({ status: z.string() }).parse(request.body)

    const updated = await prisma.cliente.update({
      where: { id },
      data: { status },
    })
    return updated
  })
}
