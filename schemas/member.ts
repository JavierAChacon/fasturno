import { z } from 'zod'

export const memberSchema = z.object({
  role: z.string(),
  organization_id: z.number(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime().nullable(),
  is_admin: z.boolean(),
  id: z.string()
})
export type MemberSchema = z.infer<typeof memberSchema>

export const memberWithProfileSchema = memberSchema.extend({
  profiles: z.object({
    name: z.string(),
    last_name: z.string(),
    email: z.email(),
    phone: z.string()
  })
})
export type MemberWithProfileSchema = z.infer<typeof memberWithProfileSchema>

export const addMemberSchema = z.object({
  email: z.email('Introduzca un correo electrónico válido').min(1, 'El email es obligatorio'),
  role: z.string().min(1, 'El rol es obligatorio'),
  is_admin: z.boolean('Este campo es obligatorio')
})
export type AddMemberSchema = z.infer<typeof addMemberSchema>

export const updateMemberSchema = addMemberSchema
  .extend({
    updated_at: z.iso.datetime().optional()
  })
  .omit({ email: true })
export type UpdateMemberSchema = z.infer<typeof updateMemberSchema>
