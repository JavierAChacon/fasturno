import { z } from 'zod'
import { isValidPhoneNumber } from 'react-phone-number-input'

export const signInSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})
export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
  lastName: z
    .string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    .max(50, { message: 'El apellido no puede tener más de 50 caracteres' }),
  phone: z.string().refine(isValidPhoneNumber, { message: 'Número de teléfono inválido' }),
  email: z.email({ message: 'Ingresa un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
})
export type SignUpSchema = z.infer<typeof signUpSchema>
