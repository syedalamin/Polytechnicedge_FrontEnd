"use client";
import Text from "@/components/common/Text";
import { ChevronLeft, Layers } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ContentHeader = () => {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Link href={`/student/courses/${courseId}`} className="p-2 rounded-lg hover:bg-white/10 transition-all">
        <ChevronLeft className="w-5 h-5 text-white" />
      </Link>
      <Layers className="w-8 h-8 text-cyan-400" />
      <div>
        <Text variant="h2" color="primary">Module Contents</Text>
        <Text variant="body" color="secondary">View contents and quizzes</Text>
      </div>
    </div>
  );
};
export default ContentHeader;
