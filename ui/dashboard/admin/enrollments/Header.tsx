"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const EnrollmentHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">Enrollment Management</Text>
      <Text variant="body" color="secondary">View all student enrollments</Text>
    </div>
  </div>
);
export default EnrollmentHeader;
