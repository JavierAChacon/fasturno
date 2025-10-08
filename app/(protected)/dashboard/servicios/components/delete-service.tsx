'use client'

import * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Spinner } from '@/components/Spinner'

import { Trash2, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteService, useGetServiceById } from '@/queries/service'

export function DeleteService({ serviceId }: { serviceId: number }) {
  const [open, setOpen] = useState(false)
  const { data: service } = useGetServiceById(serviceId)
  const { mutate: removeService, isPending: isDeleting } = useDeleteService()

  const onConfirm = () => {
    removeService(serviceId, {
      onSuccess: () => {
        toast.success('Servicio eliminado correctamente')
        setOpen(false)
      },
      onError: (error) => {
        toast.error(String(error.message))
      }
    })
  }

  const Details = (
    <>
      <div className="flex items-start gap-3 rounded-md border border-red-200/60 bg-red-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
        <div className="text-sm text-gray-700">
          <p className="font-medium">
            ¿Estás seguro de eliminar{' '}
            <span className="text-gray-900">
              {service?.name ? `“${service.name}”` : 'este servicio'}
            </span>
            ?
          </p>
          <p className="mt-1 text-gray-600">Esta acción no se puede deshacer.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-lg border bg-white p-4">
        <div className="text-sm text-gray-500">Descripción</div>
        <div className="text-sm text-gray-800">{service?.description ?? '—'}</div>
        <div className="text-sm text-gray-500">Precio</div>
        <div className="text-sm text-gray-800">
          {service
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
              }).format(service.price)
            : '—'}
        </div>
      </div>
    </>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete service">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar servicio</DialogTitle>
          <DialogDescription>Confirma si deseas eliminar este servicio.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">{Details}</div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isDeleting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? <Spinner /> : 'Eliminar servicio'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
