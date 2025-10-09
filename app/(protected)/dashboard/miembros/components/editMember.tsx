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
import { useUpdateMember } from '@/queries/member'
import { type UpdateMemberSchema, updateMemberSchema } from '@/schemas/member'
import { useGetMemberById } from '@/queries/member'
import { Switch } from '@/components/ui/switch'

export function EditMember({ memberId }: { memberId: string }) {
  const { data: member, isPending: isLoading } = useGetMemberById(memberId)
  console.log(member?.is_admin)
  const { isPending: isUpdating, mutate: updateMember } = useUpdateMember()
  const [open, setOpen] = useState(false)

  const form = useForm<UpdateMemberSchema>({
    resolver: zodResolver(updateMemberSchema),
    values: {
      role: member?.role ?? '',
      is_admin: member?.is_admin ?? false
    }
  })

  const onSubmit = (values: UpdateMemberSchema) => {
    updateMember(
      {
        memberUpdated: { ...values, updated_at: new Date().toISOString() },
        memberId: memberId
      },
      {
        onSuccess: () => {
          toast.success('Miembro actualizado correctamente')
          setOpen(false)
        },
        onError: (error) => {
          toast.error(`${error.message}`)
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
        <Button variant="ghost" size="icon" aria-label="Edit member">
          <Pencil className="h-4 w-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="ml-auto h-full w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle className="text-2xl text-gray-700">Editar miembro</DrawerTitle>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  value={member?.profiles.email ?? ''}
                  disabled
                  readOnly
                  className="bg-gray-50 text-gray-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                      defaultChecked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-200"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-purple-400 hover:bg-purple-500"
              disabled={isUpdating}
            >
              {isUpdating ? <Spinner /> : 'Editar miembro'}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
