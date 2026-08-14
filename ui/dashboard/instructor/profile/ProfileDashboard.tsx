"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Star,
  User as UserIcon,
} from "lucide-react";
import { useMeForInstructor } from "@/services/graphql/user/userHook";
import GlassCard from "@/components/common/GlassCard";
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import UpdateProfileModal from "./UpdateProfileModal";

const statusConfig: Record<
  string,
  { dot: string; label: string; text: string }
> = {
  active: {
    dot: "bg-emerald-400",
    label: "Active",
    text: "text-emerald-400",
  },
  away: { dot: "bg-amber-400", label: "Away", text: "text-amber-400" },
  offline: { dot: "bg-gray-500", label: "Offline", text: "text-gray-400" },
};

const roleBadgeColors: Record<string, string> = {
  INSTRUCTOR: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  ADMIN: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

const ProfileDashboard = () => {
  const { data: me, loading: meLoading } = useMeForInstructor();
  const [updateOpen, setUpdateOpen] = useState(false);

  if (meLoading) {
    return (
      <GlassCard paddingSize="md">
        <Text variant="body" color="dimmed" size="sm">
          Loading...
        </Text>
      </GlassCard>
    );
  }

  const profile = me?.instructorProfile;
  const currentStatus = statusConfig[me?.status || ""] || statusConfig.offline;

  const detailItems: {
    label: string;
    value: string;
    icon: React.ReactNode;
    link?: boolean;
  }[] = [
    {
      label: "Email",
      value: me?.email,
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Username",
      value: me?.username,
      icon: <UserIcon className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Contact Number",
      value: profile?.contactNumber1 || "—",
      icon: <Phone className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Contact Number 2",
      value: profile?.contactNumber2 || "—",
      icon: <Phone className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Address",
      value: profile?.address || "—",
      icon: <MapPin className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Gender",
      value: profile?.gender
        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
        : "—",
      icon: <UserIcon className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Date of Birth",
      value: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth).toLocaleDateString()
        : "—",
      icon: <Calendar className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Qualification",
      value: profile?.qualification || "—",
      icon: <GraduationCap className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Experience",
      value: profile?.experienceYears
        ? `${profile.experienceYears} years`
        : "—",
      icon: <Briefcase className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "LinkedIn",
      value: profile?.linkedin || "—",
      icon: <ExternalLink className="w-4 h-4 text-cyan-400" />,
      link: true,
    },
    {
      label: "Website",
      value: profile?.website || "—",
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      link: true,
    },
  ];

  return (
    <div className="space-y-6">
      <GlassCard paddingSize="md" className="p-0 overflow-hidden">
        <div className="relative w-full bg-linear-to-br from-cyan-500 to-purple-600 min-h-36 sm:min-h-44 md:min-h-56">
          {profile?.backgroundImage && (
            <>
              <Image
                alt="backgroundImage"
                src={profile.backgroundImage}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
            </>
          )}
        </div>

        <div className="px-4 sm:px-6 -mt-12 sm:-mt-16 pb-6 flex flex-col items-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-[#0f0f11] overflow-hidden shadow-xl shrink-0">
            {profile?.profileImage ? (
              <Image
                alt="profileImage"
                src={profile.profileImage}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                {profile?.firstName?.charAt(0)}
                {profile?.lastName?.charAt(0)}
              </div>
            )}
          </div>

          <div className="text-center mt-3 w-full">
            <Text
              variant="body"
              color="white"
              size="lg"
              className="font-bold text-xl tracking-wide"
            >
              {profile?.firstName} {profile?.middleName ? profile.middleName + " " : ""}
              {profile?.lastName || "Instructor"}
            </Text>

            <div className="flex items-center justify-center gap-2 mt-1">
              <Star className="w-4 h-4 text-amber-400" />
              <Text variant="body" color="white" size="sm">
                {profile?.rating?.toFixed(1) || "0.0"}
              </Text>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span
                className={`text-xs px-3 py-1 rounded-full border font-medium uppercase tracking-wider inline-block ${
                  roleBadgeColors[me?.role || ""] ||
                  "bg-white/5 text-gray-300 border-white/10"
                }`}
              >
                {me?.role || "User"}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                <span
                  className={`w-2 h-2 rounded-full ${currentStatus.dot}`}
                />
                <span
                  className={`text-[11px] font-semibold tracking-wider uppercase ${currentStatus.text}`}
                >
                  {currentStatus.label}
                </span>
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              leftIcon={<Pencil className="w-4 h-4" />}
              onClick={() => setUpdateOpen(true)}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </GlassCard>

      {profile?.bio && (
        <GlassCard paddingSize="md">
          <div className="flex items-start gap-3">
            <FileText className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <Text variant="caption" color="dimmed" size="md">
                Bio
              </Text>
              <Text variant="body" color="white" size="md">
                {profile.bio}
              </Text>
            </div>
          </div>
        </GlassCard>
      )}

      {profile?.expertise?.length > 0 && (
        <GlassCard paddingSize="md">
          <Text variant="caption" color="dimmed" size="md" className="mb-2">
            Expertise
          </Text>
          <div className="flex flex-wrap gap-2">
            {profile.expertise.map((exp: string, i: number) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              >
                {exp}
              </span>
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard paddingSize="md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {detailItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="mt-0.5">{item.icon}</span>
              <div className="min-w-0">
                <Text variant="caption" color="dimmed" size="sm">
                  {item.label}
                </Text>
                {item.link && item.value !== "—" ? (
                  <Link
                    href={item.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline transition-colors text-sm block truncate"
                  >
                    {item.value}
                  </Link>
                ) : (
                  <Text
                    variant="body"
                    color="white"
                    size="sm"
                    className="truncate"
                  >
                    {item.value}
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <UpdateProfileModal
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        profile={profile}
        onSuccess={() => {}}
      />
    </div>
  );
};
export default ProfileDashboard;
