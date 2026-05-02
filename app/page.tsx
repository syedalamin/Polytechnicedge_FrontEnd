"use client";

import { Sparkles, BookOpen, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import GradientButton from "@/components/shared/GradientButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <main className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl blur-2xl opacity-50 animate-pulse" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-transform duration-500">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                PolytechnicEdge
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl">
              Shape Your Future with Excellence
            </p>

            <p className="text-gray-400 mb-12 max-w-2xl text-lg">
              Join thousands of students discovering their potential through
              innovative learning experiences and cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/register">
                <GradientButton className="px-8 py-4 text-lg">
                  Get Started
                  <ArrowRight className="w-5 h-5 inline-block ml-2" />
                </GradientButton>
              </Link>
              <Link href="/login">
                <button className="px-8 py-4 backdrop-blur-xl bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg">
                  Sign In
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
              {[
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: "Expert-Led Courses",
                  desc: "Learn from industry professionals",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Vibrant Community",
                  desc: "Connect with like-minded learners",
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Recognized Certificates",
                  desc: "Earn credentials that matter",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
