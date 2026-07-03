"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { closeModal } from "@/services/redux/slices/modalSlice";

 

const CreateAdminModal = () => {
  const dispatch = useAppDispatch();

 const isCreateModalOpen = useAppSelector(
   (state: any) => !!state.modal?.["addAdmin"],
 );

 
  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={() => dispatch(closeModal("addAdmin"))}
      title="Create Admin"
      modalSize="md"
      confirmLabel="Create Admin"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => dispatch(closeModal("addAdmin"))}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => console.log("Create Admin")}>
            Create Admin
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        <Text variant="body" color="white">
          Updating settings for
        </Text>
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
          <Text variant="body" size="sm" color="white">
            Current Role
          </Text>
          <Text variant="body" size="sm" color="dimmed">
            Total Sessions
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAdminModal;
