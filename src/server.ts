import Fastify from 'fastify'
import cors from '@fastify/cors'
import { clienteRoutes } from './routes/clientes'
import { ativosRoutes } from './routes/ativos'

export const app = Fastify()

// Configuração correta para o Fastify CORS
app.register(cors, {
  origin: [
    'http://localhost:3000', // Frontend local
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Length'],
  credentials: true,
  maxAge: 86400
});

// Registre suas rotas após o CORS
app.register(clienteRoutes)
app.register(ativosRoutes)