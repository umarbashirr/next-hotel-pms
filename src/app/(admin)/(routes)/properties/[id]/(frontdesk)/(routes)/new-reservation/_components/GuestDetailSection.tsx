"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const GuestDetailSection = () => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold">Guest Details</h3>
        <p className="text-sm text-muted-foreground">
          Enter the guest details for this reservation.
        </p>
      </div>
      <div className="flex items-center justify-center p-10">
        <Button>Add or Select Guest</Button>
      </div>
    </div>
  );
};

export default GuestDetailSection;
