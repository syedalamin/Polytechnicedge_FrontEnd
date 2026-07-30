"use client";

import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, BookOpen, Eye, EyeOff, Layers } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllCourses } from "@/services/graphql/courses/courseHook";
import { useState } from "react";
import CreateCourseModal from "./CreateCourseModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateCourseModal from "./UpdateCourseModal";
import CourseDetailsModal from "./CourseDetailsModal";
import Link from "next/link";
import { usePublishCourseMutation, useUnpublishCourseMutation } from "@/services/redux/api/modules/courseApi";
import { toast } from "sonner";
import { getCookie } from "@/utils/cookie";

const CourseList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState({});

  const { courses, meta, loading, refetch } = useAllCourses({}, page, limit);
  const [publishCourse] = usePublishCourseMutation();
  const [unpublishCourse] = useUnpublishCourseMutation();

    const loginData = getCookie("loginData");

    const userRole = loginData?.role === "SUPER_ADMIN" ? "/super-admin" : "/admin"

   

  const handleTogglePublish = async (course: any) => {
    try {
      if (course.isPublished) {
        await unpublishCourse(course.id).unwrap();
        toast.success("Course unpublished");
      } else {
        await publishCourse(course.id).unwrap();
        toast.success("Course published");
      }
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to toggle publish status");
    }
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Title",
      className: "pl-6 text-left",
      accessor: (course) => (
        <div className="flex items-center gap-3 min-w-0">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-9 h-9 rounded-lg object-cover shrink-0"
            />
          ) : (
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {course.title?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {course.title}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      className: "px-4",
      accessor: (course) => (
        <Text variant="body" color="dimmed" size="sm">
          {course.category?.name || "N/A"}
        </Text>
      ),
    },
    {
      header: "Price",
      className: "px-4",
      accessor: (course) => (
        <Text variant="body" color="white" size="sm">
          ${course.price}
        </Text>
      ),
    },
    {
      header: "Level",
      className: "px-4",
      accessor: (course) => (
        <Text variant="body" color="dimmed" size="sm">
          {course.level}
        </Text>
      ),
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (course) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            course.isPublished
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {course.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (course) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="edit"
            title={course.isPublished ? "Unpublish" : "Publish"}
            size="action"
            onClick={(e: any) => {
              e.stopPropagation();
              handleTogglePublish(course);
            }}
            centerIcon={
              course.isPublished ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
          />
          <Link href={`${userRole}/courses/${course.id}/modules`}>
            <Button
              variant="edit"
              title="Modules"
              size="action"
              centerIcon={<Layers className="w-4 h-4" />}
            />
          </Link>
          <Button
            variant="edit"
            title="Edit"
            size="action"
            onClick={() => {
              dispatch(openModal("updateCourse"));
              setUpdateData(course);
            }}
            centerIcon={<Edit className="w-4 h-4" />}
          />
          <Button
            variant="more"
            title="Details"
            size="action"
            onClick={() => {
              dispatch(openModal("courseDetails"));
              setDetailData(course);
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <Text color="white" variant="body" size="md">
                All Courses
              </Text>
            </div>
            <div>
              <Text color="dimmed" variant="caption" size="sm">
                {meta?.total} total
              </Text>
            </div>
          </div>
        </div>

        <GridTable
          data={courses}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1.2fr_0.8fr_1fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </GlassCard>

      <CreateCourseModal refetch={refetch} />
      <UpdateCourseModal refetch={refetch} updateData={updateData} />
      <CourseDetailsModal data={detailData} />
    </>
  );
};
export default CourseList;
