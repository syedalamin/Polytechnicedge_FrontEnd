"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const ProgressHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">My Progress</Text>
      <Text variant="body" color="secondary">Track your learning progress</Text>
    </div>
  </div>
);
export default ProgressHeader;
