import { useGetOrganization } from './organization'
import { SERVICE_KEY } from '@/constants/queryKeys'
import { getServicesByOrganizationId } from '@/services/service'
import { useQuery } from '@tanstack/react-query'

export function useGetServices() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [SERVICE_KEY.SERVICES, organization?.id],
    queryFn: () => getServicesByOrganizationId(organization.id),
    enabled: !!organization?.id
  })
}
