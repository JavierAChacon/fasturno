import { z } from 'zod'

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
  phone: z.string().min(7, { message: 'El número de teléfono debe tener al menos 7 dígitos' }),
  email: z.email({ message: 'Ingresa un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
})
export type SignUpSchema = z.infer<typeof signUpSchema>
