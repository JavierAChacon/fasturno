'use client'

import { useGetClients } from '@/queries/client'
import { AddClient } from './components/addClient'
import { EditClient } from './components/editClient'
import { DeleteClient } from './components/deleteClient'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ServiciosSkeleton } from '../../components/skeletons/ServiciosSkeleton'

export default function ClientesPage() {
  const { data: clients, isPending: isLoading } = useGetClients()

  if (isLoading) {
    return <ServiciosSkeleton />
  }

  return (
    <div className="flex h-screen flex-col items-center bg-gray-100 p-6">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <AddClient />
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Cedula</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha de Creación</TableHead>
              <TableHead>Fecha de Actualización</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients?.map((client) => {
              return (
                <TableRow
                  key={client.id}
                  className="group relative text-gray-600 hover:bg-purple-100"
                >
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.last_name}</TableCell>
                  <TableCell>{client.cedula}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email ?? '—'}</TableCell>
                  <TableCell>
                    {new Date(client.created_at).toLocaleString('es-VE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    {client.updated_at
                      ? new Date(client.updated_at).toLocaleString('es-VE', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '—'}
                  </TableCell>

                  <TableCell className="relative w-0 p-0">
                    <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-2 group-hover:flex">
                      <EditClient clientId={client.id} />
                      <DeleteClient clientId={client.id} />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
