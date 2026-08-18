import { Star } from "lucide-react";

const testimonials = [
  { name: "Rakib Hassan", role: "Frontend Developer at TechCorp", text: "The Web Development Bootcamp completely changed my career. Within 3 months of completion, I landed my first developer job!", initials: "RH", gradient: "from-blue-500 to-cyan-500" },
  { name: "Sabrina Akter", role: "Data Analyst at DataFlow", text: "The Data Science course is phenomenal. The hands-on projects with real datasets gave me confidence to work in the industry.", initials: "SA", gradient: "from-purple-500 to-pink-500" },
  { name: "Tanvir Ahmed", role: "Mobile Dev at AppWorks", text: "Best investment in my education. The React Native course helped me build and publish my first app on the Play Store.", initials: "TA", gradient: "from-pink-500 to-rose-500" },
];

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-20 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Student Success Stories</h2>
          <p className="text-gray-400 text-sm">Hear from our graduates who transformed their careers</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${t.gradient} flex items-center justify-center text-[10px] font-bold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-bold">{t.name}</p>
                  <p className="text-[10px] text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
