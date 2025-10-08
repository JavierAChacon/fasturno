import { createClient } from '../lib/supabase/client'
import type { ServiceSchema, UpdateServiceSchema } from '@/schemas/service'
import type { CreateServiceSchema } from '@/schemas/service'

const supabase = createClient()

export async function getServicesByOrganizationId(
  organizationId: number
): Promise<ServiceSchema[]> {
  const { data, error } = await supabase
    .from('services')
    .select()
    .eq('organization_id', organizationId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createService(service: CreateServiceSchema, organization_id: number) {
  const { data, error } = await supabase
    .from('services')
    .insert({
      ...service,
      organization_id
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateService(
  id: number,
  values: UpdateServiceSchema
): Promise<ServiceSchema> {
  const { data, error } = await supabase
    .from('services')
    .update({ ...values })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function getServiceById(id: number): Promise<ServiceSchema> {
  const { data, error } = await supabase.from('services').select().eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
