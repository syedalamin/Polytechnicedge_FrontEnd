"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const NoticeHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">Notices</Text>
      <Text variant="body" color="secondary">Important announcements and updates</Text>
    </div>
  </div>
);
export default NoticeHeader;
