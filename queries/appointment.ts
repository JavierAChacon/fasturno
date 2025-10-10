import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { APPOINTMENT_KEY } from '@/constants/queryKeys'
import { getAppointmentsByOrganizationId } from '@/services/appointment'
import { useGetOrganization } from './organization'

export function useGetAppointments() {
  const { data: organization } = useGetOrganization()

  return useQuery({
    queryKey: APPOINTMENT_KEY.APPOINTMENTS,
    queryFn: () => getAppointmentsByOrganizationId(organization!.id),
    enabled: !!organization?.id
  })
}
