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

export const createServiceSchema = z.object({
  name: z.string().min(1, 'El nombre del servicio es obligatorio'),
  description: z.string().max(250, 'La descripción no puede superar los 250 caracteres').optional(),
  price: z.number().positive('El precio del servicio debe ser un número positivo')
})
export type CreateServiceSchema = z.infer<typeof createServiceSchema>
