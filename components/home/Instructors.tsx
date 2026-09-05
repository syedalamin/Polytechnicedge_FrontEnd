import { Award, Star, Users } from "lucide-react";
import { sampleInstructors } from "@/lib/sample-data";
import Text from "@/components/common/Text";

export default function Instructors() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <Text variant="caption" color="primary" size="sm" className="mb-3">
            Our Mentors
          </Text>
          <Text variant="h2" color="white" size="3xl" className="mb-2">
            Meet Our Instructors
          </Text>
          <Text variant="body" color="ghost" size="md">
            Learn from industry professionals with real-world experience
          </Text>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {sampleInstructors.map((inst) => (
            <div
              key={inst.id}
              className="group relative text-center p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl hover:border-blue-400/30 hover:bg-white/[0.05] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                  {inst.firstName[0]}
                  {inst.lastName[0]}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0a0e27] flex items-center justify-center">
                  <Award className="w-2.5 h-2.5 text-white" />
                </span>
              </div>

              <Text variant="h3" color="white" size="md" className="mb-0.5 truncate">
                {inst.firstName} {inst.lastName}
              </Text>
              <Text variant="body" color="dimmed" size="xs" className="mb-3 truncate">
                {inst.qualification}
              </Text>

              <div className="flex items-center justify-center gap-3 text-[10px]">
                <span className="flex items-center gap-1 text-gray-400">
                  <Users className="w-3 h-3" />
                  {inst.experienceYears} yrs
                </span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <Text variant="body" color="white" size="xs" className="font-semibold">
                    {inst.rating}
                  </Text>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}