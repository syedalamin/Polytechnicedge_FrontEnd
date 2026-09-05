import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { sampleCourses } from "@/lib/sample-data";
import Text from "@/components/common/Text";

const courseAccents = [
  { gradient: "from-sky-500/20 to-blue-500/10", text: "text-sky-300", border: "hover:border-sky-400/30" },
  { gradient: "from-indigo-500/20 to-violet-500/10", text: "text-indigo-300", border: "hover:border-indigo-400/30" },
  { gradient: "from-violet-500/20 to-purple-500/10", text: "text-violet-300", border: "hover:border-violet-400/30" },
];

export default function CourseCatalog() {
  const featuredCourses = sampleCourses.filter((c) => c.isFeatured);

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-white/[0.01]">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <Text variant="caption" color="primary" size="sm" className="mb-3">
              Featured Courses
            </Text>
            <Text variant="h2" color="white" size="3xl" className="mb-2">
              Our Courses
            </Text>
            <Text variant="body" color="ghost" size="md">
              Choose from our curated collection of expert-led courses
            </Text>
          </div>
          <Link
            href="/courses"
            className="group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white font-medium transition-all hover:border-blue-400/50 hover:bg-white/[0.08] hover:-translate-y-0.5 w-fit"
          >
            View All
            <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCourses.map((course, i) => {
            const accent = courseAccents[i % courseAccents.length];

            return (
              <Link key={course.id} href={`/courses/${course.slug}`} className="group block">
                <div
                  className={`relative h-full bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-1.5 hover:shadow-2xl ${accent.border}`}
                >
                  <div className={`relative h-36 bg-gradient-to-br ${accent.gradient}`}>
                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/[0.04] rounded-full blur-2xl" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-black/40 backdrop-blur text-[10px] font-medium text-white rounded">
                        {course.level.replace("_", " ")}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-0.5 bg-gradient-to-r ${accent.gradient.replace("hover", "")} text-white text-xs font-bold rounded`}>
                        ${course.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <span className={`px-1.5 py-0.5 bg-white/[0.05] ${accent.text} text-[9px] font-semibold rounded uppercase tracking-wider w-fit mb-2`}>
                      {course.category.name}
                    </span>
                    <Text variant="h3" color="white" size="md" className="mb-1.5 group-hover:text-sky-300 transition-colors line-clamp-2">
                      {course.title}
                    </Text>
                    <Text variant="body" color="dimmed" size="sm" className="mb-4 line-clamp-2 flex-1">
                      {course.shortDescription}
                    </Text>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <Text variant="body" color="white" size="sm" className="font-semibold">
                          {course.rating}
                        </Text>
                        <Text variant="body" color="dimmed" size="xs">
                          ({course.enrollmentsCount.toLocaleString()})
                        </Text>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <Text variant="body" color="dimmed" size="xs">
                          {course.durationHours}h
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}