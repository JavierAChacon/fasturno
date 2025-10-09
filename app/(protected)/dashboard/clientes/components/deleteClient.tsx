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

import { useDeleteClient } from '@/queries/client'
import { useGetClientById } from '@/queries/client'

export function DeleteClient({ clientId }: { clientId: number }) {
  const [open, setOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { data: client, isPending: isLoading } = useGetClientById(clientId)
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient()

  const onConfirm = () => {
    setErrorMsg(null)
    deleteClient(clientId, {
      onSuccess: () => {
        toast.success('Cliente eliminado exitosamente')
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
        setErrorMsg(error.message)
      }
    })
  }

  if (isLoading) {
    return <div className="text-sm text-gray-600">Cargando...</div>
  }

  const Details = (
    <>
      <div className="flex items-start gap-3 rounded-md border border-red-200/60 bg-red-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" aria-hidden />
        <div className="text-sm text-gray-700">
          <p className="font-medium">
            ¿Estás seguro de eliminar a{' '}
            <span className="text-gray-900">
              {client?.name || client?.last_name
                ? `${client?.name ?? ''} ${client?.last_name ?? ''}`.trim()
                : 'este cliente'}
            </span>
            ?
          </p>
          <p className="mt-1 text-gray-600">Esta acción no se puede deshacer.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 rounded-lg border bg-white p-4">
        <div className="text-sm text-gray-500">Nombre</div>
        <div className="text-sm text-gray-800">
          {client?.name ?? '—'} {client?.last_name ?? ''}
        </div>

        <div className="text-sm text-gray-500">Correo</div>
        <div className="text-sm text-gray-800">{client?.email ?? '—'}</div>

        <div className="text-sm text-gray-500">Cédula</div>
        <div className="text-sm text-gray-800">{client?.cedula ?? '—'}</div>

        <div className="text-sm text-gray-500">Teléfono</div>
        <div className="text-sm text-gray-800">{client?.phone ?? '—'}</div>
      </div>
    </>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Eliminar cliente">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Eliminar cliente</DialogTitle>
          <DialogDescription>
            Confirma si deseas eliminar este cliente de la organización.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">{Details}</div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isDeleting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            aria-disabled={isDeleting}
          >
            {isDeleting ? <Spinner /> : 'Eliminar cliente'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
