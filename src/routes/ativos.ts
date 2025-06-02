import { FastifyInstance } from 'fastify'

export async function ativosRoutes(app: FastifyInstance) {
  app.get('/ativos', async () => {
    return [
      { nome: 'Ação XYZ', valor: 123.45 },
      { nome: 'Fundo ABC', valor: 456.78 }
    ]
  })
}
