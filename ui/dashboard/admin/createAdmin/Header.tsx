"use client";
import Button from "@/components/common/Button";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";
import { Download, Plus, Shield } from "lucide-react";
import { useState } from "react";

const CreateAdminHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [formStep, setFormStep] = useState(1);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 ">
      <div className="flex items-center gap-3 md:gap-4">
        <MainIcon />
        <div>
          <Text variant="h2" color="primary">
            Admin Management
          </Text>
          <Text variant="body" color="secondary">
            Manage administrators, roles, and permissions
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          leftIcon={<Download className="w-3.5 h-3.5" />}
          variant="outline"
          size="md"
        >
          Export
        </Button>

        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          variant="primary"
          size="md"
        >
          Add Admin
        </Button>
      </div>
    </div>
  );
};

export default CreateAdminHeader;
