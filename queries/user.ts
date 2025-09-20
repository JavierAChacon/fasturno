import { updateUser, getUser } from '@/services/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type UpdateUserSchema } from '@/schemas/user'

export function useUpdateUser() {
  return useMutation({
    mutationKey: ['user', 'update-user'],
    mutationFn: (input: UpdateUserSchema) => updateUser(input)
  })
}

export function useGetUser() {
  return useQuery({
    queryKey: ['user', 'get-user'],
    queryFn: () => getUser()
  })
}
