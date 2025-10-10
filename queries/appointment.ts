import { useQuery } from '@tanstack/react-query'
import { APPOINTMENT_KEY, REVENUE_KEY } from '@/constants/queryKeys'
import { getAppointmentsByOrganizationId, getAppointmentStatusCounts } from '@/services/appointment'
import { useGetOrganization } from './organization'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export function getCurrentMonthRangeISO() {
  const now = new Date()
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0))
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999))
  return { start_date: start.toISOString(), end_date: end.toISOString() }
}

export function useGetAppointments() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [...APPOINTMENT_KEY.APPOINTMENTS, organization?.id],
    queryFn: () => getAppointmentsByOrganizationId(organization!.id),
    enabled: !!organization?.id
  })
}

export function useGetAppointmentStatusCounts() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: [...APPOINTMENT_KEY.STATUS_COUNTS, organization?.id],
    queryFn: () => getAppointmentStatusCounts(organization!.id),
    enabled: !!organization?.id
  })
}

export type RevenueBucket = { bucket: string; revenue: number }

export function useGetRevenueForCurrentMonth() {
  const { data: organization } = useGetOrganization()
  const { start_date, end_date } = getCurrentMonthRangeISO()

  return useQuery({
    queryKey: [...REVENUE_KEY.BY_MONTH, organization?.id, start_date, end_date, 'day'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_revenue_by_org', {
        org_id: organization!.id,
        start_date,
        end_date,
        granularity: 'day'
      })
      if (error) throw error
      return (data || []) as RevenueBucket[]
    },
    enabled: !!organization?.id
  })
}

export type TopServiceItem = { service_name: string; revenue: number }

/**
 * Llama al RPC `get_revenue_by_org_and_service` y devuelve el top N del mes actual.
 * @param limit número de servicios a mostrar (default 5)
 */
export function useGetTopServicesByRevenueCurrentMonth(limit = 5) {
  const { data: organization } = useGetOrganization()
  const { start_date, end_date } = getCurrentMonthRangeISO()

  // si REVENUE_KEY.TOP_SERVICES_MONTH no existe en tus constants, usamos un key literal
  const TOP_KEY =
    (REVENUE_KEY as any).TOP_SERVICES_MONTH ?? (['revenue', 'top-services-month'] as const)

  return useQuery({
    queryKey: [...TOP_KEY, organization?.id, start_date, end_date, limit],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_revenue_by_org_and_service', {
        org_id: organization!.id,
        start_date,
        end_date
      })
      if (error) throw error
      const list = (data || []) as TopServiceItem[]
      return list.slice(0, limit)
    },
    enabled: !!organization?.id
  })
}

export type RevenueMonthPoint = { month_bucket: string; revenue: number }

export function useGetRevenueLastMonths(n = 6) {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: ['revenue', 'last-n-months', organization?.id, n],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_revenue_last_n_months_by_org', {
        org_id: organization!.id,
        months: n
      })
      if (error) throw error
      return (data || []) as RevenueMonthPoint[]
    },
    enabled: !!organization?.id
  })
}
