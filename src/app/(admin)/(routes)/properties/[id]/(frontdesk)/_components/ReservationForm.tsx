"use client";

import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/date-input";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { add, parseISO } from "date-fns";
import { useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios-instance";
import { Separator } from "@/components/ui/separator";
import SelectInput from "@/components/select-input";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoomDetailSection from "../(routes)/new-reservation/_components/RoomDetailSection";
import BookerDetailSection from "../(routes)/new-reservation/_components/BookerDetailSection";
import GuestDetailSection from "../(routes)/new-reservation/_components/GuestDetailSection";

const reservationDatesSchema = z.object({
  checkIn: z.coerce.date(),
  numOfNights: z.string(),
  checkOut: z.coerce.date(),
});

const roomDetailsSchema = z.object({
  roomType: z.string(),
  plan: z.string(),
  adult: z.string(),
  children: z.string(),
  rate: z.string(),
  tax: z.string(),
  total: z.string(),
});

const bookerDetailsSchema = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

const ReservationForm = ({ propertyId }: { propertyId: string }) => {
  const form = useForm<z.infer<typeof reservationDatesSchema>>({
    resolver: zodResolver(reservationDatesSchema),
    defaultValues: {
      checkIn: new Date(),
      numOfNights: "1",
      checkOut: add(new Date(), { days: 1 }),
    },
  });

  const roomDetailsForm = useForm<z.infer<typeof roomDetailsSchema>>({
    resolver: zodResolver(roomDetailsSchema),
    defaultValues: {
      roomType: "",
      plan: "",
      adult: "",
      children: "",
      rate: "",
      tax: "",
      total: "",
    },
  });

  const bookerDetailsForm = useForm<z.infer<typeof bookerDetailsSchema>>({
    resolver: zodResolver(bookerDetailsSchema),
    defaultValues: {
      type: "",
      id: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onDatesSubmit = async (
    data: z.infer<typeof reservationDatesSchema>
  ) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(
        `/occupancy?checkIn=${data.checkIn}&checkOut=${data.checkOut}&propertyId=${propertyId}`
      );

      const result = response.data;

      console.log(result);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  const onRoomDetailsSubmit = async (
    data: z.infer<typeof roomDetailsSchema>
  ) => {
    console.log(data);
  };

  const onBookerDetailsSubmit = async (
    data: z.infer<typeof bookerDetailsSchema>
  ) => {
    console.log(data);
  };

  const { watch, setValue } = form;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "checkIn" || name === "numOfNights") {
        const checkIn = value.checkIn;
        const numOfNights = parseInt(value.numOfNights as string) || 0;

        if (checkIn instanceof Date && !isNaN(checkIn.getTime())) {
          const newCheckOut = add(checkIn, { days: numOfNights });
          setValue("checkOut", newCheckOut);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <div>
      <div id="reservationDates">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onDatesSubmit)}
            className="grid grid-cols-[1fr_1fr_1fr_200px] gap-4 items-end"
          >
            <DateInput label="Check In" name="checkIn" control={form.control} />
            <TextInput
              label="Number of Nights"
              name="numOfNights"
              type="number"
              control={form.control}
            />
            <DateInput
              label="Check Out"
              name="checkOut"
              control={form.control}
              disabled={true}
            />
            <LoadingButton
              type="submit"
              isLoading={form.formState.isSubmitting}
              loadingText="Checking Availability..."
              disabled={form.formState.isSubmitting}
            >
              Check Availability
            </LoadingButton>
          </form>
        </Form>
      </div>
      <Separator className="my-6" />
      <RoomDetailSection />
      <Separator className="my-6" />
      <BookerDetailSection propertyId={propertyId} />
      <Separator className="my-6" />
      <GuestDetailSection />
      <Separator className="my-6" />
      <div>
        <div className="mb-4">
          <h3 className="font-semibold">Other Details</h3>
          <p className="text-sm text-muted-foreground">
            Enter any other details for this reservation.
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ReservationForm;
