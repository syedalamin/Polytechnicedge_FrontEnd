import { Award, Code, Download, Headphones, Play, Users } from "lucide-react";
import Text from "@/components/common/Text";

const features = [
  {
    icon: Play,
    title: "Lifetime Video Access",
    desc: "Watch course videos unlimited times. Learn at your own pace, revisit anytime.",
    gradient: "from-sky-500/25 to-blue-500/10",
    text: "text-sky-300",
    glow: "group-hover:shadow-sky-500/20",
  },
  {
    icon: Headphones,
    title: "Daily Live Support",
    desc: "Get help from mentors through daily live support sessions and Q&A rounds.",
    gradient: "from-indigo-500/25 to-violet-500/10",
    text: "text-indigo-300",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: Award,
    title: "Verified Certificate",
    desc: "Receive an industry-recognized certificate upon successful completion.",
    gradient: "from-violet-500/25 to-purple-500/10",
    text: "text-violet-300",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: Download,
    title: "Offline Access",
    desc: "Download videos through our mobile app and study without internet.",
    gradient: "from-blue-500/25 to-cyan-500/10",
    text: "text-blue-300",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    icon: Code,
    title: "Hands-on Projects",
    desc: "Build real-world projects that showcase your skills to employers.",
    gradient: "from-fuchsia-500/25 to-pink-500/10",
    text: "text-fuchsia-300",
    glow: "group-hover:shadow-fuchsia-500/20",
  },
  {
    icon: Users,
    title: "Job Placement Support",
    desc: "Our team helps with resume review, interview prep, and job referrals.",
    gradient: "from-purple-500/25 to-fuchsia-500/10",
    text: "text-purple-300",
    glow: "group-hover:shadow-purple-500/20",
  },
];

const patterns = [
  "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.05), transparent 45%)",
  "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
  "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  "linear-gradient(45deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  "radial-gradient(circle at 15% 85%, rgba(255,255,255,0.05), transparent 45%)",
  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {[
        { className: "-top-24 -right-20 w-[480px] h-[480px] bg-blue-600/10", delay: "" },
        { className: "-bottom-24 -left-20 w-[420px] h-[420px] bg-purple-600/10", delay: "animation-delay-2000" },
      ].map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.className} rounded-full blur-[130px] animate-blob ${orb.delay} pointer-events-none`}
        />
      ))}

      {[
        { className: "top-[15%] left-[10%]", delay: "animation-delay-1000" },
        { className: "top-[25%] right-[14%]", delay: "animation-delay-1500" },
        { className: "bottom-[20%] left-[16%]", delay: "animation-delay-2000" },
        { className: "bottom-[25%] right-[10%]", delay: "animation-delay-2500" },
      ].map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.className} w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-twinkle ${p.delay} pointer-events-none`}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <Text variant="caption" color="primary" size="sm" className="mb-3">
            Why PolytechnicEdge
          </Text>
          <div className="flex items-center gap-4 mb-3">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-blue-400/60 hidden sm:block" />
            <Text variant="h2" color="white" size="3xl">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">PolytechnicEdge</span>?
            </Text>
            <span className="w-10 h-px bg-gradient-to-l from-transparent to-purple-400/60 hidden sm:block" />
          </div>
          <Text variant="body" color="ghost" size="md" className="max-w-md">
            Everything you need to master tech skills and advance your career
          </Text>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative h-full bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/15 hover:-translate-y-1.5 hover:shadow-2xl ${f.glow}`}
              style={{
                backgroundImage: patterns[i % patterns.length],
                backgroundSize: "40px 40px, 24px 24px, auto, auto, auto",
              }}
            >
              <span className="absolute top-4 right-5 font-bold text-4xl text-white/[0.06] group-hover:text-white/[0.10] transition-colors tabular-nums">
                0{i + 1}
              </span>

              <div
                className={`absolute top-0 left-7 w-8 h-1 rounded-b-full bg-gradient-to-r ${f.gradient.replace("hover", "")} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
              />

              <div className="relative mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg transition-all duration-300`}
                >
                  <f.icon className={`w-7 h-7 ${f.text}`} />
                </div>
              </div>

              <Text variant="h3" color="white" size="md" className="mb-2">
                {f.title}
              </Text>
              <Text variant="body" color="dimmed" size="sm">
                {f.desc}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}