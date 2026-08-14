"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import {
  useMeForAuth,
  useMeForInstructor,
} from "@/services/graphql/user/userHook";
import { useAllCourses } from "@/services/graphql/courses/courseHook";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { Layers, MoreVertical } from "lucide-react";
import { openModal } from "@/services/redux/slices/modalSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import CourseDetailsModal from "../../admin/courses/CourseDetailsModal";

const InstructorCourseList = () => {
  const dispatch = useAppDispatch();
  const { data: me } = useMeForInstructor();
  const [detailData, setDetailData] = useState({});
  const courseInstructors = me?.instructorProfile?.courseInstructors || [];

  const myCourses = courseInstructors.map(
    (item: { course: any }) => item.course,
  );

  const userRole = "/instructor";

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
      accessor: (c) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`${userRole}/courses/${c.id}`}>
            <Button
              variant="edit"
              title="Modules"
              size="action"
              centerIcon={<Layers className="w-4 h-4" />}
            />
          </Link>
          <Button
            variant="more"
            title="Details"
            size="action"
            onClick={() => {
              dispatch(openModal("courseDetails"));
              setDetailData(c);
            }}
            centerIcon={<MoreVertical className="w-4 h-4" />}
          />
        </div>
      ),
    },
  ];

  return (
    <GlassCard paddingSize="md">
      <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
        <Text color="white" variant="body" size="md">
          My Assigned Courses
        </Text>
      </div>
      <GridTable
        data={myCourses}
        columns={columns}
        rowKeyAccessor="id"
        gridLayoutClass="grid-cols-[2fr_1.2fr_0.8fr_1fr_1fr_auto]"
      />
      <CourseDetailsModal data={detailData} />
    </GlassCard>
  );
};
export default InstructorCourseList;
