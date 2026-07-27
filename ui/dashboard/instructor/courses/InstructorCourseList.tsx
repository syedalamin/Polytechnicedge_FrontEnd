"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { useMeForAuth } from "@/services/graphql/user/userHook";
import { useAllCourses } from "@/services/graphql/courses/courseHook";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { ExternalLink, GraduationCap } from "lucide-react";

const InstructorCourseList = () => {
  const { data: me } = useMeForAuth();
  const instructorId = me?.instructorProfile?.id || "";
  const [page, setPage] = useState(1);
  const limit = 100;
  const { courses: allCourses, loading } = useAllCourses({}, page, limit);

  const myCourses = allCourses.filter((c: any) =>
    c.instructors?.some((ci: any) => ci.instructorId === instructorId)
  );

  const columns: TableColumn<any>[] = [
    {
      header: "Course",
      className: "pl-6 min-w-0",
      accessor: (c) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div className="truncate">
            <Text variant="body" color="white" size="sm" className="font-medium truncate">{c.title || "N/A"}</Text>
            <Text variant="caption" color="dimmed" size="sm">{c.level || "N/A"}</Text>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      className: "px-4",
      accessor: (c) => <Text variant="body" color="dimmed" size="sm">{c.category?.name || "N/A"}</Text>,
    },
    {
      header: "Modules",
      className: "px-4",
      accessor: (c) => <Text variant="body" color="dimmed" size="sm">{c.modules?.length || 0}</Text>,
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (c) => (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.isPublished ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
          {c.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (c) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/instructor/courses/${c.id}`}>
            <Button variant="more" title="View Modules" size="action" centerIcon={<ExternalLink className="w-4 h-4" />} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">My Assigned Courses</Text>
      </div>
      <GridTable
        data={myCourses}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1fr_1fr_1fr_auto]"
        isLoading={loading}
      />
    </GlassCard>
  );
};
export default InstructorCourseList;
