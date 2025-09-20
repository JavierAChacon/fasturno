'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type SignInSchema, signInSchema } from '@/schemas/auth'
import SubmitButton from '../components/SubmitButton'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@/queries/auth'
import { toast } from 'sonner'

export default function SignInPage() {
  const { mutate, isPending } = useSignIn()
  const router = useRouter()

  const onSubmit = (data: SignInSchema) => {
    mutate(data, {
      onSuccess: () => router.push('/dashboard'),
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-6">
        <div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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

        <SubmitButton loading={isPending} text="Iniciar sesión" />
        <span className="mt-4 block text-center text-sm">
          ¿No tienes una cuenta?
          <Link href="/signup" className="ml-2 font-semibold text-purple-600 hover:underline">
            Regístrate
          </Link>
        </span>
      </form>
    </Form>
  )
}
