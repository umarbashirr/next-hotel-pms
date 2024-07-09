"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReservationForm from "../../_components/ReservationForm";
import { Separator } from "@/components/ui/separator";

const NewReservationPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="grid grid-cols-[1fr_400px] gap-10">
      <Card>
        <CardHeader>
          <CardTitle>New Reservation</CardTitle>
          <CardDescription>
            Create a new reservation for this property.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReservationForm propertyId={params?.id} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Here is the payment breakdown for this reservation.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default NewReservationPage;
