"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const EnrolledCourseHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">My Enrolled Courses</Text>
      <Text variant="body" color="secondary">Courses you are currently learning</Text>
    </div>
  </div>
);
export default EnrolledCourseHeader;
