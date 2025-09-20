import { useMutation, useQuery } from '@tanstack/react-query'
import { getSession, signIn, signUp } from '@/services/auth'
import type { SignInSchema, SignUpSchema } from '@/schemas/auth'
import type { Session } from '@supabase/supabase-js'

export function useGetSession() {
  return useQuery<Session | null>({
    queryKey: ['auth', 'get-session'],
    queryFn: getSession
  })
}

export function useSignIn() {
  return useMutation({
    mutationKey: ['auth', 'sign-in'],
    mutationFn: (input: SignInSchema) => signIn(input)
  })
}

export function useSignUp() {
  return useMutation({
    mutationKey: ['auth', 'sign-up'],
    mutationFn: (input: SignUpSchema) => signUp(input)
  })
}
