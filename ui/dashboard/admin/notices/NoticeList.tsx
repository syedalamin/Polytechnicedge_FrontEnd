"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, Bell } from "lucide-react";
import Button from "@/components/common/Button";
import { useAllNotices } from "@/services/graphql/notices/noticeHook";
import { useState } from "react";
import CreateNoticeModal from "./CreateNoticeModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateNoticeModal from "./UpdateNoticeModal";
import NoticeDetailsModal from "./NoticeDetailsModal";
import { INotice } from "@/services/graphql/notices/noticeTypes";

const NoticeList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState<INotice | null>(null);
  const { notices, meta, loading, refetch } = useAllNotices({}, page, limit);

  const columns: TableColumn<any>[] = [
    { header: "Title", className: "pl-6 flex items-center gap-3 min-w-0", accessor: (n) => (
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0"><Bell className="w-4 h-4" /></div>
        <div className="truncate"><Text variant="body" color="white" size="sm" className="font-medium truncate">{n.title}</Text></div>
      </div>
    )},
    { header: "Scope", className: "px-4", accessor: (n) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${n.isGlobal ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>
        {n.isGlobal ? "Global" : "Course"}
      </span>
    )},
    { header: "Date", className: "px-4", accessor: (n) => <Text variant="body" color="dimmed" size="sm">{new Date(n.createdAt).toLocaleDateString()}</Text> },
    { header: "Actions", className: "pr-6 text-right", accessor: (n) => (
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="edit" title="Edit" size="action" onClick={() => { dispatch(openModal("updateNotice")); setUpdateData(n); }} centerIcon={<Edit className="w-4 h-4" />} />
        <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("noticeDetails")); setDetailData(n); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
      </div>
    )},
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5"><Text color="white" variant="body" size="md">All Notices</Text></div>
        <GridTable data={notices} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[2fr_1fr_1.5fr_auto]" isLoading={loading} currentPage={meta?.page} totalPages={meta?.totalPages} onPageChange={setPage} />
      </GlassCard>
      <CreateNoticeModal refetch={refetch} />
      <UpdateNoticeModal refetch={refetch} updateData={updateData} />
      <NoticeDetailsModal data={detailData} />
    </>
  );
};
export default NoticeList;
