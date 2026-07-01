"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  BookOpen,
  TrendingUp,
  ChevronRight,
  GraduationCap,
  Award,
  DollarSign,
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Bell,
} from "lucide-react";
import Link from "next/link";
  

const stats = [
  {
    label: "Total Admins",
    value: "12",
    icon: Users,
    color: "from-cyan-400 to-blue-500",
    change: "+2 this month",
    changeType: "up",
  },
  {
    label: "Total Students",
    value: "1,234",
    icon: GraduationCap,
    color: "from-purple-400 to-pink-500",
    change: "+12% vs last month",
    changeType: "up",
  },
  {
    label: "Total Courses",
    value: "56",
    icon: BookOpen,
    color: "from-pink-400 to-rose-500",
    change: "+3 new this week",
    changeType: "up",
  },
  {
    label: "Revenue",
    value: "$12.5K",
    icon: DollarSign,
    color: "from-amber-400 to-orange-500",
    change: "+8% growth rate",
    changeType: "up",
  },
  {
    label: "Active Today",
    value: "342",
    icon: Clock,
    color: "from-emerald-400 to-teal-500",
    change: "78% engagement",
    changeType: "up",
  },
  {
    label: "Pending Reviews",
    value: "18",
    icon: AlertCircle,
    color: "from-red-400 to-rose-500",
    change: "Needs attention",
    changeType: "down",
  },
];

const activities = [
  {
    icon: GraduationCap,
    iconColor: "bg-cyan-500/20 text-cyan-400",
    text: "New student enrolled in ",
    highlight: "Web Development",
    time: "2m ago",
  },
  {
    icon: BookOpen,
    iconColor: "bg-purple-500/20 text-purple-400",
    text: "Course updated: ",
    highlight: "Data Science",
    time: "15m ago",
  },
  {
    icon: UserPlus,
    iconColor: "bg-pink-500/20 text-pink-400",
    text: "New admin ",
    highlight: "Sarah Khan",
    extra: " added",
    time: "1h ago",
  },
  {
    icon: DollarSign,
    iconColor: "bg-emerald-500/20 text-emerald-400",
    text: "Payment received for ",
    highlight: "UI/UX Design",
    time: "2h ago",
  },
  {
    icon: Award,
    iconColor: "bg-amber-500/20 text-amber-400",
    text: "Student ",
    highlight: "Alex Ray",
    extra: " completed Python course",
    time: "3h ago",
  },
  {
    icon: Bell,
    iconColor: "bg-blue-500/20 text-blue-400",
    text: "New review on ",
    highlight: "React Basics",
    time: "5h ago",
  },
  {
    icon: CheckCircle,
    iconColor: "bg-teal-500/20 text-teal-400",
    text: "Certificate issued to ",
    highlight: "Maria Lopez",
    time: "6h ago",
  },
];

const coursePerformance = [
  {
    name: "Web Development",
    students: 342,
    revenue: "$45,230",
    rating: 4.8,
    status: "active",
  },
  {
    name: "Data Science",
    students: 218,
    revenue: "$32,100",
    rating: 4.6,
    status: "active",
  },
  {
    name: "UI/UX Design",
    students: 167,
    revenue: "$21,450",
    rating: 4.9,
    status: "active",
  },
  {
    name: "Python Basics",
    students: 289,
    revenue: "$28,700",
    rating: 4.7,
    status: "active",
  },
  {
    name: "React Advanced",
    students: 134,
    revenue: "$18,900",
    rating: 4.5,
    status: "draft",
  },
];

const recentEnrollments = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    course: "Web Development",
    date: "Today, 10:30 AM",
    avatar: "EJ",
    amount: "$299",
  },
  {
    name: "Michael Chen",
    email: "michael@example.com",
    course: "Data Science",
    date: "Yesterday, 4:15 PM",
    avatar: "MC",
    amount: "$399",
  },
  {
    name: "Sarah Williams",
    email: "sarah@example.com",
    course: "UI/UX Design",
    date: "2 days ago, 2:00 PM",
    avatar: "SW",
    amount: "$249",
  },
  {
    name: "David Kim",
    email: "david@example.com",
    course: "React Advanced",
    date: "2 days ago, 11:20 AM",
    avatar: "DK",
    amount: "$349",
  },
  {
    name: "Lisa Anderson",
    email: "lisa@example.com",
    course: "Python Basics",
    date: "3 days ago, 9:45 AM",
    avatar: "LA",
    amount: "$199",
  },
];

const upcomingTasks = [
  {
    task: "Review course content - Data Science",
    due: "Today",
    priority: "high",
  },
  {
    task: "Approve new instructor applications",
    due: "Tomorrow",
    priority: "medium",
  },
  {
    task: "Update pricing for Web Development bundle",
    due: "In 3 days",
    priority: "medium",
  },
  { task: "Quarterly report submission", due: "In 5 days", priority: "low" },
  { task: "Server maintenance window", due: "Next week", priority: "low" },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const TestTPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Dashboard
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                  Welcome back! Here&apos;s your platform overview.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="flex-1 sm:flex-none text-xs sm:text-sm bg-white/5 border border-white/10 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500/50 cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-xs sm:text-sm">
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <Link
                href="/admin/create-admin"
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 w-full sm:w-auto bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-xs sm:text-sm"
              >
                <UserPlus className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                <span className="hidden xs:inline">New Admin</span>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center shadow-lg shrink-0`}
                  >
                    <stat.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-medium ${
                      stat.changeType === "up"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${stat.changeType === "down" ? "rotate-90" : ""}`}
                    />
                    {stat.changeType === "down" ? "" : ""}
                  </span>
                </div>
                <p className="text-gray-400 text-[10px] sm:text-xs truncate">
                  {stat.label}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-0.5">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                  Recent Activity
                </h2>
                <button className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {activities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${item.iconColor} flex items-center justify-center shrink-0`}
                    >
                      <item.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {item.text}
                        <span className="text-white font-medium">
                          {item.highlight}
                        </span>
                        {item.extra}
                      </p>
                    </div>
                    <span className="text-gray-500 text-xs shrink-0 whitespace-nowrap mt-0.5">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {/* Quick Actions */}
              <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-3 sm:mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  {[
                    {
                      href: "/admin/create-admin",
                      icon: UserPlus,
                      label: "Add Admin",
                      desc: "Create new admin",
                      color: "from-cyan-400 to-blue-500",
                    },
                    {
                      href: "/courses",
                      icon: BookOpen,
                      label: "Courses",
                      desc: "Manage courses",
                      color: "from-purple-400 to-pink-500",
                    },
                    {
                      href: "/students",
                      icon: GraduationCap,
                      label: "Students",
                      desc: "View all students",
                      color: "from-pink-400 to-rose-500",
                    },
                    {
                      href: "/analytics",
                      icon: TrendingUp,
                      label: "Analytics",
                      desc: "View reports",
                      color: "from-amber-400 to-orange-500",
                    },
                    {
                      href: "/bundles",
                      icon: Award,
                      label: "Bundles",
                      desc: "Manage bundles",
                      color: "from-emerald-400 to-teal-500",
                    },
                  ].map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                    >
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-linear-to-br ${action.color} flex items-center justify-center shrink-0`}
                      >
                        <action.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs sm:text-sm font-medium">
                          {action.label}
                        </p>
                        <p className="text-gray-400 text-xs truncate">
                          {action.desc}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-3 sm:mb-4">
                  Tasks
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {upcomingTasks.map((task, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-white/5 text-purple-500 focus:ring-purple-500/50 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-300 text-xs sm:text-sm truncate">
                          {task.task}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 text-[10px] sm:text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.due}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full border ${priorityColors[task.priority]}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Performance */}
          <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                  Course Performance
                </h2>
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                  <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                  View all
                </button>
              </div>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-5 md:-mx-6">
              <table className="w-full min-w-150">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Course
                    </th>
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Students
                    </th>
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Revenue
                    </th>
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Rating
                    </th>
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Status
                    </th>
                    <th className="text-right text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coursePerformance.map((course, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                            {course.name
                              .split(" ")
                              .map((w) => w[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-xs sm:text-sm font-medium truncate">
                              {course.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-gray-300 text-xs sm:text-sm">
                            {course.students}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {course.revenue}
                        </span>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-400 text-xs sm:text-sm">
                            {course.rating}
                          </span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <svg
                                key={j}
                                className={`w-3 h-3 ${j < Math.floor(course.rating) ? "text-amber-400" : "text-gray-600"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <span
                          className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full border ${
                            course.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5">
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5">
                            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5">
                            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Enrollments */}
          <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                Recent Enrollments
              </h2>
              <button className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-5 md:-mx-6">
              <table className="w-full min-w-125">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Student
                    </th>
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Course
                    </th>
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Date
                    </th>
                    <th className="text-left text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Amount
                    </th>
                    <th className="text-right text-gray-400 text-[10px] sm:text-xs font-medium pb-3 px-4 sm:px-5 md:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.map((student, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs shrink-0">
                            {student.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white text-xs sm:text-sm font-medium truncate">
                              {student.name}
                            </p>
                            <p className="text-gray-400 text-[10px] sm:text-xs truncate">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {student.course}
                        </span>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <span className="text-gray-400 text-[10px] sm:text-xs">
                          {student.date}
                        </span>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6">
                        <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                          {student.amount}
                        </span>
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-5 md:px-6 text-right">
                        <button className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                          <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Completion Rate</p>
                  <p className="text-white text-lg font-bold">87%</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Active Students</p>
                  <p className="text-white text-lg font-bold">892</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Certificates Issued</p>
                  <p className="text-white text-lg font-bold">456</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Instructors</p>
                  <p className="text-white text-lg font-bold">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTPage;
