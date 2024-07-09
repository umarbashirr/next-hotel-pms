"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ propertyId }: { propertyId: string }) => {
  const location = usePathname();
  const frontdeskRoutes = [
    {
      label: "Overview",
      path: `/properties/${propertyId}/overview`,
    },
    {
      label: "Guest Movement",
      path: `/properties/${propertyId}/guest-movement`,
    },
    {
      label: "Guests List",
      path: `/properties/${propertyId}/guests-list`,
    },
    {
      label: "Room List",
      path: `/properties/${propertyId}/room-list`,
    },
    {
      label: "New Reservation",
      path: `/properties/${propertyId}/new-reservation`,
    },
    {
      label: "Occupancy",
      path: `/properties/${propertyId}/occupancy`,
    },
    {
      label: "Reports",
      path: `/properties/${propertyId}/reports`,
    },
    {
      label: "Individual Profile",
      path: `/properties/${propertyId}/profiles/individual`,
    },

    {
      label: "Company Profile",
      path: `/properties/${propertyId}/profiles/company`,
    },
    {
      label: "Properties",
      path: `/properties`,
    },
  ];

  const configureRoutes = [
    {
      label: "users",
      path: `/properties/${propertyId}/configure/users`,
    },
    {
      label: "Manage Property",
      path: `/properties/${propertyId}/configure/manage-property`,
    },

    {
      label: "Room Types",
      path: `/properties/${propertyId}/configure/room-types`,
    },
    {
      label: "rooms",
      path: `/properties/${propertyId}/configure/rooms`,
    },
  ];

  const navigation = location?.includes("configure")
    ? configureRoutes
    : frontdeskRoutes;

  return (
    <aside className="fixed top-0 left-0 w-full max-w-72 h-full bg-white border-r">
      <div className="h-16 flex items-center justify-start px-6 border-b">
        Simple PMS
      </div>
      <nav className="flex flex-col gap-2 px-3 mt-6">
        {navigation.map(
          (item: { label: string; path: string }, index: number) => {
            return (
              <Link
                href={item?.path}
                key={index}
                className={cn(
                  "flex items-center justify-start text-start gap-2 px-3 py-2 rounded-md capitalize  duration-300 ease-in-out transition-all",
                  location?.endsWith(item?.path)
                    ? "bg-primary text-white"
                    : "bg-white text-primary hover:bg-slate-100"
                )}
              >
                {item?.label}
              </Link>
            );
          }
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
