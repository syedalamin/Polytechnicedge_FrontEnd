import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { sampleCategories } from "@/lib/sample-data";

const categoryIcons: Record<string, string> = {
  "web-development": "🌐",
  "data-science": "📊",
  "mobile-development": "📱",
  "devops": "☁️",
  "ui-ux-design": "🎨",
  "cyber-security": "🔒",
};

const categoryColors: Record<string, string> = {
  "web-development": "from-blue-500/15 to-cyan-500/15 border-blue-500/10 hover:border-blue-500/25",
  "data-science": "from-purple-500/15 to-pink-500/15 border-purple-500/10 hover:border-purple-500/25",
  "mobile-development": "from-green-500/15 to-emerald-500/15 border-green-500/10 hover:border-green-500/25",
  "devops": "from-orange-500/15 to-amber-500/15 border-orange-500/10 hover:border-orange-500/25",
  "ui-ux-design": "from-pink-500/15 to-rose-500/15 border-pink-500/10 hover:border-pink-500/25",
  "cyber-security": "from-red-500/15 to-rose-500/15 border-red-500/10 hover:border-red-500/25",
};

const categoryTextColors: Record<string, string> = {
  "web-development": "text-blue-400",
  "data-science": "text-purple-400",
  "mobile-development": "text-green-400",
  "devops": "text-orange-400",
  "ui-ux-design": "text-pink-400",
  "cyber-security": "text-red-400",
};

export default function BrowseCategories() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-gray-400 text-sm">Find the right path for your career goals</p>
          </div>
          <Link
            href="/courses"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            All Courses <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleCategories.map((cat) => {
            const colors = categoryColors[cat.slug] || "from-gray-500/15 to-gray-500/15 border-gray-500/10";
            const textColor = categoryTextColors[cat.slug] || "text-gray-400";
            const emoji = categoryIcons[cat.slug] || "📚";

            return (
              <Link
                key={cat.id}
                href={`/courses?category=${cat.slug}`}
                className="group block"
              >
                <div className={`relative bg-linear-to-br ${colors} border rounded-xl p-6 transition-all overflow-hidden`}>
                  {/* Subtle pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    <span className="text-3xl mb-4 block">{emoji}</span>
                    <h3 className={`text-base font-bold mb-1.5 ${textColor} group-hover:translate-x-1 transition-transform`}>
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                      Explore courses
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
