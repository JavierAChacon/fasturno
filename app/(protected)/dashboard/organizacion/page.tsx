'use client'

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
import { Textarea } from '@/components/ui/textarea'
import SubmitButton from '@/components/SubmitButton'
import { type OrganizationSchema, organizationSchema } from '@/schemas/organization'
import { useGetOrganization, useUpdateOrganization } from '@/queries/organization'
import { OrganizationSkeleton } from '../../components/skeletons/organizationSkeleton'
import { toast } from 'sonner'

export default function OrganizationPage() {
  const { data: organization, isPending: isLoading } = useGetOrganization()
  const { mutate: updateOrganization, isPending: isUpdating } = useUpdateOrganization()

  const form = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    values: {
      name: organization?.name ?? '',
      description: organization?.description ?? ''
    }
  })

  const onSubmit = (data: OrganizationSchema) => {
    updateOrganization(
      { id: organization!.id, data },
      {
        onSuccess: () => {
          toast.success('Organización actualizada correctamente')
        },
        onError: () => {
          toast.error('Error al actualizar la organización')
        }
      }
    )
  }

  if (isLoading) {
    return <OrganizationSkeleton />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl rounded-xl bg-white p-10 shadow-md">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Organización</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      {...field}
                    />
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
                  <FormLabel>
                    Descripción <span className="text-gray-400">(opcional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Qué hace tu organización..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton loading={isUpdating} text="Guardar" />
          </form>
        </Form>
      </div>
    </div>
  )
}
