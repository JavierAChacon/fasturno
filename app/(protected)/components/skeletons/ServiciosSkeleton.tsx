'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'

export function ServiciosSkeleton() {
  const rows = Array.from({ length: 6 })

  return (
    <div className="flex h-screen flex-col items-center bg-gray-100 p-6">
      <div className="mb-4 flex w-full items-center justify-between">
        <Skeleton className="h-7 w-40" /> {/* Título "Servicios" */}
        <Skeleton className="h-9 w-36 rounded-md" /> {/* Botón <AddService /> */}
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
            {rows.map((_, i) => (
              <TableRow key={i} className="group relative text-gray-600">
                <TableCell>
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-64" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-48" />
                </TableCell>

                {/* Acciones (Edit/Delete) visibles en hover */}
                <TableCell className="relative w-0 p-0">
                  <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-2 group-hover:flex">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
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
