"use client";

import SingleDatePicker from "@/components/single-date-picker";
import { ROOM_FULLFILLMENT_STATUS } from "@/constants/fullfillmentStatus";
import axiosInstance from "@/lib/axios-instance";
import { formatDate, sub, toDate } from "date-fns";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const GuestMovementPage = ({ params }: { params: { id: string } }) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [bookingLicenses, setBookingLicenses] = React.useState<any[]>([]);

  const fetchBookingLicenses = async () => {
    try {
      const response = await axiosInstance.get("/licenses", {
        params: {
          propertyId: params?.id,
          fromDate: formatDate(sub(date, { days: 1 }), "dd-MM-yyyy"),
          toDate: formatDate(date, "dd-MM-yyyy"),
        },
      });
      const result = response.data;
      setBookingLicenses(result.data);

      console.log(result);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookingLicenses();
  }, [date]);

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold">Guest Movement</h1>
        <p className="text-muted-foreground text-sm">
          This is the guest movement page. You can view the movement of the
          guest here.
        </p>
      </div>
      <div className="mt-4">
        <SingleDatePicker date={date} setDate={setDate} />
      </div>
      <div className="mt-4 border rounded-lg">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="border">
              <th className="border p-4 text-center">S.No</th>
              <th className="border p-4 text-center">Room Number</th>
              <th className="border p-4 text-center">Booker</th>
              <th className="border p-4 text-center">Guest Name</th>
              <th className="border p-4 text-center">Check In</th>
              <th className="border p-4 text-center">Check Out</th>
              <th className="border p-4 text-center">Booking Status</th>
              <th className="border p-4 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookingLicenses.map((license: any, i: number) => {
              return (
                <tr className="border" key={i}>
                  <td className="border text-center p-4">{i + 1}</td>
                  <td className="border text-center p-4">
                    {license?.fullfillment?.room?.code || "N/A"}
                  </td>

                  <td className="border text-center p-4">
                    {license?.booker?.selfDetails
                      ? "SELF"
                      : license?.booker?.customerDetails?.companyName}
                  </td>

                  <td className="border text-center p-4">
                    {license?.primaryGuest?.firstName +
                      " " +
                      license?.primaryGuest?.lastName}
                  </td>
                  <td className="border text-center p-4">
                    {formatDate(
                      toDate(license?.dateRange?.checkIn),
                      "dd-MM-yyyy"
                    )}
                  </td>
                  <td className="border text-center p-4">
                    {formatDate(
                      toDate(license?.dateRange?.checkOut),
                      "dd-MM-yyyy"
                    )}
                  </td>
                  <td className="border text-center p-4">
                    {ROOM_FULLFILLMENT_STATUS[license?.fullfillment?.status]}
                  </td>
                  <td className="border text-center p-4">
                    {license?.amount?.finalAmount}
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

export default GuestMovementPage;
