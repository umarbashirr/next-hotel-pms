"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const location = usePathname();
  const frontdeskRoutes = [
    {
      label: "Overview",
      path: "overview",
    },
    {
      label: "Guest Movement",
      path: "guest-movement",
    },
    {
      label: "Guests List",
      path: "guests-list",
    },
    {
      label: "Room List",
      path: "room-list",
    },
    {
      label: "New Reservation",
      path: "new-reservation",
    },
    {
      label: "Reports",
      path: "reports",
    },
  ];

  const configureRoutes = [
    {
      label: "users",
      path: "configure/users",
    },
    {
      label: "Manage Property",
      path: "configure/manage-property",
    },

    {
      label: "Room Types",
      path: "configure/room-types",
    },
    {
      label: "rooms",
      path: "configure/rooms",
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
