"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const InstructorCourseHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">My Courses</Text>
      <Text variant="body" color="secondary">Courses assigned to you</Text>
    </div>
  </div>
);
export default InstructorCourseHeader;
