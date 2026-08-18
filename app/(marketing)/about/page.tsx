import Link from "next/link";
import { BookOpen, Users, Award, Clock, Target, Heart, ChevronRight } from "lucide-react";
import { sampleInstructors } from "@/lib/sample-data";

const stats = [
  { icon: BookOpen, label: "Courses", value: "50+" },
  { icon: Users, label: "Students", value: "5,000+" },
  { icon: Award, label: "Instructors", value: "20+" },
  { icon: Clock, label: "Video Hours", value: "1,000+" },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We believe everyone deserves access to quality education. Our platform connects learners with industry experts to build real-world skills.",
  },
  {
    icon: Heart,
    title: "Student First",
    description: "Every decision we make starts with the student experience. From course design to platform features, learners are at the center.",
  },
  {
    icon: Award,
    title: "Quality Content",
    description: "All courses are created by verified instructors with real industry experience. We maintain high standards through our review process.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0e27]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8">
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              PolytechnicEdge
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of tech professionals with industry-relevant skills, 
            expert instruction, and hands-on learning experiences since 2024.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why PolytechnicEdge?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are building the future of online education, one course at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/30 transition-all">
                <div className="w-14 h-14 bg-linear-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Instructors</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Learn from industry experts with years of real-world experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleInstructors.map((instructor) => (
              <div key={instructor.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-400/30 transition-all">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  {instructor.firstName} {instructor.lastName}
                </h3>
                <p className="text-cyan-400 text-xs mb-2">{instructor.qualification}</p>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{instructor.bio}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                  <span>{instructor.experienceYears} years</span>
                  <span>{instructor.coursesCount} courses</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of students already building their careers with us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all"
            >
              Browse Courses
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
