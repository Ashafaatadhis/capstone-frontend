"use client";

import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useLogin } from "../(landing)/hooks/use-login";
import { Loader2 } from "lucide-react";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const loginMutation = useLogin();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: { onSubmit: schema },
    onSubmit: async ({ value }) => {
      console.log("LOGIN:", value);
      loginMutation.mutate(value);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 text-slate-900">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-6 pb-16 pt-24">
        <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          {/* LEFT TEXT */}
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Sign in to Intervox
            </h1>
            <p className="max-w-xl text-slate-600">
              Upload your recordings, pick a question, and view instant speech
              analysis.
            </p>
          </div>

          {/* LOGIN CARD */}
          <Card className="backdrop-blur bg-white/90">
            <CardHeader className="pb-2">
              <CardTitle>Log in</CardTitle>
              <CardDescription>
                Use your username and password to continue.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-4"
              >
                {loginMutation.isError && (
                  <p className="text-red-600 text-sm">
                    {loginMutation.error.message}
                  </p>
                )}

                <FieldGroup>
                  {/* USERNAME */}
                  <form.Field name="username">
                    {(field) => (
                      <Field>
                        <FieldLabel>Username</FieldLabel>
                        <Input
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="yourname"
                        />
                        <FieldError>
                          {field.state.meta.errors?.[0]?.message}
                        </FieldError>
                      </Field>
                    )}
                  </form.Field>

                  {/* PASSWORD */}
                  <form.Field name="password">
                    {(field) => (
                      <Field>
                        <div className="flex items-center justify-between">
                          <FieldLabel>Password</FieldLabel>
                          <Link
                            href="#"
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Forgot?
                          </Link>
                        </div>
                        <Input
                          type="password"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="••••••••"
                        />
                        <FieldError>
                          {field.state.meta.errors?.[0]?.message}
                        </FieldError>
                      </Field>
                    )}
                  </form.Field>
                </FieldGroup>

                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                >
                  {loginMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
