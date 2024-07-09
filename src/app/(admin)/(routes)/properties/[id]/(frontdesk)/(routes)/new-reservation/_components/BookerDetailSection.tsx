"use client";

import DynamicSheet from "@/components/DynamicSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import SingleResultListItem from "./SingleResultListItem";
import Modal from "@/components/Modal";
import ProfileForm from "../../profiles/_components/ProfileForm";
import CompanyProfileForm from "../../profiles/_components/CompanyProfileForm";

const BookerDetailSection = ({ propertyId }: { propertyId: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [createNew, setCreateNew] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [type, setType] = React.useState("INDIVIDUAL");

  useEffect(() => {
    if (!isOpen) {
      setCreateNew(false);
    }
  }, [isOpen]);

  return (
    <>
      <div>
        <div className="mb-4">
          <h3 className="font-semibold">Booker Details</h3>
          <p className="text-sm text-muted-foreground">
            Select or create a new booker for this reservation.
          </p>
        </div>
        <div className="flex items-center justify-center p-10">
          <Button onClick={() => setIsOpen(true)}>Add or Select Booker</Button>
        </div>
      </div>
      <DynamicSheet
        open={isOpen}
        setOpen={setIsOpen}
        title="Select or Create Booker"
        description="Select or create a new booker profile for this reservation."
      >
        <div>
          <fieldset className="grid grid-cols-1 md:grid-cols-[150px_1fr_1fr] gap-4 rounded-lg border border-solid border-gray-300 p-3">
            <div>
              <Label>Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                  <SelectItem value="COMPANY">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Name</Label>
              <Input type="text" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" />
            </div>
            <div className="flex items-center justify-start gap-4">
              <Button>Search</Button>
              <Button onClick={() => setShowDialog(true)} variant="secondary">
                Create New
              </Button>
            </div>
          </fieldset>
          {!createNew && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Search Results:</h3>
              <ul className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SingleResultListItem key={index} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </DynamicSheet>
      <Modal
        open={showDialog}
        setOpen={setShowDialog}
        title="Create New Profile"
        description="
        Create a new booker profile for this reservation.            
      "
        className="max-h-[700px]"
      >
        {type === "INDIVIDUAL" ? (
          <ProfileForm propertyId={propertyId} />
        ) : (
          <CompanyProfileForm propertyId={propertyId} />
        )}
      </Modal>
    </>
  );
};

export default BookerDetailSection;
