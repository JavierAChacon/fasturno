import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CLIENTS_KEY } from '@/constants/queryKeys'
import { useGetOrganization } from './organization'
import { type AddClient, getClientsByOrganizationId, addClient } from '@/services/clients'

export function useGetClients() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [CLIENTS_KEY.CLIENTS],
    queryFn: () => getClientsByOrganizationId(organization!.id),
    enabled: !!organization?.id
  })
}

export function useAddClient() {
  const queryClient = useQueryClient()
  const { data: organization } = useGetOrganization()
  return useMutation({
    mutationFn: (client: Omit<AddClient, 'organization_id'>) => addClient(client, organization!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLIENTS_KEY.CLIENTS] })
    }
  })
}
