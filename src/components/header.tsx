"use client";

import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingButton from "./LoadingButton";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logoutUser } from "@/app/(auth)/actions";

const Header = ({ propertyId }: { propertyId: string }) => {
  const [isPending, startTransition] = useTransition();
  const path = usePathname();
  const router = useRouter();
  const isConfigured = path.includes("configure");

  const logoutHandler = async () => {
    startTransition(() => {
      logoutUser()
        .then((data) => {
          if (!data.success) {
            throw new Error(data.error);
          }
        })
        .catch((error) => {
          console.error(error.message);
          toast.error(error.message);
        });
    });
  };

  const switchMode = () => {
    if (!isConfigured) {
      router.push(`/properties/${propertyId}/configure/users`);
    } else {
      router.push(`/properties/${propertyId}/overview`);
    }
  };

  return (
    <header className="flex items-center justify-between gap-4 h-16 border-b px-6">
      <p>Search bar will come here</p>
      <div className="flex items-center justify-end gap-4">
        {!isConfigured ? (
          <Button variant="outline" onClick={switchMode}>
            Configure
          </Button>
        ) : (
          <Button variant="outline" onClick={switchMode}>
            Frontend
          </Button>
        )}
        <LoadingButton
          disabled={isPending}
          isLoading={isPending}
          loadingText="Please wait..."
          type="button"
          variant="destructive"
          onClick={logoutHandler}
        >
          Logout
        </LoadingButton>
      </div>
    </header>
  );
};

export default Header;
