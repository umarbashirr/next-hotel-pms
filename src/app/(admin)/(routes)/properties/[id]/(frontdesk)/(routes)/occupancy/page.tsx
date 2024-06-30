"use client";

import DateInput from "@/components/date-input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import DateRangePicker from "../../_components/date-range-picker";
import React from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const OccupancyPage = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupancy</CardTitle>
        <CardDescription>
          This is the occupancy page. You can view all the occupancy here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <DateRangePicker date={date} setDate={setDate} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyPage;
