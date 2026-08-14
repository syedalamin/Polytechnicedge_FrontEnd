"use client";
import ModuleHeader from "./Header";
import ModuleList from "./ModuleList";

interface ModuleDashboardProps {
  courseId: string;
}

const ModuleDashboard = ({ courseId }: ModuleDashboardProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <ModuleHeader/>
        <ModuleList courseId={courseId} />
      </div>
    </div>
  );
};

export default ModuleDashboard;
