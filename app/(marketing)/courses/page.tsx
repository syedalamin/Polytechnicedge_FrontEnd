import MarketingCourseList from "@/ui/marketing/course/CourseList";
import MarketingCourseHeader from "@/ui/marketing/course/Header";

 
export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#0a0e27]">
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 left-10 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute top-32 right-10 w-60 h-60 bg-purple-400/15 rounded-full blur-3xl" />

        <MarketingCourseHeader />
        <MarketingCourseList />
      </section>
    </main>
  );
}
