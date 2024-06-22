import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { APP_URL } from "@/constants/url-config";
import axios from "axios";
import LoadingButton from "@/components/LoadingButton";

const propertyFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Property name should be minimum 02 character(s)" }),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  hotelLocality: z.string().optional(),
  hotelCity: z.string().optional(),
  hotelState: z.string().optional(),
  hotelCountry: z.string().optional(),
  hotelZipcode: z.string().optional(),
  hotelWebsite: z.string().optional(),
  hotelMapURL: z.string().optional(),
  hotelOwnerName: z.string().optional(),
  hotelOwnerEmail: z.string().optional(),
  hotelOwnerPhone: z.string().optional(),
  hotelGSTBeneficiary: z.string().optional(),
  hotelGSTAddressLine1: z.string().optional(),
  hotelGSTAddressLine2: z.string().optional(),
  hotelGSTNumber: z.string().optional(),
  hotelGSTState: z.string().optional(),
  hotelGSTCity: z.string().optional(),
  hotelGSTPincode: z.string().optional(),
});

interface PropertyFormProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  hotel: any;
}

const PropertyForm = ({
  isEditing,
  hotel,
  setIsEditing,
}: PropertyFormProps) => {
  const navigation = useNavigate();
  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: hotel?.name || "",
      email: hotel?.email || "",
      phone: hotel?.phone || "",
      hotelLocality: hotel?.address?.street || "",
      hotelCity: hotel?.address?.city || "",
      hotelState: hotel?.address?.state || "",
      hotelCountry: hotel?.address?.country || "",
      hotelZipcode: hotel?.address?.zip || "",
      hotelWebsite: hotel?.website || "",
      hotelMapURL: hotel?.mapURL || "",
      hotelOwnerName: hotel?.ownerDetails?.name || "",
      hotelOwnerEmail: hotel?.ownerDetails?.email || "",
      hotelOwnerPhone: hotel?.ownerDetails?.phone || "",
      hotelGSTBeneficiary: hotel?.gstDetails?.beneficiary || "",
      hotelGSTAddressLine1: hotel?.gstDetails?.addressLine1 || "",
      hotelGSTAddressLine2: hotel?.gstDetails?.addressLine2 || "",
      hotelGSTNumber: hotel?.gstDetails?.gstin || "",
      hotelGSTState: hotel?.gstDetails?.state || "",
      hotelGSTCity: hotel?.gstDetails?.city || "",
      hotelGSTPincode: hotel?.gstDetails?.pincode || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof propertyFormSchema>) => {
    const transformedData = transformData(values);

    try {
      const url = `${APP_URL.main}${APP_URL.api}${APP_URL.path.hotels}${APP_URL.path.HOTEL}/${hotel._id}`;
      const response = await axios.put(url, transformedData, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error(
          response?.data?.message || "Failed to update property details"
        );
      }

      toast.success("Property details updated successfully");
      setIsEditing(false);
      navigation(0);
    } catch (error: any) {
      console.error(error?.message);
      toast.error(error?.message);
    }
  };

  const transformData = (values: z.infer<typeof propertyFormSchema>) => {
    const transformedData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: {
        street: values.hotelLocality,
        city: values.hotelCity,
        state: values.hotelState,
        country: values.hotelCountry,
        zip: values.hotelZipcode,
      },
      website: values.hotelWebsite,
      mapURL: values.hotelMapURL,
      ownerDetails: {
        name: values.hotelOwnerName,
        email: values.hotelOwnerEmail,
        phone: values.hotelOwnerPhone,
      },
      gstDetails: {
        beneficiary: values.hotelGSTBeneficiary,
        addressLine1: values.hotelGSTAddressLine1,
        addressLine2: values.hotelGSTAddressLine2,
        gstin: values.hotelGSTNumber,
        state: values.hotelGSTState,
        city: values.hotelGSTCity,
        pincode: values.hotelGSTPincode,
      },
    };

    return transformedData;
  };

  const cancelHandler = () => {
    setIsEditing(false);
    navigation(0);
  };

  return (
    <div className="-mt-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-10 grid grid-cols-1 items-start"
        >
          <div className="flex items-center justify-end gap-4">
            <Button
              disabled={!isEditing}
              variant="destructive"
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
            {isEditing ? (
              <LoadingButton
                loadingText="Updating..."
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
                type="submit"
              >
                Update now
              </LoadingButton>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit property</Button>
            )}
          </div>
          <div className="relative grid grid-cols-2 gap-y-4 gap-x-10">
            <TextInput
              name="name"
              control={form.control}
              label="Hotel Name"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="email"
              control={form.control}
              label="Hotel email"
              type="email"
              disabled={!isEditing}
            />
            <TextInput
              name="phone"
              control={form.control}
              label="Hotel Phone Number"
              type="tel"
              disabled={!isEditing}
            />
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-y-4 gap-x-10">
            <TextInput
              name="hotelLocality"
              control={form.control}
              label="Hotel Locality"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelCity"
              control={form.control}
              label="Hotel City"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelState"
              control={form.control}
              label="Hotel State"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelCountry"
              control={form.control}
              label="Hotel Country"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelZipcode"
              control={form.control}
              label="Hotel Zipcode"
              type="text"
              disabled={!isEditing}
            />
          </div>
          <hr />

          <div className="grid grid-cols-2 gap-y-4 gap-x-10">
            <TextInput
              name="hotelOwnerName"
              control={form.control}
              label="Owner Name"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelOwnerEmail"
              control={form.control}
              label="Owner Email"
              type="email"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelOwnerPhone"
              control={form.control}
              label="Owner Phone No."
              type="tel"
              disabled={!isEditing}
            />
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-y-4 gap-x-10">
            <TextInput
              name="hotelGSTBeneficiary"
              control={form.control}
              label="GST Beneficiary"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelGSTAddressLine1"
              control={form.control}
              label="GST Address Line 1"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelGSTAddressLine2"
              control={form.control}
              label="GST Address Line 2"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelGSTNumber"
              control={form.control}
              label="GST Number"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelGSTState"
              control={form.control}
              label="GST State"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelGSTCity"
              control={form.control}
              label="GST City"
              type="text"
              disabled={!isEditing}
            />
            <TextInput
              name="hotelGSTPincode"
              control={form.control}
              label="GST Pincode"
              type="text"
              disabled={!isEditing}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PropertyForm;