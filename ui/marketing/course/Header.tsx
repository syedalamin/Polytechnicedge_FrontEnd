import { BookOpen } from "lucide-react";

const MarketingCourseHeader = () => {
  return (
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
  );
};

export default MarketingCourseHeader;