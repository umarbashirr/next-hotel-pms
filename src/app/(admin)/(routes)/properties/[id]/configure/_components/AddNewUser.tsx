"use client";

import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import AccessForm from "./AccessForm";
import { useState } from "react";

const AddNewUser = ({ propertyId }: { propertyId: string }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add New User</Button>
      <Modal
        title="Add New User"
        open={showModal}
        description="Fill in the details below to add a new user."
        setOpen={() => setShowModal(false)}
      >
        <AccessForm
          isEditing={false}
          user={null}
          propertyId={propertyId}
          closeModal={setShowModal}
        />
      </Modal>
    </div>
  );
};

export default AddNewUser;
