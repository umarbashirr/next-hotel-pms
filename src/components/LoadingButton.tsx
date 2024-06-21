"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { ReactNode } from "react";

interface LoadingButtonProps {
  className?: string;
  disabled: boolean;
  isLoading: boolean;
  children: ReactNode;
  loadingText: string;
  onClick?: any;
  type?: "button" | "submit" | "reset";
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const LoadingButton = ({
  className,
  disabled,
  isLoading,
  children,
  loadingText,
  onClick,
  type = "button",
  variant = "default",
  size = "default",
}: LoadingButtonProps) => {
  return (
    <Button
      className={cn("flex items-center justify-center gap-1", className)}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      size={size}
      type={type}
    >
      {isLoading && <LoaderIcon size={14} />}
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
