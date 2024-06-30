"use client";

import { RefreshCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios-instance";

const Header = ({ propertyId }: { propertyId: string }) => {
  const [isPending, startTransition] = useTransition();
  const path = usePathname();
  const router = useRouter();
  const isConfigured = path.includes("configure");

  const logoutHandler = async () => {
    try {
      startTransition(() => {
        axiosInstance.post("/auth/logout").then(() => {
          router.push("/login");
        });
      });
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
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
      <div className="flex items-center justify-start gap-4">
        <h1 className="text-xl font-semibold">Hotel Management System</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw size={24} />
        </Button>
      </div>
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
