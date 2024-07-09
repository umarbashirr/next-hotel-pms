"use client";

import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface DynamicSheetProps {
  open: boolean;
  setOpen: any;
  title: string;
  description?: string;
  children: ReactNode;
}

const DynamicSheet = ({
  open,
  setOpen,
  title,
  description,
  children,
}: DynamicSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="min-w-full md:min-w-[700px] h-full overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && (
            <SheetDescription className="-mt-2">{description}</SheetDescription>
          )}
        </SheetHeader>
        <div className="mt-4 overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default DynamicSheet;
