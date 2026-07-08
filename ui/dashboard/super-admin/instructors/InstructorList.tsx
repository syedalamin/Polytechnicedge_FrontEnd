"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, Star, GraduationCap } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllInstructors } from "@/services/graphql/instructors/instructorHook";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import CreateInstructorModal from "./CreateInstructorModal";
import UpdateInstructorModal from "./UpdateInstructorModal";
import InstructorDetailsModal from "./InstructorDetailsModal";

const InstructorList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState({});
  const { instructors, meta, loading, refetch } = useAllInstructors(page, limit);

  const columns: TableColumn<any>[] = [
    {
      header: "Instructor",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (inst) => (
        <>
          {inst.profileImage ? (
            <Image alt="profile" src={inst.profileImage} width={100} height={100} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {inst.firstName?.charAt(0) || "?"}
            </div>
          )}
          <div className="truncate">
            <Text variant="body" color="white" size="sm" className="font-medium truncate">
              {inst.firstName} {inst.lastName}
            </Text>
            <Text variant="body" color="dimmed" size="sm" className="truncate">{inst.user?.email}</Text>
          </div>
        </>
      ),
    },
    {
      header: "Expertise",
      className: "px-4",
      accessor: (inst) => (
        <Text variant="body" color="dimmed" size="sm" className="truncate">
          {inst.expertise?.join(", ") || "N/A"}
        </Text>
      ),
    },
    {
      header: "Rating",
      className: "px-4",
      accessor: (inst) => (
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400" />
          <Text variant="body" color="white" size="sm">{inst.rating?.toFixed(1) || "0.0"}</Text>
        </div>
      ),
    },
    {
      header: "Experience",
      className: "px-4",
      accessor: (inst) => (
        <Text variant="body" color="dimmed" size="sm">
          {inst.experienceYears ? `${inst.experienceYears} years` : "N/A"}
        </Text>
      ),
    },
    {
      header: "Contact",
      className: "px-4",
      accessor: (inst) => (
        <Text variant="body" color="dimmed" size="sm">
          {inst.contactNumber1 || "No Number"}
        </Text>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (inst) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="edit" title="Edit" size="action" onClick={() => { dispatch(openModal("updateInstructor")); setUpdateData(inst); }}
            centerIcon={<Edit className="w-4 h-4" />} />
          <Button variant="more" title="More" size="action" onClick={() => { dispatch(openModal("instructorDetails")); setDetailData(inst); }}
            centerIcon={<MoreVertical className="w-4 h-4" />} />
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
              <Text color="white" variant="body" size="md">All Instructors</Text>
            </div>
            <div>
              <Text color="dimmed" variant="caption" size="sm">{meta?.total} total</Text>
            </div>
          </div>
        </div>
        <GridTable
          data={instructors}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1.5fr_0.8fr_0.8fr_1fr_auto]"
          isLoading={loading}
          currentPage={meta?.page || 1}
          totalPages={meta?.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </GlassCard>
      <CreateInstructorModal refetch={refetch} />
      <UpdateInstructorModal refetch={refetch} updateData={updateData} />
      <InstructorDetailsModal data={detailData} />
    </>
  );
};

export default InstructorList;
