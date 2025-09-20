import { updateUser } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { type UpdateUserSchema } from '@/schemas/user'

export function useUpdateUser() {
  return useMutation({
    mutationKey: ['user', 'update-user'],
    mutationFn: (input: UpdateUserSchema) => updateUser(input)
  })
}
