import Fastify from 'fastify'
import dotenv from 'dotenv'
import { clienteRoutes } from './routes/clientes'
import { ativosRoutes } from './routes/ativos'
import { alocacoesRoutes } from './routes/alocacoes'

dotenv.config()

async function start() {
  const app = Fastify({ logger: true })

  app.register(clienteRoutes)
  app.register(ativosRoutes)
  app.register(alocacoesRoutes)

  try {
    await app.listen({ port: 3333 })
    console.log('🚀 Servidor rodando na porta 3333')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
