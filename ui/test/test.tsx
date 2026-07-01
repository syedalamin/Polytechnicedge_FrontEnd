"use client";

import { useState } from "react";
import {
  X,
  Search,
  UserCheck,
  Shield,
  Clock,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  FileText,
  Calendar,
  Image as ImageIcon,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  Activity,
  Plus,
  UserPlus,
  ArrowUpDown,
  Download,
  Globe,
} from "lucide-react";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";
import SelectField from "@/components/forms/SelectField";
import Form from "@/components/forms/Form";
import Button from "@/components/common/Button";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const roleOptions = [
  { value: "super-admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
];

const allAdmins = [
  {
    name: "John Doe",
    email: "john@example.com",
    role: "Super Admin",
    initials: "JD",
    status: "active",
    lastActive: "Now",
    permissions: 12,
    sessions: 3,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    initials: "JS",
    status: "active",
    lastActive: "5m ago",
    permissions: 8,
    sessions: 2,
  },
  {
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Admin",
    initials: "BW",
    status: "active",
    lastActive: "1h ago",
    permissions: 8,
    sessions: 1,
  },
  {
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Admin",
    initials: "AB",
    status: "away",
    lastActive: "2h ago",
    permissions: 7,
    sessions: 1,
  },
];

const roleBadgeColors: Record<string, string> = {
  "Super Admin": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Admin: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const statusConfig: Record<string, { dot: string; label: string }> = {
  active: { dot: "bg-emerald-400", label: "Active" },
  away: { dot: "bg-amber-400", label: "Away" },
  offline: { dot: "bg-gray-500", label: "Offline" },
};

const roleStats = [
  {
    label: "Super Admins",
    count: 1,
    icon: ShieldAlert,
    color: "from-purple-400 to-pink-500",
  },
  {
    label: "Admins",
    count: 3,
    icon: Shield,
    color: "from-cyan-400 to-blue-500",
  },
];

export default function Test() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "status" | "role">("name");
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(1);

  const onSubmit = () => {};

  const filteredAdmins = allAdmins
    .filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return a.role.localeCompare(b.role);
    });

  const totalSessions = allAdmins.reduce((sum, a) => sum + a.sessions, 0);

  return (
    <div className="min-h-screen ">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
          {/* ==================== HEADER ==================== */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Admin Management
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                  Manage administrators, roles, and permissions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs sm:text-sm">
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  setFormStep(1);
                }}
                className="flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 w-full sm:w-auto bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Admin</span>
              </button>
            </div>
          </div>

          {/* ==================== ROLE STATS ==================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {roleStats.map((rs) => (
              <div
                key={rs.label}
                className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-3 sm:gap-4"
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br ${rs.color} flex items-center justify-center shadow-lg shrink-0`}
                >
                  <rs.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{rs.label}</p>
                  <p className="text-white text-lg sm:text-xl font-bold">
                    {rs.count}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ==================== ADMIN LIST ==================== */}
          <div className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white text-sm font-medium">
                    All Administrators
                  </p>
                  <p className="text-gray-400 text-xs">
                    {allAdmins.length} total
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none sm:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                  <button
                    onClick={() =>
                      setSortBy(
                        sortBy === "name"
                          ? "status"
                          : sortBy === "status"
                            ? "role"
                            : "name",
                      )
                    }
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                    title={`Sorted by ${sortBy}`}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Body */}
            {filteredAdmins.length === 0 ? (
              <div className="text-center py-16 sm:py-20 px-4">
                <UserCheck className="w-14 h-14 sm:w-16 sm:h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400 text-sm sm:text-base font-medium">
                  No admins found
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Try adjusting your search or filter
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-gray-400 text-xs font-medium pb-3 px-6 pt-2">
                          Admin
                        </th>
                        <th className="text-left text-gray-400 text-xs font-medium pb-3 px-4 pt-2">
                          Role
                        </th>
                        <th className="text-left text-gray-400 text-xs font-medium pb-3 px-4 pt-2">
                          Status
                        </th>
                        <th className="text-left text-gray-400 text-xs font-medium pb-3 px-4 pt-2">
                          Permissions
                        </th>
                        <th className="text-left text-gray-400 text-xs font-medium pb-3 px-4 pt-2">
                          Sessions
                        </th>
                        <th className="text-right text-gray-400 text-xs font-medium pb-3 px-6 pt-2">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdmins.map((admin, i) => (
                        <tr
                          key={i}
                          className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {admin.initials}
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">
                                  {admin.name}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {admin.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full border ${roleBadgeColors[admin.role] || "bg-white/5 text-gray-300 border-white/10"}`}
                            >
                              {admin.role}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${(statusConfig[admin.status] || statusConfig.offline).dot}`}
                              />
                              <span className="text-gray-400 text-xs">
                                {statusConfig[admin.status]?.label || "Offline"}
                              </span>
                              <span className="text-gray-500 text-xs">
                                · {admin.lastActive}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Shield className="w-3.5 h-3.5 text-gray-500" />
                              <span className="text-gray-300 text-xs">
                                {admin.permissions}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Globe
                                className={`w-3.5 h-3.5 ${admin.sessions > 0 ? "text-emerald-400" : "text-gray-600"}`}
                              />
                              <span
                                className={`text-xs ${admin.sessions > 0 ? "text-gray-300" : "text-gray-500"}`}
                              >
                                {admin.sessions}{" "}
                                {admin.sessions === 1 ? "session" : "sessions"}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/10"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/10"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  setSelectedAdmin(
                                    selectedAdmin === admin.email
                                      ? null
                                      : admin.email,
                                  )
                                }
                                className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="sm:hidden flex items-center justify-end gap-2">
                              <button className="text-gray-400 hover:text-cyan-400 transition-colors text-xs font-medium">
                                Edit
                              </button>
                              <button className="text-gray-400 hover:text-red-400 transition-colors text-xs font-medium">
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile / Tablet Cards */}
                <div className="md:hidden divide-y divide-white/5">
                  {filteredAdmins.map((admin, i) => (
                    <div
                      key={i}
                      className="p-4 sm:p-5 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {admin.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm font-medium">
                                {admin.name}
                              </p>
                              <div
                                className={`w-2 h-2 rounded-full ${(statusConfig[admin.status] || statusConfig.offline).dot}`}
                              />
                            </div>
                            <p className="text-gray-400 text-xs">
                              {admin.email}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${roleBadgeColors[admin.role] || "bg-white/5 text-gray-300 border-white/10"}`}
                        >
                          {admin.role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pl-13 sm:pl-13">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {admin.lastActive}
                          </span>
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            {admin.permissions} perms
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-400 hover:text-cyan-400 transition-colors text-xs font-medium">
                            Edit
                          </button>
                          <button className="text-gray-400 hover:text-red-400 transition-colors text-xs font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 sm:px-5 md:px-6 py-3 border-t border-white/5 flex items-center justify-between">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Showing {filteredAdmins.length} of {allAdmins.length} admins
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      {totalSessions} active sessions
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ==================== CREATE ADMIN MODAL ==================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-0 sm:p-4">
          <div className="relative w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[94vh] bg-[#0a0e27] rounded-t-2xl sm:rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/5 overflow-y-auto custom-scrollbar animate-slide-up">
            {/* ===== Modal Header ===== */}
            <div className="sticky top-0 bg-[#0a0e27]/95 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4 z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shrink-0">
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
                      Create New Admin
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Step {formStep} of 3 — Personal Information
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 hover:bg-white/10 rounded-lg p-1.5 sm:p-2"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              {/* Progress Bar */}
              <div className="flex gap-1.5 mt-3 sm:mt-4">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                      step <= formStep
                        ? "bg-linear-to-r from-cyan-500 to-purple-500"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ===== Modal Body ===== */}
            <div className="px-4 sm:px-6 py-4 sm:py-6">
              <Form onSubmit={onSubmit}>
                {/* --- Step 1: Personal Info --- */}
                {formStep === 1 && (
                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      <InputField
                        label="First Name"
                        name="firstName"
                        placeholder="John"
                        icon={<User className="w-4 h-4" />}
                      />
                      <InputField
                        label="Middle Name"
                        name="middleName"
                        placeholder="Jane"
                        icon={<User className="w-4 h-4" />}
                      />
                      <InputField
                        label="Last Name"
                        name="lastName"
                        placeholder="Doe"
                        icon={<User className="w-4 h-4" />}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <InputField
                        label="Contact Number"
                        name="contactNumber1"
                        type="tel"
                        placeholder="+1234567890"
                        icon={<Phone className="w-4 h-4" />}
                      />
                      <InputField
                        label="Alternate Contact"
                        name="contactNumber2"
                        type="tel"
                        placeholder="+1234567890"
                        icon={<Phone className="w-4 h-4" />}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <InputField
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        icon={<Calendar className="w-4 h-4" />}
                      />
                      <SelectField
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                        placeholder="Select gender"
                      />
                    </div>
                    <InputField
                      label="Address"
                      name="address"
                      placeholder="Street, city, postal code"
                      icon={<MapPin className="w-4 h-4" />}
                    />
                  </div>
                )}

                {/* --- Step 2: Account Info --- */}
                {formStep === 2 && (
                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <InputField
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        icon={<Mail className="w-4 h-4" />}
                      />
                      <SelectField
                        label="Role"
                        name="role"
                        options={roleOptions}
                        placeholder="Select role"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <InputField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        icon={<Lock className="w-4 h-4" />}
                        rightIcon={
                          showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )
                        }
                        onRightIconClick={() => setShowPassword(!showPassword)}
                      />
                      <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        icon={<Lock className="w-4 h-4" />}
                        rightIcon={
                          showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )
                        }
                        onRightIconClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <p className="text-gray-400 text-xs sm:text-sm font-medium mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        Password Requirements
                      </p>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        {[
                          "At least 8 characters long",
                          "Contains uppercase & lowercase letters",
                          "Includes a number and a symbol",
                        ].map((req, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-gray-500"
                          >
                            <CheckCircle className="w-3 h-3 text-emerald-400/70" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* --- Step 3: Profile & Bio --- */}
                {formStep === 3 && (
                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <InputField
                        label="Profile Image URL"
                        name="profileImage"
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        icon={<ImageIcon className="w-4 h-4" />}
                      />
                      <InputField
                        label="Background Image URL"
                        name="backgroundImage"
                        type="url"
                        placeholder="https://example.com/background.jpg"
                        icon={<ImageIcon className="w-4 h-4" />}
                      />
                    </div>
                    <TextareaField
                      label="Bio"
                      name="bio"
                      placeholder="Tell us about yourself, your experience, and expertise..."
                      icon={<FileText className="w-4 h-4" />}
                      rows={4}
                    />
                    <div className="rounded-xl bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 border border-white/10 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-300 text-sm font-medium">
                            Review before submitting
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-1">
                            Once created, the admin will receive an email with
                            their login credentials. You can modify permissions
                            and roles later from the admin settings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== Modal Footer ===== */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/5">
                  {formStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setFormStep(formStep - 1)}
                      className="px-5 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer"
                    >
                      Previous
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2.5 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <div className="flex-1" />
                  {formStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setFormStep(formStep + 1)}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm cursor-pointer"
                    >
                      Next Step
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                  ) : (
                    <Button className="flex-1 sm:flex-none">
                      Create Admin
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
