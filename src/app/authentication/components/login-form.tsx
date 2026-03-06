"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.email({ error: "E-mail inválido" }),
  password: z.string().trim().min(8, { error: "Senha deve ter 8 caracteres" }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Faça login para continuar</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>E-mail</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite seu e-mail"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Senha</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    type="password"
                    placeholder="Digite sua senha"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
