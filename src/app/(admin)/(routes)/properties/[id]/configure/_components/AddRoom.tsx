import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RoomForm from "./RoomForm";

const AddRoom = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add New Room</Button>
      <Modal
        title="Add New Room"
        open={showModal}
        description="Fill in the details below to add a new room."
        setOpen={() => setShowModal(false)}
      >
        <RoomForm isEditing={false} room={null} />
      </Modal>
    </div>
  );
};

export default AddRoom;
