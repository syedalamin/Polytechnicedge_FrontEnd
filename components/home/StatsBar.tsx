import { Users, BookOpen, Award, Trophy } from "lucide-react";

export default function StatsBar() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, value: "5,000+", label: "Active Students", color: "text-blue-400" },
            { icon: BookOpen, value: "50+", label: "Expert Courses", color: "text-purple-400" },
            { icon: Award, value: "3,000+", label: "Certificates Issued", color: "text-pink-400" },
            { icon: Trophy, value: "95%", label: "Satisfaction Rate", color: "text-amber-400" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold">{s.value}</p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
