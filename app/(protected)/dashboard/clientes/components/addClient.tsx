'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/Spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddClient } from '@/queries/client'
import { type AddClientSchema, addClientSchema } from '@/schemas/client'
import { PhoneInput } from '@/components/ui/phone-input'

export function AddClient() {
  const [open, setOpen] = useState(false)
  const { mutate: addClient, isPending: isAdding } = useAddClient()

  const form = useForm<AddClientSchema>({
    resolver: zodResolver(addClientSchema),
    defaultValues: {
      name: '',
      last_name: '',
      cedula: '',
      email: '',
      phone: ''
    }
  })

  const onSubmit = (data: AddClientSchema) => {
    addClient(data, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
        toast.success('Cliente agregado con éxito')
      },
      onError: (error) => {
        toast.error(error.message)
        console.error(error)
      }
    })
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-purple-400 hover:bg-purple-500">Agregar cliente</Button>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-full w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-gray-700">Agregar cliente</DrawerTitle>
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
                    <Input type="text" {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} placeholder="28195050" />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Número de Teléfono</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput
                      placeholder="4247153319"
                      defaultCountry="VE"
                      initialValueFormat="national"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-purple-400 hover:bg-purple-500" disabled={isAdding}>
              {isAdding ? <Spinner /> : 'Agregar cliente'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
