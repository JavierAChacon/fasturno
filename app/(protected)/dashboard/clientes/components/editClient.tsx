'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { Spinner } from '@/components/Spinner'

import { useUpdateClient } from '@/queries/client'
import { useGetClientById } from '@/queries/client'
import { type UpdateClientSchema, updateClientSchema } from '@/schemas/client'

export function EditClient({ clientId }: { clientId: number }) {
  const { data: client, isPending: isLoading } = useGetClientById(clientId)
  const { isPending: isUpdating, mutate: updateClient } = useUpdateClient()
  const [open, setOpen] = useState(false)

  const form = useForm<UpdateClientSchema>({
    resolver: zodResolver(updateClientSchema),
    values: {
      name: client?.name ?? '',
      last_name: client?.last_name ?? '',
      cedula: client?.cedula ?? '',
      phone: client?.phone ?? '',
      email: client?.email ?? ''
    }
  })

  const onSubmit = (client: UpdateClientSchema) => {
    updateClient(
      {
        id: clientId,
        client: {
          ...client,
          updated_at: new Date().toISOString()
        }
      },
      {
        onSuccess: () => {
          toast.success('Cliente actualizado exitosamente')
          setOpen(false)
        },
        onError: (error) => {
          toast.error(error.message)
          console.error(error)
        }
      }
    )
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Editar cliente">
          <Pencil className="h-4 w-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-full w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-gray-700">Editar cliente</DrawerTitle>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Apellido" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="V-00000000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+58 000 0000000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="correo@ejemplo.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-purple-400 hover:bg-purple-500"
              disabled={isUpdating}
            >
              {isUpdating ? <Spinner /> : 'Guardar cambios'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
