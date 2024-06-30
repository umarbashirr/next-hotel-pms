"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RoomListPage = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rooms, setRooms] = useState<any>([]);

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/rooms?propertyId=${params.id}`);
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
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room List</CardTitle>
        <CardDescription>
          This is the room list page. You can view all the rooms here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {rooms.map((room: any) => (
              <div key={room.id} className="p-6 rounded shadow-sm border">
                <p>{room.roomCode}</p>
                <p>{room.roomType.name}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomListPage;
