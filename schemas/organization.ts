import { z } from 'zod'

export const organizationSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido').max(100, 'El nombre es muy largo'),
  description: z.string().max(255, 'La descripción es muy larga').optional()
})
export type OrganizationSchema = z.infer<typeof organizationSchema>
