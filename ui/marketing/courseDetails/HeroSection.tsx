import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import { ICourse } from "@/services/graphql";
import { BookOpen, Play } from "lucide-react";
import Link from "next/link";

const HeroSection = ({ course }: { course: ICourse }) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />

      <div className="relative max-w-6xl mx-auto">
        <Link href="/courses">
          <Text color="primary" size="sm" className="mb-4">
            ← Back to Courses
          </Text>
        </Link>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col items-start gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Premium Course
            </span>

            <Text color="primary" size="xl" variant="h1">
              {course.title}
            </Text>

            {course.shortDescription && (
              <Text color="white" size="sm" variant="body">
                {course.shortDescription}
              </Text>
            )}

            {course.previewVideoUrl && (
              <>
                <Link
                  href={course.previewVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="extra"
                    leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                  >
                    Watch Preview Video
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Right Image Card */}
          <div className="lg:col-span-5">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/15 shadow-xl bg-[#0d1230]">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-cyan-900/30 via-purple-900/30 to-slate-900 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
