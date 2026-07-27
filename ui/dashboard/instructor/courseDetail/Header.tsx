"use client";
import Text from "@/components/common/Text";
import { ChevronLeft, BookOpen } from "lucide-react";
import Link from "next/link";

const CourseDetailHeader = () => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <Link href="/instructor/courses" className="p-2 rounded-lg hover:bg-white/10 transition-all">
        <ChevronLeft className="w-5 h-5 text-white" />
      </Link>
      <BookOpen className="w-8 h-8 text-cyan-400" />
      <div>
        <Text variant="h2" color="primary">Course Modules</Text>
        <Text variant="body" color="secondary">View modules and contents</Text>
      </div>
    </div>
  );
};
export default CourseDetailHeader;
