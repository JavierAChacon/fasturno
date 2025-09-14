"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { type LoginSchema, loginSchema } from "../schemas/loginSchema";
import SubmitButton from "../components/SubmitButton";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        ...values,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-1/2">
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

        <SubmitButton loading={loading} text="Iniciar sesión" error={error} />
        <span className="block text-center text-sm mt-4">
          ¿No tienes una cuenta?
          <Link
            href="/signup"
            className="text-purple-600 hover:underline font-semibold ml-2"
          >
            Regístrate
          </Link>
        </span>
      </form>
    </Form>
  );
}
