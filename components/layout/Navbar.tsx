"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, BookOpen, Users, GraduationCap, LayoutDashboard, Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/instructors", label: "Instructors", icon: Users },
  { href: "/bundles", label: "Bundles", icon: GraduationCap },
];

const courseDropdown = [
  { href: "/courses", label: "All Courses" },
  { href: "/courses?level=beginner", label: "Beginner" },
  { href: "/courses?level=intermediate", label: "Intermediate" },
  { href: "/courses?level=advanced", label: "Advanced" },
  { href: "/categories", label: "Categories" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              PolytechnicEdge
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.label === "Courses" ? (
                  <>
                    <button
                      onClick={() => setShowCourses(!showCourses)}
                      className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {showCourses && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-[#0a0e27] border border-white/10 rounded-xl shadow-xl py-2 z-50">
                        {courseDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            onClick={() => setShowCourses(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <div className="h-6 w-px bg-white/10" />

            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 text-cyan-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push("/register")}
              className="px-5 py-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-lg hover:brightness-110 transition-all font-medium"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0e27]/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors py-3 px-3 rounded-lg hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link.icon && <link.icon className="w-5 h-5" />}
                {link.label}
              </Link>
            ))}

            <div className="pt-3 pb-2 px-3">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Course Levels</p>
              {courseDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex gap-3">
              <button
                onClick={() => {
                  router.push("/login");
                  setIsOpen(false);
                }}
                className="flex-1 py-2.5 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  router.push("/register");
                  setIsOpen(false);
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-lg font-medium"
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
