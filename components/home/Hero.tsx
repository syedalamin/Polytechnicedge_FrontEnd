import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { sampleCourses } from "@/lib/sample-data";

export default function Hero() {
  const featuredCourse = sampleCourses.find((c) => c.slug === "complete-web-development-bootcamp")!;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0e27] via-[#0d1233] to-[#0a0e27]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium mb-6 border border-blue-500/10">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              Enrollment Open for 2026
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Learn Technology.
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                Build Your Career.
              </span>
            </h1>

            <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Master in-demand skills with expert-led courses. From Web Development to Data Science — learn at your own pace and get certified.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { num: "50+", label: "Courses" },
                { num: "5,000+", label: "Students" },
                { num: "20+", label: "Mentors" },
                { num: "95%", label: "Placement" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-white">{s.num}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/courses/${featuredCourse.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-semibold text-sm transition-colors"
              >
                <Play className="w-4 h-4 text-blue-400" fill="currentColor" />
                Watch Preview
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="relative h-48 bg-linear-to-br from-blue-600/20 to-purple-600/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-blue-600 text-white text-[11px] font-semibold rounded-md">FEATURED</span>
                  <span className="px-2.5 py-1 bg-black/40 backdrop-blur text-white text-[11px] font-medium rounded-md">
                    {featuredCourse.level.replace("_", " ")}
                  </span>
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/40 backdrop-blur rounded-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold text-white">{featuredCourse.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-semibold rounded uppercase tracking-wider">
                    {featuredCourse.category.name}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{featuredCourse.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{featuredCourse.shortDescription}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span>{featuredCourse.durationHours}h total</span>
                  <span>{featuredCourse.modules.length} modules</span>
                  <span>{featuredCourse.enrollmentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                      {featuredCourse.instructors[0]?.firstName[0]}{featuredCourse.instructors[0]?.lastName[0]}
                    </div>
                    <span className="text-xs text-gray-300">
                      {featuredCourse.instructors[0]?.firstName} {featuredCourse.instructors[0]?.lastName}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">${featuredCourse.price}</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-[#111638] border border-white/[0.08] rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <span className="text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Certificate</p>
                <p className="text-xs font-semibold">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
