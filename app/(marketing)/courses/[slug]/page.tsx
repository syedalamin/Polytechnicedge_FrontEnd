"use client";

import { RefreshCw } from "lucide-react";

import { use, useState } from "react";

import { useCourse } from "@/services/graphql";
import type { ICourse, IModuleBrief } from "@/services/graphql";
import HeroSection from "@/ui/marketing/courseDetails/HeroSection";
import MetaActionBar from "@/ui/marketing/courseDetails/MetaActionBar";
import AboutCourseSection from "@/ui/marketing/courseDetails/AboutCourseSection";
import CurriculumSection from "@/ui/marketing/courseDetails/CurriculumSection";
import { groupModulesByWeek } from "@/utils/groupModulesByWeek";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export interface WeekGroup {
  week: number;
  modules: IModuleBrief[];
}



const CourseDetailPage = ({ params }: CourseDetailPageProps) => {
  const { slug } = use(params);
  const { course, loading, error, refetch } = useCourse(slug);
  const courseResult = (course ?? null) as ICourse | null;
  const weeks = groupModulesByWeek(courseResult?.modules);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center text-white text-sm">
        Loading course...
      </div>
    );
  }

  if (error || !courseResult) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex flex-col items-center justify-center text-center p-6">
        <p className="text-red-400 text-sm mb-3">
          Failed to load course details.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-xs hover:border-cyan-400/50 border border-white/10 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0e27] text-white">
      <HeroSection course={courseResult} />

      <MetaActionBar course={courseResult} />

      {courseResult.longDescription && (
        <AboutCourseSection description={courseResult.longDescription} />
      )}

      {weeks.length > 0 && <CurriculumSection weeks={weeks} />}
    </main>
  );
};

export default CourseDetailPage;
