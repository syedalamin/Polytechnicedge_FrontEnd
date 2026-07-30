"use client";
import { useParams } from "next/navigation";
import ModuleDashboard from "@/ui/dashboard/admin/modules/ModuleDashboard";

const ModulePage = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  return <ModuleDashboard courseId={courseId} />;
};

export default ModulePage;
