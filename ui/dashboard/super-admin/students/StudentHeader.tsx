"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";
import { Download } from "lucide-react";
import Button from "@/components/common/Button";

const StudentHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4">
        <MainIcon />
        <div>
          <Text variant="h2" color="primary">
            Student Management
          </Text>
          <Text variant="body" color="secondary">
            View and manage enrolled students
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button leftIcon={<Download className="w-3.5 h-3.5" />} variant="outline" size="md">
          Export
        </Button>
      </div>
    </div>
  );
};

export default StudentHeader;
