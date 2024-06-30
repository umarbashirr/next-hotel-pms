import TextInput from "@/components/TextInput";
import SelectInput from "@/components/select-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axiosInstance from "@/lib/axios-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  roomNumber: z.string(),
  roomType: z.string(),
});

interface RoomFormProps {
  isEditing: boolean;
  room?: any;
  propertyId: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  roomTypes: any;
  refetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoomForm = ({
  isEditing,
  room,
  propertyId,
  closeModal,
  roomTypes,
  refetch,
}: RoomFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: room?.name || "",
      roomType: room?.category?._id || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const typeCode = roomTypes.find(
      (type: any) => type._id === values.roomType
    ).code;
    const roomCode = `${typeCode.trim()} ${values.roomNumber.trim()}`;
    const data = {
      roomNumber: values.roomNumber,
      roomCode,
      roomType: values.roomType,
      propertyId,
    };
    try {
      let response;
      if (isEditing) {
        response = await axiosInstance.put(`/rooms/${room._id}`, data);
      } else {
        response = await axiosInstance.post("/rooms", data);
      }
      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }

      closeModal(false);
      refetch(true);
      toast.success(result.message);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  const types = roomTypes.map((type: any) => ({
    key: type.name,
    value: type._id,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          name="roomNumber"
          control={form.control}
          label="Room Number"
          type="text"
        />
        <SelectInput
          name="roomType"
          control={form.control}
          label="Room Type"
          options={types}
        />

        <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
};

export default RoomForm;
