"use client";

import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import type { RootState } from "@/app/store";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { IContent } from "@/services/graphql/contents/contentTypes";
import {
  FileText,
  Clock,
  Lock,
  Unlock,
  Video,
  Link as LinkIcon,
  Headphones,
  Monitor,
  BookOpen,
  Layers,
  ListOrdered,
  ExternalLink,
  Calendar,
} from "lucide-react";

interface ContentDetailsModalProps {
  data: IContent | null;
}

const CONTENT_TYPES = {
  VIDEO: { label: "Video", icon: Video, color: "text-blue-400", bg: "bg-blue-500/10", ring: "ring-blue-500/30" },
  TEXT: { label: "Text", icon: BookOpen, color: "text-green-400", bg: "bg-green-500/10", ring: "ring-green-500/30" },
  PDF: { label: "PDF", icon: FileText, color: "text-red-400", bg: "bg-red-500/10", ring: "ring-red-500/30" },
  AUDIO: { label: "Audio", icon: Headphones, color: "text-purple-400", bg: "bg-purple-500/10", ring: "ring-purple-500/30" },
  EXTERNAL_LINK: { label: "External Link", icon: LinkIcon, color: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/30" },
  INTERACTIVE: { label: "Interactive", icon: Monitor, color: "text-cyan-400", bg: "bg-cyan-500/10", ring: "ring-cyan-500/30" },
} as const;

type ContentTypeKey = keyof typeof CONTENT_TYPES;

const getVideoEmbedUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      const id = parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
};

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "N/A";

const ContentDetailsModal = ({ data }: ContentDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState & { modal?: Record<string, boolean> }) =>
      !!state.modal?.["contentDetails"],
  );

  const contentType = data?.contentType;
  const typeMeta = contentType
    ? CONTENT_TYPES[contentType as ContentTypeKey] ?? {
        label: contentType,
        icon: FileText,
        color: "text-gray-400",
        bg: "bg-white/5",
        ring: "ring-white/10",
      }
    : null;

  if (!data) return null;

  const TypeIcon = typeMeta?.icon ?? FileText;
  const embedUrl = data.contentUrl ? getVideoEmbedUrl(data.contentUrl) : null;
  const isVideo = data.contentType === "VIDEO";
  const isText = data.contentType === "TEXT";

  const infoItems = [
    { label: "Title", value: data.title, icon: FileText },
    { label: "Module", value: data.module?.title || "N/A", icon: Layers },
    { label: "Serial", value: `#${data.serial}`, icon: ListOrdered },
    { label: "Duration", value: data.duration ? `${data.duration} min` : "N/A", icon: Clock },
    {
      label: "Status",
      value: data.isLocked ? "Locked" : "Unlocked",
      icon: data.isLocked ? Lock : Unlock,
      iconClass: data.isLocked ? "text-red-400" : "text-green-400",
    },
    { label: "Created", value: formatDate(data.createdAt), icon: Calendar },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("contentDetails"))}
      title="Content Details"
      modalSize="lg"
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${typeMeta?.bg ?? "bg-white/5"}`}
            >
              <TypeIcon className={`w-5 h-5 ${typeMeta?.color ?? "text-gray-400"}`} />
            </div>
            <div className="min-w-0">
              <Text variant="h3" color="white" size="md" className="truncate">
                {data.title}
              </Text>
              <Text variant="caption" color="dimmed" size="xs">
                {data.slug}
              </Text>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${typeMeta?.bg} ${typeMeta?.color} ring-1 ${typeMeta?.ring}`}
          >
            <TypeIcon className="w-3.5 h-3.5" />
            {typeMeta?.label ?? data.contentType}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {infoItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 p-3 hover:bg-white/10 transition-colors"
              >
                <Icon className={`w-4 h-4 shrink-0 ${item.iconClass ?? "text-cyan-400"}`} />
                <div className="min-w-0">
                  <Text variant="caption" color="dimmed" size="xs">
                    {item.label}
                  </Text>
                  <Text variant="body" color="white" size="sm" className="truncate">
                    {item.value}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/80 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <Text variant="body" color="white" size="sm" className="font-semibold">
              Content Preview
            </Text>
            {data.isLocked && (
              <span className="inline-flex items-center gap-1 text-xs text-red-400">
                <Lock className="w-3.5 h-3.5" /> Locked
              </span>
            )}
          </div>

          <div className="p-4">
            {isVideo && data.contentUrl ? (
              embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={data.title}
                  className="mx-auto w-full max-w-xs aspect-video rounded-xl bg-black"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <video
                  src={data.contentUrl}
                  controls
                  className="mx-auto w-full max-w-xs aspect-video rounded-xl bg-black object-contain"
                />
              )
            ) : data.contentUrl ? (
              <a
                href={data.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-4 hover:border-cyan-400/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <LinkIcon className={`w-5 h-5 ${typeMeta?.color ?? "text-cyan-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <Text variant="body" color="white" size="sm" className="font-medium truncate">
                    {data.contentUrl}
                  </Text>
                  <Text variant="caption" color="dimmed" size="xs">
                    Click to open {typeMeta?.label ?? "content"}
                  </Text>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors shrink-0" />
              </a>
            ) : isText ? (
              <div className="max-h-96 overflow-y-auto rounded-xl bg-black/30 border border-white/5 p-4">
                <Text variant="body" color="dimmed" size="sm" className="whitespace-pre-wrap">
                  {data.textContent || "No text content provided."}
                </Text>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                <FileText className="w-8 h-8 text-gray-600" />
                <Text variant="body" color="dimmed" size="sm">
                  No content available for this item.
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContentDetailsModal;
