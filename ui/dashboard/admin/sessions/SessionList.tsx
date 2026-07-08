"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, Calendar, Video } from "lucide-react";
import Button from "@/components/common/Button";
import { useState } from "react";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import SessionDetailsModal from "./SessionDetailsModal";

const SessionList = () => {
  const dispatch = useAppDispatch();
  const [detailData, setDetailData] = useState({});

  const sessions: any[] = [];

  const columns: TableColumn<any>[] = [
    { header: "Title", className: "pl-6 flex items-center gap-3 min-w-0", accessor: (s) => (
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0"><Video className="w-4 h-4" /></div>
        <div className="truncate"><Text variant="body" color="white" size="sm" className="font-medium truncate">{s.title || "N/A"}</Text></div>
      </div>
    )},
    { header: "Type", className: "px-4", accessor: (s) => <Text variant="body" color="dimmed" size="sm">{s.type || "N/A"}</Text> },
    { header: "Semester", className: "px-4", accessor: (s) => <Text variant="body" color="dimmed" size="sm">{s.semester || "N/A"}</Text> },
    { header: "Date", className: "px-4", accessor: (s) => <Text variant="body" color="dimmed" size="sm">{s.startTime ? new Date(s.startTime).toLocaleDateString() : "N/A"}</Text> },
    { header: "Actions", className: "pr-6 text-right", accessor: (s) => (
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("sessionDetails")); setDetailData(s); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
      </div>
    )},
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5"><Text color="white" variant="body" size="md">All Sessions</Text></div>
        <GridTable data={sessions} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[2fr_1fr_1fr_1.5fr_auto]" isLoading={false} />
      </GlassCard>
      <SessionDetailsModal data={detailData} />
    </>
  );
};
export default SessionList;
