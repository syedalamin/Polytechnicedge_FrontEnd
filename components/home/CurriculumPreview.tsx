import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { sampleCourses } from "@/lib/sample-data";

export default function CurriculumPreview() {
  const featuredCourse = sampleCourses.find((c) => c.slug === "complete-web-development-bootcamp")!;

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Comprehensive
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400"> Curriculum</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Our courses are structured to take you from absolute beginner to job-ready professional. Each module builds on the previous one with hands-on practice and real projects.
            </p>

            <div className="space-y-3 mb-6">
              {featuredCourse.modules.map((mod) => (
                <div key={mod.id} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg">
                  <div className="w-7 h-7 rounded-md bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-blue-400">
                    {String(mod.serial).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{mod.title}</p>
                    <p className="text-[11px] text-gray-500">
                      {mod.contents.length} lessons · {Math.round(mod.estimatedDuration / 60)}h
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/courses/${featuredCourse.slug}`}
              className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View Full Curriculum <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-5">What You&apos;ll Learn</h3>
            <div className="space-y-3">
              {featuredCourse.whatYouWillLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
