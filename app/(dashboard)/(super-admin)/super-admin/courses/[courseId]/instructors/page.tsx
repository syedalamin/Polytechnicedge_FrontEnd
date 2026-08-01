"use client";
import { useParams } from "next/navigation";
import CourseInstructorDashboard from "@/ui/dashboard/admin/courseInstructors/CourseInstructorDashboard";

const CourseInstructorPage = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  return <CourseInstructorDashboard courseId={courseId} />;
};

export default CourseInstructorPage;
