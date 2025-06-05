import { z } from 'zod'

export const clienteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.string().optional()
})
