import TextInput from "@/components/TextInput";
import TextAreaInput from "@/components/text-area-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { convert24HourTo12Hour } from "@/helpers/convert-time";
import axiosInstance from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  code: z.string().min(2, { message: "Code must be at least 2 characters." }),
  basePrice: z.coerce.number(),
  checkinTime: z.coerce.string(),
  checkoutTime: z.string(),
});

interface RoomTypeFormProps {
  isEditing: boolean;
  type?: any;
  propertyId: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomTypeForm = ({
  isEditing,
  type,
  propertyId,
  closeModal,
}: RoomTypeFormProps) => {
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

  console.log(type);
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesToSubmit = {
      ...values,
      propertyId,
    };

    try {
      let response;

      if (isEditing) {
        response = await axiosInstance.put(
          `/room-types/${type._id}?propertyId=${propertyId}`,
          valuesToSubmit
        );
      } else {
        response = await axiosInstance.post("/room-types", valuesToSubmit);
      }

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message);
      closeModal(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <TextInput
          name="name"
          control={form.control}
          label="Room Type Name"
          type="text"
          disabled={form.formState.isSubmitting}
        />
        <TextInput
          name="code"
          control={form.control}
          label="Room Type Code"
          type="text"
          disabled={form.formState.isSubmitting}
        />
        <TextInput
          name="basePrice"
          control={form.control}
          label="Base Price"
          type="number"
          className="col-span-2"
          disabled={form.formState.isSubmitting}
        />
        <TextInput
          name="checkinTime"
          control={form.control}
          label="Check-In"
          type="time"
          disabled={form.formState.isSubmitting}
        />
        <TextInput
          name="checkoutTime"
          control={form.control}
          label="Check-Out"
          type="time"
          disabled={form.formState.isSubmitting}
        />
        <Button
          type="submit"
          className="w-full col-span-2"
          disabled={form.formState.isSubmitting}
        >
          {isEditing ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default RoomTypeForm;
