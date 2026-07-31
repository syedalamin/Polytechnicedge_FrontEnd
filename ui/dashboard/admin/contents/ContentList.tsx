"use client";

import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import {
  Edit,
  MoreVertical,
  Lock,
  Unlock,
  Video,
  FileText,
  Headphones,
  Link as LinkIcon,
  Monitor,
 
} from "lucide-react";
import Button from "@/components/common/Button";
import { useAllContents } from "@/services/graphql/contents/contentHook";
import { useState } from "react";
import { toast } from "sonner";
import CreateContentModal from "./CreateContentModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateContentModal from "./UpdateContentModal";
import ContentDetailsModal from "./ContentDetailsModal";
import { useUpdateContentMutation } from "@/services/redux/api/modules/contentApi";
import { IContent } from "@/services/graphql/contents/contentTypes";

interface ContentListProps {
  moduleId: string;
}

const contentTypeIcons: Record<string, any> = {
  VIDEO: <Video className="w-3.5 h-3.5 text-blue-400" />,
  TEXT: <FileText className="w-3.5 h-3.5 text-green-400" />,
  PDF: <FileText className="w-3.5 h-3.5 text-red-400" />,
  AUDIO: <Headphones className="w-3.5 h-3.5 text-purple-400" />,
  EXTERNAL_LINK: <LinkIcon className="w-3.5 h-3.5 text-amber-400" />,
  INTERACTIVE: <Monitor className="w-3.5 h-3.5 text-cyan-400" />,
};

const ContentList = ({ moduleId }: ContentListProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState<IContent | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const { contents, meta, loading, refetch } = useAllContents(
    { moduleId },
    page,
    limit,
  );
  const [updateContent] = useUpdateContentMutation();

  const toggleLock = async (content: any) => {
    if (togglingId) return;
    setTogglingId(content.id);
    try {
      const res = await updateContent({
        id: content.id,
        data: { isLocked: !content.isLocked },
      }).unwrap();
      if (res?.success) {
        toast.success(
          res?.message ||
            (content.isLocked ? "Content unlocked" : "Content locked"),
        );
        refetch();
      }
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Failed to update lock status";
      toast.error(errorMsg);
    } finally {
      setTogglingId(null);
    }
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Title",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (content) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {content.title?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {content.title}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Type",
      className: "px-4",
      accessor: (content) => (
        <div className="flex items-center gap-2">
          {contentTypeIcons[content.contentType] || (
            <FileText className="w-3.5 h-3.5" />
          )}
          <Text variant="body" color="dimmed" size="sm">
            {content.contentType}
          </Text>
        </div>
      ),
    },
    {
      header: "Duration",
      className: "px-4",
      accessor: (content) => (
        <Text variant="body" color="dimmed" size="sm">
          {content.duration ? `${content.duration} min` : "N/A"}
        </Text>
      ),
    },
    {
      header: "Locked",
      className: "px-4",
      accessor: (content) => (
        <button
          type="button"
          title={content.isLocked ? "Unlock" : "Lock"}
          onClick={() => toggleLock(content)}
          disabled={togglingId === content.id}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
        >
          {togglingId === content.id ? (
            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          ) : content.isLocked ? (
            <Lock className="w-4 h-4 text-red-400" />
          ) : (
            <Unlock className="w-4 h-4 text-green-400" />
          )}
        </button>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (content) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
           
          <Button
            variant="edit"
            title="Edit"
            size="action"
            onClick={() => {
              dispatch(openModal("updateContent"));
              setUpdateData(content);
            }}
            centerIcon={<Edit className="w-4 h-4" />}
          />
          <Button
            variant="more"
            title="Details"
            size="action"
            onClick={() => {
              dispatch(openModal("contentDetails"));
              setDetailData(content);
            }}
            centerIcon={<MoreVertical className="w-4 h-4" />}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
          <Text color="white" variant="body" size="md">
            Module Contents
          </Text>
        </div>
        <GridTable
          data={contents}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1.2fr_1fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </GlassCard>

      <CreateContentModal refetch={refetch} moduleId={moduleId} />
      <UpdateContentModal refetch={refetch} updateData={updateData} />
      <ContentDetailsModal data={detailData} />
    </>
  );
};
export default ContentList;
