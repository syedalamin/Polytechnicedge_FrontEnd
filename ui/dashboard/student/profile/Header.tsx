"use client";
import MainIcon from "@/components/common/MainIcon";
import Text from "@/components/common/Text";

const ProfileHeader = () => (
  <div className="flex items-center gap-3 md:gap-4">
    <MainIcon />
    <div>
      <Text variant="h2" color="primary">My Profile</Text>
      <Text variant="body" color="secondary">View and update your profile</Text>
    </div>
  </div>
);
export default ProfileHeader;
