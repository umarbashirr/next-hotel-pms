"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReservationForm from "../../_components/ReservationForm";

const NewReservationPage = ({ params }: { params: { id: string } }) => {
  return (
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
  );
};

export default NewReservationPage;
