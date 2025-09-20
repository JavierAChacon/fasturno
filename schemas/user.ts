import { z } from 'zod'
import { signUpSchema } from './auth'

export const updateUserSchema = signUpSchema
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
