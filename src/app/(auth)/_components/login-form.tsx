"use client";

import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import { Form } from "@/components/ui/form";
import axiosInstance from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email",
  }),
  password: z.string().min(6, {
    message: "Password must contain 06 character(s)",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/auth/login", values);

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      router.push("/properties");
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
          disabled={form.formState.isSubmitting}
        />
        <TextInput
          name="password"
          control={form.control}
          label="password"
          type="password"
          disabled={form.formState.isSubmitting}
        />
        <LoadingButton
          disabled={form.formState.isSubmitting}
          loadingText="Logging in..."
          isLoading={form.formState.isSubmitting}
          type="submit"
        >
          Login now
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
