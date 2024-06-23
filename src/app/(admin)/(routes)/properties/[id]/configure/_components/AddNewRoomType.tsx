import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RoomTypeForm from "./RoomTypeForm";

const AddNewRoomType = ({ propertyId }: { propertyId: string }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add New Type</Button>
      <Modal
        title="Add New Room Type"
        open={showModal}
        description="Fill in the details below to add a new room type."
        setOpen={() => setShowModal(false)}
      >
        <RoomTypeForm
          isEditing={false}
          type={null}
          propertyId={propertyId}
          closeModal={setShowModal}
        />
      </Modal>
    </div>
  );
};

export default AddNewRoomType;
