"use client";

import ModuleDashboard from "@/ui/dashboard/instructor/modules/ModuleDashboard";
import { useParams } from "next/navigation";

 
 
const InstructorCourseDetailPage = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  return <ModuleDashboard courseId={courseId} />;
};
export default InstructorCourseDetailPage;
