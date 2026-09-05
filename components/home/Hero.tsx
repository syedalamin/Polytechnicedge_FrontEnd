import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Feather,
  GraduationCap,
  Highlighter,
  Library,
  Lightbulb,
  Mail,
  NotebookPen,
  PenLine,
  Quote,
  ScrollText,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { sampleCourses } from "@/lib/sample-data";
import Text from "@/components/common/Text";

export default function Hero() {
  const featuredCourse = sampleCourses.find((c) => c.slug === "complete-web-development-bootcamp")!;

  const decorative = [
    { icon: BookOpen, color: "text-blue-400/90", glow: "shadow-blue-500/10", className: "top-20 left-6 lg:left-12", delay: "animation-delay-1000", label: "book" },
    { icon: PenLine, color: "text-amber-400/90", glow: "shadow-amber-500/10", className: "top-20 right-6 lg:right-12", delay: "animation-delay-1500", label: "pen" },
    { icon: Mail, color: "text-rose-400/90", glow: "shadow-rose-500/10", className: "top-1/2 left-3 lg:left-8 -translate-y-1/2", delay: "animation-delay-2000", label: "letter" },
    { icon: NotebookPen, color: "text-purple-400/90", glow: "shadow-purple-500/10", className: "top-1/2 right-3 lg:right-8 -translate-y-1/2", delay: "animation-delay-2500", label: "notebook" },
    { icon: Feather, color: "text-teal-400/90", glow: "shadow-teal-500/10", className: "bottom-24 left-10 lg:left-16", delay: "animation-delay-3000", label: "feather" },
    { icon: ScrollText, color: "text-fuchsia-400/90", glow: "shadow-fuchsia-500/10", className: "bottom-24 right-10 lg:right-16", delay: "animation-delay-1000", label: "scroll" },
  ];

  const stars = [
    { className: "top-[18%] left-[10%]", delay: "animation-delay-1000", size: "w-1 h-1" },
    { className: "top-[30%] left-[85%]", delay: "animation-delay-1500", size: "w-1.5 h-1.5" },
    { className: "top-[65%] left-[8%]", delay: "animation-delay-2000", size: "w-1 h-1" },
    { className: "top-[75%] left-[88%]", delay: "animation-delay-2500", size: "w-1.5 h-1.5" },
    { className: "top-[12%] left-[55%]", delay: "animation-delay-3000", size: "w-[3px] h-[3px]" },
    { className: "top-[80%] left-[45%]", delay: "animation-delay-1000", size: "w-1 h-1" },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0e27] flex items-center">
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0e27] via-[#0d1233] to-[#0a0e27]" />

      {[
        {
          className: "-top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/5",
          delay: "",
        },
        {
          className: "-right-20 top-1/3 w-[500px] h-[500px] bg-purple-600/5",
          delay: "animation-delay-2000",
        },
        {
          className: "-bottom-40 left-1/2 w-[500px] h-[400px] bg-pink-600/5",
          delay: "animation-delay-4000",
        },
      ].map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.className} rounded-full blur-[160px] animate-blob ${orb.delay}`}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.025]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {stars.map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.className} ${s.size} rounded-full bg-blue-400/60 animate-twinkle ${s.delay}`}
        />
      ))}

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-20 z-10">
        <div className="flex flex-col items-center text-center">
          <span className="relative inline-flex items-center gap-2 px-5 py-2 bg-white/[0.05] rounded-full mb-10 border border-white/10 backdrop-blur-md overflow-hidden">
            <span className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/15 to-purple-500/0 animate-shimmer" />
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <Text
              variant="body"
              color="secondary"
              size="sm"
              className="relative"
            >
              Enrollment Open for 2026
            </Text>
          </span>

          <div className="relative mb-7">
            <div className="absolute -inset-10 bg-blue-500/5 rounded-full animate-glow-pulse" />
            <Text
              variant="h1"
              color="white"
              size="4xl"
              className="relative max-w-5xl leading-[1.08] text-center"
            >
              From Classroom to Career.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Simple Courses. Smart Students.
              </span>
            </Text>
          </div>

          <Text
            variant="body"
            color="white"
            size="xl"
            className="max-w-3xl mb-12 text-center"
          >
            Follow a clear and focused journey to make learning easy and
            enjoyable. Master every subject step-by-step, build real-world
            confidence, and shape a brighter future — all in one place.
          </Text>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/courses"
              className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-base transition-all shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:shadow-blue-600/50 hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-700" />
              Explore Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-45 transition-transform" />
            </Link>
            <Link
              href={`/courses/${featuredCourse.slug}`}
              className="relative group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-white/[0.04] text-white border border-white/10 rounded-xl font-bold text-base transition-all hover:border-blue-400/50 hover:bg-white/[0.08] hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-br from-white/0 via-white/0 to-blue-500/10 group-hover:to-blue-500/20 transition-colors" />
              <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="relative">View Course</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Text
              variant="body"
              color="dimmed"
              size="sm"
              className="flex items-center gap-2 group cursor-default"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:rotate-12 transition-transform" />
              Featured course:{" "}
              <span className="text-white font-semibold">
                {featuredCourse.title}
              </span>
            </Text>
            <span className="hidden sm:inline text-gray-700">•</span>
            <Text
              variant="body"
              color="dimmed"
              size="sm"
              className="flex items-center gap-2 group cursor-default"
            >
              <CheckCircle2 className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              {featuredCourse.enrollmentsCount.toLocaleString()}+ students
              enrolled
            </Text>
            <span className="hidden sm:inline text-gray-700">•</span>
            <Text
              variant="body"
              color="dimmed"
              size="sm"
              className="flex items-center gap-2 group cursor-default"
            >
              <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              Get certified
            </Text>
          </div>
        </div>
      </div>

      {decorative.map((d) => (
        <div
          key={d.label}
          className={`absolute hidden md:flex ${d.className} group w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-lg ${d.glow} items-center justify-center hover:scale-125 transition-all duration-300 z-10`}
        >
          <span className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/0 via-white/0 to-white/[0.06] group-hover:via-white/[0.06] transition-colors" />
          <d.icon
            className={`relative w-8 h-8 ${d.color} animate-float ${d.delay}`}
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white/70 animate-pulse" />
        </div>
      ))}

      <div className="absolute top-40 left-16 lg:left-28 hidden md:flex w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md items-center justify-center hover:scale-110 transition-all duration-300 z-10">
        <Highlighter className="w-6 h-6 text-sky-400 animate-float" />
      </div>
      <div className="absolute top-40 right-16 lg:right-28 hidden md:flex w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md items-center justify-center hover:scale-110 transition-all duration-300 z-10">
        <Quote className="w-6 h-6 text-indigo-400 animate-float" />
      </div>
      <div className="absolute top-1/2 left-10 lg:left-20 transform -translate-y-1/2 hidden md:flex w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 items-center justify-center animate-pulse z-10">
        <Lightbulb className="w-5 h-5 text-blue-400" />
      </div>
      <div className="absolute top-1/2 right-10 lg:right-20 transform -translate-y-1/2 hidden md:flex w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 items-center justify-center animate-pulse z-10">
        <Library className="w-5 h-5 text-purple-400" />
      </div>
    </section>
  );
}