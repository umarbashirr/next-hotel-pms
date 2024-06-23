"use client";

export function convert24HourTo12Hour(time: any) {
  let [hours, minutes] = time?.split(":");
  hours = parseInt(hours, 10);

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${hours}:${minutes} ${period}`;
}
