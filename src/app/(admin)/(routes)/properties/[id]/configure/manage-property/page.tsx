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
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios-instance";

export default function ManageProperty({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hotelDetails, setHotelDetails] = useState<any>({});

  const fetchHotelDetails = async () => {
    try {
      const response = await axiosInstance.get(`/hotels/hotel/${params.id}`);
      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }

      setHotelDetails(result.data?.hotel);

      toast.success(result.message);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
          {!loading && (
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
