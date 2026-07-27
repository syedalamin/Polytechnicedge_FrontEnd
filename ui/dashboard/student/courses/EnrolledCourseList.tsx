"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useMeForAuth } from "@/services/graphql/user/userHook";
import { useAllEnrollments } from "@/services/graphql/enrollments/enrollmentHook";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { ExternalLink } from "lucide-react";

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-500/20 text-green-400",
  COMPLETED: "bg-blue-500/20 text-blue-400",
  EXPIRED: "bg-red-500/20 text-red-400",
  PENDING: "bg-yellow-500/20 text-yellow-400",
};

const EnrolledCourseList = () => {
  const { data: me } = useMeForAuth();
  const userId = me?.id || "";
  const [page, setPage] = useState(1);
  const limit = 10;
  const { enrollments, meta, loading } = useAllEnrollments({ userId }, page, limit);

  const columns: TableColumn<any>[] = [
    {
      header: "Course",
      className: "pl-6 min-w-0",
      accessor: (e) => (
        <Text variant="body" color="white" size="sm" className="truncate font-medium">
          {e.course?.title || "N/A"}
        </Text>
      ),
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (e) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[e.status] || "bg-gray-500/20 text-gray-400"}`}>
          {e.status || "N/A"}
        </span>
      ),
    },
    {
      header: "Enrolled",
      className: "px-4",
      accessor: (e) => (
        <Text variant="body" color="dimmed" size="sm">
          {e.enrolledAt ? new Date(e.enrolledAt).toLocaleDateString() : "N/A"}
        </Text>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (e) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/student/courses/${e.courseId}`}>
            <Button variant="more" title="View" size="action" centerIcon={<ExternalLink className="w-4 h-4" />} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">My Enrollments</Text>
      </div>
      <GridTable
        data={enrollments}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1fr_1.5fr_auto]"
        isLoading={loading}
        currentPage={meta?.page}
        totalPages={meta?.totalPages}
        onPageChange={setPage}
      />
    </GlassCard>
  );
};
export default EnrolledCourseList;
