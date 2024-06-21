"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    const url = process.env.NEXT_PUBLIC_APP_URL + "/api/v1/auth/login";
    try {
      const response = await axios.post(url, values, {
        withCredentials: true,
      });

      const result = await response.data;

      if (!result?.success) {
        throw new Error(result?.message);
      }

      toast.success(result?.message);

      localStorage.setItem("_uAD", JSON.stringify(result?.data?.user));
      localStorage.setItem("_uAT", JSON.stringify(result?.data?.token));

      router.replace("/properties");
    } catch (error: any) {
      console.error(error?.message);
      toast.error(error?.message);
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
        />
        <TextInput
          name="password"
          control={form.control}
          label="password"
          type="password"
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
