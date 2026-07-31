"use client";

import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import {
  Edit,
  MoreVertical,
  BookOpen,
  FileQuestion,
  ListOrdered,
} from "lucide-react";
import Button from "@/components/common/Button";
import { useModulesByCourseId } from "@/services/graphql/modules/moduleHook";
import { useState } from "react";
import CreateModuleModal from "./CreateModuleModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateModuleModal from "./UpdateModuleModal";
import ModuleDetailsModal from "./ModuleDetailsModal";
import Link from "next/link";
import { getCookie } from "@/utils/cookie";

interface ModuleListProps {
  courseId: string;
}

const ModuleList = ({ courseId }: ModuleListProps) => {
  const dispatch = useAppDispatch();
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState({});

    const loginData = getCookie("loginData");

    const userRole = loginData?.role === "SUPER_ADMIN" ? "/super-admin" : "/admin"

  const { modules, loading, refetch } = useModulesByCourseId(courseId);

 
  

  const columns: TableColumn<any>[] = [
    {
      header: "Title",
      className: "pl-6 flex items-center gap-3 min-w-0",
      accessor: (mod) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {mod.title?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <div className="truncate">
            <Text
              variant="body"
              color="white"
              size="sm"
              className="font-medium truncate"
            >
              {mod.title}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Week",
      className: "px-4",
      accessor: (mod) => (
        <Text variant="body" color="dimmed" size="sm">
          Week {mod.weekNumber}
        </Text>
      ),
    },
    {
      header: "Duration",
      className: "px-4",
      accessor: (mod) => (
        <Text variant="body" color="dimmed" size="sm">
          {mod.estimatedDuration} min
        </Text>
      ),
    },
    {
      header: "Contents",
      className: "px-4",
      accessor: (mod) => (
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <Text variant="body" color="dimmed" size="sm">
            {mod.contents?.length || 0}
          </Text>
        </div>
      ),
    },
    {
      header: "Serial",
      className: "px-4",
      accessor: (mod) => (
        <div className="flex items-center gap-2">
          <ListOrdered className="w-3.5 h-3.5 text-purple-400" />
          <Text variant="body" color="dimmed" size="sm">
            {mod.serial || 0}
          </Text>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (mod) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`${userRole}/modules/${mod.id}/contents`}>
            <Button
              variant="edit"
              title="Contents"
              size="action"
              centerIcon={<BookOpen className="w-4 h-4" />}
            />
          </Link>
          {/* <Link href={`/admin/modules/${mod.id}/quizzes`}>
            <Button
              variant="edit"
              title="Quizzes"
              size="action"
              centerIcon={<FileQuestion className="w-4 h-4" />}
            />
          </Link> */}
          <Button
            variant="edit"
            title="Edit"
            size="action"
            onClick={() => {
              dispatch(openModal("updateModule"));
              setUpdateData(mod);
            }}
            centerIcon={<Edit className="w-4 h-4" />}
          />
          <Button
            variant="more"
            title="Details"
            size="action"
            onClick={() => {
              dispatch(openModal("moduleDetails"));
              setDetailData(mod);
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
          <Text color="white" variant="body" size="md">
            Course Modules
          </Text>
        </div>

        <GridTable
          data={modules || []}
          columns={columns}
          rowKeyAccessor="id"
          gridLayoutClass="grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]"
          isLoading={loading}
        />
      </GlassCard>

      <CreateModuleModal refetch={refetch} courseId={courseId} />
      <UpdateModuleModal refetch={refetch} updateData={updateData} />
      <ModuleDetailsModal data={detailData} />
    </>
  );
};
export default ModuleList;
