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
import AddRoom from "../_components/AddRoom";
import RoomForm from "../_components/RoomForm";

const RoomsPage = ({ params }: { params: { id: string } }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rooms, setRooms] = useState<any>([]);
  const [roomTypes, setRoomTypes] = useState<any>([]);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const editHandler = (room: any) => {
    setIsEditing(true);
    setSelectedRoom(room);
  };

  const fetchRoomTypes = async () => {
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

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/rooms?propertyId=${params.id}`
      );
      const result = response.data;
      if (!result.success) {
        throw new Error(result.message);
      }
      setRooms(result.data);
      toast.success(result.message);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setShouldFetch(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      fetchRooms();
    }
  }, [shouldFetch]);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-end justify-between">
            <div>
              <CardTitle className="text-xl">Rooms</CardTitle>
              <CardDescription>
                Configure the rooms for the property here.
              </CardDescription>
            </div>
            <AddRoom
              propertyId={params?.id}
              roomTypes={roomTypes}
              refetch={setShouldFetch}
            />
          </div>
        </CardHeader>
        <CardContent className=" overflow-auto">
          <table className="border w-full">
            <thead className="border">
              <tr className="border">
                <th className="border px-4 py-3 text-start ">S.No</th>
                <th className="border px-4 py-3 text-start">Room Number</th>
                <th className="border px-4 py-3 text-start">Room Code</th>
                <th className="border px-4 py-3 text-start">Room Type</th>
              </tr>
            </thead>
            <tbody>
              {rooms?.map((room: any, idx: number) => {
                return (
                  <tr className="border" key={idx}>
                    <td className="border px-4 py-2 text-start">{idx + 1}</td>
                    <td className="border px-4 py-2 text-start whitespace-nowrap">
                      {room?.name}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {room?.code}
                    </td>
                    <td className="border px-4 py-2 text-start">
                      {room?.category?.name}
                    </td>
                    <td className="px-4 py-2 flex items-center justify-center">
                      <Button size="sm" onClick={() => editHandler(room)}>
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
          <RoomForm
            isEditing={isEditing}
            room={selectedRoom}
            propertyId={params.id}
            closeModal={setIsEditing}
            roomTypes={roomTypes}
            refetch={setShouldFetch}
          />
        </Modal>
      )}
    </div>
  );
};

export default RoomsPage;
