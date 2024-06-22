import TextInput from "@/components/TextInput";
import SelectInput from "@/components/select-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  roomNumber: z.coerce.number().positive(),
  roomType: z.string(),
});

interface RoomFormProps {
  isEditing: boolean;
  room?: any;
}

const roomTypes = [
  {
    key: "Single Room",
    value: "60c72b2f9b1d4f001f8e4c1a",
  },
  {
    key: "Double Room",
    value: "60c72b2f9b1d4f001f8e4c1b",
  },
  {
    key: "Suite",
    value: "60c72b2f9b1d4f001f8e4c1c",
  },
  {
    key: "Deluxe Room",
    value: "60c72b2f9b1d4f001f8e4c1d",
  },
  {
    key: "Family Room",
    value: "60c72b2f9b1d4f001f8e4c1e",
  },
];

const RoomForm = ({ isEditing, room }: RoomFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: room?.roomNumber || "",
      roomType: room?.roomType?._id || "",
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
          name="roomNumber"
          control={form.control}
          label="Room Number"
          type="number"
        />
        <SelectInput
          name="roomType"
          control={form.control}
          label="Room Type"
          options={roomTypes}
        />

        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
};

export default RoomForm;
