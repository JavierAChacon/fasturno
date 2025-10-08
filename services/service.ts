import { createClient } from '../lib/supabase/client'
import type { ServiceSchema } from '@/schemas/service'

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
