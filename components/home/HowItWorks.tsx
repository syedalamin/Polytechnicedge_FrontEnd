import { Award, BookOpen, Code, Sparkles } from "lucide-react";
import Text from "@/components/common/Text";

const steps = [
  {
    step: "01",
    title: "Choose a Course",
    desc: "Browse our catalog and pick a course that matches your career goals.",
    icon: BookOpen,
    gradient: "from-sky-500 to-blue-500",
    text: "text-sky-300",
  },
  {
    step: "02",
    title: "Learn & Practice",
    desc: "Watch video lessons, complete assignments, and join live support sessions.",
    icon: Code,
    gradient: "from-violet-500 to-purple-500",
    text: "text-violet-300",
  },
  {
    step: "03",
    title: "Get Certified",
    desc: "Complete the course, earn your certificate, and start your career.",
    icon: Award,
    gradient: "from-fuchsia-500 to-pink-500",
    text: "text-fuchsia-300",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <Text variant="caption" color="primary" size="sm" className="mb-3">
            Simple Process
          </Text>
          <Text variant="h2" color="white" size="3xl" className="mb-2">
            How It Works
          </Text>
          <Text variant="body" color="ghost" size="md">
            Start your learning journey in 3 simple steps
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[17%] right-[17%] h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30" />

          {steps.map((item, i) => (
            <div
              key={item.step}
              className="group relative text-center flex flex-col items-center"
            >
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center items-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative z-10`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center z-20">
                  <Text variant="caption" color="white" size="xs" className="text-[10px]">
                    {item.step}
                  </Text>
                </div>
              </div>

              <Text variant="h3" color="white" size="lg" className="mb-2">
                {item.title}
              </Text>
              <Text variant="body" color="dimmed" size="sm" className="max-w-xs">
                {item.desc}
              </Text>

              <span className={`mt-4 inline-flex items-center gap-1 ${item.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                <Sparkles className="w-3 h-3" />
                Step {item.step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}