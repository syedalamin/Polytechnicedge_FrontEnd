"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const StudentHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">Students</Text>
      <Text variant="body" color="secondary">View all students on the platform</Text>
    </div>
  </div>
);
export default StudentHeader;
