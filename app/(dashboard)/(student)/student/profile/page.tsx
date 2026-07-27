"use client";
import ProfileHeader from "@/ui/dashboard/student/profile/Header";
import ProfileDashboard from "@/ui/dashboard/student/profile/ProfileDashboard";

const ProfilePage = () => (
  <div className="w-full mx-auto">
    <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      <ProfileHeader />
      <ProfileDashboard />
    </div>
  </div>
);
export default ProfilePage;
