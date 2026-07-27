"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useMeForAuth } from "@/services/graphql/user/userHook";
import { useUserProgressByUserId } from "@/services/graphql/progress/progressHook";
import { TrendingUp } from "lucide-react";

const ProgressList = () => {
  const { data: me } = useMeForAuth();
  const userId = me?.id || "";
  const { progressList, loading } = useUserProgressByUserId(userId);

  const list = Array.isArray(progressList) ? progressList : [];

  const columns: TableColumn<any>[] = [
    {
      header: "Course",
      className: "pl-6 min-w-0",
      accessor: (p) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <Text variant="body" color="white" size="sm" className="font-medium truncate">{p.course?.title || "N/A"}</Text>
        </div>
      ),
    },
    {
      header: "Progress",
      className: "px-4",
      accessor: (p) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${p.isCompleted ? "bg-green-400" : "bg-cyan-400"}`}
              style={{ width: `${Math.min(p.progress || 0, 100)}%` }}
            />
          </div>
          <Text variant="body" color="dimmed" size="sm">{Math.round(p.progress || 0)}%</Text>
        </div>
      ),
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (p) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${p.isCompleted ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
          {p.isCompleted ? "Completed" : "In Progress"}
        </span>
      ),
    },
    {
      header: "Last Accessed",
      className: "px-4",
      accessor: (p) => (
        <Text variant="body" color="dimmed" size="sm">
          {p.lastAccessed ? new Date(p.lastAccessed).toLocaleDateString() : p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"}
        </Text>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">Learning Progress</Text>
      </div>
      <GridTable
        data={list}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1.5fr_1fr_1.5fr]"
        isLoading={loading}
      />
    </GlassCard>
  );
};
export default ProgressList;
