"use client";
import CourseInstructorHeader from "./Header";
import CourseInstructorList from "./CourseInstructorList";

interface CourseInstructorDashboardProps {
  courseId: string;
}

const CourseInstructorDashboard = ({
  courseId,
}: CourseInstructorDashboardProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <CourseInstructorHeader />
        <CourseInstructorList courseId={courseId} />
      </div>
    </div>
  );
};

export default CourseInstructorDashboard;
