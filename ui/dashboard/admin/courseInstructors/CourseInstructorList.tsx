"use client";

import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Trash2, GraduationCap } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllCourseInstructors } from "@/services/graphql/courseInstructors/courseInstructorHook";
import { useDeleteCourseInstructorMutation } from "@/services/redux/api/modules/courseInstructorApi";
import { useState } from "react";
import { toast } from "sonner";
import AddCourseInstructorModal from "./AddCourseInstructorModal";

interface CourseInstructorListProps {
  courseId: string;
}

const CourseInstructorList = ({ courseId }: CourseInstructorListProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { courseInstructors, meta, loading, error, refetch } =
    useAllCourseInstructors({ courseId }, page, limit);
  const [deleteCourseInstructor, { isLoading: isDeleting }] =
    useDeleteCourseInstructorMutation();

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this instructor from the course?",
    );
    if (!confirmed) return;

    try {
      const res = await deleteCourseInstructor(id).unwrap();
      toast.success(res?.message || "Instructor removed");
      refetch();
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.data || "Failed to remove instructor";
      toast.error(errorMsg);
    }
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Instructor",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (ci) => (
        <div className="flex items-center gap-3 min-w-0">
          {ci.instructor?.profileImage ? (
            <img
              src={ci.instructor.profileImage}
              alt={ci.instructor.firstName}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {ci.instructor?.firstName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {ci.instructor
                ? `${ci.instructor.firstName} ${ci.instructor.lastName}`
                : "N/A"}
            </Text>
            <Text variant="body" color="dimmed" size="sm" className="truncate">
              {ci.instructor?.user?.email || "No email"}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Course",
      className: "px-4",
      accessor: (ci) => (
        <Text variant="body" color="dimmed" size="sm">
          {ci.course?.title || "N/A"}
        </Text>
      ),
    },
    {
      header: "Assigned At",
      className: "px-4",
      accessor: (ci) => (
        <Text variant="body" color="dimmed" size="sm">
          {ci.createdAt ? new Date(ci.createdAt).toLocaleDateString() : "N/A"}
        </Text>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (ci) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="remove"
            title="Remove"
            size="action"
            disabled={isDeleting}
            onClick={() => handleDelete(ci.id)}
            centerIcon={<Trash2 className="w-4 h-4" />}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <Text color="white" variant="body" size="md">
                Course Instructors
              </Text>
            </div>
            <div>
              <Text color="dimmed" variant="caption" size="sm">
                {meta?.total} total
              </Text>
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-4 mt-4 flex items-center justify-between gap-3 bg-red-500/10 border border-red-500/40 rounded-lg p-3">
            <Text variant="body" color="dimmed" size="sm" className="text-red-400">
              Failed to load course instructors. Please try again.
            </Text>
            <Button
              variant="outline"
              size="xs"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        )}

        <GridTable
          data={courseInstructors}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1.5fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </GlassCard>

      <AddCourseInstructorModal refetch={refetch} courseId={courseId} />
    </>
  );
};
export default CourseInstructorList;
