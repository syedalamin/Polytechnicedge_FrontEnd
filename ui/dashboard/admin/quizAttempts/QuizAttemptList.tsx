"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { MoreVertical } from "lucide-react";
import Button from "@/components/common/Button";
import { useGetAllQuizAttemptsQuery } from "@/services/redux/api/modules/quizAttemptApi";
import { useState } from "react";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import QuizAttemptDetailsModal from "./QuizAttemptDetailsModal";

const QuizAttemptList = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [detailData, setDetailData] = useState({});
  const { data, isLoading } = useGetAllQuizAttemptsQuery({ page, limit: 10 });
  const attempts = Array.isArray(data) ? data : data?.data || [];
  const meta = data?.meta;

  const columns: TableColumn<any>[] = [
    { header: "User", className: "pl-6", accessor: (a) => <Text variant="body" color="white" size="sm">{a.user?.email || "N/A"}</Text> },
    { header: "Quiz", className: "px-4 min-w-0", accessor: (a) => <Text variant="body" color="dimmed" size="sm" className="truncate">{a.quiz?.title || "N/A"}</Text> },
    { header: "Score", className: "px-4", accessor: (a) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${a.isPassed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
        {a.score}/{a.score} {a.isPassed ? "Passed" : "Failed"}
      </span>
    )},
    { header: "Attempt #", className: "px-4", accessor: (a) => <Text variant="body" color="dimmed" size="sm">#{a.attemptCount}</Text> },
    { header: "Date", className: "px-4", accessor: (a) => <Text variant="body" color="dimmed" size="sm">{new Date(a.attemptedAt).toLocaleDateString()}</Text> },
    { header: "Actions", className: "pr-6 text-right", accessor: (a) => (
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("quizAttemptDetails")); setDetailData(a); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
      </div>
    )},
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5"><Text color="white" variant="body" size="md">All Quiz Attempts</Text></div>
        <GridTable data={attempts} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[1.5fr_2fr_1.5fr_1fr_1.5fr_auto]" isLoading={isLoading} currentPage={meta?.page} totalPages={meta?.totalPages} onPageChange={setPage} />
      </GlassCard>
      <QuizAttemptDetailsModal data={detailData} />
    </>
  );
};
export default QuizAttemptList;
