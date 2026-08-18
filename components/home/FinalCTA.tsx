import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-linear-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/[0.06] rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
            Join 5,000+ students already learning on PolytechnicEdge. Start with our courses today and build the skills employers are looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
            >
              Browse Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-semibold text-sm transition-colors"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
