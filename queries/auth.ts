import { useMutation, useQuery } from '@tanstack/react-query'
import { signIn, signUp } from '@/services/auth'
import type { SignInSchema, SignUpSchema } from '@/schemas/auth'

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
