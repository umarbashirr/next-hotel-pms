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

const reservationDatesSchema = z.object({
  checkIn: z.coerce.date(),
  numOfNights: z.string(),
  checkOut: z.coerce.date(),
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
    </div>
  );
};

export default ReservationForm;
