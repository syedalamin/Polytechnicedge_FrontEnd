"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import type { RootState } from "@/app/store";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import {
  Bell,
  Globe,
  GraduationCap,
  User,
  Calendar,
  BookOpen,
  Mail,
  FileText,
} from "lucide-react";
import { INotice } from "@/services/graphql/notices/noticeTypes";

interface NoticeDetailsModalProps {
  data: INotice | null;
}

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const NoticeDetailsModal = ({ data }: NoticeDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState & { modal?: Record<string, boolean> }) =>
      !!state.modal?.["noticeDetails"],
  );

  if (!data) return null;

  const infoItems = [
    {
      label: "Scope",
      value: data.isGlobal ? "Global" : "Course Specific",
      icon: data.isGlobal ? Globe : GraduationCap,
      iconClass: data.isGlobal ? "text-green-400" : "text-blue-400",
    },
    {
      label: "Author",
      value: data.author?.username || data.author?.email || "N/A",
      icon: User,
    },
    {
      label: "Course",
      value: data.course?.title || "N/A",
      icon: BookOpen,
    },
    { label: "Created", value: formatDate(data.createdAt), icon: Calendar },
    { label: "Updated", value: formatDate(data.updatedAt), icon: Calendar },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("noticeDetails"))}
      title="Notice Details"
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <Text variant="h3" color="white" size="md" className="truncate">
                {data.title}
              </Text>
              <Text variant="caption" color="dimmed" size="xs">
                Notice #{data.id}
              </Text>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ring-1 ${
              data.isGlobal
                ? "bg-green-500/10 text-green-400 ring-green-500/30"
                : "bg-blue-500/10 text-blue-400 ring-blue-500/30"
            }`}
          >
            {data.isGlobal ? (
              <Globe className="w-3.5 h-3.5" />
            ) : (
              <GraduationCap className="w-3.5 h-3.5" />
            )}
            {data.isGlobal ? "Global" : "Course Specific"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {infoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 p-3 hover:bg-white/10 transition-colors"
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${item.iconClass ?? "text-cyan-400"}`}
                />
                <div className="min-w-0">
                  <Text variant="caption" color="dimmed" size="xs">
                    {item.label}
                  </Text>
                  <Text
                    variant="body"
                    color="white"
                    size="sm"
                    className="truncate"
                  >
                    {item.value}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/80 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <FileText className="w-4 h-4 text-cyan-400" />
            <Text variant="body" color="white" size="sm" className="font-semibold">
              Content
            </Text>
          </div>
          <div className="p-4 max-h-64 overflow-y-auto custom-scrollbar">
            <Text
              variant="body"
              color="dimmed"
              size="sm"
              className="whitespace-pre-wrap"
            >
              {data.content || "No content provided."}
            </Text>
          </div>
        </div>

        {data.author && (
          <div className="rounded-xl bg-white/5 border border-white/5 p-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <Text variant="caption" color="dimmed" size="xs">
                  Published by
                </Text>
                <Text variant="body" color="white" size="sm">
                  {data.author.username || "Unknown"}
                </Text>
                {data.author.email && (
                  <Text
                    variant="caption"
                    color="dimmed"
                    size="xs"
                    className="inline-flex items-center gap-1 normal-case tracking-normal"
                  >
                    <Mail className="w-3 h-3" /> {data.author.email}
                  </Text>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NoticeDetailsModal;
