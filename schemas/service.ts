import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.number(),
  name: z.string(),

  description: z.string().nullable(),
  price: z.number(),
  created_at: z.string(),
  updated_at: z.string().nullable()
})
export type ServiceSchema = z.infer<typeof serviceSchema>
