"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Shield,
  Globe,
  FileText,
} from "lucide-react";

interface AdminDetailsModalProps {
  data: any;
}

const AdminDetailsModal = ({ data }: AdminDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["adminDetails"],
  );

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
    SUPER_ADMIN: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Admin: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  };

  if (!data) return null;

  const currentStatus = statusConfig[data.user?.status] || statusConfig.offline;

  const detailItems = [
    {
      label: "First Name",
      value: data.firstName,
      icon: <User className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Middle Name",
      value: data.middleName || "—",
      icon: <User className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Last Name",
      value: data.lastName,
      icon: <User className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Email",
      value: data.user?.email,
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Contact Number",
      value: data.contactNumber1 || "No Number",
      icon: <Phone className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Address",
      value: data.address || "—",
      icon: <MapPin className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Gender",
      value: data.gender
        ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
        : "—",
      icon: <User className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Date of Birth",
      value: data.dateOfBirth
        ? new Date(data.dateOfBirth).toLocaleDateString()
        : "—",
      icon: <Calendar className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Role",
      value: data.user?.role,
      icon: <Shield className="w-4 h-4 text-cyan-400" />,
      badge: true,
    },
    {
      label: "Status",
      value: statusConfig[data.user?.status]?.label || "Offline",
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
      dotColor: statusConfig[data.user?.status]?.dot,
    },
    {
      label: "Email Verified",
      value: data.user?.emailVerified > 0 ? "Verified" : "Not Verified",
      icon: <Globe className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Member Since",
      value: data.createdAt
        ? new Date(data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
      icon: <Calendar className="w-4 h-4 text-cyan-400" />,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("adminDetails"))}
      title="Admin Details"
      modalSize="full"
    >
      <div className="space-y-6">
        <div className="w-full mx-auto bg-slate-900 rounded-2xl shadow-xl border border-white/10">
          <div className="relative w-full bg-linear-to-br from-cyan-500 to-purple-600 rounded-t-2xl min-h-36 sm:min-h-28 md:min-h-72">
            {data.backgroundImage && (
              <>
                <Image
                  alt="backgroundImage"
                  src={data.backgroundImage}
                  fill
                  className="object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
              </>
            )}

            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
              <span
                className={`w-2 h-2 rounded-full ${currentStatus.dot} shadow-sm`}
              />
              <span
                className={`text-[11px] font-semibold tracking-wider uppercase ${currentStatus.text}`}
              >
                {currentStatus.label}
              </span>
            </div>
          </div>

          <div className="px-6 -mt-12 sm:-mt-24 pb-6 flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-full ring-4 ring-slate-900 overflow-hidden shadow-xl shrink-0">
              {data.profileImage ? (
                <Image
                  alt="profileImage"
                  src={data.profileImage}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-3xl">
                  {data.firstName?.charAt(0)}
                  {data.lastName?.charAt(0)}
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
                {data.firstName} {data.middleName ? data.middleName + " " : ""}
                {data.lastName}
              </Text>

              <div className="mt-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-medium uppercase tracking-wider inline-block ${
                    roleBadgeColors[data.user?.role] ||
                    "bg-white/5 text-gray-300 border-white/10"
                  }`}
                >
                  {data.user?.role || "User"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {data.bio && (
          <div className="flex items-start gap-3 pb-4 border-b border-white/10">
            <FileText className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <Text variant="caption" color="dimmed" size="md">
                Bio
              </Text>
              <Text variant="body" color="white" size="md">
                {data.bio}
              </Text>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {detailItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {item.icon}
              <div>
                <Text variant="caption" color="dimmed" size="sm">
                  {item.label}
                </Text>
                <div className="flex items-center gap-2">
                  {item.dotColor && (
                    <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  )}
                  {item.badge ? (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        roleBadgeColors[data.user?.role] ||
                        "bg-white/5 text-gray-300 border-white/10"
                      }`}
                    >
                      {item.value}
                    </span>
                  ) : (
                    <Text variant="body" color="white" size="sm">
                      {item.value}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AdminDetailsModal;
