"use client";
import GlassCard from "@/components/common/GlassCard";
import Text from "@/components/common/Text";
import MainIcon from "@/components/common/MainIcon";
import { GraduationCap, BookOpen, ShoppingCart, Users } from "lucide-react";
import { useAllCourses } from "@/services/graphql/courses/courseHook";
import { useAllCategory } from "@/services/graphql/category/categoryHook";
import Link from "next/link";

const AdminDashboard = () => {
  const { courses } = useAllCourses({}, 1, 100);
  const { categories } = useAllCategory(1, 100);

  const stats = [
    {
      label: "Total Courses",
      count: courses?.length || 0,
      icon: GraduationCap,
      color: "from-cyan-400 to-blue-500",
      href: "/admin/courses",
    },
    {
      label: "Total Categories",
      count: categories?.length || 0,
      icon: BookOpen,
      color: "from-purple-400 to-pink-500",
      href: "/admin/category",
    },
    {
      label: "Total Orders",
      count: 0,
      icon: ShoppingCart,
      color: "from-amber-400 to-orange-500",
      href: "/admin/orders",
    },
    {
      label: "Students",
      count: 0,
      icon: Users,
      color: "from-green-400 to-emerald-500",
      href: "/admin/enrollments",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <div className="flex items-center gap-3 md:gap-4">
          <MainIcon />
          <div>
            <Text variant="h2" color="primary">
              Admin Dashboard
            </Text>
            <Text variant="body" color="secondary">
              Welcome to the admin panel
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}>
              <GlassCard paddingSize="xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-linear-to-br ${s.color} flex items-center justify-center shadow-lg shrink-0`}
                  >
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
            <Link href="/admin/courses" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <GraduationCap className="w-6 h-6 text-cyan-400 mb-2" />
              <Text variant="body" color="white" size="sm">Manage Courses</Text>
            </Link>
            <Link href="/admin/category" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <BookOpen className="w-6 h-6 text-purple-400 mb-2" />
              <Text variant="body" color="white" size="sm">Manage Categories</Text>
            </Link>
            <Link href="/admin/orders" className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <ShoppingCart className="w-6 h-6 text-amber-400 mb-2" />
              <Text variant="body" color="white" size="sm">View Orders</Text>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
