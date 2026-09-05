import { Award, BookOpen, Trophy, Users } from "lucide-react";
import Text from "@/components/common/Text";

const stats = [
  { icon: Users, value: "5,000+", label: "Active Students", gradient: "from-sky-500/20 to-blue-500/10", text: "text-sky-300" },
  { icon: BookOpen, value: "50+", label: "Expert Courses", gradient: "from-indigo-500/20 to-violet-500/10", text: "text-indigo-300" },
  { icon: Award, value: "3,000+", label: "Certificates Issued", gradient: "from-violet-500/20 to-purple-500/10", text: "text-violet-300" },
  { icon: Trophy, value: "95%", label: "Satisfaction Rate", gradient: "from-fuchsia-500/20 to-pink-500/10", text: "text-fuchsia-300" },
];

export default function StatsBar() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="group flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
              >
                <s.icon className={`w-5 h-5 ${s.text}`} />
              </div>
              <div>
                <Text variant="h3" color="white" size="lg" className="leading-none mb-1">
                  {s.value}
                </Text>
                <Text variant="body" color="dimmed" size="xs">
                  {s.label}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}