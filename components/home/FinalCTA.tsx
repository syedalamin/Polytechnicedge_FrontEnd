import Link from "next/link";
import { ArrowRight, Rocket, Sparkles, UserPlus } from "lucide-react";
import Text from "@/components/common/Text";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/15 via-purple-600/10 to-pink-600/15 border border-white/[0.08] rounded-3xl p-8 sm:p-14">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-blob" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="relative">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] border border-white/10 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <Text variant="caption" color="white" size="xs">
                Get Started Today
              </Text>
            </span>

            <Text variant="h2" color="white" size="4xl" className="mb-4">
              Ready to Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Journey?
              </span>
            </Text>

            <Text variant="body" color="ghost" size="lg" className="max-w-xl mx-auto mb-10">
              Join 5,000+ students already learning on PolytechnicEdge. Start with our courses today and build the skills employers are looking for.
            </Text>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/courses"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm transition-all shadow-xl shadow-blue-600/40 hover:shadow-2xl hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-700" />
                <Rocket className="w-4 h-4" />
                Browse Courses
              </Link>
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 rounded-xl font-bold text-sm transition-all hover:border-blue-400/40 hover:-translate-y-0.5"
              >
                <UserPlus className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}