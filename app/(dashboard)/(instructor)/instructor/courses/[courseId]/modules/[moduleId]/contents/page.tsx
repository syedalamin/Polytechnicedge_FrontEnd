"use client";
import { useParams } from "next/navigation";
import ContentDashboard from "@/ui/dashboard/instructor/contents/ContentDashboard";

const ContentPage = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  const moduleId = params.moduleId as string;
  return <ContentDashboard courseId={courseId} moduleId={moduleId} />;
};

export default ContentPage;
