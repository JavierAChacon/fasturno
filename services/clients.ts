import { createClient } from '@/lib/supabase/client'
import type { TablesInsert, Tables } from '@/types/database.types'

const supabase = createClient()

export type Client = Tables<'clients'>
export type ClientAdd = TablesInsert<'clients'>
export type ClientUpdate = Partial<Client> & { id: number }

export async function getClientsByOrganizationId(organizationId: number) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('organization_id', organizationId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getClientByIdAndOrganizationId(clientId: number, organizationId: number) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .eq('organization_id', organizationId)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function addClient(
  client: Omit<ClientAdd, 'organization_id'>,
  organizationId: number
): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .insert({
      ...client,
      organization_id: organizationId
    })
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateClient(
  id: number,
  organizationId: number,
  client: Omit<ClientUpdate, 'id' | 'organization_id'>
): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .update(client)
    .eq('id', id)
    .eq('organization_id', organizationId)
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteClient(id: number, organizationId: number): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .eq('organization_id', organizationId)
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  return data
}
