"use client";

import TextInput from "@/components/TextInput";
import SelectInput from "@/components/select-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UserRoles } from "@/constants/user-roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  role: z.string(),
});

interface AccessFormProps {
  isEditing: boolean;
  user?: any;
}

const AccessForm = ({ isEditing, user }: AccessFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.user?.name || "",
      email: user?.user?.email || "",
      role: user?.role || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          name="name"
          control={form.control}
          label="Username"
          type="text"
        />
        <TextInput
          name="email"
          control={form.control}
          label="Email"
          type="email"
        />
        <SelectInput
          name="role"
          control={form.control}
          label="Role"
          options={UserRoles}
        />

        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
};

export default AccessForm;
