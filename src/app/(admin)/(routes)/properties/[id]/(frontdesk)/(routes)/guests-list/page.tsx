"use client";

import axiosInstance from "@/lib/axios-instance";
import { formatDate, sub } from "date-fns";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const GuestListPage = ({ params }: { params: { id: string } }) => {
  const [guests, setGuests] = React.useState<any[]>([]);

  const fetchBookedGuests = async () => {
    try {
      const response = await axiosInstance.get("/guests", {
        params: {
          propertyId: params?.id,
          startDate: formatDate(sub(new Date(), { days: 1 }), "dd-MM-yyyy"),
          endDate: formatDate(new Date(), "dd-MM-yyyy"),
        },
      });
      const result = response.data;
      setGuests(result.data);
      toast.success("Guests fetched successfully");
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookedGuests();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold">Guest List</h1>
        <p className="text-muted-foreground text-sm">
          See the list of guests who have booked the property.
        </p>
      </div>
      <div className="mt-4 border rounded-lg">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="border">
              <th className="border p-4 text-center">S.No</th>
              <th className="border p-4 text-center">Name</th>
              <th className="border p-4 text-center">Email</th>
              <th className="border p-4 text-center">Phone</th>
              <th className="border p-4 text-center">DOB</th>
              <th className="border p-4 text-center">City</th>
              <th className="border p-4 text-center">State</th>
              <th className="border p-4 text-center">Nationality</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest: any, i: number) => {
              return (
                <tr className="border" key={i}>
                  <td className="border text-center p-4">{i + 1}</td>
                  <td className="border text-center p-4">
                    {guest?.firstName + " " + guest?.lastName}
                  </td>

                  <td className="border text-center p-4">{guest?.email}</td>

                  <td className="border text-center p-4">{guest?.phone}</td>
                  <td className="border text-center p-4">{guest?.dob}</td>
                  <td className="border text-center p-4">
                    {guest?.address?.city}
                  </td>
                  <td className="border text-center p-4">
                    {guest?.address?.state}
                  </td>
                  <td className="border text-center p-4">
                    {guest?.address?.country}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestListPage;
