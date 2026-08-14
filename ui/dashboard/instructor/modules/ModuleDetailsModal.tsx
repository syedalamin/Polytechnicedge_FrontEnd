"use client";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { closeModal } from "@/services/redux/slices/modalSlice";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Hash,
  BookOpen,
  ListOrdered,
  Video,
  FileText,
  FileQuestion,
  File,
  Calendar,
} from "lucide-react";

interface ModuleDetailsModalProps {
  data: any;
}

const contentTypeConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  video: {
    icon: <Video className="w-3.5 h-3.5" />,
    label: "Video",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  text: {
    icon: <FileText className="w-3.5 h-3.5" />,
    label: "Text",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  article: {
    icon: <FileText className="w-3.5 h-3.5" />,
    label: "Article",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  quiz: {
    icon: <FileQuestion className="w-3.5 h-3.5" />,
    label: "Quiz",
    color: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  },
  pdf: {
    icon: <File className="w-3.5 h-3.5" />,
    label: "PDF",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  document: {
    icon: <File className="w-3.5 h-3.5" />,
    label: "Document",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
};

function getContentTypeConfig(type?: string) {
  const key = type?.toLowerCase() || "";
  return (
    contentTypeConfig[key] || {
      icon: <File className="w-3.5 h-3.5" />,
      label: key || "Unknown",
      color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    }
  );
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const ModuleDetailsModal = ({ data }: ModuleDetailsModalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: any) => !!state.modal?.["moduleDetails"],
  );
  if (!data) return null;

  const overviewItems = [
    {
      label: "Week",
      value: `Week ${data.weekNumber}`,
      icon: <Hash className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Serial",
      value: data.serial,
      icon: <ListOrdered className="w-4 h-4 text-purple-400" />,
    },
    {
      label: "Duration",
      value: `${data.estimatedDuration} min`,
      icon: <Clock className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Contents",
      value: data.contents?.length || 0,
      icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
    },
    {
      label: "Created",
      value: formatDate(data.createdAt),
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
    },
    {
      label: "Updated",
      value: formatDate(data.updatedAt),
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal("moduleDetails"))}
      title="Module Details"
      modalSize="lg"
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
              {data.title?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <Text
                variant="body"
                color="white"
                size="lg"
                className="font-semibold"
              >
                {data.title}
              </Text>
              <Text variant="caption" color="dimmed" size="xs">
                Week {data.weekNumber} &middot; Serial {data.serial}
              </Text>
            </div>
          </div>
          <Text
            variant="body"
            color="white"
            size="lg"
            className="font-semibold"
          >
            {data.textInstruction}
          </Text>
        </div>

        <Separator />

        <div>
          <Text
            variant="caption"
            color="secondary"
            size="xs"
            className="mb-3 inline-block"
          >
            Overview
          </Text>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {overviewItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="shrink-0">{item.icon}</div>
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
            ))}
          </div>
        </div>

        {data.contents?.length > 0 && (
          <>
            <Separator />

            <div>
              <Text
                variant="caption"
                color="secondary"
                size="xs"
                className="mb-3 inline-block"
              >
                Contents ({data.contents.length})
              </Text>
              <div className="space-y-1.5">
                {data.contents.map((content: any, i: number) => {
                  const cfg = getContentTypeConfig(content.contentType);
                  return (
                    <div
                      key={content.id || i}
                      className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/3 px-3 py-2.5 hover:bg-white/6 transition-colors"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white/10 text-xs font-semibold text-gray-400 shrink-0">
                        {content.serial || i + 1}
                      </span>
                      <span className="flex-1 min-w-0">
                        <Text
                          variant="body"
                          color="white"
                          size="sm"
                          className="truncate"
                        >
                          {content.title}
                        </Text>
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium shrink-0 ${cfg.color}`}
                      >
                        {cfg.icon}
                        {cfg.label}
                      </span>
                      {content.duration != null && (
                        <span className="flex items-center gap-1 text-gray-500 shrink-0">
                          <Clock className="w-3 h-3" />
                          <span className="text-[11px]">
                            {content.duration}m
                          </span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModuleDetailsModal;
