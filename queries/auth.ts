import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSession, signIn, signUp, signOut } from '@/services/auth'
import { AUTH_KEY } from '@/constants/queryKeys'
import type { SignInSchema, SignUpSchema } from '@/schemas/auth'
import type { Session } from '@supabase/supabase-js'

export function useGetSession() {
  return useQuery<Session | null>({
    queryKey: AUTH_KEY.SESSION,
    queryFn: getSession
  })
}

export function useSignIn() {
  const { refetch } = useGetSession()
  return useMutation({
    mutationFn: (input: SignInSchema) => signIn(input),
    onSuccess: () => {
      refetch()
    }
  })
}

export function useSignUp() {
  return useMutation({
    mutationFn: (input: SignUpSchema) => signUp(input)
  })
}

export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEY.SESSION })
    }
  })
}
