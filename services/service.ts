import { createClient } from '../lib/supabase/client'
import type { ServiceSchema } from '@/schemas/service'
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
