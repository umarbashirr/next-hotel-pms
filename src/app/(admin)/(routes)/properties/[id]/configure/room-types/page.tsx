"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddNewRoomType from "../_components/AddNewRoomType";
import RoomTypeForm from "../_components/RoomTypeForm";

const RoomTypesPage = ({ params }: { params: { id: string } }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roomTypes, setRoomTypes] = useState<any>([]);

  const editHandler = (type: any) => {
    setIsEditing(true);
    setSelectedType(type);
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/room-types?propertyId=${params.id}`
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message);
      }

      setRoomTypes(result.data);
      toast.success(result.message);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-end justify-between">
            <div>
              <CardTitle className="text-xl">Room Types</CardTitle>
              <CardDescription>
                Here you can manage all your room types for current property
              </CardDescription>
            </div>
            <AddNewRoomType propertyId={params?.id} />
          </div>
        </CardHeader>
        <CardContent className=" overflow-auto">
          <table className="border w-full">
            <thead className="border">
              <tr className="border">
                <th className="border px-4 py-3 text-start ">S.No</th>
                <th className="border px-4 py-3 text-start">Name</th>
                <th className="border px-4 py-3 text-start">Code</th>
                <th className="border px-4 py-3 text-start">Price</th>
                <th className="border px-4 py-3 text-start">Check-In Time</th>
                <th className="border px-4 py-3 text-start">Check-Out Time</th>
              </tr>
            </thead>
            <tbody>
              {roomTypes?.map((type: any, idx: number) => {
                return (
                  <tr className="border" key={idx}>
                    <td className="border px-4 py-2 text-start">{idx + 1}</td>
                    <td className="border px-4 py-2 text-start whitespace-nowrap">
                      {type?.name}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {type?.code}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {type?.basePrice}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {type?.checkinTime}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {type?.checkoutTime}
                    </td>
                    <td className="px-4 py-2 flex items-center justify-center">
                      <Button size="sm" onClick={() => editHandler(type)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
      {isEditing && (
        <Modal
          title="Edit Room Type"
          open={isEditing}
          description="Edit the room type details here."
          setOpen={() => setIsEditing(false)}
        >
          <RoomTypeForm
            isEditing={isEditing}
            propertyId={params.id}
            closeModal={setIsEditing}
            type={selectedType}
          />
        </Modal>
      )}
    </div>
  );
};

export default RoomTypesPage;
