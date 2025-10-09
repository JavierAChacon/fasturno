import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CLIENTS_KEY } from '@/constants/queryKeys'
import { useGetOrganization } from './organization'
import {
  type ClientAdd,
  type ClientUpdate,
  getClientsByOrganizationId,
  addClient,
  updateClient,
  getClientByIdAndOrganizationId,
  deleteClient
} from '@/services/clients'

export function useGetClients() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [CLIENTS_KEY.CLIENTS, organization?.id],
    queryFn: () => getClientsByOrganizationId(organization!.id),
    enabled: !!organization?.id
  })
}

export function useGetClientById(clientId: number) {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [CLIENTS_KEY.CLIENTS, clientId],
    queryFn: () => getClientByIdAndOrganizationId(clientId, organization!.id),
    enabled: !!organization?.id && !!clientId
  })
}

export function useAddClient() {
  const queryClient = useQueryClient()
  const { data: organization } = useGetOrganization()
  return useMutation({
    mutationFn: (client: Omit<ClientAdd, 'organization_id'>) => addClient(client, organization!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLIENTS_KEY.CLIENTS, organization?.id] })
    }
  })
}

export function useUpdateClient() {
  const queryClient = useQueryClient()
  const { data: organization } = useGetOrganization()

  return useMutation({
    mutationFn: async ({
      id,
      client
    }: {
      id: number
      client: Omit<ClientUpdate, 'id' | 'organization_id'>
    }) => {
      if (!organization?.id) {
        throw new Error('La organización aún no está disponible')
      }
      return updateClient(id, organization.id, client)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CLIENTS_KEY.CLIENTS, organization?.id]
      })
    }
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()
  const { data: organization } = useGetOrganization()

  return useMutation({
    mutationFn: async (id: number) => {
      if (!organization?.id) {
        throw new Error('La organización aún no está disponible')
      }
      return deleteClient(id, organization.id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CLIENTS_KEY.CLIENTS, organization?.id]
      })
    }
  })
}
