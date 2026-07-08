"use client";
import { useParams } from "next/navigation";
import ContentDashboard from "@/ui/dashboard/admin/contents/ContentDashboard";

const ContentPage = () => {
  const params = useParams();
  const moduleId = params.moduleId as string;
  return <ContentDashboard moduleId={moduleId} />;
};

export default ContentPage;
