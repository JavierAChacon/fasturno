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

export async function getAppointmentStatusCounts(organization_id: number) {
  const { data, error } = await supabase.rpc('get_appointment_status_counts_by_org', {
    org_id: organization_id
  })

  if (error) throw new Error(error.message)
  return data
}

export async function getRevenueForCurrentMonth(organizationId: number) {
  const now = new Date()

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const start_date = startOfMonth.toISOString()
  const end_date = endOfMonth.toISOString()

  const { data, error } = await supabase.rpc('get_revenue_by_org', {
    org_id: organizationId,
    start_date,
    end_date,
    granularity: 'day'
  })

  if (error) throw error
  return data
}
