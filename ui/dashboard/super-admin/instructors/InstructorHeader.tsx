"use client";
import { useAppDispatch } from "@/app/reduxHooks";
import Button from "@/components/common/Button";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";
import { openModal } from "@/services/redux/slices/modalSlice";
import { Download, Plus } from "lucide-react";

const InstructorHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <MainIcon />
        <div>
          <Text variant="h2" color="primary">
            Instructor Management
          </Text>
          <Text variant="body" color="secondary">
            Manage instructors, profiles, and assignments
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button leftIcon={<Download className="w-3.5 h-3.5" />} variant="outline" size="md">
          Export
        </Button>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          variant="primary"
          size="md"
          onClick={() => dispatch(openModal("addInstructor"))}
        >
          Add Instructor
        </Button>
      </div>
    </div>
  );
};

export default InstructorHeader;
