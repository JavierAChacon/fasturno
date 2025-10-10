import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function getAppointmentsByOrganizationId(organizationId: number) {
  const { data, error } = await supabase
    .from('appointments')
    .select(
      `
      id,
      status,
      scheduled_at,
      created_at,
      updated_at,
      client:client_id (
        name,
        last_name,
        cedula,
        phone,
        email
      ),
      service:service_id (
        name
      )
    `
    )
    .eq('organization_id', organizationId)
    .order('scheduled_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
