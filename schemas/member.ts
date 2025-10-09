import { z } from 'zod'

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
