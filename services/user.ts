import { createClient } from '../lib/supabase/client'
import type { UpdateUserSchema } from '@/schemas/user'

const supabase = createClient()

export async function getUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateUser(input: UpdateUserSchema) {
  const { name, lastName, phone, email } = input

  const { data, error } = await supabase.auth.updateUser({
    email,
    data: {
      name,
      lastName,
      phone
    }
  })

  if (error) throw new Error(error.message)

  return data
}
