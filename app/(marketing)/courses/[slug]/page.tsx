"use client";

import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  GraduationCap,
  Link as LinkIcon,
  Lock,
  Play,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

import { useCourse } from "@/services/graphql";
import type { IContentBrief, ICourse, IModuleBrief } from "@/services/graphql";
import HeroSection from "@/ui/marketing/courseDetails/HeroSection";
import MetaActionBar from "@/ui/marketing/courseDetails/MetaActionBar";
import AboutCourseSection from "@/ui/marketing/courseDetails/AboutCourseSection";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

interface WeekGroup {
  week: number;
  modules: IModuleBrief[];
}

// ----------------------------------------------------------------------
// Helper: Group modules by week
// ----------------------------------------------------------------------
function groupModulesByWeek(modules?: IModuleBrief[]): WeekGroup[] {
  if (!modules?.length) return [];

  const byWeek = new Map<number, IModuleBrief[]>();

  [...modules]
    .sort(
      (a, b) =>
        (a.weekNumber ?? 0) - (b.weekNumber ?? 0) ||
        (a.serial ?? 0) - (b.serial ?? 0),
    )
    .forEach((module) => {
      const week = module.weekNumber ?? 1;
      const list = byWeek.get(week) ?? [];
      list.push(module);
      byWeek.set(week, list);
    });

  return [...byWeek.entries()].map(([week, modules]) => ({ week, modules }));
}

// ----------------------------------------------------------------------
// Reusable Component 1: Unlocked Content Preview
// ----------------------------------------------------------------------
function UnlockedContentPreview({ content }: { content: IContentBrief }) {
  if (content.contentType === "VIDEO" && content.contentUrl) {
    return (
      <video
        src={content.contentUrl}
        controls
        className="w-full aspect-video rounded-lg bg-black object-contain mt-2"
      />
    );
  }

  if (content.contentUrl) {
    return (
      <a
        href={content.contentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-lg bg-white/5 border border-white/10 p-2.5 hover:border-cyan-400/40 transition-colors mt-2"
      >
        <LinkIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="text-xs text-white truncate flex-1">
          {content.contentUrl}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      </a>
    );
  }

  return (
    <div className="max-h-48 overflow-y-auto rounded-lg bg-black/30 border border-white/5 p-3 mt-2">
      <p className="text-xs text-gray-300 whitespace-pre-wrap">
        {content.textContent || "No text content provided."}
      </p>
    </div>
  );
}

 

// ----------------------------------------------------------------------
// Reusable Component 4: Collapsible About Course Section
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Reusable Component 5: Curriculum Section (Week & Module Accordion)
// ----------------------------------------------------------------------
function CurriculumSection({ weeks }: { weeks: WeekGroup[] }) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [openContentId, setOpenContentId] = useState<string | null>(null);

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
      <h2 className="text-xl font-bold mb-5 text-white">Course Curriculum</h2>

      <div className="space-y-5">
        {weeks.map(({ week, modules }) => (
          <div
            key={week}
            className="bg-[#0d1230] border border-white/10 rounded-xl p-4 sm:p-5"
          >
            {/* Week Title Header */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                Week {week}
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-gray-200">
                Advanced Frontend & Next.js App Router Architecture
              </h3>
            </div>

            {/* Modules List */}
            <div className="space-y-2.5">
              {modules.map((module) => {
                const isModuleOpen = openModuleId === module.id;

                return (
                  <div
                    key={module.id}
                    className="border border-white/10 rounded-lg bg-[#131838] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenModuleId(isModuleOpen ? null : module.id)
                      }
                      className="w-full flex items-center justify-between p-3 sm:p-3.5 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-medium text-white">
                        {module.title}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span>{module.contents?.length ?? 0} lessons</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            isModuleOpen ? "rotate-180 text-cyan-400" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Lessons inside Module */}
                    {isModuleOpen && module.contents && (
                      <div className="p-2.5 border-t border-white/5 bg-[#0a0e27]/50 space-y-1.5">
                        {module.contents.map((content) => {
                          const isLocked = content.isLocked;
                          const isContentOpen = openContentId === content.id;

                          return (
                            <div
                              key={content.id}
                              className="rounded-md bg-white/5 border border-white/5 overflow-hidden"
                            >
                              <button
                                type="button"
                                disabled={isLocked}
                                onClick={() =>
                                  !isLocked &&
                                  setOpenContentId(
                                    isContentOpen ? null : content.id,
                                  )
                                }
                                className={`w-full flex items-center justify-between p-2.5 text-left ${
                                  isLocked
                                    ? "cursor-not-allowed opacity-65"
                                    : "hover:bg-white/5 cursor-pointer"
                                }`}
                              >
                                <div className="flex items-center gap-2 text-xs text-gray-300">
                                  <Play className="w-3 h-3 text-cyan-400 shrink-0" />
                                  <span>{content.title}</span>
                                </div>

                                {isLocked ? (
                                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                                    <span>Locked</span>
                                    <Lock className="w-3 h-3" />
                                  </div>
                                ) : (
                                  <ChevronRight
                                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                                      isContentOpen
                                        ? "rotate-90 text-cyan-400"
                                        : ""
                                    }`}
                                  />
                                )}
                              </button>

                              {!isLocked && isContentOpen && (
                                <div className="p-2.5 border-t border-white/5 bg-black/20">
                                  <UnlockedContentPreview content={content} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
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
      {/* 1. Hero Section */}
      <HeroSection course={courseResult} />

      {/* 2. Action & Stats Bar */}
      <MetaActionBar course={courseResult} />

      {/* 3. Collapsible About Section */}
      {courseResult.longDescription && (
        <AboutCourseSection description={courseResult.longDescription} />
      )}

      {/* 4. Curriculum Section */}
      {weeks.length > 0 && <CurriculumSection weeks={weeks} />}
    </main>
  );
};

export default CourseDetailPage;