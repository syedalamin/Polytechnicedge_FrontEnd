"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useAllContents } from "@/services/graphql/contents/contentHook";
import { useQuizzesByModuleId } from "@/services/graphql/quizzes/quizHook";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Video, FileText, Link as LinkIcon, FileQuestion } from "lucide-react";

const contentTypeIcons: Record<string, any> = {
  VIDEO: Video,
  TEXT: FileText,
  PDF: FileText,
  LINK: LinkIcon,
};

const ContentList = () => {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const [page, setPage] = useState(1);
  const limit = 100;
  const { contents, meta, loading } = useAllContents({ moduleId }, page, limit);
  const { quizzes } = useQuizzesByModuleId(moduleId);

  const columns: TableColumn<any>[] = [
    {
      header: "Content",
      className: "pl-6 min-w-0",
      accessor: (c) => {
        const Icon = contentTypeIcons[c.contentType] || FileText;
        return (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="truncate">
              <Text variant="body" color="white" size="sm" className="font-medium truncate">{c.title || "N/A"}</Text>
              <Text variant="caption" color="dimmed" size="sm">{c.contentType || "N/A"}</Text>
            </div>
          </div>
        );
      },
    },
    {
      header: "Duration",
      className: "px-4",
      accessor: (c) => <Text variant="body" color="dimmed" size="sm">{c.duration ? `${c.duration} min` : "N/A"}</Text>,
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (c) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.isLocked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}>
          {c.isLocked ? "Locked" : "Unlocked"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
          <Text color="white" variant="body" size="md">Contents</Text>
        </div>
        <GridTable
          data={contents}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1fr_1fr]"
          isLoading={loading}
          currentPage={meta?.page}
          totalPages={meta?.totalPages}
          onPageChange={setPage}
        />
      </GlassCard>

      {quizzes && quizzes.length > 0 && (
        <GlassCard paddingSize="md">
          <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
            <Text color="white" variant="body" size="md">Quizzes</Text>
          </div>
          <div className="p-4 space-y-3">
            {quizzes.map((quiz: any) => (
              <div key={quiz.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <FileQuestion className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <Text variant="body" color="white" size="sm" className="truncate">{quiz.title || "Quiz"}</Text>
                  <Text variant="caption" color="dimmed" size="sm">
                    {quiz.questions?.length || 0} questions | Pass: {quiz.passingScore || 0}% | {quiz.timeLimit || 0} min
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
export default ContentList;
