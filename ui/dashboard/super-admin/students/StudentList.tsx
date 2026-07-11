"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllStudents } from "@/services/graphql/students/studentHook";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import StudentDetailsModal from "./StudentDetailsModal";
import UpdateStudentModal from "./UpdateStudentModal";

const StudentList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState({});
  const { students, meta, loading, refetch } = useAllStudents(page, limit);

  const statusConfig: Record<string, { dot: string; label: string }> = {
    active: { dot: "bg-emerald-400", label: "Active" },
    inactive: { dot: "bg-gray-500", label: "Inactive" },
    blocked: { dot: "bg-red-400", label: "Blocked" },
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Student",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (student) => (
        <>
          {student.profileImage ? (
            <Image
              alt="profile"
              src={student.profileImage}
              width={100}
              height={100}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {student.firstName?.charAt(0) || "?"}
            </div>
          )}
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {student.firstName} {student.lastName}
            </Text>
            <Text variant="body" color="dimmed" size="sm" className="truncate">
              {student.user?.email}
            </Text>
          </div>
        </>
      ),
    },
    {
      header: "Status",
      className: "px-4",
      accessor: (student) => {
        const config = statusConfig[student.user?.status] || {
          dot: "bg-gray-500",
          label: "Unknown",
        };
        return (
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${config.dot}`} />
            <Text variant="body" color="dimmed" size="sm">
              {config.label}
            </Text>
          </div>
        );
      },
    },
    {
      header: "Education",
      className: "px-4",
      accessor: (student) => (
        <Text variant="body" color="dimmed" size="sm">
          {student.educationLevel || "N/A"}
        </Text>
      ),
    },
    {
      header: "Contact",
      className: "px-4",
      accessor: (student) => (
        <Text variant="body" color="dimmed" size="sm">
          {student.contactNumber1 || "No Number"}
        </Text>
      ),
    },
    {
      header: "Date of Birth",
      className: "px-4",
      accessor: (student) => (
        <Text variant="body" color="dimmed" size="sm">
          {student.dateOfBirth
            ? new Date(student.dateOfBirth).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "N/A"}
        </Text>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (student) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="edit"
            title="Edit"
            size="action"
            onClick={() => {
              dispatch(openModal("updateStudent"));
              setUpdateData(student);
            }}
            centerIcon={<Edit className="w-4 h-4" />}
          />
          <Button
            variant="more"
            title="Details"
            size="action"
            onClick={() => {
              dispatch(openModal("studentDetails"));
              setDetailData(student);
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
                All Students
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
          data={students}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </GlassCard>
      <StudentDetailsModal data={detailData} />
      <UpdateStudentModal refetch={refetch} updateData={updateData} />
    </>
  );
};

export default StudentList;
