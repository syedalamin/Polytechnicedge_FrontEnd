import { Star } from "lucide-react";
import { sampleInstructors } from "@/lib/sample-data";

export default function Instructors() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Meet Our Instructors</h2>
          <p className="text-gray-400 text-sm">Learn from industry professionals with real-world experience</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sampleInstructors.map((inst) => (
            <div key={inst.id} className="text-center p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.1] transition-all">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <div className="w-full h-full rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                  {inst.firstName[0]}{inst.lastName[0]}
                </div>
              </div>
              <p className="text-sm font-bold mb-0.5">{inst.firstName} {inst.lastName}</p>
              <p className="text-[10px] text-gray-500 mb-2">{inst.qualification}</p>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <span>{inst.experienceYears} years</span>
                <span className="text-gray-600">·</span>
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">{inst.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
