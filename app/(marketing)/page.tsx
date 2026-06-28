import Link from "next/link"
import { BookOpen, Users, Award, Clock, ChevronRight, Star, Play } from "lucide-react"
import { sampleCourses, sampleInstructors } from "@/lib/sample-data"

export default function HomePage() {
  const featuredCourses = sampleCourses.filter((c) => c.isFeatured)

  return (
    <main className="min-h-screen bg-[#0a0e27]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            New courses added weekly
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Learn Without
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              Limits
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Discover thousands of courses taught by industry experts. Build skills that matter in today's world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="px-8 py-4 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Explore Courses
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
            >
              Join for Free
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, label: "Courses", value: "500+" },
              { icon: Users, label: "Students", value: "50K+" },
              { icon: Award, label: "Instructors", value: "200+" },
              { icon: Clock, label: "Video Hours", value: "2000+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Courses</h2>
              <p className="text-gray-400">Hand-picked courses from our top instructors</p>
            </div>
            <Link href="/courses" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.slug}`} className="group">
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all">
                  <div className="relative h-48 bg-linear-to-br from-cyan-500/20 to-purple-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/30 group-hover:text-white/50 transition-colors" />
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-sm text-white">
                      ${course.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                        {course.category.name}
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{course.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-purple-400" />
                        <span className="text-sm text-gray-300">
                          {course.instructors[0]?.firstName} {course.instructors[0]?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-white">{course.rating}</span>
                        <span className="text-sm text-gray-400">({course.enrollmentsCount})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Browse by Category</h2>
          <p className="text-gray-400 text-center mb-12">Find the perfect course for your goals</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleCourses.map((course, i) => (
              <Link
                key={course.id}
                href={`/courses?category=${course.category.slug}`}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all group"
              >
                <div className="w-12 h-12 bg-linear-to-br from-cyan-400/20 to-purple-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{course.category.name}</h3>
                <p className="text-gray-400 text-sm">{course.category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Top Instructors</h2>
          <p className="text-gray-400 text-center mb-12">Learn from industry experts</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleInstructors.map((instructor) => (
              <div key={instructor.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  {instructor.firstName} {instructor.lastName}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{instructor.bio}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                  <span>{instructor.experienceYears} years exp</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {instructor.rating}
                  </span>
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
          <p className="text-xl text-gray-300 mb-8">Join thousands of students already learning on PolytechnicEdge</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all"
          >
            Get Started Now
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
    </svg>
  )
}
