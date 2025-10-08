'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { createServiceSchema, type CreateServiceSchema } from '@/schemas/service'
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
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useCreateService } from '@/queries/service'
import { useState } from 'react'

export function AddService() {
  const [open, setOpen] = useState(false)
  const { isPending: isCreating, mutate: createService } = useCreateService()

  const form = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0.0
    }
  })

  const onSubmit = (data: CreateServiceSchema) => {
    createService(data, {
      onSuccess: () => {
        toast.success('Servicio agregado correctamente')
        form.reset()
        setOpen(false)
      },
      onError: (error) => {
        toast.error(`${error.message}`)
      }
    })
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-purple-400 hover:bg-purple-500">Nuevo Servicio</Button>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-full w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-gray-700">Agregar servicio</DrawerTitle>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        className="pl-7"
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-purple-400 hover:bg-purple-500"
              disabled={isCreating}
            >
              Agregar Servicio
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
