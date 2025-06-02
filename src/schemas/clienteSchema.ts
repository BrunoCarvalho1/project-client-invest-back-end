import { z } from 'zod'

export const clienteSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().optional()
})
