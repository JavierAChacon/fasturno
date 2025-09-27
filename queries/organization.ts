import { useQuery, useMutation } from '@tanstack/react-query'
import { updateOrganizationById, getOrganizationByMemberId } from '@/services/organization'
import { type OrganizationSchema } from '@/schemas/organization'
import { ORGANIZATION_KEY } from '@/constants/queryKeys'
import { useGetSession } from './auth'
import { useQueryClient } from '@tanstack/react-query'

export function useUpdateOrganization() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: OrganizationSchema }) =>
      updateOrganizationById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ORGANIZATION_KEY.ORGANIZATION] })
    }
  })
}

export function useGetOrganization() {
  const { data: session } = useGetSession()
  const id = session?.user.id

  return useQuery({
    queryKey: [ORGANIZATION_KEY.ORGANIZATION, id],
    queryFn: () => getOrganizationByMemberId(id as string),
    enabled: !!id
  })
}
