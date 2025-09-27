import { z } from 'zod'
import { signUpSchema } from './auth'

export const updateUserSchema = signUpSchema.partial({ password: true })
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
