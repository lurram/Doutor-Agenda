"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
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

const registerSchema = z.object({
  name: z.string().trim().min(1, { error: "Nome é obrigatório" }),
  email: z.email({ error: "E-mail inválido" }),
  password: z.string().trim().min(8, { error: "Senha deve ter 8 caracteres" }),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
  }
  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Crie uma conta para continuar</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Nome</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite seu nome"
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
            Criar conta
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpForm;
