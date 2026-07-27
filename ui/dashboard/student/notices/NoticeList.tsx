"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useGlobalNotices } from "@/services/graphql/notices/noticeHook";
import { Bell } from "lucide-react";

const NoticeList = () => {
  const { notices, loading } = useGlobalNotices();

  const list = Array.isArray(notices) ? notices : [];

  const columns: TableColumn<any>[] = [
    {
      header: "Title",
      className: "pl-6 min-w-0",
      accessor: (n) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <Text variant="body" color="white" size="sm" className="font-medium truncate">{n.title || "N/A"}</Text>
        </div>
      ),
    },
    {
      header: "Scope",
      className: "px-4",
      accessor: (n) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${n.isGlobal ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>
          {n.isGlobal ? "Global" : "Course"}
        </span>
      ),
    },
    {
      header: "Date",
      className: "px-4",
      accessor: (n) => <Text variant="body" color="dimmed" size="sm">{new Date(n.createdAt).toLocaleDateString()}</Text>,
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">Global Notices</Text>
      </div>
      <GridTable
        data={list}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1fr_1.5fr]"
        isLoading={loading}
      />
    </GlassCard>
  );
};
export default NoticeList;
