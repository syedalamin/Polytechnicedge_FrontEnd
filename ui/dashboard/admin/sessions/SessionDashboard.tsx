"use client";
import SessionHeader from "./Header";
import SessionStats from "./SessionStats";
import SessionList from "./SessionList";

const SessionDashboard = () => (
  <div className="w-full mx-auto">
    <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
      <SessionHeader />
      <SessionStats />
      <SessionList />
    </div>
  </div>
);
export default SessionDashboard;
