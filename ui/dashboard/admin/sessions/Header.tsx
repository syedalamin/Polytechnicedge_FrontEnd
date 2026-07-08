"use client";
import { useAppDispatch } from "@/app/reduxHooks";
import Button from "@/components/common/Button";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";
import { openModal } from "@/services/redux/slices/modalSlice";
import { Plus } from "lucide-react";

const SessionHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <MainIcon />
        <div>
          <Text variant="h2" color="primary">Session Management</Text>
          <Text variant="body" color="secondary">Schedule and manage live sessions</Text>
        </div>
      </div>
      <Button leftIcon={<Plus className="w-4 h-4" />} variant="primary" size="md" onClick={() => dispatch(openModal("addSession"))}>
        Add Session
      </Button>
    </div>
  );
};
export default SessionHeader;
