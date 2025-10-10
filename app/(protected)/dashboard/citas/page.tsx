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

  console.dir(appointments)

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Citas</h1>
        {/* // <AddService /> */}
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
            {appointments?.map((appointment) => {
              return (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.client.name}</TableCell>
                  <TableCell>{appointment.client.last_name}</TableCell>
                  <TableCell>{appointment.client.cedula}</TableCell>
                  <TableCell>{appointment.client.phone}</TableCell>
                  <TableCell>{appointment.client.email}</TableCell>
                  <TableCell>{appointment.service.name}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{appointment.created_at}</TableCell>
                  <TableCell>{appointment.updated_at}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
