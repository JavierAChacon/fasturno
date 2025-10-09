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
import { useAddMember } from '@/queries/member'
import { Switch } from '@/components/ui/switch'
import { addMemberSchema, type AddMemberSchema } from '@/schemas/member'
import { zodResolver } from '@hookform/resolvers/zod'

export function AddMember() {
  const [open, setOpen] = useState(false)
  const { mutate: addMember, isPending: isAdding } = useAddMember()

  const form = useForm<AddMemberSchema>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      email: '',
      role: '',
      is_admin: false
    }
  })

  const onSubmit = (data: AddMemberSchema) => {
    addMember(data, {
      onSuccess: () => {
        form.reset()
        setOpen(false)
        toast.success('Miembro agregado con éxito')
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
        <Button className="bg-purple-400 hover:bg-purple-500">Agregar miembro</Button>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-full w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-gray-700">Agregar miembro</DrawerTitle>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="usuario@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Input placeholder="Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_admin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-white p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>¿Es administrador?</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-200"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-purple-400 hover:bg-purple-500" disabled={isAdding}>
              {isAdding ? <Spinner /> : 'Agregar miembro'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
