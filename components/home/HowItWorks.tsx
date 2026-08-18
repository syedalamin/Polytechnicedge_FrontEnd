import { BookOpen, Code, Award } from "lucide-react";

const steps = [
  { step: "01", title: "Choose a Course", desc: "Browse our catalog and pick a course that matches your career goals.", icon: BookOpen, color: "text-blue-400 bg-blue-500/10" },
  { step: "02", title: "Learn & Practice", desc: "Watch video lessons, complete assignments, and join live support sessions.", icon: Code, color: "text-purple-400 bg-purple-500/10" },
  { step: "03", title: "Get Certified", desc: "Complete the course, earn your certificate, and start your career.", icon: Award, color: "text-pink-400 bg-pink-500/10" },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-400 text-sm">Start your learning journey in 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />

          {steps.map((item, i) => (
            <div key={i} className="text-center relative">
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4 relative z-10`}>
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] text-gray-600 font-mono mb-1">Step {item.step}</p>
              <h3 className="text-base font-bold mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
