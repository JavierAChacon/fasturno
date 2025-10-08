'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetServices } from '@/queries/service'
import AddService from './components/add-service'

export default function ServiciosPage() {
  const { data: services } = useGetServices()

  return (
    <div className="flex h-screen flex-col items-center bg-gray-100 p-6">
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <AddService />
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha de creación</TableHead>
              <TableHead>Fecha de actualización</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {services?.map((service) => (
              <TableRow
                key={service.id}
                className="group relative text-gray-600 hover:bg-purple-100"
              >
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2
                  }).format(service.price)}
                </TableCell>
                <TableCell>
                  {new Date(service.created_at).toLocaleString('es-VE', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell>
                  {service?.updated_at
                    ? new Date(service.updated_at).toLocaleString('es-VE', {
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
                    <Button variant="ghost" size="icon" aria-label="Edit service">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Delete service">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
