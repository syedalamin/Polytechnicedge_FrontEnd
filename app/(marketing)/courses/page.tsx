"use client";

import CourseCard from "@/components/common/CourseCard";
import { usePublishedCourses } from "@/services/graphql";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CoursesPage() {
  const [page, setPage] = useState(1);
  const limit = 1;
  const { courses, meta, loading } = usePublishedCourses({}, page, limit);

  const hasNextPage = meta ? page < meta.totalPages : false;
  const hasPrevPage = meta ? page > 1 : false;

  const goToNextPage = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (hasPrevPage) setPage((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen bg-[#0a0e27]">
      {/* Hero */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 left-10 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute top-32 right-10 w-60 h-60 bg-purple-400/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-6">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            courses available
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              Courses
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Find the perfect course to advance your career. Learn from industry
            experts at your own pace.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto mt-12">
          {loading ? (
            <p className="text-white text-center">Loading courses...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>

              {/* Pagination */}
              {meta && meta.totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={goToPrevPage}
                    disabled={!hasPrevPage}
                    className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                  </button>
                  <span className="text-gray-400 text-sm">
                    Page {meta.page} of {meta.totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={!hasNextPage}
                    className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition"
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
