import { z } from 'zod'
import { isValidPhoneNumber } from 'react-phone-number-input'

export const addClientSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  last_name: z.string().min(1, 'El apellido es obligatorio'),
  cedula: z.string().min(1, 'La cédula es obligatoria'),
  email: z.email('El correo electrónico no es válido').optional().or(z.literal('')),
  phone: z.string().refine(isValidPhoneNumber, { message: 'Número de teléfono inválido' })
})
export type AddClientSchema = z.infer<typeof addClientSchema>
