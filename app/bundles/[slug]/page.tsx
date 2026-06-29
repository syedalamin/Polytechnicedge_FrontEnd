import Link from "next/link"
import { GraduationCap, BookOpen, Clock, DollarSign, Check, ChevronRight, Star, Users } from "lucide-react"
import { sampleBundles } from "@/lib/sample-data"

export default function BundleDetailPage({ params }: { params: { slug: string } }) {
  const bundle = sampleBundles.find(b => b.slug === params.slug)
  
  if (!bundle) {
    return (
      <main className="min-h-screen bg-[#0a0e27] pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Bundle Not Found</h1>
        <p className="text-gray-400 mb-8">The bundle you're looking for doesn't exist.</p>
        <Link href="/bundles" className="text-cyan-400 hover:text-cyan-300">
          ← Back to Bundles
        </Link>
      </main>
    )
  }

  const totalOriginalPrice = bundle.items.reduce((sum, item) => sum + item.priceAtBundleTime, 0)
  const savings = totalOriginalPrice - bundle.price
  const totalHours = bundle.items.reduce((sum, item) => sum + (item.course.durationHours || 0), 0)
  const allInstructors = bundle.items.flatMap(item => item.course.instructors)

  return (
    <main className="min-h-screen bg-[#0a0e27] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <Link href="/bundles" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Bundles
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                BUNDLE
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium">
                {bundle.items.length} COURSES
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{bundle.title}</h1>
            <p className="text-xl text-gray-300 mb-8">{bundle.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <BookOpen className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{bundle.items.length}</div>
                <div className="text-sm text-gray-400">Courses</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{totalHours}h</div>
                <div className="text-sm text-gray-400">Content</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <Users className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{allInstructors.length}</div>
                <div className="text-sm text-gray-400">Instructors</div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {bundle.items.flatMap(item => 
                  item.course.whatYouWillLearn?.map((skill: string, idx: number) => (
                    <div key={`${item.course.id}-${idx}`} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  )) || []
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">${bundle.price}</span>
                  {savings > 0 && (
                    <span className="text-xl text-gray-500 line-through">${totalOriginalPrice.toFixed(2)}</span>
                  )}
                </div>
                {savings > 0 && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    <DollarSign className="w-3 h-3" />
                    Save ${savings.toFixed(2)} ({Math.round((savings / totalOriginalPrice) * 100)}% off)
                  </div>
                )}
              </div>

              <button className="w-full px-6 py-4 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all mb-4">
                Enroll Now
              </button>

              <p className="text-center text-sm text-gray-400 mb-6">Full lifetime access to all courses</p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-cyan-400" />
                  Access to {bundle.items.length} courses
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-cyan-400" />
                  {totalHours}+ hours of content
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-cyan-400" />
                  Certificate of completion
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-cyan-400" />
                  Instructor support
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-cyan-400" />
                  Downloadable resources
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses in Bundle */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Courses Included</h2>
          <div className="space-y-6">
            {bundle.items.map((item, idx) => (
              <div key={item.course.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all group">
                <div className="flex flex-col md:flex-row">
                  {/* Thumbnail */}
                  <div className="md:w-72 shrink-0 relative">
                    <div className="h-48 md:h-full bg-linear-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      {item.course.thumbnail ? (
                        <img 
                          src={item.course.thumbnail} 
                          alt={item.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <BookOpen className="w-12 h-12 text-white/30" />
                          <span className="text-white/30 text-sm">Course {idx + 1}</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full text-sm text-white font-medium">
                        ${item.priceAtBundleTime}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                      <Link 
                        href={`/courses/${item.course.slug}`}
                        className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors"
                      >
                        {item.course.title}
                      </Link>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                          {item.course.level}
                        </span>
                        <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-white">{item.course.rating}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-4 line-clamp-2">{item.course.shortDescription}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.course.durationHours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {item.course.category.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {item.course.enrollmentsCount} students
                      </span>
                    </div>

                    {item.course.instructors && item.course.instructors[0] && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                        <div className="w-6 h-6 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 shrink-0" />
                        <span className="text-sm text-gray-300">
                          {item.course.instructors[0].firstName} {item.course.instructors[0].lastName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructors */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Your Instructors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allInstructors.map((instructor) => (
              <div key={instructor.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan-400 to-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  {instructor.firstName} {instructor.lastName}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{instructor.bio}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                  <span>{instructor.experienceYears} years exp</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {instructor.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
