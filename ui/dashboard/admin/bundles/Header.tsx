"use client";
import { useAppDispatch } from "@/app/reduxHooks";
import Button from "@/components/common/Button";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";
import { openModal } from "@/services/redux/slices/modalSlice";
import { Plus } from "lucide-react";

const BundleHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <MainIcon />
        <div>
          <Text variant="h2" color="primary">Bundle Management</Text>
          <Text variant="body" color="secondary">Create and manage course bundles</Text>
        </div>
      </div>
      <Button leftIcon={<Plus className="w-4 h-4" />} variant="primary" size="md" onClick={() => dispatch(openModal("addBundle"))}>
        Add Bundle
      </Button>
    </div>
  );
};
export default BundleHeader;
