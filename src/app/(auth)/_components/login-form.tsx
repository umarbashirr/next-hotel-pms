"use client";

import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "../actions";
import { useTransition } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email",
  }),
  password: z.string().min(6, {
    message: "Password must contain 06 character(s)",
  }),
});

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      loginUser(values.email, values.password);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
          disabled={isPending}
        />
        <TextInput
          name="password"
          control={form.control}
          label="password"
          type="password"
          disabled={isPending}
        />
        <LoadingButton
          disabled={isPending}
          loadingText="Logging in..."
          isLoading={isPending}
          type="submit"
        >
          Login now
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
