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
import Link from 'next/link'
import { type SignUpSchema, signUpSchema } from '@/schemas/auth'
import SubmitButton from '../../../components/SubmitButton'
import { useRouter } from 'next/navigation'
import { useSignUp } from '@/queries/auth'
import { toast } from 'sonner'

export default function SignUpForm() {
  const router = useRouter()
  const { mutate, isPending } = useSignUp()

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: SignUpSchema) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Cuenta creada con éxito')
        router.push('/sign-in')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-5">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
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
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
              <FormLabel>Numero de Teléfono</FormLabel>
              <FormControl className="w-full">
                <PhoneInput {...field} placeholder="04247153319" defaultCountry="VE" />
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
                <Input type="string" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={isPending} text="Registrarse" />
        <span className="mt-4 block text-center text-sm">
          ¿Ya tienes una cuenta?
          <Link href="/login" className="ml-2 font-semibold text-purple-600 hover:underline">
            Inicia sesión
          </Link>
        </span>
      </form>
    </Form>
  )
}
