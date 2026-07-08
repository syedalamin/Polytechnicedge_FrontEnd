"use client";
import GlassCard from "@/components/common/GlassCard";
import Text from "@/components/common/Text";
import MainIcon from "@/components/common/MainIcon";
import { Shield, GraduationCap, Users, BookOpen, ShoppingCart } from "lucide-react";
import { useAllAdmins } from "@/services/graphql/admin/adminHook";
import { useAllInstructors } from "@/services/graphql/instructors/instructorHook";
import { useAllStudents } from "@/services/graphql/students/studentHook";
import { useAllCourses } from "@/services/graphql/courses/courseHook";
import Link from "next/link";

const SuperAdminDashboard = () => {
  const { admins } = useAllAdmins(1, 100);
  const { instructors } = useAllInstructors(1, 100);
  const { students } = useAllStudents(1, 100);
  const { courses } = useAllCourses({}, 1, 100);

  const stats = [
    {
      label: "Total Admins",
      count: admins?.length || 0,
      icon: Shield,
      color: "from-purple-400 to-pink-500",
      href: "/super-admin/admins",
    },
    {
      label: "Total Instructors",
      count: instructors?.length || 0,
      icon: GraduationCap,
      color: "from-cyan-400 to-blue-500",
      href: "/super-admin/instructors",
    },
    {
      label: "Total Students",
      count: students?.length || 0,
      icon: Users,
      color: "from-green-400 to-emerald-500",
      href: "/super-admin/students",
    },
    {
      label: "Total Courses",
      count: courses?.length || 0,
      icon: BookOpen,
      color: "from-amber-400 to-orange-500",
      href: "/super-admin/courses",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <div className="flex items-center gap-3 md:gap-4">
          <MainIcon />
          <div>
            <Text variant="h2" color="primary">
              Super Admin Dashboard
            </Text>
            <Text variant="body" color="secondary">
              Full platform oversight and management
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}>
              <GlassCard paddingSize="xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br ${s.color} flex items-center justify-center shadow-lg shrink-0`}>
                    <s.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <Text variant="caption" size="sm" color="dimmed" className="truncate">
                      {s.label}
                    </Text>
                    <Text variant="h2" size="lg" color="white" className="mt-0.5 sm:mt-1">
                      {s.count}
                    </Text>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <GlassCard paddingSize="md">
          <Text variant="body" color="white" size="md">
            Quick Actions
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <Link href="/super-admin/admins" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Shield className="w-6 h-6 text-purple-400 mb-2" />
              <Text variant="body" color="white" size="sm">Manage Admins</Text>
            </Link>
            <Link href="/super-admin/instructors" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <GraduationCap className="w-6 h-6 text-cyan-400 mb-2" />
              <Text variant="body" color="white" size="sm">Manage Instructors</Text>
            </Link>
            <Link href="/super-admin/students" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Users className="w-6 h-6 text-green-400 mb-2" />
              <Text variant="body" color="white" size="sm">Manage Students</Text>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
