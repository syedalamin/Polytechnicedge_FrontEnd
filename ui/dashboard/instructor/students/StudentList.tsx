"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useAllStudents } from "@/services/graphql/students/studentHook";
import { useState } from "react";
import { Users } from "lucide-react";

const StudentList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { students, meta, loading } = useAllStudents(page, limit);

  const columns: TableColumn<any>[] = [
    {
      header: "Student",
      className: "pl-6 min-w-0",
      accessor: (s) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="truncate">
            <Text variant="body" color="white" size="sm" className="font-medium truncate">
              {s.firstName} {s.lastName}
            </Text>
            <Text variant="caption" color="dimmed" size="sm">{s.user?.email || "N/A"}</Text>
          </div>
        </div>
      ),
    },
    {
      header: "Education",
      className: "px-4",
      accessor: (s) => <Text variant="body" color="dimmed" size="sm">{s.educationLevel || "N/A"}</Text>,
    },
    {
      header: "Interests",
      className: "px-4",
      accessor: (s) => (
        <div className="flex flex-wrap gap-1">
          {s.interests?.slice(0, 2).map((interest: string, i: number) => (
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
              {interest}
            </span>
          ))}
          {s.interests?.length > 2 && (
            <span className="text-xs text-white/50">+{s.interests.length - 2}</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">All Students</Text>
      </div>
      <GridTable
        data={students}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1.5fr_2fr]"
        isLoading={loading}
        currentPage={meta?.page}
        totalPages={meta?.totalPages}
        onPageChange={setPage}
      />
    </GlassCard>
  );
};
export default StudentList;
