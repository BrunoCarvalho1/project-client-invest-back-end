import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../server'
import { clienteSchema } from '../schemas/clienteSchema'

export async function clienteRoutes(app: FastifyInstance) {
  app.post('/clientes', async (request, reply) => {
    const data = clienteSchema.parse(request.body)
    const cliente = await prisma.cliente.create({ data })
    return reply.code(201).send(cliente)
  })

  app.get('/clientes', async () => {
    return prisma.cliente.findMany()
  })

  app.get('/clientes/:id', async (request, reply) => {
    const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
    const cliente = await prisma.cliente.findUnique({ where: { id } })
    if (!cliente) return reply.code(404).send({ msg: 'Cliente não encontrado' })
    return cliente
  })

  app.put('/clientes/:id', async (request, reply) => {
    const { id } = z.object({ id: z.coerce.number() }).parse(request.params)
    const data = clienteSchema.partial().parse(request.body)
    const updated = await prisma.cliente.update({ where: { id }, data })
    return updated
  })
}
