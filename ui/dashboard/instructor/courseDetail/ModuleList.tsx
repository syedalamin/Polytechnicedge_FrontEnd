"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useAllModules } from "@/services/graphql/modules/moduleHook";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { ExternalLink } from "lucide-react";

const ModuleList = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  const [page, setPage] = useState(1);
  const limit = 100;
  const { modules, meta, loading } = useAllModules({ courseId }, page, limit);

  const columns: TableColumn<any>[] = [
    {
      header: "Module",
      className: "pl-6 min-w-0",
      accessor: (m) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {m.weekNumber || m.serial || "-"}
          </div>
          <div className="truncate">
            <Text variant="body" color="white" size="sm" className="font-medium truncate">{m.title || "N/A"}</Text>
            {m.estimatedDuration && (
              <Text variant="caption" color="dimmed" size="sm">{m.estimatedDuration} min</Text>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Contents",
      className: "px-4",
      accessor: (m) => <Text variant="body" color="dimmed" size="sm">{m.contents?.length || 0} items</Text>,
    },
    {
      header: "Quizzes",
      className: "px-4",
      accessor: (m) => <Text variant="body" color="dimmed" size="sm">{m.quizzes?.length || 0} quizzes</Text>,
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (m) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/instructor/courses/${courseId}/modules/${m.id}`}>
            <Button variant="more" title="View Contents" size="action" centerIcon={<ExternalLink className="w-4 h-4" />} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">Modules</Text>
      </div>
      <GridTable
        data={modules}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1fr_1fr_auto]"
        isLoading={loading}
        currentPage={meta?.page}
        totalPages={meta?.totalPages}
        onPageChange={setPage}
      />
    </GlassCard>
  );
};
export default ModuleList;
