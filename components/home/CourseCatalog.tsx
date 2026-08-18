import Link from "next/link";
import { ChevronRight, Play, Star } from "lucide-react";
import { sampleCourses } from "@/lib/sample-data";

export default function CourseCatalog() {
  const featuredCourses = sampleCourses.filter((c) => c.isFeatured);

  return (
    <section className="py-16 lg:py-20 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Courses</h2>
            <p className="text-gray-400 text-sm">Choose from our curated collection of expert-led courses</p>
          </div>
          <Link
            href="/courses"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="group block">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-blue-500/20 transition-all h-full flex flex-col">
                <div className="relative h-40 bg-linear-to-br from-blue-600/10 to-purple-600/10">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-black/40 backdrop-blur text-[10px] font-medium text-white rounded">
                      {course.level.replace("_", " ")}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">
                      ${course.price}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-semibold rounded uppercase tracking-wider">
                      {course.category.name}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold mb-1.5 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-1">{course.shortDescription}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px]">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-white">{course.rating}</span>
                      <span>({course.enrollmentsCount.toLocaleString()})</span>
                    </div>
                    <span className="text-gray-500">{course.durationHours}h</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            View All Courses <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
