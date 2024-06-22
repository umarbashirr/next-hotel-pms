import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  code: z.string().min(2, { message: "Code must be at least 2 characters." }),
  basePrice: z.coerce.number(),
  checkinTime: z.string(),
  checkoutTime: z.string(),
});

interface RoomTypeFormProps {
  isEditing: boolean;
  type?: any;
}

const RoomTypeForm = ({ isEditing, type }: RoomTypeFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type?.name || "",
      code: type?.code || "",
      basePrice: type?.basePrice || "",
      checkinTime: type?.checkinTime || "",
      checkoutTime: type?.checkoutTime || "",
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
          label="Room Type Name"
          type="text"
        />
        <TextInput
          name="code"
          control={form.control}
          label="Room Type Code"
          type="text"
        />
        <TextInput
          name="basePrice"
          control={form.control}
          label="Base Price"
          type="number"
        />
        <TextInput
          name="checkinTime"
          control={form.control}
          label="Check-In"
          type="time"
        />
        <TextInput
          name="checkoutTime"
          control={form.control}
          label="Check-Out"
          type="time"
        />

        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
};

export default RoomTypeForm;
