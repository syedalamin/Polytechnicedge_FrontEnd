"use client";
import ProgressHeader from "./Header";
import ProgressList from "./ProgressList";

const ProgressDashboard = () => (
  <div className="w-full mx-auto">
    <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      <ProgressHeader />
      <ProgressList />
    </div>
  </div>
);
export default ProgressDashboard;
