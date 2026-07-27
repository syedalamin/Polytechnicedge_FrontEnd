"use client";
import GlassCard from "@/components/common/GlassCard";
import Text from "@/components/common/Text";
import MainIcon from "@/components/common/MainIcon";
import { BookOpen, Users, TrendingUp } from "lucide-react";
import { useMeForAuth } from "@/services/graphql/user/userHook";
import { useAllCourses } from "@/services/graphql/courses/courseHook";
import { useAllStudents } from "@/services/graphql/students/studentHook";
import { useAllUserProgress } from "@/services/graphql/progress/progressHook";
import Link from "next/link";

const InstructorDashboard = () => {
  const { data: me } = useMeForAuth();
  const instructorId = me?.instructorProfile?.id || "";
  const { courses: allCourses } = useAllCourses({}, 1, 100);
  const { students } = useAllStudents(1, 100);
  const { progressList } = useAllUserProgress({}, 1, 100);

  const myCourses = allCourses.filter((c: any) =>
    c.instructors?.some((ci: any) => ci.instructorId === instructorId)
  );

  const avgProgress =
    Array.isArray(progressList) && progressList.length > 0
      ? Math.round(
          progressList.reduce((s: number, p: any) => s + (p.progress || 0), 0) /
            progressList.length
        )
      : 0;

  const stats = [
    {
      label: "My Courses",
      count: myCourses.length,
      icon: BookOpen,
      color: "from-cyan-400 to-blue-500",
      href: "/instructor/courses",
    },
    {
      label: "Total Students",
      count: students?.length || 0,
      icon: Users,
      color: "from-green-400 to-emerald-500",
      href: "/instructor/students",
    },
    {
      label: "Avg Progress",
      count: `${avgProgress}%`,
      icon: TrendingUp,
      color: "from-amber-400 to-orange-500",
      href: "/instructor/students",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <div className="flex items-center gap-3 md:gap-4">
          <MainIcon />
          <div>
            <Text variant="h2" color="primary">
              Instructor Dashboard
            </Text>
            <Text variant="body" color="secondary">
              Welcome back, {me?.username || "Instructor"}!
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
                    <Text variant="caption" size="sm" color="dimmed" className="truncate">{s.label}</Text>
                    <Text variant="h2" size="lg" color="white" className="mt-0.5 sm:mt-1">{s.count}</Text>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <GlassCard paddingSize="md">
          <Text variant="body" color="white" size="md">Quick Actions</Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <Link href="/instructor/courses" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <BookOpen className="w-6 h-6 text-cyan-400 mb-2" />
              <Text variant="body" color="white" size="sm">My Courses</Text>
            </Link>
            <Link href="/instructor/students" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Users className="w-6 h-6 text-green-400 mb-2" />
              <Text variant="body" color="white" size="sm">View Students</Text>
            </Link>
            <Link href="/instructor/notices" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <TrendingUp className="w-6 h-6 text-amber-400 mb-2" />
              <Text variant="body" color="white" size="sm">Notices</Text>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default InstructorDashboard;
