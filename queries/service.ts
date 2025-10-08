import { useGetOrganization } from './organization'
import { SERVICE_KEY } from '@/constants/queryKeys'
import { getServicesByOrganizationId } from '@/services/service'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { type CreateServiceSchema } from '@/schemas/service'
import { createService } from '@/services/service'

export function useGetServices() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [SERVICE_KEY.SERVICES, organization?.id],
    queryFn: () => getServicesByOrganizationId(organization.id),
    enabled: !!organization?.id
  })
}

export function useCreateService() {
  const { data: organization } = useGetOrganization()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (service: CreateServiceSchema) => {
      if (!organization?.id) throw new Error('No organization found')
      return createService(service, organization.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SERVICE_KEY.SERVICES, organization?.id]
      })
    }
  })
}
