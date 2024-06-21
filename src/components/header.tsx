"use client";

import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingButton from "./LoadingButton";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ propertyId }: { propertyId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();
  const isConfigured = location.pathname.includes("configure");

  const logoutHandler = async () => {
    const url = process.env.NEXT_PUBLIC_APP_URL + "/api/v1/auth/logout";
    setIsLoading(true);
    try {
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );

      const result = await response.data;

      if (!result?.success) {
        throw new Error(result?.message);
      }

      localStorage.clear();

      router.push("/login");

      toast.success(result?.message);
    } catch (error: any) {
      console.error(error?.message);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          isLoading={isLoading}
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
