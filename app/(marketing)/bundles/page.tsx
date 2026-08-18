import Link from "next/link"
import { GraduationCap, BookOpen, DollarSign, Tag, ChevronRight, Check } from "lucide-react"
import { sampleBundles } from "@/lib/sample-data"

export default function BundlesPage() {
  return (
    <main className="min-h-screen bg-[#0a0e27] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-6">
          <GraduationCap className="w-4 h-4 text-purple-400" />
          Save more with bundles
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Course
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
            Bundles
          </span>
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Get multiple courses at a discounted price. Our bundles are carefully curated to give you comprehensive learning paths.
        </p>
      </div>

      {/* Bundles Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleBundles.map((bundle) => {
          const totalOriginalPrice = bundle.items.reduce((sum, item) => sum + item.priceAtBundleTime, 0)
          const savings = totalOriginalPrice - bundle.price
          const savingsPercent = Math.round((savings / totalOriginalPrice) * 100)

          return (
            <div
              key={bundle.id}
              className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-purple-400/50 transition-all duration-300"
            >
              {/* Popular Badge */}
              {savingsPercent >= 30 && (
                <div className="absolute top-6 right-6 z-10 px-3 py-1 bg-linear-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full">
                  SAVE {savingsPercent}%
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div className="w-14 h-14 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7 text-purple-400" />
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-3">{bundle.title}</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">{bundle.description}</p>

                {/* Courses Included */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {bundle.items.length} Course{bundle.items.length > 1 ? "s" : ""} Included
                  </p>
                  <div className="space-y-2">
                    {bundle.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{item.course.title}</span>
                        <span className="text-gray-500 ml-auto">${item.priceAtBundleTime}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-white/10 pt-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-white">${bundle.price}</span>
                    {savings > 0 && (
                      <span className="text-lg text-gray-500 line-through">${totalOriginalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {savings > 0 && (
                    <p className="text-sm text-green-400">
                      You save ${savings.toFixed(2)} ({savingsPercent}% off)
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/bundles/${bundle.slug}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all group"
                >
                  View Bundle
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto mt-20 text-center bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
        <p className="text-gray-300 mb-8">Browse our individual courses or contact us for custom learning paths.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses"
            className="px-8 py-3 bg-white/5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
          >
            Browse Courses
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:brightness-110 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  )
}
