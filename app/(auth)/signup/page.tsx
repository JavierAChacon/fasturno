"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { type SignUpSchema, signUpSchema } from "../schemas/signupSchema";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { name, lastName, phone, email, password } = values;

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            lastName,
            phone,
            avatarUrl: null,
          },
        },
      });

      if (error !== null) {
        setError(error.message);
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-1/2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
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
                    <Input placeholder="" type="" {...field} />
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
                <PhoneInput
                  placeholder="4247153319"
                  {...field}
                  defaultCountry="VE"
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
                <Input placeholder="" type="" {...field} />
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
                <Input placeholder="" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={loading} text="Registrarse" error={error} />
        <span className="block text-center text-sm mt-4">
          ¿Ya tienes una cuenta?
          <Link
            href="/login"
            className="text-purple-600 hover:underline font-semibold ml-2"
          >
            Inicia sesión
          </Link>
        </span>
      </form>
    </Form>
  );
}
