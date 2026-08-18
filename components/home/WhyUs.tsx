import { Play, Headphones, Award, Download, Code, Users } from "lucide-react";

const features = [
  { icon: Play, title: "Lifetime Video Access", desc: "Watch course videos unlimited times. Learn at your own pace, revisit anytime.", color: "from-blue-500 to-cyan-500" },
  { icon: Headphones, title: "Daily Live Support", desc: "Get help from mentors through daily live support sessions and Q&A rounds.", color: "from-purple-500 to-pink-500" },
  { icon: Award, title: "Verified Certificate", desc: "Receive an industry-recognized certificate upon successful completion.", color: "from-amber-500 to-orange-500" },
  { icon: Download, title: "Offline Access", desc: "Download videos through our mobile app and study without internet.", color: "from-green-500 to-emerald-500" },
  { icon: Code, title: "Hands-on Projects", desc: "Build real-world projects that showcase your skills to employers.", color: "from-pink-500 to-rose-500" },
  { icon: Users, title: "Job Placement Support", desc: "Our team helps with resume review, interview prep, and job referrals.", color: "from-cyan-500 to-blue-500" },
];

export default function WhyUs() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Why <span className="text-blue-400">PolytechnicEdge</span>?
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Everything you need to master tech skills and advance your career
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="group flex gap-4 p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
              <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${f.color} flex-shrink-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
