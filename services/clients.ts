import { createClient } from '@/lib/supabase/client'
import type { TablesInsert, Tables } from '@/types/database.types'

const supabase = createClient()

export type Client = Tables<'clients'>
export type AddClient = TablesInsert<'clients'>

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

export async function addClient(
  client: Omit<AddClient, 'organization_id'>,
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
