import { Quote, Star } from "lucide-react";
import Text from "@/components/common/Text";

const testimonials = [
  { name: "Rakib Hassan", role: "Frontend Developer at TechCorp", text: "The Web Development Bootcamp completely changed my career. Within 3 months of completion, I landed my first developer job!", initials: "RH", gradient: "from-sky-500 to-blue-500" },
  { name: "Sabrina Akter", role: "Data Analyst at DataFlow", text: "The Data Science course is phenomenal. The hands-on projects with real datasets gave me confidence to work in the industry.", initials: "SA", gradient: "from-violet-500 to-purple-500" },
  { name: "Tanvir Ahmed", role: "Mobile Dev at AppWorks", text: "Best investment in my education. The React Native course helped me build and publish my first app on the Play Store.", initials: "TA", gradient: "from-fuchsia-500 to-pink-500" },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-white/[0.01]">
      <div className="absolute -top-24 left-1/4 w-[500px] h-[300px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <Text variant="caption" color="primary" size="sm" className="mb-3">
            Testimonials
          </Text>
          <Text variant="h2" color="white" size="3xl" className="mb-2">
            Student Success Stories
          </Text>
          <Text variant="body" color="ghost" size="md">
            Hear from our graduates who transformed their careers
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl hover:border-white/15 hover:bg-white/[0.05] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-white/[0.06] group-hover:text-white/[0.10] transition-colors" />

              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <Text variant="body" color="ghost" size="sm" className="mb-6 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </Text>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform`}
                >
                  {t.initials}
                </div>
                <div>
                  <Text variant="h3" color="white" size="sm" className="mb-0.5">
                    {t.name}
                  </Text>
                  <Text variant="body" color="dimmed" size="xs">
                    {t.role}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}