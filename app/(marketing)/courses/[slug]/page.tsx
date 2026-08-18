"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  Check,
  ChevronDown,
  Award,
  Globe,
  Calendar,
  Lock,
} from "lucide-react";
import { sampleCourses, sampleInstructors } from "@/lib/sample-data";
import CourseCard from "@/components/common/CourseCard";

const levelColors: Record<string, string> = {
  BEGINNER: "bg-green-500/20 text-green-300",
  INTERMEDIATE: "bg-cyan-500/20 text-cyan-300",
  ADVANCED: "bg-pink-500/20 text-pink-300",
  ALL_LEVELS: "bg-purple-500/20 text-purple-300",
};

const contentTypeIcons: Record<string, string> = {
  VIDEO: "Video",
  TEXT: "Article",
  PDF: "PDF",
  AUDIO: "Audio",
  INTERACTIVE: "Interactive",
  EXTERNAL_LINK: "Link",
};

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor">("overview");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const course = sampleCourses.find((c) => c.slug === params.slug);

  if (!course) {
    return (
      <main className="min-h-screen bg-[#0a0e27] pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Course Not Found</h1>
        <p className="text-gray-400 mb-8">The course you are looking for does not exist.</p>
        <Link href="/courses" className="text-cyan-400 hover:text-cyan-300">
          Back to Courses
        </Link>
      </main>
    );
  }

  const totalModules = course.modules?.length || 0;
  const totalContents =
    course.modules?.reduce((sum, m) => sum + (m.contents?.length || 0), 0) || 0;
  const totalQuizzes =
    course.modules?.reduce((sum, m) => sum + (m.quizzes?.length || 0), 0) || 0;

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const relatedCourses = sampleCourses
    .filter((c) => c.id !== course.id && c.category.id === course.category.id)
    .slice(0, 3);

  const instructor = course.instructors[0]
    ? sampleInstructors.find((i) => i.id === course.instructors[0]?.id) || course.instructors[0]
    : null;

  return (
    <main className="min-h-screen bg-[#0a0e27]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{course.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                  {course.category.name}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[course.level] || levelColors.ALL_LEVELS}`}>
                  {course.level.replace("_", " ")}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{course.shortDescription}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6">
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span className="text-gray-400">rating</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  {course.enrollmentsCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  {course.durationHours} hours
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-pink-400" />
                  {totalModules} modules
                </span>
              </div>

              {/* Instructor mini */}
              {instructor && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {instructor.firstName} {instructor.lastName}
                    </p>
                    {instructor.bio && (
                      <p className="text-gray-400 text-xs">{instructor.bio}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 sticky top-24">
                {/* Thumbnail */}
                <div className="relative h-44 bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl overflow-hidden mb-6">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-12 h-12 text-white/30" />
                    </div>
                  )}
                  {course.previewVideoUrl && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-white">${course.price}</span>
                </div>

                {/* CTA */}
                <button className="w-full py-4 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all mb-3">
                  Enroll Now
                </button>
                <button className="w-full py-3 bg-white/5 border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-all text-sm">
                  Add to Cart
                </button>

                <p className="text-center text-xs text-gray-400 mt-4 mb-6">
                  30-day money-back guarantee
                </p>

                {/* Features */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2.5 text-gray-300">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    {course.durationHours} hours of content
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-300">
                    <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                    {totalModules} modules, {totalContents} lessons
                  </div>
                  {totalQuizzes > 0 && (
                    <div className="flex items-center gap-2.5 text-gray-300">
                      <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                      {totalQuizzes} quizzes
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 text-gray-300">
                    <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                    Full lifetime access
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-300">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    Access expires in {course.accessExpiresInDays} days
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-300">
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    Certificate of completion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="lg:max-w-[calc(100%-24rem)]">
            {/* Tab Headers */}
            <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5 mb-8">
              {[
                { key: "overview", label: "Overview" },
                { key: "curriculum", label: "Curriculum" },
                { key: "instructor", label: "Instructor" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Long Description */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">About This Course</h2>
                  <p className="text-gray-300 leading-relaxed">{course.longDescription}</p>
                </div>

                {/* What You'll Learn */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">What You Will Learn</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                {course.requirements.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
                    <ul className="space-y-3">
                      {course.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prerequisites */}
                {course.prerequisites.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Prerequisites</h2>
                    <ul className="space-y-3">
                      {course.prerequisites.map((pre, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                          {pre}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum */}
            {activeTab === "curriculum" && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {totalModules} modules &middot; {totalContents} lessons &middot; {course.durationHours} hours
                  </p>
                </div>

                {course.modules && course.modules.length > 0 ? (
                  course.modules
                    .sort((a, b) => (a.serial || 0) - (b.serial || 0))
                    .map((mod, idx) => {
                      const isExpanded = expandedModules.has(mod.id) || idx === 0;
                      return (
                        <div
                          key={mod.id}
                          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                          >
                            <div className="flex items-center gap-4 text-left">
                              <span className="w-8 h-8 bg-cyan-400/10 text-cyan-400 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                <h3 className="text-white font-semibold">{mod.title}</h3>
                                <p className="text-gray-400 text-xs mt-0.5">
                                  Week {mod.weekNumber} &middot; {mod.contents?.length || 0} lessons &middot;{" "}
                                  {mod.estimatedDuration} min
                                </p>
                              </div>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="border-t border-white/10 px-5 pb-5">
                              {"textInstruction" in mod && (mod as any).textInstruction && (
                                <p className="text-gray-400 text-sm py-3 border-b border-white/5">
                                  {(mod as any).textInstruction}
                                </p>
                              )}

                              <div className="divide-y divide-white/5">
                                {(mod.contents || [])
                                  .sort((a, b) => (a.serial || 0) - (b.serial || 0))
                                  .map((content) => (
                                    <div
                                      key={content.id}
                                      className="flex items-center gap-3 py-3 group"
                                    >
                                      {content.contentType === "VIDEO" ? (
                                        <Play className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 shrink-0 transition-colors" />
                                      ) : content.isLocked ? (
                                        <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                                      ) : (
                                        <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                                      )}
                                      <span className="text-gray-300 text-sm flex-1">{content.title}</span>
                                      <span className="text-gray-500 text-xs">
                                        {contentTypeIcons[content.contentType] || content.contentType}
                                      </span>
                                      {content.duration && (
                                        <span className="text-gray-500 text-xs">{content.duration}m</span>
                                      )}
                                      {content.isLocked && (
                                        <Lock className="w-3 h-3 text-gray-500" />
                                      )}
                                    </div>
                                  ))}

                                {(mod.quizzes || []).map((quiz) => (
                                  <div
                                    key={quiz.id}
                                    className="flex items-center gap-3 py-3"
                                  >
                                    <Award className="w-4 h-4 text-purple-400 shrink-0" />
                                    <span className="text-gray-300 text-sm flex-1">{quiz.title}</span>
                                    <span className="text-gray-500 text-xs">Quiz</span>
                                    <span className="text-gray-500 text-xs">{quiz.timeLimit}m</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                ) : (
                  <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-gray-400">Curriculum coming soon.</p>
                  </div>
                )}
              </div>
            )}

            {/* Instructor */}
            {activeTab === "instructor" && (
              <div className="space-y-6">
                {instructor ? (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-cyan-400 to-purple-400 shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {instructor.firstName} {instructor.lastName}
                        </h2>
                        {instructor.qualification && (
                          <p className="text-cyan-400 text-sm mb-3">{instructor.qualification}</p>
                        )}
                        {instructor.bio && <p className="text-gray-300 mb-4">{instructor.bio}</p>}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                          {instructor.experienceYears && (
                            <span>{instructor.experienceYears} years experience</span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            {instructor.rating} rating
                          </span>
                          {instructor.coursesCount && (
                            <span>{instructor.coursesCount} courses</span>
                          )}
                        </div>

                        {instructor.expertise && instructor.expertise.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {instructor.expertise.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-gray-400">Instructor information coming soon.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((c) => (
                <CourseCard
                  key={c.id}
                  id={c.id}
                  title={c.title}
                  slug={c.slug}
                  shortDescription={c.shortDescription}
                  thumbnail={c.thumbnail}
                  price={c.price}
                  level={c.level}
                  category={c.category}
                  instructors={c.instructors}
                  durationHours={c.durationHours}
                  enrollmentsCount={c.enrollmentsCount}
                  rating={c.rating}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
