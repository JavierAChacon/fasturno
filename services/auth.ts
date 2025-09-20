import { Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import type { SignInSchema, SignUpSchema } from '@/schemas/auth'

const supabase = createClient()

export async function getSession(): Promise<Session | null> {
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  return session
}

export async function signIn(input: SignInSchema) {
  const { data, error } = await supabase.auth.signInWithPassword({
    ...input
  })

  if (error) throw new Error(error.message)

  return data
}

export async function signUp(input: SignUpSchema) {
  const { email, password, name, lastName, phone } = input

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        lastName,
        phone
      }
    }
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
