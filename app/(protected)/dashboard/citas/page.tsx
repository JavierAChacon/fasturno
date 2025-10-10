'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useGetAppointments } from '@/queries/appointment'

export default function CitasPage() {
  const { data: appointments, isLoading } = useGetAppointments()

  if (isLoading) {
    return <div className="p-6 text-gray-600">Cargando...</div>
  }

  const formatDateVE = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleString('es-VE', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : '—'

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Citas</h1>
        {/* <AddService /> */}
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Cédula</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Correo electrónico</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Fecha de actualización</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appointments?.map((appointment) => (
              <TableRow
                key={appointment.id}
                className="group relative text-gray-600 transition-colors hover:bg-purple-100"
              >
                <TableCell>{appointment.client?.name ?? '—'}</TableCell>
                <TableCell>{appointment.client?.last_name ?? '—'}</TableCell>
                <TableCell>{appointment.client?.cedula ?? '—'}</TableCell>
                <TableCell>{appointment.client?.phone ?? '—'}</TableCell>
                <TableCell>{appointment.client?.email ?? '—'}</TableCell>
                <TableCell>{appointment.service?.name ?? '—'}</TableCell>
                <TableCell className="font-medium text-gray-800">
                  {appointment.status ?? '—'}
                </TableCell>
                <TableCell>{formatDateVE(appointment.created_at)}</TableCell>
                <TableCell>{formatDateVE(appointment.updated_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
