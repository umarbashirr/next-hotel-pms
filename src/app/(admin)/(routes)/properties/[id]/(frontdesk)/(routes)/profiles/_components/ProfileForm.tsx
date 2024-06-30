"use client";

import LoadingButton from "@/components/LoadingButton";
import TextInput from "@/components/TextInput";
import DateInput from "@/components/date-input";
import SelectInput from "@/components/select-input";
import SelectWithSearch from "@/components/select-with-search";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import axiosInstance from "@/lib/axios-instance";
import { countries } from "@/utils/countries";
import { idTypes } from "@/utils/idTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// On dob field, the description is "e.g. 24-12-1990" make sure regex is used to validate the date format. MM-DD-YYYY year from 1900 to 2099

const profileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  dob: z.string().refine(
    (value) => {
      if (value === "") return true; // Allow blank string
      const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/;
      return regex.test(value);
    },
    { message: "Invalid date" }
  ),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      country: z.string(),
    })
    .optional(),
  verificationDetails: z
    .object({
      idType: z.string(),
      idNumber: z.string(),
      placeOfIssue: z.string(),
      dateOfIssue: z.string().refine(
        (value) => {
          if (value === "") return true; // Allow blank string
          const regex =
            /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/;
          return regex.test(value);
        },
        { message: "Invalid date" }
      ),
      expiryDate: z.string().refine(
        (value) => {
          if (value === "") return true; // Allow blank string
          const regex =
            /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/;
          return regex.test(value);
        },
        { message: "Invalid date" }
      ),
    })
    .optional(),
  notes: z.string().optional(),
  isSuspended: z.boolean().optional(),
});

const ProfileForm = ({ propertyId }: { propertyId: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
      verificationDetails: {
        idType: "",
        idNumber: "",
        placeOfIssue: "",
        dateOfIssue: "",
        expiryDate: "",
      },
      notes: "",
      isSuspended: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    console.log(values);

    try {
      const response = await axiosInstance.post(
        `/individual-profiles?propertyId=${propertyId}`,
        values
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(result.message);

      form.reset();

      router.refresh();
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            <TextInput
              label="First Name"
              control={form.control}
              type="text"
              name="firstName"
            />
            <TextInput
              label="Last Name"
              control={form.control}
              type="text"
              name="lastName"
            />
            <TextInput
              label="Email"
              control={form.control}
              type="email"
              name="email"
            />
            <TextInput
              label="Phone"
              control={form.control}
              type="text"
              name="phone"
            />
            <TextInput
              label="DOB"
              control={form.control}
              type="text"
              name="dob"
              description="e.g. 24-12-1990 / DD-MM-YYYY"
            />
          </div>
          <hr className="my-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            <TextInput
              label="Street"
              control={form.control}
              type="text"
              name="address.street"
            />
            <TextInput
              label="City"
              control={form.control}
              type="text"
              name="address.city"
            />
            <TextInput
              label="State"
              control={form.control}
              type="text"
              name="address.state"
            />
            <TextInput
              label="Zip"
              control={form.control}
              type="text"
              name="address.zip"
            />
            <SelectWithSearch
              label="Country"
              control={form.control}
              name="address.country"
              options={countries.map((country) => ({
                label: country.name,
                value: country.name,
              }))}
              valueToSetFor="address.country"
              form={form}
            />
          </div>
          <hr className="my-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 justify-start">
            <SelectInput
              label="ID Type"
              control={form.control}
              name="verificationDetails.idType"
              options={idTypes}
            />
            <TextInput
              label="ID Number"
              control={form.control}
              type="text"
              name="verificationDetails.idNumber"
            />

            <TextInput
              label="Place of Issue"
              control={form.control}
              type="text"
              name="verificationDetails.placeOfIssue"
              className="col-span-2"
            />
            <TextInput
              label="Date of Issue"
              control={form.control}
              type="text"
              name="verificationDetails.dateOfIssue"
              description="e.g. 24-12-1990 / DD-MM-YYYY"
            />
            <TextInput
              label="Expiry Date"
              control={form.control}
              type="text"
              name="verificationDetails.expiryDate"
              description="e.g. 24-12-1990 / DD-MM-YYYY"
            />
          </div>
          <hr className="my-10" />
          <TextInput
            label="Notes"
            control={form.control}
            type="text"
            name="notes"
          />
          <div className="flex items-center justify-end gap-4 mt-10">
            <Button type="reset" variant="destructive">
              Reset
            </Button>
            <LoadingButton
              loadingText="Creating Profile"
              disabled={form.formState.isSubmitting}
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Submit
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
