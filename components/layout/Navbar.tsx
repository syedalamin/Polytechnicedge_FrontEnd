"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Shield, GraduationCap, Users, Menu, X } from "lucide-react";

import { AuthStatus } from "./AuthStatus";
import MainIcon from "../common/MainIcon";
import { getCookie } from "@/utils/cookie";

const publicLinks: { href: string; label: string; icon?: any }[] = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/bundles", label: "Bundles" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const roleLinks: Record<string, { href: string; label: string; icon?: any }[]> = {
  SUPER_ADMIN: [
    { href: "/super-admin", label: "Dashboard", icon: Shield },
    { href: "/admin", label: "Admin", icon: Shield },
    { href: "/instructor", label: "Instructor", icon: GraduationCap },
    { href: "/student", label: "Student", icon: Users },
  ],
  ADMIN: [
    { href: "/admin", label: "Dashboard", icon: Shield },
  ],
  INSTRUCTOR: [
    { href: "/instructor", label: "Dashboard", icon: GraduationCap },
  ],
  STUDENT: [
    { href: "/student", label: "Dashboard", icon: Users },
  ],
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const loginData = getCookie("loginData");
  const role = loginData?.role as string | undefined;
  const extraLinks = role ? roleLinks[role] || [] : [];

  const allLinks = [...publicLinks, ...extraLinks];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e27]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <MainIcon />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              PolytechnicEdge
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-cyan-400 bg-white/5"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <div className="h-6 w-px bg-white/10" />
            <AuthStatus />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0e27]/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-cyan-400 bg-white/5"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-3 mt-3">
              <AuthStatus />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
