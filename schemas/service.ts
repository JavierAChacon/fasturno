import { z } from 'zod'

export const serviceSchema = z.object({
  name: z
    .string()
    .min(2, 'EL nombre del servicio es requerido')
    .max(1000, 'EL nombre del servicio es muy largo'),
  description: z.string().max(255, 'La descripción es muy larga').optional(),
  price: z.number().min(0, 'El precio no puede ser negativo')
})
export type ServiceSchema = z.infer<typeof serviceSchema>
