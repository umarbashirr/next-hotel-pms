"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropertyForm from "../_components/PropertyForm";
import { useEffect, useState, useTransition } from "react";
import { fetchCurrentPropertyDetails } from "./actions";

export default function ManageProperty({ params }: { params: { id: string } }) {
  const [pending, setTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hotelDetails, setHotelDetails] = useState<any>({});

  const fetchHotelDetails = async () => {
    setTransition(() => {
      fetchCurrentPropertyDetails(params.id)
        .then((data) => {
          if (!data.success) {
            throw new Error(data.message);
          }

          console.log(data?.data);
          setHotelDetails(data?.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    });
  };

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-end justify-between">
            <div>
              <CardTitle className="text-xl">Manage Property</CardTitle>
              <CardDescription>
                Manage your property details here
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!pending && (
            <PropertyForm
              hotel={hotelDetails}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
