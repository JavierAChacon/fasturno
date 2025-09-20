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
import { PhoneInput } from '@/components/ui/phone-input'
import { type UpdateUserSchema, updateUserSchema } from '@/schemas/user'
import SubmitButton from '@/components/SubmitButton'
import { toast } from 'sonner'
import { useUpdateUser } from '@/queries/user'
import { getSession } from '@/services/auth'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
  const { mutate, isPending: isUpdating } = useUpdateUser()

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: async () => {
      const session = await getSession()

      return {
        name: session?.user?.user_metadata?.name || '',
        lastName: session?.user?.user_metadata?.lastName || '',
        phone: session?.user?.user_metadata?.phone || '',
        email: session?.user?.email || '',
        password: ''
      }
    }
  })

  const {
    formState: { isLoading }
  } = form

  const onSubmit = (data: UpdateUserSchema) => {
    mutate(data, {
      onSuccess: () => toast.success('Perfil actualizado con éxito'),
      onError: (error) => toast.error(error.message)
    })
  }

  if (isLoading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-2xl rounded-xl bg-white p-10 shadow-md">
          <div className="mb-1">
            <Skeleton className="h-8 w-48" /> {/* Título */}
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 space-y-2 sm:col-span-6">
                <Skeleton className="h-4 w-24" /> {/* Label */}
                <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
              </div>
              <div className="col-span-12 space-y-2 sm:col-span-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-36" /> {/* Label Teléfono */}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Label Email */}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" /> {/* Label Password */}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div>
              <Skeleton className="h-10 w-full rounded-md" /> {/* Botón */}
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl rounded-xl bg-white p-10 shadow-md">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Actualizar Perfil</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="given-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="family-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton loading={isUpdating} text="Actualizar Perfil" />
          </form>
        </Form>
      </div>
    </div>
  )
}
