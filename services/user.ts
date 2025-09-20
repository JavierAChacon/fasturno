import { createClient } from '../lib/supabase/client'
import type { UpdateUserSchema } from '@/schemas/user'
import type { User } from '@supabase/supabase-js'

const supabase = createClient()

export async function getUser(): Promise<User | null> {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  return user
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
