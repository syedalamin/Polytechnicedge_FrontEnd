"use client";
import Text from "@/components/common/Text";
import GlassCard from "@/components/common/GlassCard";
import GridTable, { TableColumn } from "@/components/common/GridTable";
import { Edit, MoreVertical, HelpCircle } from "lucide-react";
import Button from "@/components/common/Button";
import { useGetQuizQuestionsByQuizIdQuery } from "@/services/redux/api/modules/quizQuestionApi";
import { useState } from "react";
import CreateQuizQuestionModal from "./CreateQuizQuestionModal";
import { useAppDispatch } from "@/app/reduxHooks";
import { openModal } from "@/services/redux/slices/modalSlice";
import UpdateQuizQuestionModal from "./UpdateQuizQuestionModal";
import QuizQuestionDetailsModal from "./QuizQuestionDetailsModal";

interface QuizQuestionListProps { quizId: string; }

const QuizQuestionList = ({ quizId }: QuizQuestionListProps) => {
  const dispatch = useAppDispatch();
  const [updateData, setUpdateData] = useState({});
  const [detailData, setDetailData] = useState({});
  const { data, isLoading, refetch } = useGetQuizQuestionsByQuizIdQuery(quizId);

  const questions = Array.isArray(data) ? data : data?.data || [];

  const columns: TableColumn<any>[] = [
    {
      header: "Question",
      className: "pl-6 min-w-0",
      accessor: (q) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div className="truncate">
            <Text variant="body" color="white" size="sm" className="font-medium truncate">
              {q.question?.length > 80 ? q.question.substring(0, 80) + "..." : q.question}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Options",
      className: "px-4",
      accessor: (q) => (
        <Text variant="body" color="dimmed" size="sm">{q.options?.length || 0} options</Text>
      ),
    },
    {
      header: "Marks",
      className: "px-4",
      accessor: (q) => (
        <Text variant="body" color="white" size="sm">{q.marks}</Text>
      ),
    },
    {
      header: "Actions",
      className: "pr-6 text-right",
      accessor: (q) => (
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="edit" title="Edit" size="action" onClick={() => { dispatch(openModal("updateQuizQuestion")); setUpdateData(q); }} centerIcon={<Edit className="w-4 h-4" />} />
          <Button variant="more" title="Details" size="action" onClick={() => { dispatch(openModal("quizQuestionDetails")); setDetailData(q); }} centerIcon={<MoreVertical className="w-4 h-4" />} />
          </div>
      ),
    },
  ];

  return (
    <>
      <GlassCard paddingSize="md">
        <div className="p-4 sm:p-5 md:p-6 border-b border-white/5">
          <Text color="white" variant="body" size="md">Quiz Questions</Text>
        </div>
        <GridTable data={questions} columns={columns} rowKeyAccessor="id" gridLayoutClass="grid-cols-[3fr_1fr_1fr_auto]" isLoading={isLoading} />
      </GlassCard>
      <CreateQuizQuestionModal refetch={refetch} quizId={quizId} />
      <UpdateQuizQuestionModal refetch={refetch} updateData={updateData} />
      <QuizQuestionDetailsModal data={detailData} />
    </>
  );
};
export default QuizQuestionList;
