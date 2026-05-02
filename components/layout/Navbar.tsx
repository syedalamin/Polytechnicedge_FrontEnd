"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              PolytechnicEdge
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/courses"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-cyan-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-lg hover:brightness-110 transition-all"
            >
              Sign Up
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0e27]/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-300 hover:text-white transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-300 hover:text-white transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/courses"
              className="block text-gray-300 hover:text-white transition-colors py-2"
            >
              Courses
            </Link>
            <Link
              href="/contact"
              className="block text-gray-300 hover:text-white transition-colors py-2"
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => router.push("/login")}
                className="block w-full text-left text-cyan-400 py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/register")}
                className="block w-full py-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-lg text-center"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
