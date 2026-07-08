"use client";
import NoticeHeader from "./Header";
import NoticeStats from "./NoticeStats";
import NoticeList from "./NoticeList";

const NoticeDashboard = () => (
  <div className="w-full mx-auto">
    <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      <NoticeHeader />
      <NoticeStats />
      <NoticeList />
    </div>
  </div>
);
export default NoticeDashboard;
